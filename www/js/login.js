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

    fetch('http://localhost:3500/api/userregister', {
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

function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const data = {
      Email: email,
      Contraseña: password
    };
  
    fetch('http://localhost:3500/api/login', {
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
        localStorage.setItem('Token', data.token);
        localStorage.setItem('ID', data.Usuario.id);
        localStorage.setItem('Nombre', data.Usuario.nombre);
        localStorage.setItem('Apellido', data.Usuario.apellido);

        const nombre = localStorage.getItem('Nombre');
        const apellido = localStorage.getItem('Apellido');
      console.log(data);
      alert(`Inicio de sesión exitoso, Bienvenido ${nombre} ${apellido}`);
    }).catch(error => {
      console.error("Error al iniciar sesión:", error);
      alert(error.message || 'Error en la respuesta del servidor');
    });
  }

function reqResetPassowrd(){
    const email = document.getElementById('email').value;

    const data ={
        Email: email,
    }

    fetch('http://localhost:3500/api/reset-password',{
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
       
        if (data.token) {

            localStorage.setItem('resetToken', data.token);

            setTimeout(() => {
                localStorage.removeItem('resetToken');
            }, 10 * 60 * 1000); 
        }

        alert('Se ha enviado un enlace de restablecimiento a tu correo electronico.');
      }).catch(error => {
        console.error("Error al solicitar restablecimiento:", error);
        alert(error.message || 'Error en la respuesta del servidor');
      });
}

function resetPassword() {
    const newPassword = document.getElementById('password').value;
    const token = localStorage.getItem('resetToken');

    // Verificar si el token está presente
    if (!token) {
        alert('No se encontró un token de restablecimiento. Por favor, solicita un restablecimiento de contraseña primero.');
        return;
    }

    const data = {
        nuevaContraseña: newPassword,
    }

    fetch(`http://localhost:3500/api/reset-password/${token}`, {
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
