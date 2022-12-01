/**
 * Class para crear un objeto de producto
 */
class PRODUCTO{
    /**
     * 
     * @param {string} nombre - nombre del producto
     * @param {string} descripcion - descripcion del producto
     */
    constructor(nombre, descripcion) {
      this.nombre = nombre;
      this.descripcion = descripcion;
    }
}

/** @type {int} - Variable para saber el total de elementos que contiene localStroage*/ 
let tamDatos = localStorage.length;


/**
 * Función la cual detecta cuando se da click en el boton de eliminar y elimina el elemento del localstorage
 * @param {string} id  - Identificador del elemento que se dio click 
 */
function detectaClickButtonBorrar(id){
    
    localStorage.removeItem(id);
    tamDatos = localStorage.length;
    actualizaTabla();
}


/**
 * Función en la cual detecta cuando se da click en el boton de editar y escribe los valores en los input
 * @param {string} id - Identificador del elemento que se dio click 
 */
function detectaClickButtonEditar(id){
    
    productToEdit = JSON.parse(localStorage.getItem(id));
    
    document.getElementById('inputProducto').value = productToEdit.nombre;
    document.getElementById('inputDescripcion').value = productToEdit.descripcion;     
    
    isEditable = true;
}

let isEditable = false;
let productToEdit;

/**
 * Función que detecta cuando se da click en el boton de capturar, valida que el campo no este vacio
 * y ingresa el elemento a localStorage
 */
function buttonCapturar(){

    if(!isEditable){
        AgregElemento();    
    }
    else{        
        localStorage.removeItem(productToEdit.nombre);
        AgregElemento();
        isEditable = false;
    }    
}


function AgregElemento(){
    tamDatos = localStorage.length;
    let producto = new PRODUCTO();

    producto.nombre = document.getElementById('inputProducto').value.toUpperCase();
    producto.descripcion = document.getElementById('inputDescripcion').value.toUpperCase();

    if(producto.nombre.trim() !== '' && producto.descripcion.trim() !== '')
    {
        localStorage.setItem(producto.nombre, JSON.stringify(producto));  
        actualizaTabla();        
    }
    else{
        alert("Tienes que llenar todos los campos");
    }
}

/**
 * Función en la cual actualiza la tabla cuando se genera algun movimiento
 */
function actualizaTabla()
{        
    getKeylocalStorage();
    let contHTML = "";   
    if(!arrKeys.length < 1) 
    {
        contHTML = creaTablaDinamica(contHTML);
        document.getElementById('tablaContenido').innerHTML = contHTML;
    }    
}

/**
 * Función en la cual inicia la creacion de la tabla en donde seran mostrados los elementos
 * @param {string} cadenaHTML - cadena en la cual contiene el html de la tabla con sus elementos
 * @returns - regresa la tabla ya contruida
 */
function creaTablaDinamica(cadenaHTML)
{    
    cadenaHTML = `<table class='table'>
    <thead>
      <tr>
        <th scope='col'>id</th>
        <th scope='col'>Producto</th>
        <th scope='col'>Descripción</th>
        <th scope='col'>Modificar</th>
        <th scope='col'>Eliminar</th>
      </tr>
    </thead>
    <tbody>`;

    cadenaHTML += generaContenido(cadenaHTML);
       
    cadenaHTML += `</tbody>
                </table>`;
    

  return cadenaHTML;
}


/**
 * Función en la cual genera el contenido de los elementos existentes en localStorage
 * @param {*} contTableHTML - recibe parte del cuerpo html de la tabla
 * @returns regresa los elementos existentes ya convertidos en formato html
 */
function generaContenido(contTableHTML)
{
    
    for(let i=0; i < arrKeys.length; i++)
    {        
        let productoAux = JSON.parse(localStorage[arrKeys[i]]);

        contTableHTML += "<tr>\
            <th id='rowValue0' scope='row'>"+i+"</th>\
            <td>"+productoAux.nombre+"</td>\
            <td>"+productoAux.descripcion+"</td>\
            <td>\
                <button onclick='detectaClickButtonEditar(\""+productoAux.nombre+"\")' class='btn btn-warning'>\
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>\
                        <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>\
                    </svg>\
                </button>\
            </td>\
            <td>\
                <button onclick='detectaClickButtonBorrar(\""+productoAux.nombre+"\")' class='btn btn-danger'>\
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash3' viewBox='0 0 16 16'>\
                        <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'/>\
                    </svg>\
                </button>\
            </td>\
        </tr>";
    }

    return contTableHTML;
}

window.addEventListener('load', function() {
    actualizaTabla();    
});


/** @type {array} - arreglo que contiene los keys que contiene el localStorage*/ 
let arrKeys = [];


/**
 * Función en la cual llena el arrKeys con los elementos keys que se tienen disponibles en localStorage
 */
function getKeylocalStorage()
{
    arrKeys = [];
    for (let index = 0; index < localStorage.length; index++) {
        let productoAux = JSON.parse(localStorage.getItem(localStorage.key(index)));
        
        arrKeys.push(productoAux.nombre);
    }
    console.log(arrKeys);
}