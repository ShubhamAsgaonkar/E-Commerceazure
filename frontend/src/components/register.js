import { useState } from "react"
import Axios from "axios"
import '../style/Login.css';

const Register = (props) => {

    const [usernameReg, setusernameReg] = useState("")
    const [userpasswordReg, setuserpasswordReg] = useState("")

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: userpasswordReg,
        }).then(res => {
            console.log(res);
        })
    }
    return (
        <div className="main">
            <form className="container p-3 border shadow">
                <h1 className="text-center mb-4 green">Register <button type="button" class="close" onClick={(event) => props.onClick(event)}>
                    <span aria-hidden="true">&times;</span>
                </button></h1>

                <div className="form-group">
                    <input type="text" className="form-control" required onChange={(e) => setusernameReg(e.target.value)} />
                    <label>Name</label>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" onChange={(e) => setuserpasswordReg(e.target.value)} required />
                    <label>Password</label>
                </div>
                <button className="btn btn-block ui-btn" onClick={register}>Register</button>
            </form>
        </div>
    );
}

export default Register;