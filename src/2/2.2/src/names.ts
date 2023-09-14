const urlRandomName:string = "https://random-data-api.com/api/name/random_name"

async function method1(){
    try{
        
        let responses = await Promise.all([
            fetch(urlRandomName),
            fetch(urlRandomName),
            fetch(urlRandomName)])
        
        let jsonResponses = await Promise.all(responses.map(response=>response.json()));
        
        jsonResponses.forEach(element => {
            console.log(element.name);
        });
        
        
    }catch(e){
        console.error(e)
    }
}

async function method2(){
    let response1 = await fetch(urlRandomName);
    let response2 = await fetch(urlRandomName);
    let response3 = await fetch(urlRandomName);

    let responseJson1 = await response1.json();
    let responseJson2 = await response2.json();
    let responseJson3 = await response3.json();

    console.log(responseJson1.name);
    console.log(responseJson2.name);
    console.log(responseJson3.name);
   
}

async function method3(){
    

   
    const promis1 = new Promise<Response>((resolve, reject)=>{ 
        resolve(fetch(urlRandomName));
        }) 
    const promis2 = new Promise<Response>((resolve, reject)=>{ 
        resolve(fetch(urlRandomName));
        }) 
    const promis3 = new Promise<Response>((resolve, reject)=>{ 
        resolve(fetch(urlRandomName));
        }) 

        promis1
    .then(
        (result)=>{ return result.json()}
    )
    .then(
        (result)=>console.log(result.name)
    )

    promis2
    .then(
        (result)=>{ return result.json()}
    )
    .then(
        (result)=>console.log(result.name)
    )
   
    promis3
    .then(
        (result)=>{ return result.json()}
    )
    .then(
        (result)=>console.log(result.name)
    )
    
}

method1().then(()=>{console.log("1--------------------------")});

method2().then(()=>{console.log("2--------------------------")});
method3().then(()=>{console.log("3--------------------------")});

