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