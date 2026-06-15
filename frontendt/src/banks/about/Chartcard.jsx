'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';


import axios from "axios";
import { useEffect, useState } from "react";

function Chartcard({ selectedcurrency}) {
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
        height: 500,
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
    
        border: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3
        style={{
          marginBottom: "25px",
          color: "#1f2937",
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        Rate History ({selectedcurrency})
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis 
            dataKey="date" 
            tick={{ fill: '#4b5563', fontSize: 13 }}
          />

          <YAxis 
            domain={[140, 165]} 
            tick={{ fill: '#4b5563', fontSize: 13 }}
          />

          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              color: '#1f2937',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />

          {/* Sell Area */}
          <Area
            type="natural"
            dataKey="sell"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#colorSell)"
          />

          {/* Buy Area */}
          <Area
            type="natural"
            dataKey="buy"
            stroke="#f43f5e"
            strokeWidth={3}
            fill="url(#colorBuy)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chartcard;