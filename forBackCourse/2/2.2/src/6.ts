const urlIP2:string = "https://api.ipify.org/?format=json";

let getIp3 = async function(url:string) {
    try{        
        let response = await fetch(url);
        let data = await response.json();
        return data.ip
    }catch(error){
        console.error("Error",error)
    }
}

let funcAwaitOfIPwithCallBack = async function(callBack:(ip:string)=>void) {
    let ip = await getIp3(urlIP2);
    callBack(ip);
}

function soutIP(ip:String){
    console.log(ip)
}    


async function starter() {
    await funcAwaitOfIPwithCallBack(soutIP);
    console.log("then I")
}

starter()