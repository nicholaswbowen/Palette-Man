const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        console.log('connected to mongo');
    })
    .catch((error) => {
        console.log(error);
    })
    
if (process.env.production === 'true'){
    const BUILD_DIR = path.resolve(__dirname, "../../client/build")

    app.use(express.static(BUILD_DIR));
    app.get(/^((?!api).)*$/g, function (req, res) {  
      res.sendFile(path.resolve(BUILD_DIR, "index.html"));
    });
}