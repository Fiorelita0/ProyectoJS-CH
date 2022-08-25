const input = document.querySelector("input");
const boton = document.querySelector("button");
const personajesContainer = document.getElementById("personajes-container");
let buscador = input.value

boton.addEventListener("click", (e) => {
    e.preventDefault();
    traerPersonaje(input.value == panda) {}
});



function traerPersonaje() {
    fetch("../json/data.json")
        .then((response) => response.json())
        .then((data) => {
            crearHTML((data));
        });
}

function crearHTML(array) {
    personajesContainer.innerHTML = "";
    array.forEach((personaje) => {
        const carta = `
        <div class="col">
                <div class="carta h-100">
                    <img src="${personaje.img}" class="carta-top" alt="${personaje.name}">
                    <div class="carta-body">
                        <h5 class="carta-titulo">${personaje.nombre}</h5>
                        <p class="carta-texto">Especie: ${personaje.especie}</p>
                    </div>
                </div>
            </div>`
        personajesContainer.innerHTML += carta;
    });
}
/*function encontrarEspecie(array) {
    let especie = input.value;
    if (!especie) {
        return array;
    } else {
        return array.filter((e) => e.especie == especie)
    }
}

function crearHTML(array) {
    personajesContainer.innerHTML = ''
    array.forEach((personaje) => {
        const carta = `<div class="col">
                <div class="carta h-100">
                    <img src="${personaje.imagen}" class="carta-top" alt="${personaje.name}">
                    <div class="carta-body">
                        <h5 class="carta-titulo">${personaje.nombre}</h5>
                        <p class="carta-texto">Especie: ${personaje.especie}</p>
                    </div>
                </div>
            </div>`;
    })
    personajesContainer.innetHTML += carta
};
async function mostrarEspecie() {
    const response = await fetch('../json/data.json');
    const data = await response.json();
    console.log(data);
    crearHTML(encontrarEspecie(data));
}
boton.addEventListener('click', () => {
    mostrarEspecie();
})*/