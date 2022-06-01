var checkboxSelected = []
var textSearch = ""
async function Alldata() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
                    .then(response=> response.json())
                    .then(json => GetApiData =json)
    
    var allevent= GetApiData.events
var arrayup = allevent.filter(e => GetApiData.currentDate  < e.date)
console.log(arrayup)


function crearCheckbox() {

    var checkboxes = document.getElementById("checkboxes")
    var todasLasCategorias = allevent.map(sala => sala.category) 
    const dataArray = new Set(todasLasCategorias)
     
    var Categorias = [...dataArray] 

    var inputCheckbox = ""
    Categorias.forEach(category => { 

        inputCheckbox += `<label class=" p-2" ><input type="checkbox" value="${category}"> ${category}</label>` 
    })
    checkboxes.innerHTML = inputCheckbox 

    var id = 1
    allevent.map(sala =>sala.id = id++ )
    console.log(allevent)
    
}
crearCheckbox()

var checkbox = document.querySelectorAll('input[type=checkbox]') 

checkbox.forEach(check => check.addEventListener("click", (event)=> {
    var checked = event.target.checked

    if (checked) {
        checkboxSelected.push(event.target.value) 
        filterArray()
    } else {
        checkboxSelected = checkboxSelected.filter(uncheck => uncheck !== event.target.value) 
        filterArray()

    } 
}))


var inputSearch = document.getElementById("search")
inputSearch.addEventListener("keyup", (event) => {
    textSearch = event.target.value
    filterArray()
})


function filterArray() {
    let info = []
    if (checkboxSelected.length > 0 && textSearch !== "") {
        checkboxSelected.map(lascategorias => {
            info.push(...arrayup.filter(sala => sala.name.toLowerCase().includes(textSearch.trim().toLowerCase())  &&
                sala.category == lascategorias))
        })
    }
    else if (checkboxSelected.length > 0 && textSearch === "") {
        checkboxSelected.map(lascategorias => info.push(...arrayup.filter(sala => sala.category == lascategorias)))
    }
    else if (checkboxSelected.length == 0 && textSearch !== "") {
        info.push(...arrayup.filter(sala => sala.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
    }
    else { info.push(...arrayup) }
    
    
    MostrarCard(info)
}
filterArray()



function MostrarCard(info) {
  var imprimirHtml = ""
   if(info.length !== 0){
  for (var i = 0; i < info.length; i++) {
    if(info[i].date > GetApiData.currentDate){
      imprimirHtml += `    
      <div class="col-lg-3 col-md-4 col-sm-6 p-3">
          <div class="card w-200  h-100 card-border mb-3 border  border-dark">
              <img src="${info[i].image}" class="card-img-top p-3 " alt="...">
              <div class="card-body d-flex flex-column align-items-center  text-center">
                <h4 class="card-text">${info[i].name}</h4>
                <p>${info[i].description}</p>
                <p>${info[i].date}</p>
              </div>
              <div class=" d-flex justify-content-around align-items-center  ">
                <p class="pt-3">price: $${info[i].price}</p>
                <a class="btn btn-primary" href="details.html?id=${info[i].id}" role="button">See More...</a>
              </div>
          </div> 
      </div>
      `
    } 
    }
   }else{imprimirHtml=`

   </div>
       <div class="col-sm d-flex justify-content-center pt-5 ">
           <div class="card card-border mb-5 border border-dark d-flex flex-row">  
               <div class="card-body d-flex align-items-center bg-dark">
                   <img src="https://static.vecteezy.com/system/resources/previews/004/472/827/large_2x/no-results-were-found-when-searching-vector.jpg" class="card-img-top" alt="...">
               </div>
           <div class="bg-secondary w-50 d-flex flex-column justify-content-center align-items-center">
               <h4 class="card-text"><span class="colorDeDetalle"> Search not found</span></h4>       
       </div>
   </div>   
</div>
</div>
`}
  document.querySelector('#mainCards').innerHTML = imprimirHtml
  }


}

Alldata();

