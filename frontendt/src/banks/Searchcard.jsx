import { useEffect, useState } from "react"
import "./css/searchcard.css"

function Searchcard({data,onselectdate,onselectcurrency,searcheditem}){

    const [currencylist,setCurrencylist]=useState([])

    const [selectedcurrency,setselectedcurrency]=useState("")

    const [selectedDate,setSelectedDate]=useState(
        new Date().toISOString().split("T")[0]
    )
   
    

    useEffect(()=>{

        const filtered = new Set()

        data.forEach(e=>{
            filtered.add(e.currency_code)
        })

        setCurrencylist([...filtered])

    },[data])


    return (
        <div className="search-con">

            <div className="title">
                <h1>
                    Banks
                    <i className="fa-solid fa-building-columns"></i>
                </h1>
            </div>


            <div className="select-con">


                <div className="search-box">

                    <span className="search-icon">
                        🔍
                    </span>

                    <input 
                        type="search"
                        className="search-input"
                        placeholder="Search..."
                        onChange={(e)=>{
                            searcheditem(e.target.value)
                            
                        }}
                    />

                </div>



                <select>
                    <option value="">
                        Rates
                    </option>

                    <option value="sell">
                        Sell
                    </option>

                    <option value="buy">
                        Buy
                    </option>
                </select>



                <select
                    value={selectedcurrency}
                    onChange={e=>{

                        const value = e.target.value

                        setselectedcurrency(value)

                        if(onselectcurrency){
                            onselectcurrency(value)
                        }

                    }}
                >

                    <option value="">
                        Currency
                    </option>


                    {currencylist.map(name=>(
                        <option 
                            value={name}
                            key={name}
                        >
                            {name}
                        </option>
                    ))}


                </select>



                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={e=>{

                        const value = e.target.value

                        setSelectedDate(value)

                        if(onselectdate){
                            onselectdate(value)
                        }

                    }}
                />


            </div>

        </div>
    )
}

export default Searchcard