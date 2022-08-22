//nombre
let nombreUsuario = document.getElementById("usuario");
let iniciarSesion = document.getElementById("ingreso");

//Aparece para ingresar tu nombre con onload
document.body.onload = function() {
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

//Iniciar sesion con email y contraseña
iniciarSesion.onclick = () => {
    Swal.fire({
        title: 'Login Form',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
    <input type="password" id="password" class="swal2-input" placeholder="Password"> `,
        confirmButtonText: 'Sign in',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value
            const password = Swal.getPopup().querySelector('#password').value
            if (!login || !password) {
                Swal.showValidationMessage(`Please enter login and password`)
            }
            return { login: login, password: password }
        }
    }).then((result) => {
        Swal.fire(`
      Login: ${result.value.login}
      Password: ${result.value.password}
    `.trim())
    });
};

//Modal para iniciar sesion y comenzar a jugar
let modal = document.querySelector(".modal");
let cerrarModal = document.querySelector(".modal_ingresar");
let aparicion = 0;


//Boton ingresar para jugar
document.body.onload = (e) => {

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
        //getBoundingClientRect lo saque de un tutorial para poder realizar movimiento, trata de devolver un elemento con su posicion en tiempo real en la pantalla
        enemigoHongo.style.top =
            enemigoHongo.getBoundingClientRect().top + 10 + "px";

        //Desaparicion del hongo y eliminacion de una vida
        if (enemigoHongo.getBoundingClientRect().top >
            pandaPersonaje.getBoundingClientRect().top - 25) {
            vida -= 25;
            vida100.innerHTML = vida;
            enemigoHongo.remove();
        }
    });
}, 100);

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
    balaBambu.style.left = pandaPersonaje.getBoundingClientRect().left + 45 + "px";
    body.append(balaBambu);
});

//Crear array de las imagenes del panda
const arrayPandas = new Array();
arrayPandas[0] = "img/pandadetierra.png";
arrayPandas[1] = "img/pandadeagua.png";
arrayPandas[2] = "img/pandadefuego.png";

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
personaje.push(new Personajes("Panda de tierra", 100, 0, 25));
personaje.push(new Personajes("Panda de agua", 100, 300, 50));
personaje.push(new Personajes("Panda de fuego", 100, 500, 100));

//DOM y Eventos - cambiar fondo
let fondo = document.querySelector("#fondo");
let urlPersonaje = "";


fondo.addEventListener("change", () => {
    console.log(fondo.value);
    document.body.style.backgroundImage = `url('img/fondode${fondo.value}.webp')`;
    urlPersonaje = arrayPandas[fondo.selectedIndex];
    document.querySelector('.pandaPersonaje').style.backgroundImage = `url('${urlPersonaje}')`;

    let eleccion = fondo.value;
    if (eleccion == 'tierra') {
        console.log(personaje[0]);
        personaje[0].mensaje();
        personaje[0].utilizar();
    } else if (eleccion == 'agua') {
        console.log(personaje[1]);
        personaje[1].mensaje();
        personaje[1].utilizar();
    } else if (eleccion == 'fuego') {
        console.log(personaje[2]);
        personaje[2].mensaje();
        personaje[2].utilizar();
    }
});

//Movimiento del disparo
let bambu = 0;
let bambu100 = document.getElementById("bambu100");
let maxPuntaje = 1000;

setInterval(() => {
    let balasBambus = document.querySelectorAll(".balaBambu");
    balasBambus.forEach((balaBambu) => {
        balaBambu.style.top = balaBambu.getBoundingClientRect().top - 74 + "px";
        //cuando topa con la pantalla se elimina
        if (balaBambu.getBoundingClientRect().top <= -20) {
            balaBambu.remove();
        }
        let enemigosHongos = document.querySelectorAll(".enemigoHongo");
        //Detectar y eliminar enemigos
        enemigosHongos.forEach((enemigoHongo) => {
            if (balaBambu.getBoundingClientRect().top <=
                enemigoHongo.getBoundingClientRect().top + 50) {
                //Choca con el enemigo 
                if (balaBambu.getBoundingClientRect().left >=
                    enemigoHongo.getBoundingClientRect().left &&
                    balaBambu.getBoundingClientRect().left <=
                    enemigoHongo.getBoundingClientRect().left + 95) {
                    //Desbloqueo de pandas
                    //Al lograr 300 puntos se desbloquea el panda de agua
                    if (bambu == 300) {
                        console.log("Desbloqueo del Panda de agua");

                    } //Al lograr 500 puntos se desbloquea el panda de agua
                    else if (bambu == 500) {
                        console.log("Desbloqueo del Panda de fuego");

                    } //Al lograr 1000 puntos ganas el juego
                    else if (bambu == 1000) {
                        console.log("Ganaste");
                    }
                    //Elimina el enemigoHongo al tocar la balaBambu
                    setTimeout(() => {
                        enemigoHongo.remove();
                    }, 50);
                }
                //Chocar con el enemigo segun el fondo obtiene más puntos
                let eleccion = fondo.value;
                if (balaBambu.getBoundingClientRect().left >=
                    enemigoHongo.getBoundingClientRect().left &&
                    balaBambu.getBoundingClientRect().left <=
                    enemigoHongo.getBoundingClientRect().left + 95 && eleccion == 'tierra') {
                    let puntos = bambu += 25;
                    bambu100.innerHTML = puntos;
                } else if (balaBambu.getBoundingClientRect().left >=
                    enemigoHongo.getBoundingClientRect().left &&
                    balaBambu.getBoundingClientRect().left <=
                    enemigoHongo.getBoundingClientRect().left + 95 && eleccion == 'agua') {
                    let puntos = bambu += 50;
                    bambu100.innerHTML = puntos;
                } else if (balaBambu.getBoundingClientRect().left >=
                    enemigoHongo.getBoundingClientRect().left &&
                    balaBambu.getBoundingClientRect().left <=
                    enemigoHongo.getBoundingClientRect().left + 95 && eleccion == 'fuego') {
                    let puntos = bambu += 100;
                    bambu100.innerHTML = puntos;
                }
            }

        });
    });
}, 100);


//Tiempo
contador_seg = 0;
contador_min = 0;
segundos = document.getElementById('segundos');
minutos = document.getElementById('minutos');


setInterval(() => {
    if (contador_seg == 59) {
        contador_seg = 0;
        contador_min++;
        minutos.innerHTML = contador_min;

        if (contador_min == 0) {
            contador_min = 0
        }
    }
    contador_seg++;
    segundos.innerHTML = contador_seg;
}, 1000)