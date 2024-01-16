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

  const url = 'https://historial-medicoapi-production.up.railway.app/api/userregister';

  // Solicitud POST utilizando el plugin
  cordova.plugin.http.sendRequest(url, {
      method: 'post',
      data: data,
      headers: {
          'Content-Type': 'application/json',
      },
      serializer: 'json', // Puede necesitar ajustes según la API
  }, function(response) {
      // Manejar la respuesta
      console.log(response.data);
      alert("Registrado correctamente.");
      window.location.href = '../index.html';
  }, function(error) {
      // Manejar errores
      console.error(error);
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

  const url = 'https://historial-medicoapi-production.up.railway.app/api/login';

  // Solicitud POST utilizando el plugin
  cordova.plugin.http.sendRequest(url, {
      method: 'post',
      data: data,
      headers: {
          'Content-Type': 'application/json',
      },
      serializer: 'json', // Puede necesitar ajustes según la API
  }, function(response) {
      // Manejar la respuesta
      const data = JSON.parse(response.data);
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
  }, function(error) {
      // Manejar errores
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

function reqResetPassowrd() {
  const email = document.getElementById('email').value;

  const data = {
      Email: email,
  };

  const url = 'https://historial-medicoapi-production.up.railway.app/api/reset-password';

  // Solicitud POST utilizando el plugin
  cordova.plugin.http.sendRequest(url, {
      method: 'post',
      data: data,
      headers: {
          'Content-Type': 'application/json',
      },
      serializer: 'json', // Puede necesitar ajustes según la API
  }, function(response) {
      // Manejar la respuesta
      console.log(response.data);

      const data = JSON.parse(response.data);
      if (data.token) {
          localStorage.setItem('resetToken', data.token);
          setTimeout(() => {
              localStorage.removeItem('resetToken');
          }, 10 * 60 * 1000);
      }

      alert('Se ha enviado un enlace de restablecimiento a tu correo electrónico.');
  }, function(error) {
      // Manejar errores
      console.error("Error al solicitar restablecimiento:", error);
      alert(error.message || 'Error en la respuesta del servidor');
  });
}

function resetPassword() {
  const newPassword = document.getElementById('password').value;
  const token = localStorage.getItem('resetToken');

  if (!token) {
      alert('No se encontró una solicitud de restablecimiento. Por favor, solicita un restablecimiento de contraseña primero.');
      return;
  }

  const data = {
      nuevaContraseña: newPassword,
  };

  const url = `https://historial-medicoapi-production.up.railway.app/api/reset-password/${token}`;

  // Solicitud POST utilizando el plugin
  cordova.plugin.http.sendRequest(url, {
      method: 'post',
      data: data,
      headers: {
          'Content-Type': 'application/json',
      },
      serializer: 'json', // Puede necesitar ajustes según la API
  }, function(response) {
      // Manejar la respuesta
      console.log(response.data);
      alert('Contraseña actualizada correctamente.');
  }, function(error) {
      // Manejar errores
      console.error("Error al restablecer contraseña:", error);
      alert(error.message || 'Error en la respuesta del servidor');
  });
}
