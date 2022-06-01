let info;

async function Alldata() {
        await fetch("https://amazing-events.herokuapp.com/api/events") 
                .then(response => response.json()) 
                .then(json => info = json)
                document.getElementById('imprimirJson').innerHTML= JSON.stringify(info.events,["name","assistance","capacity","category","date","description","image","place","price","_id",],2);
                
        }
        
        Alldata();   

console.log(info)
        

      