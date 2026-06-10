import "./css/mainbar.css";
import { useState } from "react";

function Mainbar() {
    const [barstats, setBarstats] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <div className={`mainbar ${barstats ? "collapsed" : ""}`}>
            {/* TOGGLE BUTTON */}
            <div className="but-con">
                <button onClick={() => setBarstats(!barstats)}>
                    <i
                        className={`fa-solid ${
                            barstats
                                ? "fa-angles-right"
                                : "fa-angles-left"
                        }`}
                    ></i>
                </button>
            </div>

            {/* DASHBOARD */}
            <div
                className={`main-page ${
                    selected === "Dashboard" ? "active" : ""
                }`}
                onClick={() => setSelected("Dashboard")}
            >
                <i className="fa-solid fa-house-user"></i>
                <span>Dashboard</span>
            </div>

            {/* BANKS */}
            <div
                className={`main-page ${
                    selected === "Banks" ? "active" : ""
                }`}
                onClick={() => setSelected("Banks")}
            >
                <i className="fa-solid fa-building-columns"></i>
                <span>Banks</span>
            </div>

            {/* ANALYTICS */}
            <div
                className={`main-page ${
                    selected === "Analytics" ? "active" : ""
                }`}
                onClick={() => setSelected("Analytics")}
            >
                <i className="fa-solid fa-chart-area"></i>
                <span>Analytics</span>
            </div>

            {/* API */}
            <div
                className={`main-page ${
                    selected === "API" ? "active" : ""
                }`}
                onClick={() => setSelected("API")}
            >
                <i className="fa-solid fa-tower-cell"></i>
                <span>API</span>
            </div>

            {/* SETTINGS */}
            <div
                className={`main-page ${
                    selected === "Settings" ? "active" : ""
                }`}
                onClick={() => setSelected("Settings")}
            >
                <i className="fa-solid fa-gear"></i>
                <span>Settings</span>
            </div>
        </div>
    );
}

export default Mainbar;