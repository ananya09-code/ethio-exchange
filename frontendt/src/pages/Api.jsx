import { useState, useEffect } from "react";

import Header from "../Layout/Header";
import Mainbar from "../Layout/Mainbar";
import Footer from "../Layout/Footer";
import Apihero from "../api/Apihero";
import Apicard from "../api/Apicard";

function Api(){


    return(
            <div className="app">
      <Header />

      <div className="body">
         <Mainbar />
         
        <div className="main">
            <Apihero></Apihero>
             <Apicard type={0}/>
            <Apicard type={1}/>
            <Apicard type={2}/>
            <Apicard type={3}/>

        </div>
      </div>
          <Footer/>
      
    </div>
    )
}

export default Api



