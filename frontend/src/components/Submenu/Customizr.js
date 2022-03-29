import React, { useState,useContext } from "react";
import "../../style/customizer.css";
import Info from "@material-ui/icons/Info";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { UserContext } from "../Context";


toast.configure();

function Customizr() {
  const [imagePreview, setImagePreview] = useState(null);
  const [err, setErr] = useState(false);
  const [dname, setDname] = useState("");
  const [dsize, setDsize] = useState("Small");
  const [dtype, setDtype] = useState("Raymond");
  const [dcolor, setDcolor] = useState("#000000");
  const { user, setUser } = useContext(UserContext);


  const handleChange = (e) => {
    const files = e.target.files[0];
    const AllowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (files && AllowedTypes.includes(files.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files);
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const orderNow = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/customizer", {
      userId: user.Id,
      c_name: dname,
      c_size: dsize,
      c_type: dtype,
      c_color: dcolor,
      c_image: imagePreview,
    }).then(()=>{
      toast.success("Customizer added to cart", { autoClose: 2000 });
    }).catch((err)=>{
      console.log(err);
      toast.error("Error in adding customizer to cart", { autoClose: 2000 });
    }) 
  };

  return (
    <div className="container w-75 mt-2 p-2">
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-end">
          <div
            className="img-container w-50"
            style={{
              background: imagePreview
                ? `url("${imagePreview}") no-repeat center/cover`
                : "#131313",
              height: "400px",
            }}
          >
            {!imagePreview && (
              <div className="text-light ">
                <p>Add Image</p>
                <label htmlFor="fileUpload" className="custLabel">
                  Choose File
                </label>
                <input
                  type="file"
                  className="customFile"
                  id="fileUpload"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          {imagePreview && (
            <button
              className="btn btn-outline-danger btn-block w-50 mt-1"
              onClick={() => {
                setImagePreview(null);
              }}
            >
              Remove
            </button>
          )}
          {err && (
            <div class="alert alert-danger w-50" role="alert">
              <strong>Invalid File type </strong>
            </div>
          )}
        </div>
        <div class="col-md-6">
          <form>
            <div class="cus-group">
              <input
                type="text"
                className="cus-form"
                id="Name"
                onChange={(e) => {
                  setDname(e.target.value);
                }}
                required
              />
              <label for="Name">Name of design</label>
            </div>
            <div class="form-check form-check-inline p-2">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="Small"
                checked
                onClick={(e) => {
                  setDsize(e.target.value);
                }}
              />
              <label class="form-check-label" for="inlineRadio1">
                S
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="Medium"
                onClick={(e) => {
                  setDsize(e.target.value);
                }}
              />
              <label class="form-check-label" for="inlineRadio2">
                M
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="Large"
                onClick={(e) => {
                  setDsize(e.target.value);
                }}
              />
              <label class="form-check-label" for="inlineRadio3">
                L
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="Ex-Large"
                onClick={(e) => {
                  setDsize(e.target.value);
                }}
              />
              <label class="form-check-label" for="inlineRadio3">
                XL
              </label>
            </div>
            <div class="cus-group-select p-2">
              <label for="type" className="mr-2">Clothes Type</label>
              <select
                name=""
                id="type"
                onChange={(e) => {
                  setDtype(e.target.value);
                }}
              >
                <option value="Raymond">Raymond</option>
                <option value="Manyavar">Manyavar</option>
                <option value="Polo-England">Polo England</option>
              </select>
            </div>
            <div class="cus-group-radio p-2">
              <label for="color" className="mr-2">Select Color</label>
              <input
                type="color"
                id="color"
                onChange={(e) => {
                  setDcolor(e.target.value);
                }}
              />
              <div className="alert alert-info mt-2">
                <p>
                  <span>
                    <Info />
                  </span>
                  The product color maybe slightly different from the selected
                  color.
                </p>
              </div>
            </div>
            <button
              className="btn ui-btn m-2"
              type="submit"
              onClick={(e) => {
                orderNow(e);
              }}
            >
              Order{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Customizr;
