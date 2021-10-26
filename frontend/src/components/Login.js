import { useState } from 'react';
import Axios from 'axios';
import '../style/Login.css';


const Login = (props) => {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const [loginstatus, setloginstatus] = useState("")

    const login = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then(res => {

            if (res.data.message) {
                setloginstatus(res.data.message)
            } else {
                setloginstatus(res.data[0].username)
            }
        })
    }

    return (
        <div className="main green">
            <form className="container p-3 border shadow">
                <h1 className="text-center mb-4 ">Login</h1>
                <div className="form-group">
                    <input type="text" className="form-control" required onChange={(e) => setusername(e.target.value)} />
                    <label>Name</label>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" onChange={(e) => setpassword(e.target.value)} required />
                    <label>Password</label>
                </div>
                <button className="btn btn-block ui-btn" onClick={login}>Login</button>
                <p className="text-center p">OR</p>
                <input type="button" value="Sign up" className="btn btn-block ui-btn" onClick={(event) => props.onClick(event)} />
                <br />
                <h4 className="text-center">user login : {loginstatus}</h4>
            </form>

        </div>
    );
}

export default Login;