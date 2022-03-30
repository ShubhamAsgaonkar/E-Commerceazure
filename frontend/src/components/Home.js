import React from "react";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import Slider from "./Slider";
import "../style/App.css";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  return (
    <div>
      {/* banner */}
      <div className="container-fluid" id="top">
        <div className="detail">
          <h1 className="display-4 bg-a_primary p-1 white">
            <em>Mumbai Creation</em>
          </h1>
          <p className="display-4 p-1 a_primary font-italic">Shop Now </p>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" id="wave">
        <path
          fill="#fff"
          fill-opacity="1"
          d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,208C672,203,768,149,864,149.3C960,149,1056,203,1152,197.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      {/* card */}
      <div className="container-fluid p-0">
        <div className="jumbotron bg-white">
          <h1 className="bg-a_primary white p-2"> Best Choice</h1>
          <div className="row">
            <div className="col-sm-6 mb-2">
              <div className="card" style={{ backgroundColor: "transparent" }}>
                <img src={c1} className="card-img-top img-fluid" alt="..." />
                <div className="card-body">
                  <h1 className="card-title">Mens Wear</h1>
                  <p className="card-text text-dark">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button
                    className="btn ui-btn"
                    onClick={() => {
                      history.push({
                        pathname: "Men's Ware",
                      });
                    }}
                  >
                    SHOP THE EDIT
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card " style={{ backgroundColor: "transparent" }}>
                <img src={c2} className="card-img-top" alt="..." />
                <div className="card-body ">
                  <h1 className="card-title">Ladies Wear</h1>
                  <p className="card-text text-dark">
                    Some example text to build on the card title and make up the
                    bulk of the card's content.
                  </p>
                  <button
                    className="btn ui-btn"
                    onClick={() => {
                      history.push("/womenWare");
                    }}
                  >
                    SHOP THE EDIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* display */}
{/* 
      <div className="container-fluid p-4">
        <div className="container-fluid">
          <h1 className="bg-a_primary white p-2">Collection</h1>
          <div className="row">
            <div className="col-sm-3">
              <Slider image="https://picsum.photos/300/300?random=1" />
            </div>
            <div className="col-sm-3">
              <Slider image="https://picsum.photos/300/300?random=2" />
            </div>
            <div className="col-sm-3">
              <Slider image="https://picsum.photos/300/300?random=3" />
            </div>
            <div className="col-sm-3">
              <Slider image="https://picsum.photos/300/300?random=4" />
            </div>
          </div>
        </div>
      </div> */}

      <footer className="bg-dark text-light p-1 d-flex justify-content-center">
        <p className="p-1">Made by: Gulam Ahmad &copy;2022</p>
      </footer>
    </div>
  );
}
