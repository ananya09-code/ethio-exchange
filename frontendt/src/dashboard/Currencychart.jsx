import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function CurrencyChart() {
  // MOCK DATA (replace later with API data)
  const data = [
    { date: "Mon", usd: 126 },
    { date: "Tue", usd: 130 },
    { date: "Wed", usd: 128 },
    { date: "Thu", usd: 135 },
    { date: "Fri", usd: 140 },
    { date: "Sat", usd: 138 },
    { date: "Sun", usd: 142 },
  ];

  return (
    <div style={{ width: "100%", height: 300, background: "#fff", padding: "15px", borderRadius: "12px" }}>
      <h3 style={{ marginBottom: "10px", color: "#1E293B" }}>
        Currency Trend (USD)
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="usd"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />


          
          <Line
            type="monotone"
            dataKey="usd"
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