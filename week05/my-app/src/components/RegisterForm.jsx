import { useState } from "react";


function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister(username, password);
        setUsername('');
        setPassword('');
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