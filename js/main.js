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

console.log(tiposPandas.length)
for (let i = 0; i < tiposPandas.length; i++) {
    console.log(tiposPandas[i]);
}

//funcion constructora

//objetos
const usuario = {
    nombre: 'Usuario',
    nivel: 1,
    avatar: 'Panda de fuego'
}
class Personajes {
    constructor(nombre, vida, puntos, daño) {
        this.nombre = nombre.toUpperCase();
        this.vida = vida;
        this.puntos = puntos;
        this.daño = daño;
    }
    mensaje() {
        this.hablar = console.log('Hola soy un ' + this.nombre);
    }
}

const personajes = [];
personajes.push(new Personajes('Panda de tierra', 100, 50, 20));
personajes.push(new Personajes('Panda de agua', 100, 50, 50));
personajes.push(new Personajes('Panda de fuego', 100, 50, 100));
personajes.push(new Personajes('Hongo', 100, 50, 20));

console.log(usuario);
console.log(personajes);
for (const personalizados of personajes)
    personalizados.mensaje();


//metodos
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

//getBoundingClientRect lo saque de un tutorial para poder realizar el movimiento al panda

//Movimiento del disparo
setInterval(() => {
    let balasBambus = document.querySelectorAll('.balaBambu');
    balasBambus.forEach(balaBambu => {
        balaBambu.style.top = (balaBambu.getBoundingClientRect().top - 74) + 'px'
            //cuando topa con la pantalla se elimina
        if (balaBambu.getBoundingClientRect().top <= -20) {
            balaBambu.remove();
        }
    })
}, 100)


//Generar enemigos-hongos

let aparicion = 0;

setInterval(() => {
    //Aparicion del hongo
    aparicion++;
    if (aparicion % 12 == 0) {
        let enemigoHongo = document.createElement('div');
        enemigoHongo.classList.add('enemigoHongo');
        body.append(enemigoHongo);
        enemigoHongo.style.left = (Math.random() * window.innerWidth - 100) + 'px';
    }
    let enemigosHongos = document.querySelectorAll('.enemigoHongo');
    enemigosHongos.forEach(enemigoHongo => {
        enemigoHongo.style.top = (enemigoHongo.getBoundingClientRect().top + 10) + 'px';
        //Desaparicion del hongo
        if (enemigoHongo.getBoundingClientRect().top >= 470) {
            enemigoHongo.remove();
        }
    })
}, 180);

//Vidas del panda
let vida = 100;
let vida100 = document.getElementById('vida100');

setInterval(() => {
    vida--;
    vida100.innerHTML = vida;

}, 500);

//Tiempo

//Boton para iniciar sesion

let btnInicio = document.getElementById('ingresar');

btnInicio.onclick = () => {
    location.href = "pages/ingreso.html";
}

//Modal para iniciar sesion