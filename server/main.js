const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const colorsAPI = require('./api/colorsApi').router;
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        console.log('connected to mongo');
    })
    .catch((error) => {
        console.log(error);
    })

if (process.env.production === 'true'){
    console.log('prod = true')
    const BUILD_DIR = path.resolve(__dirname, "../client/build");

    app.use(express.static(BUILD_DIR));
    app.get(/^((?!api).)*$/g, function (req, res) {  
      res.sendFile(path.resolve(BUILD_DIR, "index.html"));
    });
}


app.use('/api', colorsAPI);
app.listen(process.env.port || 3001);
