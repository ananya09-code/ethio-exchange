import Searchcard from "../banks/Searchcard"
import Header from "../Layout/Header"
import Mainbar from "../Layout/Mainbar"
import Footer from "../Layout/Footer"
import Bankcard from "../banks/Bankcard"
import { useState } from "react"


function Banks({data}){

    const [selecteddate,setSelecteddate] = useState(
        new Date().toISOString().split("T")[0]
    )

    const [selectedcurrency,setSelectedcurrency] = useState("")


    return(
        <div className="app">

            <Header />

            <div className="body">

                <Mainbar />

                <div className="main">

                    <Searchcard 
                        data={data}
                        onselectdate={setSelecteddate}
                        onselectcurrency={setSelectedcurrency}
                    />


                    <Bankcard 
                        data={data}
                        selectedDate={selecteddate}
                        selectedCurrency={selectedcurrency}
                    />

                </div>

            </div>

            <Footer/>

        </div>
    )
}

export default Banks