import React, { useState } from 'react';

function LoginForm({ onLoginSuccess, API_URL, setAuthToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            // Set auth token in the parent component
            setAuthToken(token);
            // Clear the form fields
            setUsername('');
            setPassword('');
            // Render the todo list component, close login/register form
            onLoginSuccess();
        } else {
            alert("Login failed");
        }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} id="login_form" className="">
                <section className="form_group">
                    <label htmlFor="login_username">Username:</label>
                    <input 
                        name="username" 
                        type="text" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        required 
                    />
                </section>
                <section className="form_group">
                    <label htmlFor="login_password">Password:</label>
                    <input 
                        name="password" 
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        required 
                    />
                </section>
                <section className="submit_button_container">
                    <button type="submit">Login</button>
                </section>
            </form>
        </>
    );
}

export default LoginForm;