const Chance = require('chance');
const fs = require('fs')
const hexColor = require('../models/hexColor').hexColor;
const mongoose = require('mongoose');

let chance = new Chance();
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        console.log('connected to mongo');
        seedScript();
    })
    .catch((error) => {
        console.log(error);
    })

function generateRandomHexColor(){
    return chance.color({format:'hex'});
}

function generateRandomColorsList(size, colorsList){
    try{
        let hexColors = chance.unique( generateRandomHexColor , size, {comparator: !hexDoesExistsInArray});
        return hexColors.map((hexCode) => {
            return {hex: hexCode}
        })  
    }catch(e){
        console.error('colors could not be generated', e)
        return undefined;
    }
}

function hexDoesExistsInArray(hexToCheck,array){
    return array.some((element) => {
        return element.hex === hexToCheck;
    })
}

function getX11Colors(){
    return JSON.parse(fs.readFileSync('server/seed/x11.json', 'utf8'))
                .map((color) => {
                    return {name: color.name, hex: '#' + color.hex}
                })
}

function seedScript(){
    console.log('seed started')
    let x11Colors = getX11Colors();
    let hexColors = generateRandomColorsList(4096 - x11Colors.length, x11Colors)
    let finalColors = x11Colors.concat(hexColors);

    finalColors.forEach( (color) => {
        hexColor.create({x11Name: color.name || null, hex: color.hex})
            .then((result) => {
                mongoose.disconnect();
                console.log(`seeded document with _id:${result._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    })
    
    
}
