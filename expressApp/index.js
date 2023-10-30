function Login () {
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <Header />
            <h2>Login</h2>
            <form>
                <label htmlfor="username-field">Username:</label>
                <input id="username-field" type="text" value={username} onChange={(e) => setName(e.target.value)} />
                <label htmlfor="password-field">Password:</label>
                <input id="password-field" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </form>    
            <p>Forgot Password? (Will be a link)</p>
            <Footer />
        </div>
    )
}

export default Login;