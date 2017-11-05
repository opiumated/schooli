$(document).ready(function() {
  $(".remove-student").on("click", (e) => {
    e.preventDefault();
    const studentUsername =  e.currentTarget.dataset.username;
    const status = window.confirm("Sure you want to delete this student?");
    if(status) {
     fetch(`https://skooli.herokuapp.com/api/student/${studentUsername}`, "delete")
      .then((response) => {
        window.location.reload();
      }).catch((err) => {
        console.log(err);
      });
    }
  }); //On Click
});

function fetch(url, method) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open(method, url);

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send();
  });
}
