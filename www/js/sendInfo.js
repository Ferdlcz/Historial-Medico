document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("Device Ready");
    
    const btnSend = document.getElementById("btnsend");
    btnSend.addEventListener("submit", function (event) {
        event.preventDefault();
        sendInfo();
    });
    
    function sendInfo() {
        const nombre = document.getElementById("name").value;
        const apellidoPaterno = document.getElementById("aPaterno").value;
        const apellidoMaterno = document.getElementById("aMaterno").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
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
        const fur = document.getElementById("fur").value;
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
        
        const data ={
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
        
        fetch('https://historial-medicoapi-production.up.railway.app/api/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
    })
    
    .then(response =>{
        if(!response.ok){
            throw new Error('Error en la respuesta del servidor')
        }
        return response.json();
    }).then(data =>{
        console.log("Respuesta: ", data);
        alert("Datos enviados correctamente!!")
        console.log(data)
    }).catch(error =>{
        console.log("Error al enviar los datos:", error);
        alert('Error al enviar los datos.')
    })
}

}