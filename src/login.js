const URL = import.meta.env.VITE_API_URL
const username = document.getElementById("username")
const password = document.getElementById("password")
const boton = document.getElementById("obtener")

const ATO = localStorage.getItem("ATO")

if (ATO) {
    window.location.href = '/'

}

boton.onclick = () => {
    const body = JSON.stringify({ username: username.value, password: password.value }) 
    fetch(`${URL}/auth`, { 
        method: 'POST', 
        body,
        headers: {
            "Content-Type": "application/json" 
        }
    })
        .then((response) => response.json()) 
        .then((json) => {
            console.log(json)
            if (json.ATO) {
                localStorage.setItem("ATO", json.ATO) 
            }

        }).catch((err) => {  
            const { message } = err 
            console.log(message)
        }
        )
}

