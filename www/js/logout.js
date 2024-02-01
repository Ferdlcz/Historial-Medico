function onDeviceReady() {
    console.log("Device Ready");

}

function Logout() {
    sessionStorage.clear()
    window.location = '../index.html'
}