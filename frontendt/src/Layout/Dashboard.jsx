import CurrencyTable from "../dashboard/Currencytable";
import Calculator from "../dashboard/Calculator";
import Popluar from "../dashboard/Popluar"

import "../css/dashboard.css";
function Dashboard({data,selectedBank,Currency}) {
  return (
    <div className="dashboard">
      <h1 className="dash"><i class="fa-solid fa-chart-column"></i> Dashboard</h1>
       <Popluar selectedCurrency={Currency}/>

       <div className="con-p">
      <CurrencyTable data={data} selected={selectedBank} selectedCurrency={Currency}/>
      <Calculator data={data} />
      </div>
      
     
    </div>
  );
}

export default Dashboard;