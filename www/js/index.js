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

  const btnAccount = document.getElementById("newAccount");
  btnAccount.addEventListener("click", function () {
    window.location.href = "../registrarse.html";
  });
}