export function setHeader(){
    var myHeaders = new Headers(); 
    var init = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };
    return init; 
}