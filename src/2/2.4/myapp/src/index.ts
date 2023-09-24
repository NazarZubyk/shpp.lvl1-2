import express from 'express'
import http from 'http'
import cors from 'cors'


const app = express()
var bodyParser = require('body-parser')
const portHTTP = 3005;


//http server------------------------------------------------------

//need for correct procession of json
app.use(express.json());
app.use(cors())
app.use(express.static('frontend'))

http.createServer(app).listen(portHTTP,()=>{
  console.log("start HTTP express server")
})

let idCount:number = 1;
let items: item[] = [];

app.get('/api/v1/items', (req, res)=>{
    let resJson = {items:items.map(item=>({id:item.id,text:item.text,checked: item.checked}))}
    res.send( resJson )    
})

app.post('/api/v1/items', (req, res)=>{
    let bodyReq:{text:string} = req.body;
    console.log(bodyReq.text)
    let newItem = createNewItem(idCount,bodyReq.text,false)

    let resJson = JSON.stringify({id:newItem.id})
    res.send(resJson)

    console.log(`post with id:${newItem.id}`)
    idCount++;
})

app.put('/api/v1/items', (req, res)=>{
    let reqBody = req.body;
    let indexForUpdate = items.findIndex(item=> item.id === reqBody.id) 

    if(indexForUpdate !== -1){
        items[indexForUpdate] = reqBody;
        res.send({ "ok" : true })
    }
    else{
        res.status(404)
    }
    //let newItem = createNewItem(reqJSON.id,reqJSON.text,reqJSON.checked)
    console.log('put')
})

app.delete('/api/v1/items', (req, res)=>{
    let reqBody = req.body;
    let indexForUpdate = items.findIndex(item=> item.id === reqBody.id) 

    if(indexForUpdate !== -1){
        //delete item here by index
        res.send({ "ok" : true })
    }
    else{
        res.status(404)
    }
    console.log('delete/')
})


function createNewItem(id:number,text:string,checked:boolean){
    let newItem = new item(id, text, checked);
    items.push(newItem);
    return newItem;
}

class item {
    id: number;
    text: string;
    checked: boolean;
        constructor(id:number,text:string,checked:boolean){
            this.id = id;
            this.text = text;
            this.checked = checked
        }
}

