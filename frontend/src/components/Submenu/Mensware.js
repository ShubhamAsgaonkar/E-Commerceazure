import { useEffect, useState, useContext } from "react";
import "../../style/menware.css";
import Axios from "axios";
import { UserContext } from "../Context";
import AddProduct from "./Addproduct";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const MenMenu = () => {
  const history = useHistory();
  const { user, serUser } = useContext(UserContext);
  const [product, setProduct] = useState([]);


  const addProduct = () => {
    Axios.get("http://localhost:3002/menware").then((res) => {
      setProduct(res.data);
    });
  };

  const addToCart = (id) => {

    Axios.post(`http://localhost:3002/cart`, {
      userId: user.Id,
      productId: id.id,
      pname: id.p_name,
      pprice: id.p_price,
      psize: id.p_size[0],
      pimg: new Buffer.from(id.p_img).toString("ascii"),
    })
      .then((res) => {
        history.push(`/order/${user.Id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    addProduct();
  }, []);

  return (
    <>
      {/* displaying Add Button when Admin in logged in  */}
      {user.role === "admin" && <AddProduct />}

      {/* rendering porducts */}
      <div className="grid-container">
        {product.map((e, i, arr) => {
          return (
            <div className="card-d bg-a_primary rounded white" key={i}>
              {user.role === "admin" && (
                //button to delete product fro Admin only
                <div>
                  <div className="delete-icon">
                    <DeleteIcon
                      onClick={() => {
                        Axios.delete(
                          `http://localhost:3002/menware/delete/${e.id}`
                        );
                        addProduct();
                      }}
                    />
                  </div>
                </div>
              )}

              {/* converting the image to base64 */}
              <img
                src={new Buffer.from(e.p_img).toString("ascii")}
                className="img-fluid crd-img"
                alt="Denim Jeans"
                style={{ width: "100%" }}
                onClick={() => history.push(`/descProduct/${e.id}`)}
              />

              {/* displaying the product details     */}
              <div className="details text-dark">
                <h5 className="text-capitalize ">{e.b_name}</h5>
                <p>{e.p_name}</p>
                <p>&#8377;{e.p_price}</p>
              </div>
              <button
                className="btn btn-primary btn-block buy"
                onClick={() => {
                  user.role === undefined
                    ? history.push("/login")
                    :addToCart(e);
                }}
              >
                {" "}
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenMenu;
