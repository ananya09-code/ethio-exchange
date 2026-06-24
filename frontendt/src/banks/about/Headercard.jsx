import cbe from "../../assets/logo/CBE.png";
import "./css/headercard.css"
import { logos } from "../../lib/banklogo";
  function Headercard({bankdata,selectedbank}){
    console.log(selectedbank)
    return(
     <div className="headcard-con">

      <div className="upper">

        <div className="logo-box">
          <img   src={logos[selectedbank.bank_name.toLowerCase()] || cbe} alt={bankdata?.name} />
        </div>
          <h1>{bankdata?.name}</h1>
        </div>

        <div className="lower">

           <a 
          href={bankdata?.website}
          target="_blank"
          rel="noreferrer"
        >
          Visit Website
           </a>
   
          <span className="verified">
            <i className="fa-solid fa-check"></i>
            Verified
          </span>



       
   

      </div>
      </div>)
  }

  export default Headercard