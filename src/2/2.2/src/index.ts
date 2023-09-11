

const url:string = "https://api.ipify.org/?format=json";

async function getIp() {
    try{        
        
        let response = await fetch(url);
        let data = await response.json();
        console.log(data.ip)
    }catch(error){
        console.error("Error",error)
    }
}
getIp();



