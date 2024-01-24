document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log("Device Ready");
  
  const loginButton = document.getElementById("login-button");
  loginButton.addEventListener('click', loginUser);
  
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
        sessionStorage.setItem('Token', data.token);
        sessionStorage.setItem('ID', data.Usuario.id);
        sessionStorage.setItem('Nombre', data.Usuario.nombre);
        sessionStorage.setItem('Apellido', data.Usuario.apellido);
        sessionStorage.setItem('Rol', data.Usuario.rol);
  
          redirectBasedOnUserRole(data.Usuario.rol);
  
          const nombre = sessionStorage.getItem('Nombre');
          const apellido = sessionStorage.getItem('Apellido');
        console.log(data);
        alert(`Inicio de sesión exitoso, Bienvenido ${nombre} ${apellido}`);
      }).catch(error => {
        console.error("Error al iniciar sesión:", error);
        alert(error.message || 'Error en la respuesta del servidor');
      });
    }
    function redirectBasedOnUserRole(userRole) {
      const routes = {
          'Paciente': '../app/index.html',
          'Administrador': '../app/paneladmin.html',
      };
  
      const redirectPath = routes[userRole];
  
      if (redirectPath) {
          if (userRole === 'Administrador' && isTryingToAccessPatientRoute()) {
              console.error('Acceso no permitido a rutas de Paciente para Administradores');
              window.location.href = '../index.html'; // Redirigir a la página principal para los administradores
          } else {
              window.location.href = `../app/${redirectPath}`;
          }
      } else {
          console.error(`Rol desconocido: ${userRole}`);
      }
  }
  
  function isTryingToAccessPatientRoute() {
    const patientPages = ['../app/index.html', '../app/crearhistorial.html'];
    const currentPage = window.location.pathname.split('/').pop();
    return patientPages.includes(currentPage);
  }

}