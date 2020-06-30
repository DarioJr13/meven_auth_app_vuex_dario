if (process.env.NODE_ENV === 'production') {
    module.exports = {
        //Conexion en la Nube
        mongoURI: "mongodb+srv://user_vue:XvfQpTon1ivDGtLY@vue-gepfs.mongodb.net/meven_login_Crud?retryWrites=true&w=majority",
        secret: 'yoursecret'
    };
} else {
    module.exports = {
        //Conexion local
        mongoURI: "mongodb://localhost:27017/meven_login_Crud",
        secret: 'yoursecret'
    };
}