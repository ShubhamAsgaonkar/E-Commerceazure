import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import Axios from "axios";
import {toast} from "react-toastify";


toast.configure();
function Update(props) {
  const [option, setOption] = useState("");
  const [value, setValue] = useState("");
  const [body,setBody] = useState()

  const handleSubmit = () => {
    Axios.post(`http://localhost:3002/menware/update/${parseInt(props.id)}`, body).then((res) => {
            toast.success(`${option} has been succefully changed to ${value}`,{autoClose:2000});
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
        console.log(body);
  };

  const renderOptions = (option) => {
    switch (option) {
      case "p_size":
        return (
          <input
            type="text"
            value={value}
            onChange={(e)=>{setValue(e.target.value);setBody({p_size:e.target.value})}}
            className="form-control"
            placeholder="Enter New Size"
            required
          />
        );
      case "p_color":
        return (
          <input
            type="text"
            value={value}
            onChange={(e)=>{setValue(e.target.value);setBody({p_color:e.target.value})}}
            className="form-control"
            placeholder="Enter New Color"
            required
          />
        );
      case "p_price":
        return (
          <input
            type="Number"
            min="1"
            value={value}
            onChange={(e)=>{setValue(e.target.value);setBody({p_price:parseInt(e.target.value)})}}
            className="form-control"
            placeholder="Enter New Price"
            required
          />
        );
      case "b_name":
        return (
          <input
            type="text"
            value={value}
            onChange={(e)=>{setValue(e.target.value);setBody({b_name:e.target.value})}}
            className="form-control"
            placeholder="Enter New Brand"
            required
          />
        );
        case "descp":
          return (
            <input
              type="text"
              value={value}
              onChange={(e)=>{setValue(e.target.value);setBody({descp:e.target.value})}}
              className="form-control"
              placeholder="Enter New Brand"
              required
            />
          );
      case "p_img":
        return <input type="file" className="form-control" required />;
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e)=>{setValue(e.target.value);setBody({p_name:e.target.value})}}
            className="form-control"
            placeholder="Enter New Name"
            required
          />
        );
    }
  };

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#UPdate"
        data-backdrop="static"
        data-keyboard="false"
      >
        <EditIcon />
      </button>

      <div
        class="modal fade"
        id="UPdate"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-dark">Update</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <select
                    class="form-control"
                    id="option"
                    onChange={(e) => {
                      setOption(e.target.value);
                      setValue("")
                    }}
                  >
                    <option value="p_name">Name</option>
                    <option value="b_name">Brand</option>
                    <option value="p_price">Price</option>
                    <option value="p_color">Color</option>
                    <option value="p_size">Size</option>
                    <option value="p_img">Image</option>
                    <option value="descp">description</option>
                  </select>
                  <label for="option">Select value to update</label>
                </div>
                <div class="form-group">{renderOptions(option)}</div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleSubmit()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
