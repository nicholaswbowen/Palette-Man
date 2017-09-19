const express = require('express')
let hexColor = require('../models/hexColor').hexColor;
let router = express.Router();

router.get('/colorsPage', (req, res, next) => {
    const numberOfResults = Number.parseInt(req.query.quanity);
    const startId = req.query.startId;
    getColorPage(startId, numberOfResults)
        .then((result) => {
            res.send({data: result});
            res.end();
        })
        .catch((err) => {
            res.send({message: 'fetch from database failed', error: err})     
            res.end();       
        })
})

router.get('/colorsSuggestions', (req, res, next) => {
    const startColor = req.query.startColor;
    const colorType = req.query.colorType;
    
    if(colorType === 'namedColor'){
        findColorSuggestionsByName(startColor)
            .then((colors) => {
                res.send({data: colors});
                res.end(); 
            })
    }
    if(colorType === 'hexColor'){
        
        findColorSuggestionsByHex(startColor)
            .then((colors) => {
                res.send({data: colors});
                res.end(); 
            })
    }

    if (colorType !== 'hexColor' && colorType !== 'namedColor'){
        res.send({message: 'invalid colorType. Api accepts input of either "hexCode" or "namedColor"'})
        res.end();
    }
})

function findColorSuggestionsByName(color){
    return hexColor
        .find({
            x11Name: { "$regex": color, "$options": "i" }
        })
        .limit(10)
}

function findColorSuggestionsByHex(color){
    return hexColor
        .find({
            hex: { "$regex": color, "$options": "i" }
        })
        .limit(10)
}

function getColorPage(startId, pageSize){
    if(startId){
        return hexColor
                .find({ _id : { $gt : startId }})
                .limit(pageSize)
    }else{
        return hexColor
                .find()
                .limit(pageSize)
    }


}

module.exports = {router: router}