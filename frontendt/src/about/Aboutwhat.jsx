import "./css/aboutwhat.css"



function Aboutwhat(){
    return(
        <div className="what-con">
            <div className="what-right">
                <h1>What is Birrify?</h1>
                <ul>
                    <li>🔹Birrify is a platform that collects exchange rates from multiple Ethiopian banks</li>
                    <li>🔹It allows users to compare buy/sell prices in one place</li>
                    <li>🔹It simplifies access to financial data that is normally scattered across bank websites</li>
                </ul>

            </div>
            
            
            
          <div className="what-lift">
            <span><p>USD/Birr</p> <span>live</span></span>
        <table>
        
            <th>bank</th>
            <th>buy</th>
            <th>sell</th>
            <tr>
                <td>Cbe</td>
                <td>156</td>
                <td>157.6</td>
            </tr>
              <tr>
                <td>Dashen</td>
                <td>158</td>
                <td>159.6</td>
            </tr>
              <tr>
                <td>Enat</td>
                <td>156</td>
                <td>157.6</td>
            </tr>
              <tr>
                <td>Awash</td>
                <td>155</td>
                <td>156.6</td>
            </tr>
            </table>

                
            </div>
            
            
            
                    </div>
    )}

export default Aboutwhat
