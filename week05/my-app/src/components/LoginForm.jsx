import React from 'react';

function LoginForm() {
    return (
        <section id="login_register_container" className="">
            <h1>Login</h1>
            <form onSubmit={loginUser} id="login_form" className="">
                <section className="form_group">
                    <label htmlFor="login_username">Username:</label>
                    <input name="username" type="text" id="login_username" required />
                </section>
                <section className="form_group">
                    <label htmlFor="login_password">Password:</label>
                    <input name="password" type="password" id="login_password" required />
                </section>
                <section className="submit_button_container">
                    <button type="submit">Login</button>
                </section>
            </form>
            <h1>Register</h1>
            <form onSubmit={registerUser} id="register_form" className="">
                <section className="form_group">
                    <label htmlFor="register_username">Username:</label>
                    <input name="username" type="text" id="register_username" required />
                </section>
                <section className="form_group">
                    <label htmlFor="register_password">Password:</label>
                    <input name="password" type="password" id="register_password" required />
                </section>
                <section className="submit_button_container">
                    <button type="submit">Register</button>
                </section>
            </form>
        </section>
    );
}

export default LoginForm;