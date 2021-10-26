import "./style/App.css";
import c1 from './assets/c1.jpg';
import c2 from './assets/c2.jpg';
import Slider from './components/Slider';
import { useHistory } from 'react-router-dom';


function App() {
  const history = useHistory();
  return (
    <>
      {/* banner */}
      <div className="container-fluid" id="top">
        <div className="detail">
          <h1 className="display-4 bg-green p-1 white"><em>Mumbai Creation</em></h1>
          <p className="display-4 white p-1">Shop Now </p>
        </div>
      </div>

      {/* card */}
      <div className="container-fluid p-0">
        <div className="jumbotron">
          <h1 className="bg-green white p-2"> Best Choice</h1>
          <div className="row">
            <div className="col-sm-6 mb-2">
              <div className="card" style={{ backgroundColor: "transparent" }}>
                <img src={c1} className="card-img-top img-fluid" alt="..." />
                <div className="card-body">
                  <h1 className="card-title">Mens Wear</h1>
                  <p className="card-text text-dark">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <button className="btn ui-btn" onClick={() => {
                    history.push({
                      pathname: "Men's Ware"
                    })
                  }}>SHOP THE EDIT</button>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card " style={{ backgroundColor: "transparent" }}>
                <img src={c2} className="card-img-top" alt="..." />
                <div className="card-body ">
                  <h1 className="card-title">Ladies Wear</h1>
                  <p className="card-text text-dark">Some example text to build on the card title and make up the bulk of the card's content.</p>
                  <button className="btn ui-btn" onClick={() => { history.push("/womenWare") }}>SHOP THE EDIT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* display */}

      <div className="container-fluid p-4">
        <div className="container-fluid">
          <h1 className="bg-green white p-2">Collection</h1>
          <div className="row">
            <div className="col-sm-3">
              <Slider image="https://picsum.photos/300/300?random=1" />
            </div>
            <div className="col-sm-3">
              <Slider image="https://picsum.photos/300/300?random=2" />
            </div><div className="col-sm-3">
              <Slider image="https://picsum.photos/300/300?random=3" />
            </div>
            <div className="col-sm-3">
              <Slider image="https://picsum.photos/300/300?random=4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
