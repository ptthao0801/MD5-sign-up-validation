import React, { useState } from 'react';
import './App.css';

function App() {
    const message_error = {
        username: 'Username error',
        email: 'Email error',
        password: 'Password error',
        confirmPassword: 'Password must be the same'
    };

    const regex = {
        username: /^[a-zA-Z]{2,}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^[a-zA-Z0-9!@#$%^&*()+=._-]{6,}$/
    };

    const [form, setForm] = useState({});

    function handleChange(e) {
        let error = '';
        if (e.target.name === 'password') {
            if (form.confirmPassword && form.confirmPassword.value) {
                error = e.target.value === form.confirmPassword.value ? "" : message_error[e.target.name];
            } else {
                error = regex[e.target.name].test(e.target.value) ? "" : message_error[e.target.name];
            }
        } else if (e.target.name === 'confirmPassword') {
            error = e.target.value === form.password.value ? "" : message_error[e.target.name];
        } else {
            error = regex[e.target.name].test(e.target.value) ? "" : message_error[e.target.name];
        }

        setForm({
            ...form,
            [e.target.name]: { value: e.target.value, error: error }
        });
    }

    function handleSubmit() {
        const isFilled =
            form.username && form.username.value &&
            form.email && form.email.value &&
            form.password && form.password.value &&
            form.confirmPassword && form.confirmPassword.value;

        const isError =
            isFilled &&
            (form.username.error ||
                form.email.error ||
                form.password.error ||
                form.confirmPassword.error);

        alert(
            isFilled && !isError ? 'Signed up successfully!' : 'Please fill out all the fields'
        );
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form>
                <div
                    className={`custom-input ${form.username &&
                        form.username.error &&
                        "custom-input-error"}`}
                >
                    <label>Username </label>
                    <input
                        name="username"
                        value={(form.username && form.username.value) || ""}
                        onChange={handleChange}
                    />
                    {form.username && form.username.error && (
                        <p className="error">{form.username.error}</p>
                    )}
                </div>
                <div
                    className={`custom-input ${form.email &&
                        form.email.error &&
                        "custom-input-error"}`}
                >
                    <label>Email </label>
                    <input
                        name="email"
                        value={(form.email && form.email.value) || ""}
                        onChange={handleChange}
                    />
                    {form.email && form.email.error && (
                        <p className="error">{form.email.error}</p>
                    )}
                </div>
                <div
                    className={`custom-input ${form.password &&
                        form.password.error &&
                        "custom-input-error"}`}
                >
                    <label>Password </label>
                    <input
                        type="password"
                        name="password"
                        value={(form.password && form.password.value) || ""}
                        onChange={handleChange}
                    />
                    {form.password && form.password.error && (
                        <p className="error">{form.password.error}</p>
                    )}
                </div>
                <div
                    className={`custom-input ${form.confirmPassword &&
                        form.confirmPassword.error &&
                        "custom-input-error"}`}
                >
                    <label>Confirm password </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={(form.confirmPassword && form.confirmPassword.value) || ""}
                        onChange={handleChange}
                    />
                    {form.confirmPassword && form.confirmPassword.error && (
                        <p className="error">{form.confirmPassword.error}</p>
                    )}
                </div>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default App;
