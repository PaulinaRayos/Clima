const apiKey = "API_KEY";
let tarjetas = [];
let editIndex = null;

function determinarIconoPorDescripcion(descripcion) {
            const desc = descripcion.toLowerCase();//cambia a minusculas para evitar errores en la comparacion
            if (desc.includes("tormenta")) return "⛈️";
            if (desc.includes("nieve")) return "❄️";
            if (desc.includes("lluvia") || desc.includes("llovizna") || desc.includes("chubasco")) return "🌧️";
            if (desc.includes("nublado")|| desc.includes("muy nuboso")) return "☁️";
            if (desc === "nubes") return "☁️";
            if (desc === "nubes dispersas") return "🌤️";
            if (desc.includes("cielo claro")) return "☀️";
            if (desc.includes("soleado") || desc.includes("despejado")) return "☀️";
            if (desc.includes("niebla") || desc.includes("neblina")) return "🌫️";
            return "🌤️";
        
}

function determinarIconoPorTemperatura(temp) {
            if (temp <= 0) return "🥶 🌡️🔵";
            if (temp > 0 && temp <= 18) return "❄️ 🌡️🔵";
            if (temp > 15 && temp <= 30) return "🌤️ 🌡️🟢";
            return "🔥 🌡️🔴";
        
}

function fetchClima(ciudad, callback) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    fetch(url) //solicitud a la url
        .then(response => response.json())//convierte la respuesta en objeto json
        .then(data => { //extrae los datos
            const descripcion = data.weather[0].description;
            const temperatura = data.main.temp;
                        const info = {
                ciudad: ciudad,
                temperatura: `${temperatura}°C`,
                descripcion: descripcion,
                humedad: `${data.main.humidity}%`,
                viento: `${(data.wind.speed * 3.6).toFixed(2)} km/h`,
                iconoDescripcion: determinarIconoPorDescripcion(descripcion),
                iconoTemperatura: determinarIconoPorTemperatura(temperatura),
				iconoHumedad: "💧",
				iconoViento: "💨"
            };
            callback(info);
        })
        .catch(error => console.error("Error al obtener datos", error));
}

function cargarTarjetas() {
    const container = document.getElementById("cardContainer");
    container.innerHTML = ""; //limpia el contenedor antes de agregar nuevas tarjetas
    tarjetas.forEach((tarjeta, index) => { //recorre el arreglo de tarjetas
        const card = document.createElement("div");
        card.classList.add("card"); 
        card.innerHTML = ` 
            <h3>${tarjeta.ciudad}</h3>
            <h3><strong>Temperatura:</strong> ${tarjeta.temperatura} <span class="icono">${tarjeta.iconoTemperatura}</span></h3>
            <h3><strong>Descripción:</strong> ${tarjeta.descripcion} <span class="icono">${tarjeta.iconoDescripcion}</span></h3>
            <h3><strong>Humedad:</strong> ${tarjeta.humedad} <span class="icono">${tarjeta.iconoHumedad}</span></h3>
            <h3><strong>Viento:</strong> ${tarjeta.viento} <span class="icono">${tarjeta.iconoViento}</span></h3>
            <div class="button-container">
                <button class="btn-editar" onclick="abrirPopup(${index})" title="Editar"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-actualizar" onclick="actualizarTarjeta(${index})" title="Actualizar"><i class="fa-solid fa-arrows-rotate"></i></button>
                <button class="btn-borrar" onclick="borrarTarjeta(${index})" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
            </div>
		`; //agrega todo el html dentro de la tarjeta
        container.appendChild(card); //agrega al contenedor la carta
    });
}

function agregarTarjeta(event) {
    event.preventDefault(); //evita que la página se recargue al hacer submit
    const ciudad = document.getElementById("ciudad").value;
    fetchClima(ciudad, (info) => {
        tarjetas.push(info);
        cargarTarjetas();
    });
    event.target.reset(); // limpiar el formulario 
}

document.getElementById("weatherForm").addEventListener("submit", agregarTarjeta); //al darle click en agregar(submit) se agrega la tarjeta

function borrarTarjeta(index) {
    tarjetas.splice(index, 1);
    cargarTarjetas();
}

function actualizarTarjeta(index) {
    fetchClima(tarjetas[index].ciudad, (info) => { //funcion que recibe la nueva informacion
        tarjetas[index] = info; //se actualiza la informacion en info
        cargarTarjetas(); //se actualiza la tarjeta en la interfaz
    });
}

function abrirPopup(index) {
    editIndex = index;
    document.getElementById("editCiudad").value = tarjetas[index].ciudad; //carga la ciudad en el popup
    document.getElementById("editPopup").classList.add("active"); //muestra el popup
}

function cerrarPopup() {
    document.getElementById("editPopup").classList.remove("active");
}

function guardarEdicion() {
    const nuevaCiudad = document.getElementById("editCiudad").value; //obtiene la nueva ciudad
    fetchClima(nuevaCiudad, (info) => { //obtiene la informacion dela nueva ciudad
        tarjetas[editIndex] = info; //se actualiza la tarjeta, utilizando el index guardado al abrir el popup
        cargarTarjetas();
        cerrarPopup();
    });
}

window.onload = function() {
    ["Madrid", "Buenos Aires", "Nueva York"].forEach(ciudad => { //recorre el arreglo de las ciudades
        fetchClima(ciudad, (info) => {//recibe la info de cada ciudad
            tarjetas.push(info); //agrega la info al arreglo
            cargarTarjetas();
        });
    });
};

