import React, { useState } from "react";
import "../../style/customizer.css";
import Info from "@material-ui/icons/Info";

function Customizr() {
  const [imagePreview, setImagePreview] = useState(null);
  const [err, setErr] = useState(false);

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
              <input type="text" className="cus-form" id="Name" required/>
              <label>Name of design</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="Small"
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
              />
              <label class="form-check-label" for="inlineRadio3">
                XL
              </label>
            </div>
            <div class="cus-group-select">
              <label for="">Clothes Type</label>
              <select  name="" id="">
                <option>Raymond</option>
                <option>Manyavar</option>
                <option>Polo England</option>
              </select>
            </div>
            <div class="cus-group-radio">
              <label for="color">Select Color</label>
              <input type="color" id="color"/>
              <div className="alert alert-info">
                <p>
                  <span><Info/></span>
                  The product color maybe slightly different from the selected color.
                </p>
              </div>
            </div>
            <button className=" btn ui-btn">Order </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Customizr;
