import { useEffect, useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TodoList from './components/TodoList';

function App() {
    // Global variables and states
    const API_URL = "http://localhost:3000"
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState(null);

    function getAuthToken() {
        const cookies = document.cookie.split('; ');
        // Find authToken among all cookies on website
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === "authToken") {
                return cookieValue;
            }
        }
        return null;
    }

    useEffect(() => {
        // Check if user is logged in
        const token = getAuthToken();
        if (token) {
            setIsLoggedIn(true);
            setAuthToken(token);
        }
    }, []);

  return (
    <>
        {!isLoggedIn ? (
            <section id="login_register_container">
                <LoginForm 
                    onLoginSuccess={() => {
                        setIsLoggedIn(true);
                    }} 
                    setAuthToken={setAuthToken}
                    API_URL={API_URL} />
                <RegisterForm API_URL={API_URL} />
            </section>
        ) : (
            <>
                <TodoList 
                    //onAddTodo={addTodoListItem} 
                    API_URL={API_URL} 
                    onLogoutUser={() => setIsLoggedIn(false)}
                    authToken={authToken} 
                />
            </>
        )}
    </>
  )
}

export default App
