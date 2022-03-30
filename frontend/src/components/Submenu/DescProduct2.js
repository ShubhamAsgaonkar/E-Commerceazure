import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../Context";
import Axios from "axios";
import "../../style/desc.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";

toast.configure();

function DescProduct2(props) {
  const params = useParams();
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [psize, setpSize] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3002/womenware/byid/${params.id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id, Update]);

  const addToCart = (id) => {
    if ( psize === undefined || psize === "" || psize === null) {
      toast.error("Please select size", { autoClose: 2000 });
      console.log(psize);
    } else {
      Axios.post(`http://localhost:3002/cart`, {
        userId: user.Id,
        productId: id.id,
        pname: id.p_name,
        pprice: id.p_price,
        psize: psize,
        pimg: new Buffer.from(id.p_img).toString("ascii"),
      })
        .then((res) => {
          toast.success("Product added to cart", { autoClose: 2000 });
          props.setCartItem();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const size = () => {
    let size = product.p_size.split(" ");
    let filtered = size.filter(function (el) {
      return el != "";
    });
    return filtered;
  };

  const sizer = (val) => {
    setpSize(val);
    console.log(psize);
  };

  return (
    // renderinf the product details in the page
    <div>
      {user.role === "admin" && <Update id={params.id} />}
      {product.p_img !== undefined && (
        <div className="container-fluid product-display p-3 bg-a_primary mt-5 ">
          <div className="row">
            <div className="col-md-6">
              <img
                src={new Buffer.from(product.p_img).toString()}
                alt="product"
                className="img-fluid desc-img"
              />
            </div>
            <div className="col-md-6 product-details text-dark">
              <h2>{product.b_name}</h2>
              <p className="pname">{product.p_name}</p>
              <p className="price text-dark">&#8377; {product.p_price}</p>
              <div class="size-btn pb-3">
                <b>Size: &nbsp;</b>
                {size().map((item) => {
                  return (
                    <div class="form-check form-check-inline">
                      <label class="form-check-label">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="size"
                          value={item}
                          onClick={() => {
                            sizer(item);
                          }}
                          />
                        <span className="text-uppercase">{item}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
              <b>Details:</b>
              <p className="about_prod">{product.descp}</p>
              <button
                className="btn ui-btn"
                onClick={() => {
                  user.role === undefined
                    ? history.push("/login")
                    : addToCart(product);
                }}
              >
                Add to <ShoppingCartIcon />{" "}
              </button>
              <button
                className="btn ui-btn ml-2"
                onClick={() => {
                  if (
                    psize == "" ||
                    psize == null ||
                    psize == undefined
                  ) {
                    toast.error("Please select size", { autoClose: 2000 });
                  } else {
                    addToCart(product);
                    history.push(`/order/${user.Id}`);
                  }
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DescProduct2;
