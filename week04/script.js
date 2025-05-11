const API_URL = "http://localhost:3000"

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
            alert("Success, login");
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