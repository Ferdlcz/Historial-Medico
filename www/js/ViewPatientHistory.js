document.addEventListener("deviceready", onDeviceReady, false);

async function onDeviceReady() {
    console.log("Device Ready");

    try {
        const { response, data } = await obtenerInfo();

        console.log(data);

        console.log("data", data.infoUsuarios);

            sessionStorage.setItem('InfoUser', JSON.stringify(data.infoUsuarios))

            showInfo();
        }catch (error) {
        console.log("No existe un historial medico para este usuario")
    }


async function obtenerInfo() {
    const IDUsuario = sessionStorage.getItem('selectedUserID');
    const Token = sessionStorage.getItem('Token');

    try {
        const response = await fetch(`http://localhost:3500/api/user/historial/${IDUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Token,
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener la información del historial');
        }

        const data = await response.json();
        
        return { response, data};

    } catch (error) {
        console.log('Error en la solicitud: ', error);
        throw error;
    }
}

function showInfo() {
    //*** ELEMENTOS HTML ***/
    const nombre = document.getElementById("nombre")
    const apellidoPaterno = document.getElementById("apellidoPaterno");
    const apellidoMaterno = document.getElementById("apellidoMaterno");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const edad = document.getElementById("edad")
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email"); 
    const direccion = document.getElementById("direccion");
    const numero = document.getElementById("numero");
    const colonia = document.getElementById("colonia");
    const municipio = document.getElementById("municipio");
    const estado = document.getElementById("estado");
    const antecedenteEnfermedades = document.getElementById("aEnfermedades");
    const antecedenteHereditarios = document.getElementById("aHereditarios");
    const alcohol = document.getElementById("Alcohol");
    const tabaco = document.getElementById("Tabaco");
    const alergias = document.getElementById("alergias");
    const historialMenstrual = document.getElementById("historialMenstrual");
    const menarca = document.getElementById("menarca");
    const ivsa = document.getElementById("ivsa");
    const anticopceptivo = document.getElementById("anticopceptivo");
    const examenes = document.getElementById("examenes");
    const fur = document.getElementById("fur");
    const numeroEmbarazos = document.getElementById("nEmbarazos");
    const numeroPartos = document.getElementById("nPartos");
    const numeroCesareas = document.getElementById("nCesareas");
    const numeroLegrado = document.getElementById("nLegrado");
    const complicacionesParto = document.getElementById("complicacionesParto");
    const complicacionesEmbarazo = document.getElementById("complicacionesEmbarazo");
    const diabetes = document.getElementById("diabetesGestacional");
    const pesobebe = document.getElementById("pesobebe");
    const antecedentesFamEmbarazo = document.getElementById("antecedentesFamEmbarazo");
    const peso = document.getElementById("peso");
    const talla = document.getElementById("talla");
    const ta = document.getElementById("ta");
    const spo2 = document.getElementById("spo2");
    const temperatura = document.getElementById("temperatura");
    const observacion = document.getElementById("observacion");

    //*** Info Session Storage ***/
    const infoUsuarios = JSON.parse(sessionStorage.getItem('InfoUser'))

    //*** Extraer de Session Storage y enviar informacion al html ***/

    if(infoUsuarios){
        const user = infoUsuarios[0];
        const FechaNac = new Date(user.FechaNacimiento).toLocaleDateString();
        const FurDate = new Date(user.FUR).toLocaleDateString();
        const pesoBebe = user.PesoBebeAnterior;

        nombre.textContent = user.Nombre;
        apellidoPaterno.textContent = user.ApellidoPaterno;
        apellidoMaterno.textContent = user.ApellidoMaterno;
        fechaNacimiento.textContent = FechaNac;
        edad.textContent = user.Edad;
        telefono.textContent = user.Telefono;
        email.textContent = user.CorreoElectronico;
        direccion.textContent = user.Direccion;
        numero.textContent = user.Numero;
        colonia.textContent = user.NombreColonia;
        municipio.textContent = user.NombreMunicipio;
        estado.textContent = user.NombreEstado;
        antecedenteEnfermedades.textContent = user.AntecedentesEnfermedades;        
        antecedenteHereditarios.textContent = user.AntecedentesHereditarios;
        alcohol.textContent = user.ConsumoAlcohol;
        tabaco.textContent = user.ConsumoTabaco;
        alergias.textContent = user.Alergias;
        historialMenstrual.textContent = user.HistorialMenstrual;
        menarca.textContent = user.MenarcaEdad;
        ivsa.textContent = user.IVSAEdad;
        anticopceptivo.textContent = user.AnticonceptivoActual;
        examenes.textContent = user.ExamenesGinecologicosPrevios;
        fur.textContent = FurDate;
        numeroEmbarazos.textContent = user.NumeroEmbarazos;
        numeroPartos.textContent = user.NumeroPartos;
        numeroCesareas.textContent = user.NumeroCesareas;        
        numeroLegrado.textContent = user.NumeroLegrados;    
        complicacionesParto.textContent = user.ComplicacionesPartoCesarea;
        complicacionesEmbarazo.textContent = user.ComplicacionesEmbarazosAnteriores;
        diabetes.textContent = user.DiabetesGestacional;
        pesobebe.textContent = `${pesoBebe} GRS`;
        antecedentesFamEmbarazo.textContent = user.AntecedentesFamiliaresComplicacionesEmbarazo;
        peso.textContent = user.Peso;
        talla.textContent = user.Talla;
        ta.textContent = user.TA;
        spo2.textContent = user.SPO2;
        temperatura.textContent = user.Temperatura;
        observacion.textContent = user.Observacion;
    }

}

const btnEnviarObservacion= document.getElementById("historial");

btnEnviarObservacion.addEventListener("submit", async function(e){
    e.preventDefault();
    try{
        const IDUsuario = sessionStorage.getItem('selectedUserID');
        const Token = sessionStorage.getItem('Token');

        const observacion = document.getElementById('observacion').value;

        await sendObservation(IDUsuario, observacion, Token);

        await showInfo()
    }catch(error){
        console.log("Error al enviar la observacion: ", error)
    }
})

async function sendObservation(IDUsuario, Observacion, Token) {
    try {
        const response = await fetch('http://localhost:3500/api/observacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Token,
            },
            body: JSON.stringify({
                IDUsuario: IDUsuario,
                Observacion: Observacion
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al enviar la observación');
        }

        console.log('Observación enviada exitosamente:', data.message);
        alert("Observación enviada exitosamente!")

    } catch (error) {
        console.error('Error al enviar la observación:', error);
    }
}
}