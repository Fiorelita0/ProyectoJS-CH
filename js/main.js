//nombre
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
//edad
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

alert('Terminó el proceso')

//while
let entrada = prompt('Ingresar un apodo a tus personajes')
while (entrada != 'ESC') {
    alert('Ingresaste como apodo' + entrada),
        entrada = prompt('Ingresar otro apodo a tus personajes')
}

//for
let maxRondas = 99
let dineroporRondas = 9999
let repeticion = true

for (let i = 0; i <= maxRondas && dineroporRondas; i++) {
    //alert('Ronda ' + i)
    console.log('Ronda n°' + (i + 1));
    console.log('Dinero' + ((i + 1) * 100));

    switch (repeticion) {
        case (i >= 6):
            alert('No lograste 3 estrellas :(, no te rindas aún')
            continue;
        case (i >= 3):
            alert('No lograste 2 estrellas :|, vamos que todavia se puede')
            continue;
        case (i <= 2):
            console.log('Sigue jugando así, y lograrás las 3 estrellas')
            continue;
        default:
            console.log('Wow, impresionante, jugaste con todo');
    }
}
alert('Wow, ya jugaste 100 rondas')