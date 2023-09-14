const urlRandomName2:string = "https://random-data-api.com/api/users/random_user"


    let counter1:number = 0;
    let counter2:number = 0;

    let getGender =async function(url:string){
        const promis4 = new Promise<Response>((resolve, reject)=>{ 
            resolve(fetch(url));
        }) 

            return promis4
        .then(
            result => {
                return result.json();
            }
        )
        .then(
            result => {
                return result.gender
            }
        )    
    }

    let getFemale = function(){
        getGender(urlRandomName2).then(
            result => {
                if(result !== "Female"){
                    counter1++
                    getFemale()
                    }
                else(console.log(`
                ${result}
                attempts - ${counter1}
                `)) 
                }
        )
    }

    getFemale();
    
    let getGenderAwaitAsync = async function (url:string){
        let response = await fetch(url);
        let responseJson:{gender:string} = await response.json();
        return  responseJson?.gender;
    }

    let getFemaleAwaitAsync = function(){
        getGenderAwaitAsync(urlRandomName2).then(
            result => {
                if(result !== "Female"){
                    counter2++
                    getFemaleAwaitAsync()
                    }
                else(console.log(`
                ${result}
                attempts - ${counter2}
                `)) 
                }
        )
    }
    
    getFemaleAwaitAsync()