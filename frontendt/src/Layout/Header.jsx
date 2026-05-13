import { useEffect, useState } from "react";
import birrlogo from "../assets/birrlogop.png";
import "../css/header.css";

function Header() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000); // updates every second

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="header">

            {/* Brand section */}
            <div className="logo">
                <img src={birrlogo} alt="Birrify logo" />
                <h1>Birrify</h1>
            </div>

            {/* Date section */}
            <div className="api">
                <div className="hdate">Last Updated: {date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}</div>
            </div>

        </header>
    );
}

export default Header;