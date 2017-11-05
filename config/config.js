module.exports = {
  app: {
    name: "Skooli"
  },
  db: {
    url: "mongodb://opiumated:phoenix01@ds227045.mlab.com:27045/skooli"
    //url: "mongodb://localhost/myapp"
  },
  connection: {
    port: process.env.PORT || 3001
  },
  jwt: {
    secretKey: process.env.SECRET_KEY || "yrevdabterces"
  }
};
