import { useEffect, useState } from "react";
import Axios from 'axios';
const MenMenu = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:3001/menware').then(res => {
            setProduct(res.data);
        })
    }, []);
    return (
        <div className="d-flex">
            {console.log(product)}
            {product.map((element, index) => {
                console.log(new Buffer.from(element.p_img).toString("base64"))
                return (
                    <div className="card m-3 " style={{ width: '18rem', boxShadow: '2px 2px 5px' }}>
                        <img src={"data:image/png;base64," + new Buffer.from(element.p_img).toString("base64")} alt={element.p_name} className="img-fluid" />
                        <div className="card-body">
                            <h5 className="card-title">{element.p_name}</h5>
                            <h6 className="card-subtitle mb-2 ">Rs. {element.p_price} </h6>
                            <p className="card-text">{element.p_desc}
                                {element.p_star}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default MenMenu;