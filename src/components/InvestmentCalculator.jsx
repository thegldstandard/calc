import React, { useState, useEffect } from "react"; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InvestmentCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [years, setYears] = useState(5);
  const [data, setData] = useState([]);

  useEffect(() => {
    let results = [
      {
        year: 0,
        "Our Clients": initialDeposit,
        "Average Gold Performance": initialDeposit,
      },
    ];

    for (let year = 1; year <= years; year++) {
      // Example calculation
      let currentInvestment = initialDeposit * (1 + year * 0.08);
      let hybridInvestment = initialDeposit * Math.pow(1.07, year) * (1 + year * 0.08);

      results.push({
        year,
        "Our Clients": hybridInvestment,
        "Average Gold Performance": currentInvestment,
      });
    }

    setData(results);
  }, [initialDeposit, years]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#1F3A5F] text-white shadow-lg rounded-xl border border-gold font-['DM Serif Display']">
      <h2 className="text-2xl font-bold mb-4 text-gold">How much do you want to invest?</h2>
      
      {/* Styled text input */}
      <input
        type="text"
        min="1"
        max="5000000"
        step="1"
        value={initialDeposit === "" ? "$" : `$${Math.round(initialDeposit).toLocaleString()}`}
        onChange={(e) => {
          const value = e.target.value.replace(/\$/g, "").replace(/,/g, "");
          if (!isNaN(value) && (value === "" || (value >= 1 && value <= 5000000))) {
            setInitialDeposit(value === "" ? "" : Number(value));
          }
        }}
        className="
          w-full 
          text-black 
          border 
          border-gold 
          p-3 
          rounded-lg 
          bg-white 
          mb-6 
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#FFD700]
        "
      />

      <h2 className="text-2xl font-bold mb-4 text-gold">How many years do you want to invest for?</h2>
      <div className="flex justify-between text-gold text-sm mb-1">
        <span>1 year</span>
        <span className="text-lg font-bold text-[#FFD700]">{years} years</span>
        <span>30 years</span>
      </div>
      
      {/* Styled range slider */}
      <input
        type="range"
        min={1}
        max={30}
        step={1}
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
        className="
          w-full 
          mt-2 
          mb-6 
          slider-thumb-gold
        "
      />

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ left: 50, right: 30 }}>
          {/* Fill the chart area with #1F3A5F (dark blue). */}
          <CartesianGrid stroke="#FFFFFF" strokeDasharray="0" vertical={false} fill="#1F3A5F" />
          <XAxis
            dataKey="year"
            label={{ value: "Years", position: "insideBottom", dy: 5, fill: "#FFD700" }}
            tick={{ fill: "#FFD700" }}
            // If the number of years is more than 15, show every 5th year (interval=4),
            // otherwise show every tick.
            interval={years > 15 ? 4 : 0}
            minTickGap={10}
          />
          <YAxis
            label={{
              value: "Value ($)",
              angle: -90,
              position: "insideLeft",
              fill: "#FFD700",
              dy: 0,
              dx: -50,
            }}
            domain={[initialDeposit, "auto"]}
            tick={{ fill: "#FFD700" }}
            tickFormatter={(tick) => `$${Math.round(tick).toLocaleString()}`}
          />
          <Tooltip
            formatter={(value, name) =>
              name !== "year" ? `$${Math.round(Number(value)).toLocaleString()}` : null
            }
            contentStyle={{
              backgroundColor: "#1F3A5F",
              color: "#FFD700",
              padding: "10px",
              textAlign: "left",
            }}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend wrapperStyle={{ color: "#FFD700", marginTop: 300 }} />
          <Line type="monotone" dataKey="Our Clients" stroke="#FFD700" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Average Gold Performance" stroke="#C0C0C0" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentCalculator;
