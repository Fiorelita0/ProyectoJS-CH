//Nombre
let nombreUsuario = document.getElementById("usuario");
let aparicion = 0;
nombreUsuario.innerText = localStorage.getItem('usuarioSwal') || 'Usuario';

//Tiempo
let contador_seg = 0;
let contador_min = 0;
let segundos = document.getElementById('segundos');
let minutos = document.getElementById('minutos');

//Aparece para ingresar tu nombre con onload
document.body.onload = function() {

    Swal.fire({
        title: "Ingresa tu nombre",
        input: "text",
        inputLabel: "Tu nombre es:",
        showCancelButton: true,
        confirmButtonText: 'Guardar',
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
            localStorage.setItem('usuarioSwal', nombre);
        }
        if (resultado.isConfirmed || resultado.isDismissed) {

            Swal.fire({
                title: 'Comenzará el juego!',
                text: 'Presiona OK para comenzar',
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {

                    //Comienza a jugar - Generar enemigosHongos
                    setInterval(() => {
                        //Aparicion del hongo
                        aparicion++;
                        if (aparicion % 12 == 0) {
                            let enemigoHongo = document.createElement("div");
                            enemigoHongo.classList.add("enemigoHongo");
                            body.append(enemigoHongo);
                            enemigoHongo.style.left = Math.random() * window.innerWidth - 10 + "px";
                            enemigoHongo.style.bottom = enemigoHongo.getBoundingClientRect().bottom + 250 + "px";
                        }
                    }, 70);

                    //Comienza el tiempo
                    setInterval(() => {
                        if (contador_seg == 59) {
                            contador_seg = 0;
                            contador_min++;
                            minutos.innerHTML = contador_min;

                            if (contador_min == 0) {
                                contador_min = 0;
                            }
                        }
                        contador_seg++;
                        segundos.innerHTML = contador_seg;
                    }, 1000)
                }
            })
        }
    });
};

//Funcion constructora
//Objetos
class Personajes {
    constructor(nombre, tipo, vida, puntos, danio, imagen, fondo) {
        this.nombre = nombre.toUpperCase();
        this.tipoPanda = tipo;
        this.vida = vida;
        this.puntosObtenidos = puntos;
        this.puntosDanio = danio;
        this.imagen = imagen;
        this.fondo = fondo;
        this.utilizado = false;
    }
    mensaje() {
        this.hablar = console.log("Hola me llamo " + this.nombre + " soy un " + this.tipoPanda);
        Toastify({
            text: "Hola me llamo " + this.nombre + " soy un " + this.tipoPanda,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right,#0ac6ff,#f51212 )",
                width: '10vw',
                height: 80
            },
            offset: {
                x: 20,
                y: 60,
            },
        }).showToast();
    }
    utilizar() {
        this.utilizado = true;
    }
}
//Array de los Personajes
const personaje = [];
personaje.push(new Personajes("Zeus", "panda de tierra", 10, 0, 25, "img/pandadetierra.png", 'img/fondodetierra.webp'));
personaje.push(new Personajes("Poseidon", "panda de agua", 10, 1000, 50, "img/pandadeagua.png", 'img/fondodeagua.webp'));
personaje.push(new Personajes("Efesto", "panda de fuego", 10, 2000, 100, "img/pandadefuego.png", 'img/fondodefuego.webp'));

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

//Vidas del panda
let vida = 10;
let vida10 = document.getElementById("vida10");

setInterval(() => {
    let enemigosHongos = document.querySelectorAll(".enemigoHongo");
    enemigosHongos.forEach((enemigoHongo) => {
        //getBoundingClientRect lo saque de un tutorial para poder realizar movimiento, trata de devolver un elemento con su posicion en tiempo real en la pantalla
        enemigoHongo.style.top =
            enemigoHongo.getBoundingClientRect().top + 10 + "px";

        //Desaparicion del hongo y eliminacion de una vida
        if (enemigoHongo.getBoundingClientRect().top >
            pandaPersonaje.getBoundingClientRect().top - 25) {
            vida--;
            vida10.innerHTML = vida;
            enemigoHongo.remove();
            if (vida == 0) {
                vida10.remove()
                Swal.fire({
                    position: 'center',
                    title: 'OOPS..PERDISTE!',
                    showConfirmButton: true,
                    imageUrl: 'img/emogi.png',
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Querés volver a jugar?',
                            showConfirmButton: true,
                            confirmButtonText: 'REINICIAR',

                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        })
                    }
                })
                vida10.remove();
                bambu0.remove()
            }
        }
    });
}, 100);


//DOM y Eventos - cambiar fondo
/*let fondo = document.querySelector("#fondo");
let urlPersonaje = "";


fondo.addEventListener("change", () => {
    console.log(fondo.value);
    document.body.style.backgroundImage = `url('img/fondode${fondo.value}.webp')`;
    urlPersonaje = personaje[fondo.selectedIndex].imagen;
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
});*/

//Movimiento del disparo
let urlFondo = ""
let urlPersonaje = "";
let bambu = 0;
let bambu0 = document.getElementById("bambu0");
let maxPuntaje = 3900;

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

                    if (bambu == 0) {
                        console.log(personaje[0]);
                        personaje[0].mensaje();
                        personaje[0].utilizar();
                        console.log("Desbloqueo del Panda de tierra");
                        urlFondo = personaje[0].fondo;
                        urlPersonaje = personaje[0].imagen;
                        document.body.style.backgroundImage = `url('${urlFondo}')`;
                        document.querySelector('.pandaPersonaje').style.backgroundImage = `url('${urlPersonaje}')`;

                    } //Al lograr 1000 puntos se desbloquea el panda de agua
                    else if (bambu == 125) {
                        console.log(personaje[1]);
                        personaje[1].mensaje();
                        personaje[1].utilizar();
                        console.log("Desbloqueo del Panda de agua");
                        urlFondo = personaje[1].fondo;
                        urlPersonaje = personaje[1].imagen;
                        document.body.style.backgroundImage = `url('${urlFondo}')`;
                        document.querySelector('.pandaPersonaje').style.backgroundImage = `url('${urlPersonaje}')`;


                    } //Al lograr 2000 puntos se desbloquea el panda de fuego
                    else if (bambu == 175) {
                        console.log(personaje[2]);
                        personaje[2].mensaje();
                        personaje[2].utilizar();
                        console.log("Desbloqueo del Panda de fuego");
                        urlFondo = personaje[2].fondo;
                        urlPersonaje = personaje[2].imagen;
                        document.body.style.backgroundImage = `url('${urlFondo}')`;
                        document.querySelector('.pandaPersonaje').style.backgroundImage = `url('${urlPersonaje}')`;

                    } //Al lograr 4000 puntos ganas el juego
                    else if (bambu >= maxPuntaje) {
                        Swal.fire({
                            position: 'center',
                            title: 'GANASTE',
                            showConfirmButton: true,
                        })

                        //Segun el tiempo ganas 3 estrellas si ganaste en el minuto 0
                        if (contador_min == 0) {

                            Swal.fire({
                                position: 'center',
                                title: 'GANASTE',
                                showConfirmButton: true,
                                imageUrl: 'img/star3.png',
                                imageWidth: 200,
                                imageHeight: 200,
                                imageAlt: 'Custom image',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Querés volver a jugar?',
                                        showConfirmButton: true,
                                        confirmButtonText: 'REINICIAR',

                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            location.reload();
                                        }
                                    })
                                }
                            })
                            vida10.remove();
                            bambu0.remove()
                        } //Segun el tiempo ganas 2 estrellas si ganaste en el minuto 1
                        else if (contador_min == 1) {
                            Swal.fire({
                                position: 'center',
                                title: 'GANASTE',
                                showConfirmButton: true,
                                imageUrl: 'img/star2.png',
                                imageWidth: 200,
                                imageHeight: 200,
                                imageAlt: 'Custom image',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Querés volver a jugar?',
                                        showConfirmButton: true,
                                        confirmButtonText: 'REINICIAR',

                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            location.reload();
                                        }
                                    })
                                }
                            })
                            vida10.remove();
                            bambu0.remove()
                        } //Segun el tiempo ganas 1 estrella si ganaste en el minuto 2
                        else if (contador_min >= 2) {
                            Swal.fire({
                                position: 'center',
                                title: 'GANASTE',
                                showConfirmButton: true,
                                imageUrl: 'img/star1.png',
                                imageWidth: 200,
                                imageHeight: 200,
                                imageAlt: 'Custom image',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Querés volver a jugar?',
                                        showConfirmButton: true,
                                        confirmButtonText: 'REINICIAR',

                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            location.reload();
                                        }
                                    })
                                }
                            })
                            vida10.remove();
                            bambu0.remove()
                        }
                    }
                    //Elimina el enemigoHongo al tocar la balaBambu
                    setTimeout(() => {
                        enemigoHongo.remove();
                    }, 50);

                    if (urlFondo = personaje[0]) {
                        let puntos = bambu += 25;
                        bambu0.innerHTML = puntos;
                    } else if (urlFondo = personaje[1]) {
                        let puntos = bambu += 50;
                        bambu0.innerHTML = puntos;
                    } else if (urlFondo = personaje[2]) {
                        let puntos = bambu += 100;
                        bambu0.innerHTML = puntos;
                    }
                } //Choca con el enemigo segun el fondo obtiene más puntos
                /*else if (balaBambu.getBoundingClientRect().left >=
                    enemigoHongo.getBoundingClientRect().left &&
                    balaBambu.getBoundingClientRect().left <=
                    enemigoHongo.getBoundingClientRect().left + 95) {
                    let eleccion = fondo.value;
                    if (eleccion == 'tierra') {
                        let puntos = bambu += 25;
                        bambu0.innerHTML = puntos;
                    }
                    if (eleccion == 'agua') {
                        let puntos = bambu += 50;
                        bambu0.innerHTML = puntos;
                    }
                    if (eleccion == 'fuego') {
                        let puntos = bambu += 100;
                        bambu0.innerHTML = puntos;
                    }
                }*/
            }
        });
    });
}, 100);