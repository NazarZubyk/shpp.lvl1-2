const urlIP:string = "https://api.ipify.org/?format=json";

let getIp2 = async function(callBack:(ip:string)=>void) {
    try{        
        let response = await fetch(urlIP);
        let data = await response.json();
        callBack(data.ip)
    }catch(error){
        console.error("Error",error)
    }
}

let funcWithAwait = async function (){
    function soutIP(ip:String){
        console.log(ip)
    }    
    await getIp2(soutIP);
}

setTimeout(funcWithAwait,1000)