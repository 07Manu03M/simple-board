const flechita = document.getElementById("flechita");
const barraLateral = document.querySelector(".barra_lateral");
const spans = document.querySelectorAll("span")

flechita.addEventListener("click",()=>{
    barraLateral.classList.toggle("mini_barra_lateral");
    
    spans.forEach(span => {
        span.classList.toggle("oculto");
    });
});