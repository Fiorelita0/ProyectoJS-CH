//=======================================================
//INICIO DEL JUEGO
//=======================================================
let aparicion = 0;
let maxPuntaje = 9900;

//=======================================================
//TIEMPO
//=======================================================
let contador_seg = 0;
let contador_min = 0;
let segundos = document.getElementById('segundos');
let minutos = document.getElementById('minutos');

document.body.onload = function() {

    Swal.fire({
        title: 'Comenzará el juego!',
        text: 'Presiona JUGAR para comenzar',
        imageUrl: 'img/groot.png',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Emogi imagen',
        showConfirmButton: true,
        confirmButtonText: 'JUGAR',
    }).then((result) => {
        if (result.isConfirmed) {
            //Comienza a jugar - Genera enemigosHongos
            setInterval(() => {
                //Aparicion del hongo
                aparicion++;
                if (aparicion % 12 == 0) {
                    let enemigoHongo = document.createElement("div");
                    enemigoHongo.classList.add("enemigoHongo");
                    body.append(enemigoHongo);
                    enemigoHongo.style.left = Math.random() * window.innerWidth - 40 + "px";
                    enemigoHongo.style.bottom = enemigoHongo.getBoundingClientRect().bottom + 250 + "px";
                    //Eliminar la aparicion del hongo cuando supera el puntaje
                    if (bambu > maxPuntaje) {
                        enemigoHongo.remove()
                    } //Eliminar la aparicion del hongo cuando la vida es menor o igual a 0
                    else if (vida <= 0) {
                        enemigoHongo.remove()
                    }
                }
            }, 25);

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

//=======================================================
//USUARIO
//=======================================================
let nombreUsuario = document.getElementById("usuario");

//Almacenamiento en LocalStorage de tu nombre de usuario
nombreUsuario.innerText = localStorage.getItem('usuarioSwal') || 'Usuario';
let ingresoUsuario = document.getElementById("ingreso-usuario");

//Boton para poner o cambiar tu nombre de usuario
ingresoUsuario.onclick = () => {

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
    })
}

//=======================================================
//PERSONAJES
//=======================================================

//CONSTRUCTOR DE CLASES
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
personaje.push(new Personajes("Afrodita", "panda de agua", 10, 1000, 50, "img/pandadeagua.png", 'img/fondodeagua.webp'));
personaje.push(new Personajes("Efesto", "panda de fuego", 10, 2500, 100, "img/pandadefuego.png", 'img/fondodefuego.webp'));

//=======================================================
//LOGICA DEL JUEGO
//=======================================================

//Movimiento con mouse del Panda
let pandaPersonaje = document.querySelector(".pandaPersonaje");
let body = document.querySelector("body");

document.addEventListener("mousemove", (event) => {
    pandaPersonaje.style.left = event.clientX - 80 + "px";
});

//Generar disparo del Panda con el teclado
document.addEventListener("keyup", () => {
    let balaBambu = document.createElement("div");
    balaBambu.classList.add("balaBambu");
    balaBambu.style.bottom = 44 + "px";
    //==============================================================================================================
    //getBoundingClientRect lo saque de un tutorial para poder realizar movimiento y disparo, trata de devolver un elemento con su posicion en tiempo real en la pantalla
    //==============================================================================================================
    balaBambu.style.left = pandaPersonaje.getBoundingClientRect().left + 45 + "px";
    body.append(balaBambu);
});

//Vidas del panda
let vida = 20;
let vida20 = document.getElementById("vida20");

setInterval(() => {
    let enemigosHongos = document.querySelectorAll(".enemigoHongo");
    enemigosHongos.forEach((enemigoHongo) => {

        //Velocidad del hongo
        enemigoHongo.style.top = enemigoHongo.getBoundingClientRect().top + 10 + "px";

        //Desaparicion del hongo y eliminacion de una vida
        if (enemigoHongo.getBoundingClientRect().top >
            pandaPersonaje.getBoundingClientRect().top - 25) {
            vida--;
            vida20.innerHTML = vida;
            enemigoHongo.remove();

            if (vida == 0) {
                Swal.fire({
                    position: 'center',
                    title: 'OOPS..PERDISTE!',
                    showConfirmButton: true,
                    imageUrl: 'img/emogi.png',
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'Emogi triste',
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
                vida20.remove();
                bambu0.remove();
            }
        }
    });
}, 100);

//Movimiento del disparo
let urlFondo = "";
let urlPersonaje = "";
let bambu = 0;
let bambu0 = document.getElementById("bambu0");

//Almacenamiento en localstorage del mayor puntaje
let mayorPuntos = document.getElementById("puntos");
mayorPuntos.innerText = localStorage.getItem('HighScore') || 0;

setInterval(() => {
    let balasBambus = document.querySelectorAll(".balaBambu");
    balasBambus.forEach((balaBambu) => {
        balaBambu.style.top = balaBambu.getBoundingClientRect().top - 74 + "px";
        //cuando topa con la pantalla se elimina
        if (balaBambu.getBoundingClientRect().top <= -20) {
            balaBambu.remove();
        }
        let enemigosHongos = document.querySelectorAll(".enemigoHongo");
        //Detecta y elimina enemigos
        enemigosHongos.forEach((enemigoHongo) => {
            if (balaBambu.getBoundingClientRect().top <=
                enemigoHongo.getBoundingClientRect().top + 50) {

                //Choca con el enemigo 
                if (balaBambu.getBoundingClientRect().left >=
                    enemigoHongo.getBoundingClientRect().left &&
                    balaBambu.getBoundingClientRect().left <=
                    enemigoHongo.getBoundingClientRect().left + 95) {
                    //Elimina el enemigoHongo al tocar la balaBambu
                    setTimeout(() => {
                        enemigoHongo.remove();
                    }, 50);
                    //Desbloqueo de pandas y escenarios
                    if (bambu == personaje[0].puntosObtenidos) {
                        console.log(personaje[0]);
                        personaje[0].mensaje();
                        personaje[0].utilizar();
                        console.log("Desbloqueo del Panda de tierra");
                        urlFondo = personaje[0].fondo;
                        urlPersonaje = personaje[0].imagen;
                        document.body.style.backgroundImage = `url('${urlFondo}')`;
                        document.querySelector('.pandaPersonaje').style.backgroundImage = `url('${urlPersonaje}')`;

                    } //Al lograr 1000 puntos se desbloquea el panda de agua
                    else if (bambu == personaje[1].puntosObtenidos) {
                        console.log(personaje[1]);
                        personaje[1].mensaje();
                        personaje[1].utilizar();
                        console.log("Desbloqueo del Panda de agua");
                        urlFondo = personaje[1].fondo;
                        urlPersonaje = personaje[1].imagen;
                        document.body.style.backgroundImage = `url('${urlFondo}')`;
                        document.querySelector('.pandaPersonaje').style.backgroundImage = `url('${urlPersonaje}')`;
                        //Velocidad
                        setInterval(() => {
                            let enemigosHongos = document.querySelectorAll(".enemigoHongo");
                            enemigosHongos.forEach((enemigoHongo) => {
                                enemigoHongo.style.top = enemigoHongo.getBoundingClientRect().top + 5 + "px";
                            });
                        }, 25);
                    } //Al lograr 2500 puntos se desbloquea el panda de fuego
                    else if (bambu == personaje[2].puntosObtenidos) {
                        console.log(personaje[2]);
                        personaje[2].mensaje();
                        personaje[2].utilizar();
                        console.log("Desbloqueo del Panda de fuego");
                        urlFondo = personaje[2].fondo;
                        urlPersonaje = personaje[2].imagen;
                        document.body.style.backgroundImage = `url('${urlFondo}')`;
                        document.querySelector('.pandaPersonaje').style.backgroundImage = `url('${urlPersonaje}')`;
                        //Velocidad
                        setInterval(() => {
                            let enemigosHongos = document.querySelectorAll(".enemigoHongo");
                            enemigosHongos.forEach((enemigoHongo) => {
                                enemigoHongo.style.top = enemigoHongo.getBoundingClientRect().top + 1 + "px";
                            });
                        }, 20);

                    } //Al lograr 10000 puntos ganas el juego
                    else if (bambu == 9900 || bambu == 9950) {
                        //Segun el tiempo ganas 3 estrellas si ganaste en el minuto 0
                        if (contador_min == 0) {

                            Swal.fire({
                                position: 'center',
                                title: 'GANASTE',
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: 'SEGUIR JUGANDO',
                                cancelButtonText: 'SALIR',
                                imageUrl: 'img/star3.png',
                                imageWidth: 200,
                                imageHeight: 200,
                                imageAlt: 'Tres estrellas',
                            }).then((result) => {
                                //Reinicio de la pagina
                                if (result.isDismissed) {
                                    Swal.fire({
                                        title: '¿Querés volver a jugar?',
                                        showConfirmButton: true,
                                        confirmButtonText: 'REINICIAR',

                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            location.reload();
                                        }
                                    })
                                } else if (result.isConfirmed) {
                                    //Seguir jugando
                                    Swal.fire({
                                        title: 'Presionar OK para seguir jugando',
                                        showConfirmButton: true,
                                        confirmButtonText: 'OK',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            setInterval(() => {
                                                //Aparicion nuevamente del hongo
                                                aparicion++;
                                                if (aparicion % 12 == 0) {
                                                    let enemigoHongo = document.createElement("div");
                                                    enemigoHongo.classList.add("enemigoHongo");
                                                    body.append(enemigoHongo);
                                                    enemigoHongo.style.left = Math.random() * window.innerWidth - 40 + "px";
                                                    enemigoHongo.style.bottom = enemigoHongo.getBoundingClientRect().bottom + 250 + "px";
                                                }
                                            }, 30);
                                        }
                                    })
                                }
                            })

                        } //Segun el tiempo ganas 2 estrellas si ganaste en el minuto 1
                        else if (contador_min == 1) {
                            Swal.fire({
                                position: 'center',
                                title: 'GANASTE',
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: 'SEGUIR JUGANDO',
                                cancelButtonText: 'SALIR',
                                imageUrl: 'img/star2.png',
                                imageWidth: 200,
                                imageHeight: 200,
                                imageAlt: 'Tres estrellas',
                            }).then((result) => {
                                if (result.isDismissed) {
                                    Swal.fire({
                                        title: '¿Querés volver a jugar?',
                                        showConfirmButton: true,
                                        confirmButtonText: 'REINICIAR',

                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            location.reload();
                                        }
                                    })
                                } else if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Presionar OK para seguir jugando',
                                        showConfirmButton: true,
                                        confirmButtonText: 'OK',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            setInterval(() => {
                                                aparicion++;
                                                if (aparicion % 12 == 0) {
                                                    let enemigoHongo = document.createElement("div");
                                                    enemigoHongo.classList.add("enemigoHongo");
                                                    body.append(enemigoHongo);
                                                    enemigoHongo.style.left = Math.random() * window.innerWidth - 40 + "px";
                                                    enemigoHongo.style.bottom = enemigoHongo.getBoundingClientRect().bottom + 250 + "px";
                                                }
                                            }, 30);
                                        }
                                    })
                                }
                            })

                        } //Segun el tiempo ganas 1 estrella si ganaste en el minuto 2
                        else if (contador_min >= 2) {
                            Swal.fire({
                                position: 'center',
                                title: 'GANASTE',
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: 'SEGUIR JUGANDO',
                                cancelButtonText: 'SALIR',
                                imageUrl: 'img/star1.png',
                                imageWidth: 200,
                                imageHeight: 200,
                                imageAlt: 'Tres estrellas',
                            }).then((result) => {
                                if (result.isDismissed) {
                                    Swal.fire({
                                        title: '¿Querés volver a jugar?',
                                        showConfirmButton: true,
                                        confirmButtonText: 'REINICIAR',

                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            location.reload();
                                        }
                                    })
                                } else if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Presionar OK para seguir jugando',
                                        showConfirmButton: true,
                                        confirmButtonText: 'OK',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            setInterval(() => {
                                                aparicion++;
                                                if (aparicion % 12 == 0) {
                                                    let enemigoHongo = document.createElement("div");
                                                    enemigoHongo.classList.add("enemigoHongo");
                                                    body.append(enemigoHongo);
                                                    enemigoHongo.style.left = Math.random() * window.innerWidth - 40 + "px";
                                                    enemigoHongo.style.bottom = enemigoHongo.getBoundingClientRect().bottom + 250 + "px";
                                                }
                                            }, 30);
                                        }
                                    })
                                }
                            })

                        }
                    }

                    //Choca con el enemigo segun el fondo obtiene más puntos 
                    if (urlFondo == personaje[0].fondo) {
                        let puntos = bambu += personaje[0].puntosDanio;
                        bambu0.innerHTML = puntos;
                        //Mayor puntaje
                        if (puntos > localStorage.getItem('HighScore')) {
                            localStorage.setItem('HighScore', puntos);
                        }
                        puntos = 0;
                    } else if (urlFondo == personaje[1].fondo) {
                        let puntos = bambu += personaje[1].puntosDanio;
                        bambu0.innerHTML = puntos;
                        if (puntos > localStorage.getItem('HighScore')) {
                            localStorage.setItem('HighScore', puntos);
                        }
                    } else if (urlFondo == personaje[2].fondo) {
                        let puntos = bambu += personaje[2].puntosDanio;
                        bambu0.innerHTML = puntos;
                        if (puntos > localStorage.getItem('HighScore')) {
                            localStorage.setItem('HighScore', puntos);
                        }
                    }
                }
            }
        });
    });
}, 100);