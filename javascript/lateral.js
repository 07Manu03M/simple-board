const flechita = document.getElementById("flechita");
const barraLateral = document.querySelector(".barra_lateral");
const spans = document.querySelectorAll("span");
const main = document.querySelector("main");

flechita.addEventListener("click",()=>{
    barraLateral.classList.toggle("mini_barra_lateral");

    main.classList.toggle("min-main");

    spans.forEach(span => {
        span.classList.toggle("oculto");
        

    if (barraLateral.classList.contains("mini_barra_lateral")) {
        flechita.style.transform = "rotate(180deg)";
    } else {
        flechita.style.transform = "rotate(0deg)";
    }
    });
});