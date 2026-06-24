import "./css/mainbar.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Mainbar() {
    const [barstats, setBarstats] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const getActive = (path) => location.pathname === path;

    return (
        <div className={`mainbar ${barstats ? "collapsed" : ""}`}>
            
            {/* TOGGLE */}
            <div className="but-con">
                <button onClick={() => setBarstats(!barstats)}>
                    <i
                        className={`fa-solid ${
                            barstats ? "fa-angles-right" : "fa-angles-left"
                        }`}
                    ></i>
                </button>
            </div>

            {/* HOME */}
            <div
                className={`main-page ${getActive("/") ? "active" : ""}`}
                onClick={() => navigate("/")}
            >
                <i className="fa-solid fa-house-user"></i>
                <span>Home</span>
            </div>

            {/* DASHBOARD */}
            <div
                className={`main-page ${getActive("/dashboard") ? "active" : ""}`}
                onClick={() => navigate("/dashboard")}
            >
                <i className="fa-solid fa-chart-column"></i>
                <span>Dashboard</span>
            </div>

            {/* BANKS */}
            <div
                className={`main-page ${getActive("/banks") ? "active" : ""}`}
                onClick={() => navigate("/banks")}
            >
                <i className="fa-solid fa-building-columns"></i>
                <span>Banks</span>
            </div>

            {/* API */}
            <div
                className={`main-page ${getActive("/api") ? "active" : ""}`}
                onClick={() => navigate("/api")}
            >
                <i className="fa-solid fa-tower-cell"></i>
                <span>API</span>
            </div>

        </div>
    );
}

export default Mainbar;