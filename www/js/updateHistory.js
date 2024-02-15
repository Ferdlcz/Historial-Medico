document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("Device Ready");

    showInfo();

    const btnSend = document.getElementById("updateInfo");
    btnSend.addEventListener("submit", function (event) {
        event.preventDefault();
        updateInfo();
    });
}

async function obtenerInfo() {
    const IDUsuario = sessionStorage.getItem('selectedUserID');
    const Token = sessionStorage.getItem('Token');

    try {
        const response = await fetch(`http://localhost:3500/api/historial/${IDUsuario}`, {
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

        sessionStorage.setItem('InfoUser', JSON.stringify(data.infoUsuarios));
        
        return { response, data};

    } catch (error) {
        console.log('Error en la solicitud: ', error);
        throw error;
    }
}

function showInfo() {
    //*** ELEMENTOS HTML ***/
    const nombre = document.getElementById("name")
    const apellidoPaterno = document.getElementById("aPaterno");
    const apellidoMaterno = document.getElementById("aMaterno");
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
    const alcoholOptions = document.getElementsByName("Alcohol");
    const tabacoOptions = document.getElementsByName("Tabaco");
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
    const diabetesOptions = document.getElementsByName("diabetesGestacional");
    const pesobebe = document.getElementById("pesobebe");
    const antecedentesFamEmbarazo = document.getElementById("antecedentesFamEmbarazo");
    const peso = document.getElementById("peso");
    const talla = document.getElementById("talla");
    const ta = document.getElementById("ta");
    const spo2 = document.getElementById("spo2");
    const temperatura = document.getElementById("temperatura");

    //*** Info Session Storage ***/
    const infoUsuarios = JSON.parse(sessionStorage.getItem('InfoUser'))

    //*** Extraer de Session Storage y enviar informacion al html ***/

    if(infoUsuarios){
        const user = infoUsuarios[0];
        const FechaNac = new Date(user.FechaNacimiento).toLocaleDateString();
        const FurDate = new Date(user.FUR).toLocaleDateString();

        nombre.value = user.Nombre;
        apellidoPaterno.value = user.ApellidoPaterno;
        apellidoMaterno.value = user.ApellidoMaterno;
        fechaNacimiento.value = FechaNac;
        edad.value = user.Edad;
        telefono.value = user.Telefono;
        email.value = user.CorreoElectronico;
        direccion.value = user.Direccion;
        numero.value = user.Numero;
        colonia.value = user.NombreColonia;
        municipio.value = user.NombreMunicipio;
        estado.value = user.NombreEstado;
        antecedenteEnfermedades.value = user.AntecedentesEnfermedades;        
        antecedenteHereditarios.value = user.AntecedentesHereditarios;
        setRadioValue('Alcohol', user.ConsumoAlcohol);
        setRadioValue('Tabaco', user.ConsumoTabaco);
        alergias.value = user.Alergias;
        historialMenstrual.value = user.HistorialMenstrual;
        menarca.value = user.MenarcaEdad;
        ivsa.value = user.IVSAEdad;
        anticopceptivo.value = user.AnticonceptivoActual;
        examenes.value = user.ExamenesGinecologicosPrevios;
        fur.value = FurDate;
        numeroEmbarazos.value = user.NumeroEmbarazos;
        numeroPartos.value = user.NumeroPartos;
        numeroCesareas.value = user.NumeroCesareas;        
        numeroLegrado.value = user.NumeroLegrados;    
        complicacionesParto.value = user.ComplicacionesPartoCesarea;
        complicacionesEmbarazo.value = user.ComplicacionesEmbarazosAnteriores;
        setRadioValue('diabetesGestacional', user.DiabetesGestacional);
        pesobebe.value = user.PesoBebeAnterior;
        antecedentesFamEmbarazo.value = user.AntecedentesFamiliaresComplicacionesEmbarazo;
        peso.value = user.Peso;
        talla.value = user.Talla;
        ta.value = user.TA;
        spo2.value = user.SPO2;
        temperatura.value = user.Temperatura;     
    }
}

function setRadioValue(radioGroupName, storedValue) {
    const radioGroup = document.getElementsByName(radioGroupName);


    const isRadioGroupTwo = radioGroupName === 'diabetesGestacional';

    for (const radio of radioGroup) {
        if (isRadioGroupTwo) {
            if (radio.value === storedValue) {
                radio.checked = true;
                break;
            }
        } else {

            if (radio.nextSibling.textContent.trim().toUpperCase() === storedValue.toUpperCase()) {
                radio.checked = true;
                break;
            }
        }
    }
}

async function updateInfo(){

    try{
        const nombre = document.getElementById("name").value;
        const apellidoPaterno = document.getElementById("aPaterno").value;
        const apellidoMaterno = document.getElementById("aMaterno").value;
        const fechaNac = document.getElementById("fechaNacimiento").value;
        const edad = document.getElementById("edad").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const direccion = document.getElementById("direccion").value;
        const numero = document.getElementById("numero").value;
        const colonia = document.getElementById("colonia").value;
        const municipio = document.getElementById("municipio").value;
        const estado = document.getElementById("estado").value;
        const antecedenteEnfermedades = document.getElementById("aEnfermedades").value;
        const antecedenteHereditarios = document.getElementById("aHereditarios").value;
        const alcoholOptions = document.getElementsByName("Alcohol");
        const tabacoOptions = document.getElementsByName("Tabaco");
        const alergias = document.getElementById("alergias").value;
        const historialMenstrual = document.getElementById("historialMenstrual").value;
        const menarca = document.getElementById("menarca").value;
        const ivsa = document.getElementById("ivsa").value;
        const anticopceptivo = document.getElementById("anticopceptivo").value;
        const examenes = document.getElementById("examenes").value;
        const fechaFur = document.getElementById("fur").value;
        const numeroEmbarazos = document.getElementById("nEmbarazos").value;
        const numeroPartos = document.getElementById("nPartos").value;
        const numeroCesareas = document.getElementById("nCesareas").value;
        const numeroLegrado = document.getElementById("nLegrado").value;
        const complicacionesParto = document.getElementById("complicacionesParto").value;
        const complicacionesEmbarazo = document.getElementById("complicacionesEmbarazo").value;
        const diabetesOptions = document.getElementsByName("diabetesGestacional");
        const pesobebe = document.getElementById("pesobebe").value;
        const antecedentesFamEmbarazo = document.getElementById("antecedentesFamEmbarazo").value;
        const peso = document.getElementById("peso").value;
        const talla = document.getElementById("talla").value;
        const ta = document.getElementById("ta").value;
        const spo2 = document.getElementById("spo2").value;
        const temperatura = document.getElementById("temperatura").value;
        const IDUsuario = sessionStorage.getItem("selectedUserID");

        
        //*** RADIOBUTTON ALCOHOl ***//
        let consumoAlcohol;
        for (const radioButton of alcoholOptions) {
            if (radioButton.checked) {
                consumoAlcohol = radioButton.value;
                break;
            }
        }
        
        //*** RADIOBUTTON TABACO ***//
        let consumoTabaco;
        for (const radioButton of tabacoOptions) {
            if (radioButton.checked) {
                consumoTabaco = radioButton.value;
                break;
            }
        }
        //*** RADIOBUTTON DIABETES ***//
        let diabetesGestacional;
        for (const radioButton of diabetesOptions) {
            if (radioButton.checked) {
                diabetesGestacional = radioButton.value;
                break;
            }
        }

        const partesFecha = fechaNac.split('/');
        const dia = partesFecha[0];
        const mes = partesFecha[1];
        const año = partesFecha[2];

        const fechaNacimiento = año + '-' + mes + '-' + dia;

        const partesFechaFur = fechaFur.split('/');
        const diaFur = partesFechaFur[0];
        const mesFur = partesFechaFur[1];
        const añoFur = partesFechaFur[2];

        const fur = `${añoFur}-${mesFur}-${diaFur}`
        
        const data ={
            IDUsuario,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            fechaNacimiento,
            edad,
            telefono,
            email,
            direccion,
            numero,
            colonia,
            municipio,
            estado,
            antecedenteEnfermedades,
            antecedenteHereditarios,
            consumoAlcohol,
            consumoTabaco,
            alergias,
            historialMenstrual,
            menarca,
            ivsa,
            anticopceptivo,
            examenes,
            fur,
            numeroEmbarazos,
            numeroPartos,
            numeroCesareas,
            numeroLegrado,
            complicacionesParto,
            complicacionesEmbarazo,
            diabetesGestacional,
            pesobebe,
            antecedentesFamEmbarazo,
            peso,
            talla,
            ta,
            spo2,
            temperatura,
        }
        
        const token = sessionStorage.getItem('Token');        
        
        const response = await fetch(`http://localhost:3500/api/actualizarHistorial/${IDUsuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token, 
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error en la respuesta del servidor: ${errorData.message}`);
        }

        const responseData = await response.json();
        console.log("Respuesta: ", responseData);
        alert("Datos enviados correctamente!!")
        console.log(responseData)
        
        sessionStorage.removeItem('InfoUser');  

        return window.location = "../app/verhistorial.html";

    } catch(error) {
        console.log("Error al enviar los datos:", error.message);
        alert(`Error al enviar los datos: ${error.message}`);
    }
}
