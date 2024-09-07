const fs = require('fs');
const { text } = require('stream/consumers');

let textCSV = fs.readFileSync('./file.csv', 'utf8');



/**
 * The function get textCSV and return the function2.
 * This function prepares and make a formated of string who needs for returns function.
 * Formated .csv saved like "catalog"
 * --function2
 * description inside of func1
 * @param {parsered .csv file like string} textCSV 
 * @returns function2
 */
let func1 = function(textCSV){
    if(textCSV== undefined){
        console.log("error hasn't a text")
        return 0;
    }
    let catalog = textCSV
        .split("\n")
        .map( line => line.trim())
        .filter((line) => line[0] !== '#' && line )
        .map( line => line.split(','))
        .map(arr => {let associativeArray = {x:arr[0],y:arr[1],name:arr[2],population:arr[3]};
            return associativeArray;})
        .sort((a,b) =>b.population - a.population)
        .slice(0,10)
        .reduce((acumulator,actualValue, index) => {
            acumulator[actualValue.name] = {population : actualValue.population, rating : index+1}
            return acumulator;
            },{})
        
        /**
         * Function formated your string line. If your text have towns which have in "Catalog" They
         * change to by most informative text like
         * 'My town'=>
         * 'My town "rating" місце в ТОП-10 самих більших міст в Україні, населення "population" людей)'
         * */    
        return (text) => {
                return Object.entries(catalog).reduce((acum,actualValue)=>{
                    name = actualValue[0];
                    rating = actualValue[1].rating;
                    population = actualValue[1].population;
                    return acum = acum.replace(
                        RegExp(name,"g"),
                        `${name} (${rating} місце в ТОП-10 самих більших міст в Україні, населення ${population} людей)\n`
                    )
                },text )
            }
        
    
    
}

let func2 = func1(textCSV);
console.log
console.log(func2("Бердичів, Алушта, Бердичів, Вінниця"))