import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Abouthero from "../about/Abouthero";
import Aboutwhat from "../about/Aboutwhat";
import Aboutwhy from "../about/Aboutwhy";
import Aboutfeatures from "../about/Aboutfeatures";
import Aboutstack from "../about/Aboutstack";

import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const goToRates = () => {
    navigate("/dashboard");
  };

  const goToApi = () => {
    navigate("/api");
  };

  return (
    <div className="app">
      <Header />

      <div className="body">
        <div className="main">
          <Abouthero onrates={goToRates} onapi={goToApi} />

          <Aboutwhat />
          <Aboutwhy />
          <Aboutfeatures />
          <Aboutstack />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;