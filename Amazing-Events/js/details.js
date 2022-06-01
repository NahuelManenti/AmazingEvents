async function Alldata() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
                    .then(response=> response.json())
                    .then(json => GetApiData =json)
    
    var allevent= GetApiData.events

function getData(){
    var idcategory = 1
    allevent.map(sala =>sala.id = idcategory++ )
    var id = location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    var sala = allevent.find((sala) => {
        return sala.id == selectedId
        
    })
    let CombinacionEstiAssi = assistanceOEstimate(sala);
    var templateHtml = `    
      
    <div class="col-sm pt-5 mt-5">
            <div class="card card-border mb-5 border border-dark d-flex flex-row">  
                <div class="card-body d-flex align-items-center bg-dark ">
                    <img src="${sala.image}" class="card-img-top" alt="...">
                </div>
                <div class="bg-warning w-75 d-flex flex-column justify-content-center align-items-center text-center">
                        <h4 class="card-text"><span class="colorDeDetalle"> ${sala.name}</span></h4>
                        <p> <span class="colorDeDetalle1">${sala.description}</span></p>
                        <p>Category: <span class="colorDeDetalle1">${sala.category}</span></p>
                        <p>Place: <span class="colorDeDetalle1">${sala.place}</span></p> 
                        <p>Capacity: <span class="colorDeDetalle1">${sala.capacity}</span></p> 
                        <p>${CombinacionEstiAssi}</p> 
                        <p>Price:$ <span class="colorDeDetalle1">${sala.price}</span></p> 
                        <p>Date: <span class="colorDeDetalle1">${sala.date}</span></p>  
                </div>
            </div>   
        </div>
        
    `
    document.querySelector('#mainCards').innerHTML = templateHtml
}
function assistanceOEstimate(sala) {
    let assistEstimate = "";
    if (sala.date > GetApiData.currentDate) {
        assistEstimate = "Estimate: " + sala.estimate;
    } else {
        assistEstimate = "Assistance: " + sala.assistance;
    }
    return assistEstimate;
}
getData()


}
Alldata();