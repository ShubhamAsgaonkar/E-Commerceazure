import { useState } from "react";
import Login from './Login';
import Register from './register';

const Toggler = () => {
    const [isLogged, setIsLogged] = useState(true);

    return (
        <div>
            {isLogged === true && <Login onClick={() => setIsLogged(!isLogged)} />}
            {isLogged === false && <Register onClick={() => setIsLogged(!isLogged)} />}
        </div>
    );
}

export default Toggler;