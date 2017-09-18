import Chance from 'chance';
import {scaleLinear} from 'd3-scale';

let chance = new Chance();

export function generateRandomColor(){
    return chance.color({format: 'hex'});
}
export function generateRandomColorsList(size){
    try{
        let randomColors = chance.unique( generateRandomColor , size);
        return randomColors
    }catch(e){
        console.error('colors could not be generated', e)
        return e;
    }
    
}
function generateScaleOfColors(colorStart, colorEnd, scaleEnd){
    return scaleLinear()
        .domain([0, scaleEnd])
        .range([colorStart, colorEnd])
    
}
export function generateScaledColorsList(colorStart, colorEnd, arraySize){
    let colorList = Array(arraySize).fill(0);
    let colorScale = generateScaleOfColors(colorStart, colorEnd, arraySize);

    return colorList.map((element, index) => {
        let color = rgb2hex(colorScale(index));
        return color;
    })
}


// Full disclosure, I did not write this. The regex to do this is rather fiddly, and I did not want to reinvent the wheel on this.  http://jsfiddle.net/Mottie/xcqpF/1/light/
// d3 scale gives us a nice color range, but it gives you RGB, not hex, which is what I am displaying to the user.
function rgb2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}