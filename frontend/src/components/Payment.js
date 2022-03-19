import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { UserContext } from "./Context";
import {useHistory} from 'react-router-dom';

toast.configure();

function Payment() {
  const params = useParams();
  const { user, serUser } = useContext(UserContext);
  const [product, setProduct] = useState({});

  const history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:3002/cart/${params.userId}`).then((res) => {
      setProduct(res.data);
    });
  }, []);

  const removeFromCart = () => {
    Axios.delete(`http://localhost:3002/cart/`).then((res) => {
      console.log(res);
    });
  };

  const order = (product) => {
    product.map((item) => {
      Axios.post(`http://localhost:3002/order`, {
        userId: user.Id,
        productId: item.productId,
        pname: item.pname,
        pprice: item.pprice,
        pimg: new Buffer.from(item.pimg).toString("ascii"),
        quanitiy: item.quantity,
        address: user.address,
        payment: "Paid",
      });
    });
    history.push("/OrderHistory");
  };

  const buyNow = async () => {
    const res = await Axios.post(`http://localhost:3002/payment`, {
      product: product,
    });

    if (!res.status == 200) {
      toast.error("Payment Failed", { autoClose: 2000 });
    }

    let price = product.reduce((acc, item) => {
      return acc + item.quantity * item.pprice;
    }, 0);

    const options = {
      key: "rzp_test_n7mL4hR33brspJ",
      currency: "INR",
      name: "MUMBAI Creation",
      amount: price * 100,
      description: "Test Transaction",
      handler: function () {
        removeFromCart();
        toast.success("Payment Successful", { autoClose: 2000 });
        order(product);
      },
      prefill: {
        name: "Gulam Ahmad",
        email: "ahmad@example.com",
        contact: "8999998888",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  };

  return (
    <div>
      <button className="btn ui-btn" onClick={() => buyNow()}>
        <CreditCardIcon />
        Pay now
      </button>
    </div>
  );
}

export default Payment;
