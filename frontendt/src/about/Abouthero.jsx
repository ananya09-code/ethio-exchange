import "./css/abouthero.css";

function Abouthero({ onrates, onapi }) {
  return (
    <div className="about-hero">
      <h1>Birrify</h1>
      <h5>A real-time Ethiopian bank exchange rate comparison platform.</h5>
      <p>Built for developers, traders, and everyday users.</p>

      <div className="two-con">
        <button onClick={onrates}>
          View Live Rates <i className="fa-solid fa-building-columns"></i>
        </button>

        <button onClick={onapi}>
          Explore API <i className="fa-solid fa-tower-cell"></i>
        </button>
      </div>
    </div>
  );
}

export default Abouthero;