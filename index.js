

function detectaClick(){
    document.querySelectorAll(".click").forEach(el => {
        el.addEventListener("click", e => {
          const id = e.target.getAttribute("id");
          console.log("Se ha clickeado el id "+id);
        });
      });
}


