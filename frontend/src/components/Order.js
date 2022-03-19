import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./Context";
import Payment from "./Payment";
import Axios from "axios";
import {useHistory} from 'react-router-dom';

function Order() {
  const { user, setUser } = useContext(UserContext);
  const [payMethod, setPayMethod] = useState("COD");
  const [product, setProduct] = useState({});
  const history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:3002/cart/${user.Id}`).then((res) => {
      setProduct(res.data);
    });
  }, []);

  const removeFromCart = () => {
    Axios.delete(`http://localhost:3002/cart/`).then((res) => {
      console.log(res);
    });
  };
  const order = () => {

    const confirmBox = window.confirm("Are you sure you want to order?");
    if (confirmBox) {
    product.map((item) => {
      Axios.post(`http://localhost:3002/order`, {
        userId: user.Id,
        productId: item.productId,
        pname: item.pname,
        pprice: item.pprice,
        pimg: new Buffer.from(item.pimg).toString("ascii"),
        quanitiy: item.quantity,
        address: user.address,
        payment: payMethod,
      });
    });
    removeFromCart();
    history.push('/OrderHistory');
  }
  else{
    alert(`Order Cancelled ${payMethod}`);
  }

  };

  return (
    <div className="container-fluid">
      <div className="container mt-5" style={{ width: "clamp(90%,50%,50vw)" }}>
        <h1 className="text-center mb-5 display-4">Place Order</h1>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <input
                type="text"
                class="form-control border"
                disabled
                value={user.username}
              />
              <label for="">Username:</label>
            </div>

            <div class="form-group">
              <input
                type="email"
                class="form-control border"
                disabled
                value={user.email}
              />
              <label for="">Email:</label>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control border"
                disabled
                value={user.phone}
              />
              <label for="">Phone:</label>
            </div>

            <div class="form-group">
              <input
                type="text"
                class="form-control border border-success text-dark"
                value={user.address}
              />
              <label for="">Address:</label>
            </div>
          </div>

          <div class="col-sm-6">
            <label className="lead">Payment Method:</label>
            <div class="form-group">
              <input
                type="radio"
                name="payment"
                value="cash"
                onChange={() => setPayMethod("COD")}
                checked = {payMethod === "COD"}
              />{" "}
              <span className="mr-3"> Cash on Delivery</span>
              <input
                type="radio"
                name="payment"
                value="card"
                onChange={() => setPayMethod("card")}
              />{" "}
              <span className="mr-3"> Pay with card</span>
            </div>
            {payMethod === "card" ? (
              <Payment/>
            ) : (
              <button className="btn ui-btn" onClick={()=> order()}>
                Place order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
