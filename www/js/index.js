document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log("Device Ready");

  $.getScript("/www/js/sendInfo.js", function () {
    const btnSend = document.getElementById("btnsend");
    btnSend.addEventListener("submit", function (event) {
      event.preventDefault();
      sendInfo();
    });
  });

  $.getScript("/www/js/login.js", function () {
    const newUser = document.getElementById("newUser");
    newUser.addEventListener('click', registerUser);
  });

  $.getScript("/www/js/login.js", function(){
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener('click', loginUser);
  })

  $.getScript("/www/js/login.js", function(){
    const reqResetButton = document.getElementById('reset-pass-button');
    reqResetButton.addEventListener('click', reqResetPassowrd);
  })

  $.getScript("/www/js/login.js", function(){
    const resetpassButton = document.getElementById('reset-pass');
    resetpassButton.addEventListener('click', resetPassword);
  })

  const btnAccount = document.getElementById("newAccount");
  btnAccount.addEventListener("click", function () {
    window.location.href = "../registrarse.html";
  });
}