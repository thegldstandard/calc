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
        "Our Strategy": initialDeposit,
        "Average Gold Performance": initialDeposit,
      },
    ];

    for (let year = 1; year <= years; year++) {
      // Example calculation
      let currentInvestment = initialDeposit * (1 + year * 0.08);
      let hybridInvestment = initialDeposit * Math.pow(1.07, year) * (1 + year * 0.08);

      results.push({
        year,
        "Our Strategy": hybridInvestment,
        "Average Gold Performance": currentInvestment,
      });
    }

    setData(results);
  }, [initialDeposit, years]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#183965] text-white shadow-lg rounded-xl border border-[#AA8355] font-['DM Serif Display']">
      <h2 className="text-2xl font-bold mb-4 text-[#AA8355]">
        How much do you want to invest?
      </h2>
      
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
          border-[#AA8355] 
          p-3 
          rounded-lg 
          bg-white 
          mb-6 
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#AA8355]
        "
      />

      <h2 className="text-2xl font-bold mb-4 text-[#AA8355]">
        How many years do you want to invest for?
      </h2>
      <div className="flex justify-between text-[#AA8355] text-sm mb-1">
        <span>1 year</span>
        <span className="text-lg font-bold text-[#AA8355]">{years} years</span>
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
          {/* Fill the chart area with blue (#183965). */}
          <CartesianGrid stroke="#FFFFFF" strokeDasharray="0" vertical={false} fill="#183965" />
          <XAxis
            dataKey="year"
            label={{ value: "Years", position: "insideBottom", dy: 5, fill: "#AA8355" }}
            tick={{ fill: "#AA8355" }}
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
              fill: "#AA8355",
              dy: 0,
              dx: -50,
            }}
            domain={[initialDeposit, "auto"]}
            tick={{ fill: "#AA8355" }}
            tickFormatter={(tick) => `$${Math.round(tick).toLocaleString()}`}
          />
          <Tooltip
            formatter={(value, name) =>
              name !== "year" ? `$${Math.round(Number(value)).toLocaleString()}` : null
            }
            contentStyle={{
              backgroundColor: "#183965",
              color: "#AA8355",
              padding: "10px",
              textAlign: "left",
            }}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend wrapperStyle={{ color: "#AA8355", marginTop: 300 }} />
          <Line type="monotone" dataKey="Our Strategy" stroke="#AA8355" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Average Gold Performance" stroke="#F6F2E7" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Disclaimer */}
      <p className="mt-4 text-xs text-gray-300">
        Disclaimer: This is not financial advice. Our strategy uses a 7% annual compound growth and an 8% average gold performance growth (8% non-compound growth for average gold performance). This is for educational purposes only. Past performance does not guarantee future results.
      </p>
    </div>
  );
};

export default InvestmentCalculator;
