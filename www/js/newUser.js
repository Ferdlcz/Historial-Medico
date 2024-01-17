const newUser = document.getElementById("newUser");
newUser.addEventListener('click', registerUser);

function registerUser() {
    const Contraseña = document.getElementById("password").value;
    const Email = document.getElementById("email").value;
    const Apellido = document.getElementById("lastname").value;
    const Nombre = document.getElementById("name").value;

    const data = {
        Contraseña,
        Email,
        Apellido,
        Nombre
    };

    fetch('https://historial-medicoapi-production.up.railway.app/api/userregister', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            if (response.status === 0) {
                console.log('Error de conexión o servidor no disponible.');
            } else if (response.status === 400) {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            } else {
                console.log('Error desconocido:', response);
                throw new Error('Error en la respuesta del servidor');
            }
        }
        return response.json();
    }).then(data => {
        console.log("Respuesta: ", data);
        alert("Registrado correctamente.");
        window.location.href = '../index.html';
    }).catch(error => {
        alert(error.message || 'Error en la respuesta del servidor');
    });
}