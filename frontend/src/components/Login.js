import { useState, useContext} from "react";
import Axios from "axios";
import "../style/Login.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "./Context";

const Login = (props) => {
  const history = useHistory();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState();

  const { user, setUser } = useContext(UserContext);


  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/get", {
      username: username,
      password: password,
    }).then((res) => {
      if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
          history.push("/Profile");
          window.location.reload(true);
      } else {
        console.log(res.data);
        alert("worng password");
      }
    });
  };

  return (
    <div className="main a_primary">
      <form className="container p-3 border shadow">
        <h1 className="text-center mb-4 ">Login</h1>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            required
            onChange={(e) => setusername(e.target.value)}
          />
          <label>Name</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <button className="btn btn-block ui-btn" onClick={login}>
          Login
        </button>
        <p className="text-center p">OR</p>
        <input
          type="button"
          value="Sign up"
          className="btn btn-block ui-btn"
          onClick={(event) => props.onClick(event)}
        />
        <br />
      </form>
    </div>
  );
};

export default Login;
