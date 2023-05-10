

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
        username
                    <input id="username-input" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
        password
                    <input id="password-input" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm