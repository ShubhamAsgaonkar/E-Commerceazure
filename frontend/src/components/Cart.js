import React, { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "./Context";
import { useHistory } from "react-router";
import ShoppingCartCheckoutIcon from "@material-ui/icons/ShoppingCart";
import cartImage from "../assets/man-shopping.png";
import Axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Cart = (props) => {
  const { user, serUser } = useContext(UserContext);
  const history = useHistory();
  const [product, setProduct] = useState([]);

  const getProduct = useCallback(() => {
    Axios.get(`http://localhost:3002/cart/${user.Id}`).then((res) => {
      setProduct(res.data);
    });
  }, [user]);

  const removeFromCart = (item) => {
    Axios.delete(`http://localhost:3002/cart/${item.Id}`).then((res) => {
      getProduct();
        toast.warning("Product removed from cart",{autoClose:2000});
        props.setCartItem();
    });
  };


  const changeQuantity = (item, e) => {
    console.log(user.Id, item.productId, e.target.value);
    Axios.post(`http://localhost:3002/cart/${user.Id}/${item.productId}`, {
      quantity: parseInt(e.target.value),
    }).then((res) => {
      getProduct();
      console.log(res);
    });
  };

  useEffect(() => {
    getProduct();
    props.setCartItem();
  }, [getProduct]);

  return (
    <div className="d-flex justify-content-center" style={{ height: "90vh" }}>
      {user.role === undefined ? (
        <div className="d-flex align-items-center" style={{ height: "90vh" }}>
          <button
            className="btn btn-lg btn-primary bg-a_primary"
            onClick={() => {
              history.push("/login");
            }}
          >
            Please Login
          </button>
        </div>
      ) : (
        <div>
          {product.length === 0 ? (
            <div
              className="d-flex align-items-center "
              style={{ height: "90vh" }}
            >
              <figure className="figure">
                <img
                  src={cartImage}
                  alt="cart"
                  style={{ width: "100px", height: "100px" }}
                />
                <figcaption className="figure-caption text-xs-right">
                  No Product Added
                </figcaption>
              </figure>
            </div>
          ) : (
            <div
              className="d-flex align-items-start mt-4"
              style={{ width: "90vw" }}
            >
              <table className="table ">
                <thead className="bg-a_primary white">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                {product.map((item) => {
                  return (
                    <tbody>
                      <tr>
                        <td className="d-flex">
                          <img
                            src={new Buffer.from(item.pimg).toString("ascii")}
                            className="img-fluid"
                            alt="product"
                            style={{ width: "100px", aspectRatio: "2/3" }}
                          />
                          <div className="prod pl-3 ">
                            <h3 className="text-capitalize">{item.pname}</h3>
                            <p>Size: {item.psize} </p>
                            <p className="text-muted">Price: {item.pprice}</p>
                            <button
                              className="btn ui-btn"
                              onClick={() => {
                                removeFromCart(item);
                              }}
                            >
                              {" "}
                              Remove
                            </button>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => changeQuantity(item, e)}
                            style={{ width: "40px" }}
                          />
                        </td>
                        <td>&#8377;{item.quantity * item.pprice}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div class="card ml-2" style={{ width: "20vw" }}>
                <div class="card-body">
                  <h4 class="card-title">Payment Summary</h4>
                  <table className="table">
                    <tr>
                      <th>User</th>
                      <td>{user.username}</td>
                    </tr>
                    <tr>
                      <th>Order Total</th>
                      <td>
                        &#8377;
                        {product.reduce((acc, item) => {
                          return acc + item.quantity * item.pprice;
                        }, 0)}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" className="text-center">
                        <button
                          className="btn ui-btn"
                          onClick={() => {
                            history.push(`/order/${user.Id}`);
                          }}
                        >
                          <ShoppingCartCheckoutIcon />
                          Check Out
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
