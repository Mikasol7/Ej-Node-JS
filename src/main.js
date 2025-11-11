const URL = import.meta.env.VITE_API_URL 
const obtener = document.getElementById("obtener")
const tareas = document.getElementById("tareas")
const ATO = localStorage.getItem("ATO")

function crearTarjeta(title, completed) {
  const div = document.createElement("div")
  div.classList.add("card")
  div.innerHTML = `<span>${title}</span> <span class="completado">${completed ? "SI" : "NO"}</span>`
  div.getElementsByClassName("completado")[0]
  const completado = div.getElementsByClassName("completado")[0]
  completado.onclick = () => {
    console.log(holapapu)
  }
  return div
}

function obtenerTareasPaginadas(page = 0, take = 5) {
  fetch(`${URL}/tasks?page=${page}&take=${take}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": ATO 
    }
  })
    .then((a) => a.json()) 
    .then(json => {
      console.log(json)
      json.data.forEach(element => {
        const card = crearTarjeta(element.title, element.completed)
        tareas.appendChild(card)
      });
      const cantPages = Math.ceil(json.total_result / take)
    });
}

function crearComponentePaginado(cantPages, page) {
  for (let i = 0; i < cantPages; i++) {
    crearboton(i)
  }
}

if (!ATO) { 
  window.location.href = "login"
} else {
  obtenerTareasPaginadas()
}
