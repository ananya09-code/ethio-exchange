import "./css/aboutfeatures.css";

const featuresData = [
  {
    title: "Live Exchange Rates",
    description: "View real-time buy and sell rates from multiple banks.",
    icon: "fa-solid fa-hand-holding-dollar"
  },
  {
    title: "Bank Comparison",
    description: "Compare rates across different Ethiopian banks instantly.",
    icon: "fa-solid fa-building-columns"
  },
  {
    title: "Market Insights",
    description: "See highest and lowest rates for each currency.",
    icon: "fa-solid fa-chart-column"
  },
  {
    title: "Responsive Design",
    description: "Works smoothly on mobile, tablet, and desktop.",
    icon: "fa-solid fa-mobile-screen"
  },
  {
    title: "Developer API",
    description: "Access exchange rate data programmatically.",
    icon: "fa-solid fa-code"
  },
  {
    title: "Fast Updates",
    description: "Automatically updates latest available rates.",
    icon: "fa-solid fa-bolt"
  }
];

function Aboutfeatures() {
  return (
 <div className="features-section">
  <h1 className="features-title">Features</h1>

  <div className="feature-con">
    {featuresData.map((e, index) => (
      <div className="feature-card" key={index}>
        <i className={e.icon}></i>

        <div className="text-part">
          <h2>{e.title}</h2>
          <p>{e.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}

export default Aboutfeatures;