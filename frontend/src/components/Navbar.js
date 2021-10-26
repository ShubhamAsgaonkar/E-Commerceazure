import '../style/nav.css';
import Images from './Images';
import Favorites from './Favorites';
import App from '../App';
import Toggler from './Toggler';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import MenMenu from './Submenu/Mensware';
import WomenMenu from './Submenu/Womenware';
const Navbar = () => {


    return (
        <>
            <Router>
                <nav className="navbar navbar-expand-md navbar-dark bg-green">
                    <a className="navbar-brand" href="/">MumbaiCreation</a>
                    <button className="navbar-toggler white" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon">
                        </span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ">
                            <li className="nav-item ">
                                <Link to={{ pathname: "/" }} className="nav-link">Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Images" className="nav-link">Images</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Favorites" className="nav-link">Favorites</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: "/Men's Ware" }} className="nav-link">Men</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/womenWare" className="nav-link">Women</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/Login" className="nav-link "><PersonIcon />Login </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link"><ShoppingCartIcon />Cart</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/Images" component={Images} />
                    <Route path="/Favorites" component={Favorites} />
                    <Route path="/Login" component={Toggler} />
                    <Route path="/Men's Ware" component={MenMenu} />
                    <Route path="/womenWare" component={WomenMenu} />
                </Switch>
            </Router>
        </>
    );
}

export default Navbar;