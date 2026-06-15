import "./css/footcard.css"







function Footcard({bankdata}){
   return(
    <div className="foot-con">
        <h3>About the bank</h3>
        <p>{bankdata?.description}</p>
        <span>headquarters: {bankdata?.headquarters}</span>
        
        <span>type: {bankdata?.type}</span>
        
        <span>founded: {bankdata?.founded}</span>
    </div>
   )   
}

export default Footcard