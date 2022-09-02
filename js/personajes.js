const input = document.querySelector("input");
const boton = document.querySelector("button");
const personajesContainer = document.getElementById("personajes-container");
const infoPrincipal = document.getElementById("info-principal");
let buscador = input.value

boton.addEventListener("click", (e) => {
    e.preventDefault();
    traerPersonaje(input.value)
});

function especieEncontrada(array) {
    let especie = input.value;
    if (!especie) {
        return array;
    } else {
        return array.filter((e) => e.especie == especie.toLowerCase())
    }
}

function traerPersonaje() {
    fetch("../json/data.json")
        .then((response) => response.json())
        .then((data) => {
            crearHTML(especieEncontrada(data));
        });
}

function crearHTML(array) {
    personajesContainer.innerHTML = "";
    array.forEach((personaje) => {
        const carta = `
        <div class="row">
                <div class="carta h-100">
                    <img src="${personaje.img}" class="carta-top" alt="${personaje.name}">
                    <div class="carta-body">
                        <h5 class="carta-titulo">${personaje.nombre}</h5>
                        <p>Especie: ${personaje.especie}</p>
                        <p>Tipo de especie: ${personaje.tipoDeEspecie}</p>
                        <p>Bando: ${personaje.bando}</p>
                        <p>Puntos para desbloquearlo: ${personaje?.puntosParaDesbloquearlo}</p>
                        <p>Puntos de daño: ${personaje?.puntosDeDanio}</p>
                    </div>
                </div>
            </div>`
        personajesContainer.innerHTML += carta;
        infoPrincipal.remove()
    });
}