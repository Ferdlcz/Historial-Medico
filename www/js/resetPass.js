const resetpassButton = document.getElementById('reset-pass');
resetpassButton.addEventListener('click', resetPassword);

function resetPassword() {
    const newPassword = document.getElementById('password').value;
    const token = localStorage.getItem('resetToken');

    if (!token) {
        alert('No se encontró una solicitud de restablecimiento. Por favor, solicita un restablecimiento de contraseña primero.');
        return;
    }

    const data = {
        nuevaContraseña: newPassword,
    }

    fetch(`https://historial-medicoapi-production.up.railway.app/api/reset-password/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message);
            });
        }
        return response.json();
    }).then(data => {
        console.log(data);
        alert('Contraseña actualizada correctamente.');
    }).catch(error => {
        console.error("Error al restablecer contraseña:", error);
        alert(error.message || 'Error en la respuesta del servidor');
    });
}
