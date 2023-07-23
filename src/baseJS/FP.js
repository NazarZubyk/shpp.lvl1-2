const fs = require('fs');

let text = fs.readFileSync('/home/nazar/NazarZubyk/src/baseJS/file.csv', 'utf8');



console.log(
    text
    .split("\n")
    .map( line => line.trim())
    .filter((line) => line[0] !== '#' && line )
    .map( line => line.split(','))
    .map(arr => {let associativeArray = {x:arr[0],y:arr[1],name:arr[2],population:arr[3]};
    return associativeArray;})
    .sort((a,b) => {
        if(+a.population > +b.population){
            return -1;
        }
        else if(+a.population < +b.population){
            return 1;
        }
        return 0;
    })
    .slice(0,10)
    .reduce((acumulator,actualValue) => {
        
    },{})
)

