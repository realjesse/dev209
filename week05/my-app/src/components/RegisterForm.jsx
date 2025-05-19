import { useState } from "react";

function RegisterForm({ API_URL }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                setUsername('');
                setPassword('');
            } else {
                alert("Unsuccessful :(")
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} id="register_form" className="">
                <section className="form_group">
                    <label htmlFor="register_username">Username:</label>
                    <input 
                        name="username" 
                        type="text" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                        required 
                    />
                </section>
                <section className="form_group">
                    <label htmlFor="register_password">Password:</label>
                    <input 
                        name="password" 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        required 
                    />
                </section>
                <section className="submit_button_container">
                    <button type="submit">Register</button>
                </section>
            </form>
        </>
    )
}

export default RegisterForm;