import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./Context";
import Axios from "axios";

function Orderhistory() {
  const [product, setProduct] = useState([]);
  const [customPrd, setcustomPrd] = useState([]);
  const { user, serUser } = useContext(UserContext);
  useEffect(() => {
    Axios.get(`http://localhost:3002/order/${user.Id}`).then((res) => {
      setProduct(res.data);
      console.log(res.data);
    });
    Axios.get(`http://localhost:3002/customizer/${user.Id}`).then((res) => {
      setcustomPrd(res.data);
    });
  }, []);
  return (
    <div className="" style={{ height: "90vh" }}>
      {product.length === 0 ? (
        <h1 class="display-4 text-center">Nothing purchased yet</h1>
      ) : (
        <>
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
                      <h4>
                        Payment:{" "}
                        <span class="badge badge-pill badge-warning">COD</span>{" "}
                      </h4>
                    ) : (
                      <h4>
                        Payment:{" "}
                        <span class="badge badge-pill badge-success">Paid</span>{" "}
                      </h4>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h1 className="p-2">Custom Ordered Product</h1>
            {customPrd.length === 0 ? <h4 className="p-2 m-2 border border-dark w-50">no custom product ordered</h4>:(<>
            {customPrd.map((item) => {
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
                    src={new Buffer.from(item.c_image).toString("ascii")}
                    className="img-fluid"
                    alt={item.c_name}
                    style={{ width: "100px", aspectRatio: "1/1.5" }}
                  />
                  <div class="descr ml-3 text-capitalize p-2">
                    <h1>{item.c_name}</h1>
                    <h4>Size: {item.c_size}</h4>
                    <h4>Clothe quality: {item.c_type}</h4>
                    <div class="alert alert-info" role="alert">
                      <strong>
                        We Will contact you soon regarding this product
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
            </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Orderhistory;
