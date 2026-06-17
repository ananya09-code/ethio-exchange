import Searchcard from "../banks/Searchcard"
import Header from "../Layout/Header"
import Mainbar from "../Layout/Mainbar"
import Footer from "../Layout/Footer"
import Bankcard from "../banks/Bankcard"
import { useState } from "react"
import "./css/bank.css"
import Aboutcard from "../banks/Aboutcard"

function Banks({data, onDateChange}) {

    const [selecteddate,setSelecteddate] = useState(
        new Date().toISOString().split("T")[0]
    )

    const [selectedcurrency,setSelectedcurrency] = useState("")
    const [seacheditems,setseacheditem]=useState(null)

    const [selectedBank,setSelectedBank] = useState(null)
    const handleDateChange = (date) => {
  setSelecteddate(date);     // local
  onDateChange(date);        // send outside
};
    return(
        <div className="app">

            <Header />

            <div className="body">

                <Mainbar />

                <div className={`main ${selectedBank ? "with-about" : "no-about"}`}>

                    <div className="bank-con">

                        <Searchcard 
                            data={data}
                            onselectdate={handleDateChange}
                            onselectcurrency={setSelectedcurrency}
                            searcheditem={setseacheditem}
                        />

                    </div>
                        <Bankcard 
                            data={data}
                            selectedDate={selecteddate}
                            selectedCurrency={selectedcurrency}
                            onView={(bank)=>setSelectedBank(bank)}
                            seacheditems={seacheditems}
                        
                        /></div>





               


                
                    {
                    selectedBank && (

                        <div className="about">

                            <Aboutcard 
                                bank={selectedBank}
                                data={data}
                                buttonaction={setSelectedBank}
                            />

                        </div>

                    )
                    } 
            </div>

            <Footer/>

        </div>
    )
}


export default Banks