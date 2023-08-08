const express = require('express')
const app = express()
const port = 8000

const fs = require('fs');
const path = 'sources\\counter.txt'

app.get('/hello', (req, res) => {
    try{
        let counter = fs.readFileSync(path)
        res.send(`${counter}`)
        let newCounter = +counter + 1;
        fs.writeFileSync(path , `${newCounter}`, function(){console.log('counter plus one')})
    }
    catch(e){
        console.log(`error of file`)
    }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})