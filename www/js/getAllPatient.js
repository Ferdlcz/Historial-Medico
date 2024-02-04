document.addEventListener("deviceready", onDeviceReady, false);

// Array para almacenar información de usuarios
const userArray = [];


console.log(userArray)
async function onDeviceReady() {
  console.log("Device Ready");

  try {
    const { data } = await getUsers();

    if (data.success && data.users) {
      data.users.forEach((user) => {
        const card = createCard(user);
        card.addEventListener("click", () => {
          const userID = user.IDUsuario;
          userArray.push({
            userID: user.IDUsuario,
            nombre: user.Nombre,
            apellido: user.Apellido,
          });

          sessionStorage.setItem("selectedUserID", userID);
          window.location.href = "../app/verhistorial.html";
        });
        cardContainer.appendChild(card);
      });
    } else {
      console.log("Error al obtener usuarios:", data.message || "Respuesta no válida");
    }
  } catch (error) {
    console.log("Error en la solicitud:", error.message || "Error desconocido");
  }
}

async function getUsers() {
  const Token = sessionStorage.getItem('Token');

  try {
    const response = await fetch(`http://localhost:3500/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Token,
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener la información del historial');
    }

    const data = await response.json();

    return { response, data };
  } catch (error) {
    console.log('Error en la solicitud: ', error);
    throw error;
  }
}

function createCard(person) {

  const cardContent = document.createElement("div");

  cardContent.classList.add("card-content");
  cardContent.id = "user";
  cardContent.style.paddingBottom = "20px";
  cardContent.style.paddingLeft = "10px";

  const icon = document.createElement("div");
  icon.classList.add("material-symbols-outlined");
  icon.textContent = "account_circle";
  icon.style.marginRight = "10px";
  icon.style.fontSize = "50px";
  icon.style.position = "relative";
  icon.style.top = "15px";

  const nombreElement = document.createElement("h2");
  nombreElement.textContent = person.Nombre;
  nombreElement.id = "nombre";

  const apellidoElement = document.createElement("h2");
  apellidoElement.textContent = person.Apellido;
  apellidoElement.id = "apellido";

  cardContent.appendChild(icon);
  cardContent.appendChild(nombreElement);
  cardContent.appendChild(apellidoElement);

  return cardContent;
}

const cardContainer = document.getElementById("card-container");