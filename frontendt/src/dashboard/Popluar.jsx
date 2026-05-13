
import React, { useState, useEffect } from 'react';
import "../css/Popluar.css";
import axios from 'axios';

function Popluar({ selectedCurrency }) {

  const [data, setData] = useState({});
  const [dataaverage, setDataaverage] = useState({});

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.post(
          `http://127.0.0.1:8000/high&low/${selectedCurrency}`
        );

        setData(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    if (selectedCurrency) {
      fetchData();
    }

  }, [selectedCurrency]); 










    useEffect(() => {

    const fetchaverage = async () => {

      try {

        const response = await axios.post(
          `http://127.0.0.1:8000/avage/${selectedCurrency}`
        );

        setDataaverage(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    if (selectedCurrency) {
      fetchaverage();
    }

  }, [selectedCurrency]); 

  return (
    <div className="card-con">

      <div className="aver-buy">
        <h4>
          <i className="fa-regular fa-credit-card"></i> {selectedCurrency} Average Buy
        </h4>

        <h3>{dataaverage.average_buy ?? "..."} Birr</h3>
        <p>Across all banks</p>
      </div>

      <div className="aver-sell">
        <h4>
          <i className="fa-solid fa-shop"></i> {selectedCurrency} Average Sell
        </h4>

        <h3>{dataaverage.average_sell?? "..."} Birr</h3>
        <p>Across all banks</p>
      </div>

      <div className="high-buy">
        <h4>
          <i className="fa-solid fa-arrow-trend-up"></i> Highest Buy Rate
        </h4>

        <h3>{data.highest?.buy ?? "..."} Birr</h3>
        <p>{data.highest?.bank_name} ({selectedCurrency})</p>
      </div>

      <div className="low-sell">
        <h4>
          <i className="fa-solid fa-arrow-trend-down"></i> Lowest Sell Rate
        </h4>

        <h3>{data.lowest?.sell ?? "..."} Birr</h3>
        <p>{data.lowest?.bank_name} ({selectedCurrency})</p>
      </div>

    </div>
  );
}

export default Popluar;