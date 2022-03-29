import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./Context";
import Axios from "axios";

function Orderhistory() {
  const [product, setProduct] = useState([]);
  const { user, serUser } = useContext(UserContext);
  useEffect(() => {
    Axios.get(`http://localhost:3002/order/${user.Id}`).then((res) => {
      setProduct(res.data);
    });
  }, []);
  return (
    <div
      className=""
      style={{ height: "90vh" }}
    >
      {product.length === 0 ? (
        <h1 class="display-4 text-center">Nothing purchased yet</h1>
      ) : (
        <div>
          {product.map((item) => {
            return (
              <div
                className="d-flex align-items-center"
                style={{
                  width: "70vw",
                  height: "30vh",
                  border: "1px solid black",
                  margin: "10px",
                }}
              >
                <img
                  src={new Buffer.from(item.pimg).toString("ascii")}
                  className="img-fluid"
                  alt={item.pname}
                  style={{ width: "100px", aspectRatio: "1/1.5" }}
                />
                <div class="descr ml-3 text-capitalize p-2">
                  <h1>{item.pname}</h1>
                  <h4>&#8377;{item.pprice}</h4>
                  <h4>qnty: {item.quantity}</h4>
                  {item.payment === "COD" ? (
                    <h4>Payment: <span class="badge badge-pill badge-warning">COD</span> </h4> 
                  ) : (
                    <h4>Payment: <span class="badge badge-pill badge-success">Paid</span> </h4>
                  )     
                  }
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orderhistory;
