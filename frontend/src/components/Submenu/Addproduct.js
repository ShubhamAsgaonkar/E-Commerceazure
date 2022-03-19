import "../../style/Login.css";
import { useState } from "react";
import Axios from "axios";

const AddProduct = () => {
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [img, setImg] = useState(null);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImg(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const clearForm = (e) => {
    e.preventDefault();
    setBrand("");
    setProduct("");
    setColor("");
    setPrice("");
    setSize("");
    setImg(null);
  };

  const addProduct = () => {
    //  e.preventDefault();
    Axios.post("http://localhost:3002/product", {
      b_name: brand,
      p_name: product,
      p_color: color,
      p_price: price,
      p_size: size,
      p_img: img,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      {/* model to add porduct for admin */}
      <button
        type="button"
        className="btn btn-primary btn-lg m-2"
        data-toggle="modal"
        data-target="#modelId"
        data-backdrop="static"
        data-keyboard="false"
      >
        Add
      </button>

      <div
        className="modal fade"
        id="modelId"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                  <label for="name">Brand</label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="helpId"
                    value={product}
                    onChange={(e) => {
                      setProduct(e.target.value);
                    }}
                    required
                  />
                  <div className="invalid-feedback">PLease enter the name</div>
                  <label for="name">Product</label>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="helpId"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    required
                  />
                  <div className="invalid-feedback">PLease enter the name</div>
                  <label for="name">Price</label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="helpId"
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                    required
                  />
                  <div className="invalid-feedback">PLease enter the name</div>
                  <label for="name">Color</label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="helpId"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">PLease enter the name</div>
                  <label for="name">Size</label>
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={(e) => uploadImage(e)}
                    aria-describedby="fileHelpId"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={addProduct}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-primary ml-2"
                  onClick={clearForm}
                >
                  Clear
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProduct;
