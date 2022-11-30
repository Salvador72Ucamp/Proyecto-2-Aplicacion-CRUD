class PRODUCTO{
    constructor(nombre, descripcion) {
      this.nombre = nombre;
      this.descripcion = descripcion;
    }
}

let tamDatos = localStorage.length;

function detectaClick(){
    document.querySelectorAll(".click").forEach(el => {
        el.addEventListener("click", e => {
          const id = e.target.getAttribute("id");
          console.log("Se ha clickeado el id "+id);
        });
      });
}


function buttonCapturar(){
    tamDatos = localStorage.length;
    let producto = new PRODUCTO();

    producto.nombre = document.getElementById('inputProducto').value.toUpperCase();
    producto.descripcion = document.getElementById('inputDescripcion').value.toUpperCase();

    if(producto.nombre.trim() != '' && producto.descripcion.trim() != '')
    {
        localStorage.setItem(tamDatos, JSON.stringify(producto));            
    }
    else{
        alert("Tienes que llenar todos los campos");
    }
}

