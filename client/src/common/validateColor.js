const hexCode = /^#[0-9a-f]{3,6}$/i
const rgb = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
const lettersOnly = /^[a-zA-z]+$/g
export function checkColorFormat(color){
    if (color.match(hexCode)){
        return 'hexColor';
    }
    if (color.match(rgb)){
        return 'rbg';
    }
    if (color.match(lettersOnly)){
        return 'namedColor';
    }else{
        return 'invalid format';
    }
}