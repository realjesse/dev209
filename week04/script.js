const API_URL = "http://localhost:3000"

window.onload = () => {
    if (getAuthToken()) {
        showApp();
    }
}

async function loginUser(event) {
    event.preventDefault();
    
    const username = document.querySelector("#login_username").value;
    const password = document.querySelector("#login_password").value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
            const data = await response.json();
            const token = data.token;
            document.cookie = `authToken=${token};`
            showApp();
        } else {
            alert("Unsuccessful :(")
        }
    }
    catch(error) {
        console.log(error);
    }
}

async function registerUser(event) {
    event.preventDefault();

    const username = document.querySelector("#register_username").value;
    const password = document.querySelector("#register_password").value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 201) {
            alert("Success, login");
        } else {
            alert("Unsuccessful :(")
        }
    }
    catch(error) {
        console.log(error);
    }
}

async function logoutUser() {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });

        if (response.status === 200) {
            // Remove cookie with token
            document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
            showLogin();
        } else {
            alert("Error with logging out, try again.");
        }
    } catch(error) {
        console.log(error);
    }
}

function getAuthToken() {
    const cookies = document.cookie.split('; ');
    // Find authToken among all cookies on website
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === "authToken") {
            return cookieValue;
        }
    }
    // if no authToken found return nothing
    return null;
}

function showApp() {
    document.querySelector("#login_register_container").classList.add("hide");
    document.querySelector("#todo_app_container").classList.remove("hide");
}

function showLogin() {
    document.querySelector("#login_register_container").classList.remove("hide");
    document.querySelector("#todo_app_container").classList.add("hide");
}