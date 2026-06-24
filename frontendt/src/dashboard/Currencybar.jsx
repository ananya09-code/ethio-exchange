import "./css/currencybar.css";
import { useState, useEffect } from "react";
import codelogo from "../lib/flags"
function Currencybar({ sentdata, setSelectedCurrency}) {
    const [selected, setSelected] = useState("");
    const [ondata, setondata] = useState([]);
    const [start,setstart]=useState(0)
    const [end,setend]=useState(5)

    function getsize(){
         if(start+5<ondata.length){
                setstart(start+5)
                setend((Math.min(end + 5, ondata.length)))
                }else{
                    setstart(0)
                    setend(5)
                }
    }

    useEffect(() => {
        if (sentdata?.length) {
            setondata(
                [...new Set(sentdata.map(item => item.currency_code))]
            );
        }
    }, [sentdata]);

return (
   <div className="bar-con">

    <div className="currency-scroll">
        {ondata.slice(start, end).map(currency => (
            <span
                key={currency}
                className={selected === currency ? "on" : "off"}
                onClick={() => {
                    setSelected(currency);
                    setSelectedCurrency(currency);
                }}
            >
                <img
                    src={
                        codelogo?.[currency?.toLowerCase()]
                            ? `https://flagcdn.com/w40/${codelogo[currency.toLowerCase()]}.png`
                            : "https://flagcdn.com/w40/un.png"
                    }
                    alt="flag"
                />
                {currency}
            </span>
        ))}
    </div>

    <button onClick={getsize}>
        {start + 5 < ondata.length
            ? <i className="fa-solid fa-angles-right"></i>
            : "less"}
    </button>

</div>
);
}

export default Currencybar;