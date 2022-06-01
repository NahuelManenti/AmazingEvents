var checkboxSelected = []
var textSearch = ""
var GetApiData;


async function Alldata() {
await fetch("https://amazing-events.herokuapp.com/api/events")
                .then(response=> response.json())
                .then(json => GetApiData =json)

var allevent= GetApiData.events


function crearCheckbox() {

    var checkboxes = document.getElementById("checkboxes")//creo los checkbox
    var todasLasCategorias = allevent.map(sala => sala.category) //Busco el array de categoria y creo uno nuevo con map
    const dataArray = new Set(todasLasCategorias) //busco solo el contenido dentro del array categoria
     
    var Categorias = [...dataArray] //Conservo todas las categotias con el nombre dataArray

    var inputCheckbox = ""
    Categorias.forEach(category => { 

        inputCheckbox += `<label class="toggle p-2" ><input class="dn" type="checkbox" id="dn" value="${category}"> ${category}</label>` 
    })
    checkboxes.innerHTML = inputCheckbox 

    var id = 1
    allevent.map(sala =>sala.id = id++ )//Se le pone un id a cada card para llamarlas despues con la pagina js de details
    console.log(allevent)
    
}
crearCheckbox()

var checkbox = document.querySelectorAll('input[type=checkbox]') //Filtros para checkbox

checkbox.forEach(check => check.addEventListener("click", (event)=> {// se crea un evento (escuchador) click, para los cheackbox
    var checked = event.target.checked

    if (checked) {
        checkboxSelected.push(event.target.value) //armo el cheacked para que funcione
        filterArray()
    } else {
        checkboxSelected = checkboxSelected.filter(uncheck => uncheck !== event.target.value) //lo hago que se desmarque(deschekear)
        filterArray()

    } 
}))


var inputSearch = document.getElementById("search")//buscador por escritura
inputSearch.addEventListener("keyup", (event) => {// se crea un evento (escuchador) keyup, para el buscador
    textSearch = event.target.value
    filterArray()
})


function filterArray() {//Junto los filtros, tambien se utilizan arriba con funcion para llamarlos
    let data = []
    if (checkboxSelected.length > 0 && textSearch !== "") {//uso length para contar los elementos y decir si es mayor que cero, y digo que el text no puede ser vacio
        checkboxSelected.map(lascategorias => {
            data.push(...allevent.filter(sala => sala.name.toLowerCase().includes(textSearch.trim().toLowerCase())  && //Uso includes para obtener true si incluye la palabra
                sala.category == lascategorias))
        })
    }
    else if (checkboxSelected.length > 0 && textSearch === "") {
        checkboxSelected.map(lascategorias => data.push(...allevent.filter(sala => sala.category == lascategorias)))
    }
    else if (checkboxSelected.length == 0 && textSearch !== "") {
        data.push(...allevent.filter(sala => sala.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
    }
    
    else { data.push(...allevent)}
    

    
    MostrarCard(data)
}
filterArray()



function MostrarCard(data) {//imprimo las cards
  var imprimirHtml = ""
  if(data.length !== 0){
  for (var i = 0; i < data.length; i++) {
      imprimirHtml += `    
      <div class="col-lg-3 col-md-4 col-sm-6 p-3">
          <div class="card w-200  h-100 card-border mb-3 border  border-dark">
              <img src="${data[i].image}" class="card-img-top  p-3 " alt="...">
              <div class="card-body d-flex flex-column align-items-center  text-center">
                <h4 class="card-text">${data[i].name}</h4>
                <p>${data[i].description}</p>
                <p>${data[i].date}</p>
              </div>
              <div class=" d-flex justify-content-around align-items-center  ">
                <p class="pt-3">price: $${data[i].price}</p>
                <a class="btn btn-primary" href="details.html?id=${data[i].id}" role="button">See More...</a>
              </div>
          </div> 
      </div>
      `
       
  }
}  else{imprimirHtml=`
            <div class="col-sm d-flex justify-content-center pt-5 ">
                <div class="card card-border mb-5 border border-dark d-flex flex-row">  
                    <div class="card-body d-flex align-items-center bg-dark">
                        <img src="https://static.vecteezy.com/system/resources/previews/004/472/827/large_2x/no-results-were-found-when-searching-vector.jpg" class="card-img-top" alt="...">
                    </div>
                <div class="bg-secondary w-50 d-flex flex-column justify-content-center align-items-center">
                    <h4 class="card-text"><span class="colorDeDetalle"> Search not found</span></h4>       
                </div>
            </div>  
    
`
} 

  document.querySelector('#mainCards').innerHTML = imprimirHtml
  
}


}

Alldata();


