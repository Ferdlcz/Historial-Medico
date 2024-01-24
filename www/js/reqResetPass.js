const reqResetButton = document.getElementById('reset-pass-button');
  reqResetButton.addEventListener('click', reqResetPassowrd);
  
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