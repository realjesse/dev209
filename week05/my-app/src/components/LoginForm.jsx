import React, { useState } from 'react';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(username, password);
        setUsername('');
        setPassword('');
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