import "../style/Overlay.css";

const Card = () => {
    return (
        <div className="card-spe p-5">
            <img src="https://picsum.photos/100/100?random=1" alt="" />
            <div className="mask flex-center rgba-red-light">
                <p>some text </p>
            </div>
        </div>
    );
}

export default Card;