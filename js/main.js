//nombre
let nombreUsuario = document.getElementById('usuario');
let nuevoNombre = prompt('Ingresá tu nombre');

function solicitarNombre() {
    if (nuevoNombre == '') {
        alert("No ingresaste ningun nombre");
    } else if (nuevoNombre == ' ') {
        alert("Ingresaste caracteres invalidos");
    } else if (nuevoNombre == '@') {
        alert("Ingresaste caracteres invalidos");
    } else {
        console.log("Hola,  " + nuevoNombre);
    }
}
solicitarNombre();
nombreUsuario.innerText = nuevoNombre

//bando
function conBandos(mensaje1, mensaje2, mensaje3, pregunta) {
    return mensaje1 + ' ' + mensaje2 + ' ' + mensaje3 + ' ' + pregunta;
}
let primermensaje = conBandos('Hola!', 'Nosotros somos los pandas gigantes y estamos en peligro de extincion.', 'Los hongos quieren destruir nuestra aldea', '¿Nos ayudarias?');

alert(primermensaje);

//desbloqueo de panda de agua
let maxPuntaje = 49

for (let i = 0; i <= maxPuntaje; i++) {
    console.log('Puntos: ' + (i + 1) * 20);

    if (i == 14) {
        alert('Lograste desbloquear el Panda de agua. Felicidades. Es un panda muy veloz');
    } else if (i == 24) {
        alert('Lograste desbloquear al Panda de fuego. Felicidades. Es un panda indestructible');
    } else {
        console.log('Sigue jugando y consigue más pandas');
    }
}
alert('Wow, ya lograste 1000 bambus')

//array personajes
const arrayVacio = [];
const tiposPandas = ['Panda de tierra', 'Panda de agua', 'Panda de fuego'];


for (let i = 0; i < tiposPandas.length; i++) {
    console.log(tiposPandas[i]);
}

//funcion constructora
//objetos
class Personajes {
    constructor(nombre, vida, puntos) {
        this.nombre = nombre.toUpperCase();
        this.vida = vida;
        this.puntos = puntos;

    }
    mensaje() {
        this.hablar = console.log('Hola soy un ' + this.nombre);
    }
}

const personajes = [];
personajes.push(new Personajes('Panda de tierra', 100, 50));
personajes.push(new Personajes('Panda de agua', 100, 300));
personajes.push(new Personajes('Panda de fuego', 100, 500));

console.log(usuario);
console.log(personajes);
for (const personalizados of personajes)
    personalizados.mensaje();


//Metodos
const puntosPersonajes = [{ id: 1, personaje: 'Panda de tierra', puntos: 50 },
    { id: 2, personaje: 'Panda de agua', puntos: 300 },
    { id: 3, personaje: 'Panda de fuego', puntos: 500 }
]
const pandadetierra = puntosPersonajes.find((personaje) => personaje.puntos === 50)
console.log(pandadetierra);

const pandadeagua = puntosPersonajes.find((personaje) => personaje.puntos === 300)
console.log(pandadeagua);

const pandadefuego = puntosPersonajes.find((personaje) => personaje.puntos === 500)
console.log(pandadefuego);

//DOM y Eventos - cambiar fondo
let fondo = document.querySelector('#fondo');
fondo.addEventListener('change', () => {
    console.log(fondo.value);
    document.body.style.backgroundImage = `url('img/fondode${fondo.value}.webp')`;
});

//Modal para iniciar sesion y comenzar a jugar
let modal = document.querySelector('.modal');
let cerrarModal = document.querySelector('.modal_ingresar')
let aparicion = 0;

//Aparicion del modal con onload
function cargarPagina() {
    modal.classList.add('modal_aparicion');

}
//Boton ingresar para jugar
cerrarModal.onclick = (e) => {
    modal.classList.remove('modal_aparicion');
    e.preventDefault();
    //Comienza a jugar - Generar enemigosHongos
    setInterval(() => {
        //Aparicion del hongo
        aparicion++;
        if (aparicion % 12 == 0) {
            let enemigoHongo = document.createElement('div');
            enemigoHongo.classList.add('enemigoHongo');
            body.append(enemigoHongo);
            enemigoHongo.style.left = (Math.random() * window.innerWidth - 100) + 'px';
        }
    }, 200);
}

//Localstorage
let btnEliminar = document.getElementById('btnEliminar');
let btnSesion = document.getElementById('btnSesion');
let chkRecordar = document.getElementById('recordar');

function guardarDatos(storage) {
    let emailUsuario = document.getElementById('email').value;
    let contrasenia = document.getElementById('contrasenia').value;

    const usuario = {
        "emailUsuario": emailUsuario,
        "contrasenia": contrasenia
    }
    storage.setItem('usuario', JSON.stringify(usuario))
}
btnSesion.addEventListener('click', () => {
    if (chkRecordar.checked) {
        guardarDatos(localStorage);
    }
})

function borrarTodosDatos(storage) {
    storage.clear();
}
btnEliminar.onclick = () => {
    borrarTodosDatos(localStorage);
}

//Vidas del panda
let vida = 100;
let vida100 = document.getElementById('vida100');

setInterval(() => {
    let enemigosHongos = document.querySelectorAll('.enemigoHongo');
    enemigosHongos.forEach(enemigoHongo => {
        //getBoundingClientRect lo saque de un tutorial para poder realizar el movimiento al panda
        enemigoHongo.style.top = (enemigoHongo.getBoundingClientRect().top + 10) + 'px';
        //Desaparicion del hongo y eliminacion de una vida
        if (enemigoHongo.getBoundingClientRect().top > pandaPersonaje.getBoundingClientRect().top - 25) {
            vida--;
            vida100.innerHTML = vida;
            enemigoHongo.remove();
        }
    })
}, 200);

//Movimiento con mouse del Panda
let pandaPersonaje = document.querySelector('.pandaPersonaje');
let body = document.querySelector('body');

document.addEventListener('mousemove', (event) => {
    pandaPersonaje.style.left = (event.clientX - 80) + 'px';
});

//Generar disparo del Panda
document.addEventListener('click', () => {
    let balaBambu = document.createElement('div');
    balaBambu.classList.add('balaBambu');
    balaBambu.style.bottom = 44 + 'px';
    balaBambu.style.left = (pandaPersonaje.getBoundingClientRect().left + 45) + 'px';
    body.append(balaBambu);
});

//Movimiento del disparo
let bambu = 100;
let bambu100 = document.getElementById('bambu100');
let hongo = 25;

setInterval(() => {
    let balasBambus = document.querySelectorAll('.balaBambu');
    balasBambus.forEach(balaBambu => {
        balaBambu.style.top = (balaBambu.getBoundingClientRect().top - 74) + 'px'
            //cuando topa con la pantalla se elimina
        if (balaBambu.getBoundingClientRect().top <= -20) {
            balaBambu.remove();
        }
        //Detectar y eliminar enemigos 
        let enemigosHongos = document.querySelectorAll('.enemigoHongo');
        enemigosHongos.forEach(enemigoHongo => {
            if (balaBambu.getBoundingClientRect().top <= enemigoHongo.getBoundingClientRect().top + 50) {
                if (balaBambu.getBoundingClientRect().left >=
                    enemigoHongo.getBoundingClientRect().left && balaBambu.getBoundingClientRect().left <=
                    enemigoHongo.getBoundingClientRect().left + 95) {
                    bambu100.innerHTML = bambu + hongo;
                    setTimeout(() => {
                        enemigoHongo.remove();
                    }, 50);
                }
            }
        })
    })
}, 100)

//Tiempo