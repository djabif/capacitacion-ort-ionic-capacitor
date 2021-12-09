let menu = document.querySelector('ion-menu');
let router = document.querySelector("ion-router");

// páginas
let paginaEnvios = document.querySelector("pagina-envios");
let paginaNuevoEnvio = document.querySelector("pagina-nuevo-envio");
let paginaDetalleEnvio = document.querySelector("pagina-detalle-envio");
let paginaLogin = document.querySelector("pagina-login");
let paginaRegistro = document.querySelector("pagina-registro");
let paginaFuncionalidades = document.querySelector("pagina-funcionalidades");

// antes de que el usuario pueda entrar a la home asegurarnos que esté logueado
document.getElementById('rutaEnvios').beforeEnter = () => {
    if (hayUsuarioLogueado()) {
      return true;
    } else {
      return { redirect: '/login' }; // Si no hay usuario logueado, lo mandamos a la página de login
    }
}

function hayUsuarioLogueado() {
    let key = localStorage.getItem('apiKey');
    if (key != null) {
        return true;
    } else {
        return false;
    }
}

// cada vez que cambia la ruta de navegación muestro u oculto cosas
router.addEventListener("ionRouteDidChange", (e) => {
    let navegacion = e.detail;

    // ocultar todas las páginas
    let paginas = document.getElementsByClassName('pagina');
    for (let i = 0; i < paginas.length; i++) {
        paginas[i].style.display = "none";
    }

    if (navegacion.to === "/login") {
        paginaLogin.style.display = "block";
        document.getElementById('mensajeErrorIngreso').style.display = "none";
    }

    if (navegacion.to === "/registro") {
        paginaRegistro.style.display = "block";
        document.getElementById('mensajeErrorRegistro').style.display = "none";
    }

    if (navegacion.to === "/") {
        paginaEnvios.style.display = "block";
        getEnviosDelUsuarioLogueado();
    }

    if (navegacion.to === "/nuevo-envio") {
        paginaNuevoEnvio.style.display = "block";
        getDepartamentos();
        getCiudades();
    }
    
    //detalle envio
    if (navegacion.to.includes("/detalle-envio")) {
        paginaDetalleEnvio.style.display = "block";
        cargarDetalleEnvio();
    }

    if (navegacion.to === "/funcionalidades") {
        paginaFuncionalidades.style.display = "block";
    }
});

window.cerrarMenu = function() {
    menu.close();
};

// -------------------  Pagina Ingreso / Login -------------------  

window.login = function() {
    let usuario = document.getElementById('usuarioLogin').value;
    let password = document.getElementById('passwordLogin').value;

    fetch('https://envios.develotion.com/login.php', {
        method: "POST",
        body: JSON.stringify({
            "usuario": usuario,
            "password": password
        })
      })
    .then(response => response.json())
    .then(function(data) {
        if (data.codigo === 200) {
            // guardar el apiKey en localStorage
            localStorage.setItem('apiKey', data.apiKey);
            localStorage.setItem('id', data.id);
            // navegar a la pagina de envios
            router.push('/');
        } else {
            //error
            document.getElementById('mensajeErrorIngreso').innerHTML = data.mensaje;
            document.getElementById('mensajeErrorIngreso').style.display = "block";
        }
        
    })
    .catch(function(error) {
        console.log(error);
    });
}

// -------------------  Pagina Registro -------------------  

window.registro = function() {
    let usuario = document.getElementById('usuarioRegistro').value;
    let password = document.getElementById('passwordRegistro').value;

    fetch('https://envios.develotion.com/usuarios.php', {
        method: "POST",
        body: JSON.stringify({
            "usuario": usuario,
            "password": password
        })
      })
    .then(response => response.json())
    .then(function(data) {
        if (data.codigo === 200) {
            // guardar el apiKey en localStorage
            localStorage.setItem('apiKey', data.apiKey);
            localStorage.setItem('id', data.id);
             // navegar a la pagina de envios
            router.push('/');

        } else {
            //error
            document.getElementById('mensajeErrorRegistro').innerHTML = data.mensaje;
            document.getElementById('mensajeErrorRegistro').style.display = "block";
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

// -------------------  Pagina Envios (Home) -------------------  
function getEnviosDelUsuarioLogueado() {
    fetch('https://envios.develotion.com/envios.php?idUsuario=' + localStorage.getItem('id'), {
        method: "GET",
        headers: {
          "apikey": localStorage.getItem('apiKey')
        }
      })
    .then(response => response.json())
    .then(function(data) {
        if (data.codigo === 200) {
            cargarListaEnvios(data.envios);
        } else if (data.codigo === 401) {
            alert(data.mensaje + ". Por favor ingresa nuevamente.");
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

function cargarListaEnvios(envios) {
    document.getElementById('listaEnvios').innerHTML = "";
    // cargar data
    for (let i = 0; i < envios.length; i++) {
        document.getElementById('listaEnvios').innerHTML +=
        `
        <ion-item button href="/detalle-envio?id=${envios[i].id}">
            ${envios[i].id}
        </ion-item>
        `;
    }
} 


// -------------------  Pagina Detalle Envio -------------------  

function cargarDetalleEnvio() {
    // obtengo el id del envio de la url
    let paramString = window.location.href.split('?')[1];
    let idEnvio = paramString.split('=')[1];

    paginaDetalleEnvio.innerHTML = `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Detalle Envio ${idEnvio}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div>Poner info del Envio ${idEnvio}</div>
      <ion-button color="danger" style="margin: 30px 20px;" onclick="eliminarEnvio(${idEnvio})">Eliminar</ion-button>
    </ion-content>
  `;
} 

window.eliminarEnvio = function(idEnvio) {
    fetch('https://envios.develotion.com/envios.php', {
        method: "DELETE",
        headers: {
            "apikey": localStorage.getItem('apiKey')
        },
        body: JSON.stringify({
            "idEnvio": idEnvio,
        })
      })
    .then(response => response.json())
    .then(function(data) {
        if (data.codigo === 200) {
             // navegar a la pagina de envios
            router.push('/');
        } else {
            //error
        }
    })
    .catch(function(error) {
        console.log(error);
    });
};

// -------------------  Pagina Nuevo Envio -------------------  


window.crearEnvio = function() {
    fetch('https://envios.develotion.com/envios.php', {
        method: "POST",
        headers: {
            "apikey": localStorage.getItem('apiKey')
        },
        body: JSON.stringify({
            "idUsuario": localStorage.getItem('id'),
            "idCiudadOrigen": document.getElementById('selectCiudadesOrigen').value,
            "idCiudadDestino": document.getElementById('selectCiudadesDestino').value,
            "peso": document.getElementById('peso').value,
            "distancia": document.getElementById('distancia').value,
            "precio": document.getElementById('precio').value,
            "idCategoria": 5
        })
      })
    .then(response => response.json())
    .then(function(data) {
        if (data.codigo === 200) {
             // navegar a la pagina de envios
            router.push('/');
        } else {
            //error
            document.getElementById('mensajeErrorEnvio').innerHTML = data.mensaje;
            document.getElementById('mensajeErrorEnvio').style.display = "block";
        }
    })
    .catch(function(error) {
        console.log(error);
    });
};

function getDepartamentos() {
    fetch('https://envios.develotion.com/departamentos.php', {
        method: "GET",
        headers: {
          "apikey": localStorage.getItem('apiKey')
        }
      })
    .then(response => response.json())
    .then(function(data) {
        cargarSelectDepartamentos(data.departamentos);
    })
    .catch(function(error) {
        console.log(error);
    });
}

function getCiudades(idDepartamento = null) {
    let param = "";   
  
    if (idDepartamento != null) {
        param = "?idDepartamento=" + idDepartamento;
    }
   
    fetch('https://envios.develotion.com/ciudades.php' + param, {
        method: "GET",
        headers: {
          "apikey": localStorage.getItem('apiKey')
        }
      })
    .then(response => response.json())
    .then(function(data) {
        cargarSelectsCiudades(data.ciudades);
    })
    .catch(function(error) {
        console.log(error);
    });
}

// si cambia el departmento seleccionado entonces cargo las ciudades correspondientes en los selects
document.getElementById('selectDepartamentos').addEventListener("ionChange", (e) => {
    let departamentoSeleccionado = document.getElementById('selectDepartamentos').value;
    if (departamentoSeleccionado != null) {
        getCiudades(departamentoSeleccionado);
    }
})

function cargarSelectsCiudades(ciudades) {
    document.getElementById('selectCiudadesOrigen').innerHTML = "";
    document.getElementById('selectCiudadesDestino').innerHTML = "";
    for (let i = 0; i < ciudades.length; i++) {
        document.getElementById('selectCiudadesOrigen').innerHTML +=
        `<ion-select-option value="${ciudades[i].id}">${ciudades[i].nombre}</ion-select-option>`;
        document.getElementById('selectCiudadesDestino').innerHTML +=
        `<ion-select-option value="${ciudades[i].id}">${ciudades[i].nombre}</ion-select-option>`;
    }
}

function cargarSelectDepartamentos(departamentos) {
    document.getElementById('selectDepartamentos').innerHTML = "";
    for (let i = 0; i < departamentos.length; i++) {
        document.getElementById('selectDepartamentos').innerHTML +=
        `<ion-select-option value="${departamentos[i].id}">${departamentos[i].nombre}</ion-select-option>`;
    }
}

// -------------------  Pagina Funcionalidades -------------------  
window.sacarFoto = async () => {
    // estamos en android o en web?
    if (Capacitor.isNativePlatform()) {
        let photo = await Capacitor.Plugins.Camera.getPhoto({
            quality: 90,
            // allowEditing: true,
            resultType: "uri"
        });
    
        document.getElementById("foto").src = photo.webPath;
    } else {
        alert('Esto solo funciona en entorno nativo');
    }
};

window.geoloc = async () => {
    // estamos en android o en web?
    if (Capacitor.isNativePlatform()) {
        let resultado = await Capacitor.Plugins.Geolocation.getCurrentPosition({ timeout: 3000 });

        document.getElementById("coordenadas").innerHTML = 
        `
            <ion-item><b>Latitude:</b> ${resultado.coords.latitude}</ion-item>
            <ion-item><b>Altitude:</b> ${resultado.coords.altitude}</ion-item>  
            <ion-item><b>Longitude:</b> ${resultado.coords.longitude}</ion-item>  
        `;
    } else {
        alert('Esto solo funciona en entorno nativo');
    }
};