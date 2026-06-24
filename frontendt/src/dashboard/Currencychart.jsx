import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import axios from "axios";
import { useEffect, useState } from "react";

function CurrencyChart({ selectedcurrency }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/chart/${selectedcurrency}`
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedcurrency) {
      getData();
    }
  }, [selectedcurrency]);

  const formattedData = data.slice(-7);

  console.table(formattedData);

  return (
    <div
    style={{
    width: "100%",
    height: 700,
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
  }}
>
      <h3
        style={{
          marginBottom: "10px",
          color: "#1E293B",
        }}
      >
        Currency Trend ({selectedcurrency})
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={formattedData}
          margin={{
    top: 5,
    right: 20,
    left: 0,
    bottom: 5,
  }}
        
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis domain={[155, 161]} />

          <Tooltip />
          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="sell"
            name="Sell Rate"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="buy"
            name="Buy Rate"
            stroke="#ff2d6f"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CurrencyChart;