document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("Device Ready");
    
    const btnSend = document.getElementById('btnsend');
    btnSend.addEventListener("click", sendInfo);
}

function sendInfo() {
    const name = document.getElementById('name').value;
    const apellidoPaterno = document.getElementById('aPaterno').value;
    const apellidoMaterno = document.getElementById('aMaterno').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const edad = document.getElementById('edad').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    const numero = document.getElementById('numero').value;
    const colonia = document.getElementById('colonia').value;
    const municipio = document.getElementById('municipio').value;
    const estado = document.getElementById('estado').value;
    const antecedenteEnfermedades = document.getElementById('aEnfermedades').value;
    const antecedenteHereditarios = document.getElementById('aHereditarios').value;
    const alcoholOptions = document.getElementsByName('Alcohol');
    const tabacoOptions = document.getElementsByName('Tabaco');
    const alergias = document.getElementById('alergias').value;
    const historialMenstrual = document.getElementById('historialMenstrual').value;
    const menarca = document.getElementById('menarca').value;
    const ivsa = document.getElementById('ivsa').value;
    const anticopceptivo = document.getElementById('anticopceptivo').value;
    const examenes = document.getElementById('examenes').value;
    const fur = document.getElementById('fur').value;
    const numeroEmbarazos = document.getElementById('nEmbarazos').value;
    const numeroPartos = document.getElementById('nPartos').value;
    const numeroCesareas = document.getElementById('nCesareas').value;
    const numeroLegrado = document.getElementById('nLegrado').value;
    const complicacionesParto = document.getElementById('complicacionesParto').value;
    const complicacionesEmbarazo = document.getElementById('complicacionesEmbarazo').value;
    const diabetesOptions = document.getElementsByName('Diabetes');
    const pesobebe = document.getElementById('pesobebe').value;
    const antecedentesFamEmbarazo = document.getElementById('antecedentesFamEmbarazo').value;
    const peso = document.getElementById('peso').value;
    const talla = document.getElementById('talla').value;
    const ta = document.getElementById('ta').value;
    const spo2 = document.getElementById('spo2').value;
    const temperatura = document.getElementById('temperatura').value;

    //*** RADIOBUTTON ALCOHOl ***//
    let selectedAlcoholOption;
    for (const radioButton of alcoholOptions){
        if(radioButton.checked){
            selectedAlcoholOption  = radioButton.value; 
            break;
        }
    }

    //*** RADIOBUTTON TABACO ***//
    let selectedTabacoOption;
    for (const radioButton of tabacoOptions){
        if(radioButton.checked){
            selectedTabacoOption  = radioButton.value; 
            break;
        }
    }
    //*** RADIOBUTTON DIABETES ***//
    let selectedDiabetesOption;
    for (const radioButton of diabetesOptions){
        if(radioButton.checked){
            selectedDiabetesOption  = radioButton.value; 
            break;
        }
    }

    //*** TEMPORAL ***/

    const InfoPersonal = {
        Nombre: name,
        Apellido_paterno: apellidoPaterno,
        Apellido_materno: apellidoMaterno,
        Fecha_de_nacimiento: fechaNacimiento,
        Edad: edad,
        Numero_de_telefono: telefono,
        Correo_electronico: email
    }

    const Residencia = {
        Direccion: direccion,
        Numero: numero,
        Colonia: colonia,
        Municipio: municipio,
        Estado: estado  
    }

    const HMedico = {
        Antecedente_enfermedad: antecedenteEnfermedades,
        Antecedente_hereditario: antecedenteHereditarios,
        Consumo_alcohol: selectedAlcoholOption,
        Consumo_tabaco: selectedTabacoOption,
        Alergias: alergias
    }

    const HGinecologo = {
        Historial_menstrual: historialMenstrual,
        Menarca: menarca,
        Ivsa: ivsa,
        Anticopceptivo_actual: anticopceptivo,
        Examenes_ginecologos: examenes
    }

    const HObstetrico = {
        Fur: fur,
        Numero_embarazos: numeroEmbarazos,
        Numero_partos: numeroPartos,
        Numero_cesareas: numeroCesareas,
        Numero_legrado: numeroLegrado,
        Complicaciones_parto: complicacionesParto,
        complicaciones_embarazo: complicacionesEmbarazo,
        Diabetes: selectedDiabetesOption,
        Peso_bebe: pesobebe,
        Antecedente_familiar_embarazo: antecedentesFamEmbarazo
    }

    const Somatometria = {
        Peso: peso,
        Talla: talla,
        TA: ta,
        Spo2: spo2,
        Temperatura: temperatura 
    }

    console.log("Informacion personal: ", InfoPersonal)
    console.log("Residencia: ", Residencia)
    console.log("Historial medico: ", HMedico)
    console.log("Historial ginecologo:", HGinecologo)
    console.log("Historial obstetrico: ", HObstetrico)
    console.log("Somatometria: ", Somatometria)

    //*** TEMPORAL ***/

    alert("¡Datos enviados correctamente :D!")
}
