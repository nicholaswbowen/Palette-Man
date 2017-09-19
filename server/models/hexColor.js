const mongoose = require('mongoose')


const hexColor = mongoose.model('hexColor', 

    new mongoose.Schema({
            x11Name: {type: String, required: false},
            hex: {type: String, required: true}
    })
)

function validateHex(){
    const hexCodePattern = /^#[0-9a-f]{3,6}$/i

    return this.hex.match(hexCodePattern)
    
}

module.exports = {hexColor};