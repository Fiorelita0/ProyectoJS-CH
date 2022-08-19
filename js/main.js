//nombre
let nombreUsuario = document.getElementById("usuario");
let nuevoUsuario = document.getElementById("ingreso");

nuevoUsuario.onclick = () => {
    Swal.fire({
        title: "Ingresa tu nombre",
        input: "text",
        inputLabel: "Tu nombre es:",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: (nombre) => {
            if (!nombre) {
                return "Por favor escribe tu nombre";
            } else if (nombre == "@") {
                return "Ingresaste caracteres invalidos";
            } else {
                return undefined;
            }
        },
    }).then((resultado) => {
        if (resultado.value) {
            let nombre = resultado.value;
            console.log("Hola, " + nombre);
            nombreUsuario.innerText = nombre;
        }
    });
};

//DOM y Eventos - cambiar fondo
let fondo = document.querySelector("#fondo");

fondo.addEventListener("change", () => {
    console.log(fondo.value);
    document.body.style.backgroundImage = `url('img/fondode${fondo.value}.webp')`;
});

//Modal para iniciar sesion y comenzar a jugar
let modal = document.querySelector(".modal");
let cerrarModal = document.querySelector(".modal_ingresar");
let aparicion = 0;

//Aparicion del modal con onload
document.body.onload = function() {
    modal.classList.add("modal_aparicion");
};

//Boton ingresar para jugar
cerrarModal.onclick = (e) => {
    modal.classList.remove("modal_aparicion");
    e.preventDefault();
    //Comienza a jugar - Generar enemigosHongos
    setInterval(() => {
        //Aparicion del hongo
        aparicion++;
        if (aparicion % 12 == 0) {
            let enemigoHongo = document.createElement("div");
            enemigoHongo.classList.add("enemigoHongo");
            body.append(enemigoHongo);
            enemigoHongo.style.left = Math.random() * window.innerWidth - 100 + "px";
            enemigoHongo.style.bottom =
                enemigoHongo.getBoundingClientRect().bottom + 250 + "px";
        }
    }, 200);
};

//Localstorage
let btnEliminar = document.getElementById("btnEliminar");
let btnSesion = document.getElementById("btnSesion");
let chkRecordar = document.getElementById("recordar");

function guardarDatos(storage) {
    let emailUsuario = document.getElementById("email").value;
    let contrasenia = document.getElementById("contrasenia").value;

    const usuario = {
        emailUsuario: emailUsuario,
        contrasenia: contrasenia,
    };
    storage.setItem("usuario", JSON.stringify(usuario));
}
btnSesion.addEventListener("click", () => {
    if (chkRecordar.checked) {
        guardarDatos(localStorage);
    }
});

function borrarTodosDatos(storage) {
    storage.clear();
}
btnEliminar.onclick = () => {
    borrarTodosDatos(localStorage);
};

//Vidas del panda
let vida = 100;
let vida100 = document.getElementById("vida100");

setInterval(() => {
    let enemigosHongos = document.querySelectorAll(".enemigoHongo");
    enemigosHongos.forEach((enemigoHongo) => {
        //getBoundingClientRect lo saque de un tutorial para poder realizar el movimiento al panda
        enemigoHongo.style.top =
            enemigoHongo.getBoundingClientRect().top + 10 + "px";

        //Desaparicion del hongo y eliminacion de una vida
        if (
            enemigoHongo.getBoundingClientRect().top >
            pandaPersonaje.getBoundingClientRect().top - 25
        ) {
            vida--;
            vida100.innerHTML = vida;
            enemigoHongo.remove();
        }
    });
}, 200);

//Movimiento con mouse del Panda
let pandaPersonaje = document.querySelector(".pandaPersonaje");
let body = document.querySelector("body");

document.addEventListener("mousemove", (event) => {
    pandaPersonaje.style.left = event.clientX - 80 + "px";
});

//Generar disparo del Panda
document.addEventListener("click", () => {
    let balaBambu = document.createElement("div");
    balaBambu.classList.add("balaBambu");
    balaBambu.style.bottom = 44 + "px";
    balaBambu.style.left =
        pandaPersonaje.getBoundingClientRect().left + 45 + "px";
    body.append(balaBambu);
});

//Funcion constructora
//Objetos
class Personajes {
    constructor(nombre, vida, puntos, danio) {
        this.nombre = nombre.toUpperCase();
        this.vida = vida;
        this.puntosObtenidos = puntos;
        this.puntosDanio = danio;
        this.utilizado = false;
    }
    mensaje() {
        this.hablar = console.log("Hola soy un " + this.nombre);
    }
    utilizar() {
        this.utilizado = true;
    }
}
//Array de los Personajes
const personaje = [];
personaje.push(new Personajes("Panda de tierra", 100, 100, 25));
personaje.push(new Personajes("Panda de agua", 100, 300, 50));
personaje.push(new Personajes("Panda de fuego", 100, 500, 100));


//Crear array de las imagenes del panda
const arrayPandas = new Array();
arrayPandas[0] = "img/pandadetierra.png";
arrayPandas[1] = "img/pandadeagua.png";
arrayPandas[2] = "img/pandadefuego.png";

//Movimiento del disparo
let bambu = 0;
let bambu100 = document.getElementById("bambu100");
let maxPuntaje = 1000;
let urlPersonaje = "";

setInterval(() => {
    let balasBambus = document.querySelectorAll(".balaBambu");
    balasBambus.forEach((balaBambu) => {
        balaBambu.style.top = balaBambu.getBoundingClientRect().top - 74 + "px";
        //cuando topa con la pantalla se elimina
        if (balaBambu.getBoundingClientRect().top <= -20) {
            balaBambu.remove();
        }
        //Detectar y eliminar enemigos
        let enemigosHongos = document.querySelectorAll(".enemigoHongo");
        enemigosHongos.forEach((enemigoHongo) => {
            if (balaBambu.getBoundingClientRect().top <=
                enemigoHongo.getBoundingClientRect().top + 50) {
                if (balaBambu.getBoundingClientRect().left >=
                    enemigoHongo.getBoundingClientRect().left &&
                    balaBambu.getBoundingClientRect().left <=
                    enemigoHongo.getBoundingClientRect().left + 95) {
                    bambu += 25;
                    bambu100.innerHTML = bambu;
                    //Desbloqueo de pandas
                    //Al lograr 300 puntos se desbloquea el panda de agua
                    if (bambu == 25) {
                        console.log("Desbloqueo del Panda de agua");
                        //crear un boton para vestuario de agua
                        let main = document.getElementById("main");
                        const button = document.createElement("button");
                        button.type = "button";
                        button.id = "agua";
                        button.classList.add("btnpandadeagua");
                        main.appendChild(button);
                        //al hacer click aparece el panda de agua
                        let agua = document.getElementById("agua");
                        agua.addEventListener("click", () => {
                            urlPersonaje = arrayPandas[1];
                            console.log(urlPersonaje);
                            document.querySelector(".pandaPersonaje").style.backgroundImage = `url('${urlPersonaje}')`;
                            console.log(personaje[1]);
                            personaje[1].mensaje();
                            personaje[1].utilizar();
                        });
                    } //Al lograr 500 puntos se desbloquea el panda de agua
                    else if (bambu == 50) {
                        console.log("Desbloqueo del Panda de fuego");
                        //crear un boton para vestuario de fuego
                        let main = document.getElementById("main");
                        const button = document.createElement("button");
                        button.type = "button";
                        button.id = "fuego";
                        button.classList.add("btnpandadefuego");
                        main.appendChild(button);
                        //al hacer click aparece el panda de fuego
                        let fuego = document.getElementById("fuego");
                        fuego.addEventListener("click", () => {
                            urlPersonaje = arrayPandas[2];
                            console.log(urlPersonaje);
                            document.querySelector(".pandaPersonaje").style.backgroundImage = `url('${urlPersonaje}')`;
                        });
                    } //Al lograr 1000 puntos ganas el juego
                    else if (bambu == 1000) {
                        console.log("Ganaste");
                    }
                    //Elimina el enemigoHongo al tocar la balaBambu
                    setTimeout(() => {
                        enemigoHongo.remove();
                    }, 50);
                }
            }
        });
    });
}, 100);

//Tiempo