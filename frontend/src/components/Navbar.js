import "../style/nav.css";

// export default Navbar;
import Home from "./Home";
import Toggler from "./Toggler";
import MenMenu from "./Submenu/Mensware";
import WomenMenu from "./Submenu/Womenware";
import Profile from "./Profile";
import Cart from "./Cart";
import DescProduct from "./Submenu/DescProduct";
import DescProduct2 from "./Submenu/DescProduct2";
import Order from "./Order";
import Orderhistory from "./Orderhistory";
import Customizr from "./Submenu/Customizr";

// export react component;
import { UserContext } from "./Context";
import { useState, useEffect, useCallback } from "react";
import PersonIcon from "@material-ui/icons/Person";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import Axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState({});
  const [cartItem, setCartItem] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  //function to display total no of item in cart

  const getCartItem = async () => {
    await Axios.get(`http://localhost:3002/cart/${user.Id}`).then((res) => {
      setCartItem(res.data.length);
    });
  };

  useEffect(() => {
    getCartItem();
  }, [user, getCartItem]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <nav className="navbar navbar-expand-md navbar-light bg-a_primary">
          <a className="navbar-brand" href="/">
            MumbaiCreation
          </a>
          <button
            className="navbar-toggler white"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ">
              <li className="nav-item ">
                <Link to={{ pathname: "/" }} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={{ pathname: "/Men's Ware" }} className="nav-link">
                  Men
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/womenWare" className="nav-link">
                  Women
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Customize" className="nav-link">
                  Customize
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {user.role === undefined ? (
                <li className="nav-item">
                  <Link to="/Login" className="nav-link ">
                    <PersonIcon />
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <PersonIcon />
                    Profile
                  </Link>
                  <div class="dropdown-menu">
                    <Link to="/Profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/OrderHistory" className="dropdown-item">
                      Order History
                    </Link>
                    <Link
                      to="/Login"
                      className="dropdown-item"
                      onClick={() => {
                        localStorage.removeItem("user");
                        setUser({});
                      }}
                    >
                      <PowerSettingsNewIcon /> Logout
                    </Link>
                  </div>
                </li>
              )}
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  <ShoppingCartIcon />
                  Cart <span className="badge badge-light">{cartItem}</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          {user.role === undefined ? (
            <Route path="/Login" component={Toggler} />
          ) : (
            <Route path="/Profile" component={Profile} />
          )}
          <Route path="/Men's Ware" component={MenMenu} />
          <Route path="/womenWare" component={WomenMenu} />
          <Route
            path="/descProduct/:id"
            component={() => <DescProduct setCartItem={getCartItem} />}
          />
          <Route
            path="/descProduct2/:id"
            component={() => <DescProduct2 setCartItem={getCartItem} />}
          />
          <Route
            path="/cart"
            component={() => <Cart setCartItem={getCartItem} />}
          />
          <Route path="/order/:userId" component={Order} />
          <Route path="/customize" component={Customizr} />
          <Route path="/OrderHistory" component={Orderhistory} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default Navbar;
