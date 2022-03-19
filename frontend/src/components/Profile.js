import React from "react";
import { useContext } from "react";
import { UserContext } from "./Context";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useHistory } from "react-router";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  return (
    <div>
      <div className="container border mt-3 shadow a_secondary">
        <button
          className="btn btn-transparent a_primary"
          data-toggle="tooltip"
          data-placement="top"
          title="Logout"
          onClick={() => {
            setUser({});
            localStorage.removeItem("user");
            history.push("/Login");
          }}
        >
          <PowerSettingsNewIcon />
        </button>
        <img
          src="https://picsum.photos/200/200"
          class="img-fluid mx-auto d-block rounded-circle p-2"
          alt=""
        />
        <table className="table a_secondary">
          <tr className="text-capitalize">
            <th>Name</th>
            <th>{user.username}</th>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{user.address}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>{user.role}</td>
          </tr>
        </table>
      </div>
      <hr />
      <div class="footer text-center w-100 ">
        <p class="muted">Get in touch with:</p>
        <EmailIcon />
        <FacebookIcon />
        <LinkedInIcon />
      </div>
    </div>
  );
}
