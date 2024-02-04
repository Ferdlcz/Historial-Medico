document.addEventListener("DOMContentLoaded", function () {
    const userRole = sessionStorage.getItem('Rol');

    if (!userRole || !checkAccessForRole(userRole)) {
        restrictAccess();
    }
});

function checkAccessForRole(role) {
    const allowedPages = {
        'Paciente': ['/app/index.html', '/app/crearhistorial.html', '/app/actualizarhistorial.html'],
        'Administrador': ['/app/paneladmin.html', '/app/verhistorial.html']
    };

    const currentPage = window.location.pathname;

    if (allowedPages[role] && allowedPages[role].includes(currentPage)) {
        console.log(`Acceso permitido para ${role}`);
        return true;
    } else {
        console.log(`Acceso no permitido para ${role}`);
        return false;
    }
}

function restrictAccess() {
    console.log('Redirigiendo a ../index.html');
    window.location.href = '../index.html';
}
