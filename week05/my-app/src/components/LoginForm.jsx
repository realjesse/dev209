import React, { useState } from 'react';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <section id="login_register_container" className="">
            <h1>Login</h1>
            <form onSubmit={loginUser} id="login_form" className="">
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
        </section>
    );
}

export default LoginForm;