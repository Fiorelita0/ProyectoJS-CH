//nombre
function solicitarNombre() {
    let nombreUsuario = prompt('Ingresá tu nombre')
    if (nombreUsuario == '') {
        alert("No ingresaste ningun nombre");
    } else if (nombreUsuario == ' ') {
        alert("Ingresaste caracteres invalidos");
    } else if (nombreUsuario == '@') {
        alert("Ingresaste caracteres invalidos");
    } else {
        alert("Bienvenido/a " + nombreUsuario);
    }
}
solicitarNombre();

//edad
function solicitarEdad() {
    let edadUsuario = parseInt(prompt('Ingresá tu edad'))
    let edadObligatoria = 6
    let edadAvanzada = 40

    if (edadUsuario >= edadAvanzada) {
        console.log("Edad avanzada, juega si quiere");
    } else if (edadUsuario < edadObligatoria) {
        console.log("No puede jugar");
    } else if (edadUsuario >= edadObligatoria) {
        console.log("Puede jugar");
    } else {
        console.log("Juega bajo tus propios riesgos");
    }
}

solicitarEdad();

alert('Terminó el proceso')

//dinero y cartas

let valorCartas = 50

function calculos(primerNum, valorCartas, operacion) {

    switch (operacion) {
        case '+':
            return primerNum + valorCartas;
        case "-":
            return primerNum - valorCartas;
        case "*":
            return primerNum * valorCartas;
        case "/":
            return primerNum / valorCartas;
            break;
        default:
            return 0;

    }
}
console.log(calculos(50, valorCartas, '-'))
console.log(calculos(150, valorCartas, '-'))
console.log(calculos(100, valorCartas, '-'))
console.log(calculos(150, valorCartas, '-'))
console.log(calculos(200, valorCartas, '-'))
console.log(calculos(250, valorCartas, '-'))
console.log(calculos(300, valorCartas, '-'))

//bando
function conBandos(mensaje1, mensaje2, mensaje3, pregunta) {
    return mensaje1 + ' ' + mensaje2 + ' ' + mensaje3 + ' ' + pregunta;
}
let primermensaje = conBandos('Hola!', 'Nosotros somos los pandas gigantes y estamos en peligro de extincion.', 'Los hongos quieren destruir nuestra aldea', '¿Nos ayudarias?');

alert(primermensaje);

//nombredepersonajes
/*
let entrada = prompt('Ingresar un apodo a tus personajes')
while (entrada != ' ') {
    console.log('Ingresaste como apodo' + entrada),
        entrada = prompt('Ingresar otro apodo a tus personajes o escribe ESC para finalizar')
}*/

//rondas y din
let maxRondas = 99
let dinporRondas = 9999

for (let i = 0; i <= maxRondas && dinporRondas; i++) {

    console.log('Ronda n°' + (i + 1) + '-1');
    console.log('Din' + ((i + 1) * 100));

    if (i == 6) {
        alert('No lograste 2 estrellas :|, no te rindas aun');
    } else if (i == 3) {
        alert('No lograste 3 estrellas :(, vamos que todavia se puede');
    } else if (i <= 2) {
        console.log('Sigue jugando así, y lograrás las 3 estrellas');
    } else {
        console.log('Impresionante, jugaste con todo');
    }

}
alert('Wow, ya jugaste 100 rondas')

//objetos
const usuario = {
    nombre: 'Usuario',
    nivel: 1,
    avatar: 'Panda de fuego'
}

//funcion constructora
function Personajes(nombre, vida, puntos, daño) {
    this.nombre = nombre;
    this.vida = vida;
    this.puntos = puntos;
    this.daño = daño;
}
const personajepandatierra = new Personajes('Panda de tierra', 100, 50, 20);
const personajepandaagua = new Personajes('Panda de agua', 100, 50, 50);
const personajepandafuego = new Personajes('Panda de fuego', 100, 50, 100);
const personajehongo = new Personajes('Hongo', 100, 50, 20);

console.log(personajepandafuego)
console.log(personajepandaagua)
console.log(personajepandatierra)