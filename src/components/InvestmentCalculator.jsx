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
      let hybridInvestment =
        initialDeposit * Math.pow(1.07, year) * (1 + year * 0.08);

      results.push({
        year,
        "Our Strategy": hybridInvestment,
        "Average Gold Performance": currentInvestment,
      });
    }

    setData(results);
  }, [initialDeposit, years]);

  return (
    <div className="p-4 max-w-xl mx-auto bg-[#183965] text-white shadow-lg rounded-xl border border-[#AA8355] border-[0.5px] font-['DM Serif Display']">
      {/* Inline styles for the slider */}
      <style>
        {`
          .slider-thumb-gold[type="range"] {
            -webkit-appearance: none;
            width: 100%;
            background-color: transparent;
            cursor: pointer;
          }
          .slider-thumb-gold[type="range"]::-webkit-slider-runnable-track {
            height: 4px;
            background-color: #AA8355;
            border-radius: 2px;
          }
          .slider-thumb-gold[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 18px;
            width: 18px;
            background-color: #AA8355;
            border-radius: 50%;
            border: 2px solid #ffffff;
            margin-top: -7px;
            box-shadow: 0 0 2px rgba(0,0,0,0.4);
          }
          .slider-thumb-gold[type="range"]::-moz-range-thumb {
            height: 18px;
            width: 18px;
            background-color: #AA8355;
            border-radius: 50%;
            border: 2px solid #ffffff;
            box-shadow: 0 0 2px rgba(0,0,0,0.4);
          }
        `}
      </style>

      {/* Question Text */}
      <h2 className="text-base font-bold mb-2 text-white">
        How much do you want to invest?
      </h2>
      <input
        type="text"
        min="1"
        max="5000000"
        step="1"
        value={
          initialDeposit === ""
            ? "$"
            : `$${Math.round(initialDeposit).toLocaleString()}`
        }
        onChange={(e) => {
          const value = e.target.value.replace(/\$/g, "").replace(/,/g, "");
          if (
            !isNaN(value) &&
            (value === "" || (value >= 1 && value <= 5000000))
          ) {
            setInitialDeposit(value === "" ? "" : Number(value));
          }
        }}
        className="w-full text-black border border-[#AA8355] p-2 rounded-lg bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-[#AA8355]"
      />

      <h2 className="text-base font-bold mb-2 text-white">
        How many years do you want to invest for?
      </h2>
      <div className="flex justify-between text-[#AA8355] text-xs mb-2">
        <span>1 year</span>
        <span className="text-base font-bold text-[#AA8355]">{years} years</span>
        <span>30 years</span>
      </div>

      <input
        type="range"
        min={1}
        max={30}
        step={1}
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
        className="w-full mt-2 mb-4 slider-thumb-gold"
      />

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ left: 70, right: 30 }}>
          <CartesianGrid
            stroke="#FFFFFF"
            strokeDasharray="0"
            vertical={false}
            fill="#183965"
          />
          <XAxis
            dataKey="year"
            label={{
              value: "Years",
              position: "insideBottom",
              dy: 5,
              fill: "#AA8355",
            }}
            tick={{ fill: "#AA8355" }}
            interval={years >= 15 ? 4 : years >= 10 ? 1 : 0}
            minTickGap={10}
          />
          <YAxis
            label={{
              value: "Value ($)",
              angle: -90,
              position: "insideLeft",
              fill: "#AA8355",
              dy: 0,
              dx: -50, // increased left space for label
            }}
            domain={["auto", "auto"]}
            tick={{ fill: "#AA8355" }}
            tickFormatter={(tick) =>
              `$${Math.round(tick).toLocaleString()}`
            }
          />
          <Tooltip
            formatter={(value, name) =>
              name !== "year"
                ? `$${Math.round(Number(value)).toLocaleString()}`
                : null
            }
            contentStyle={{
              backgroundColor: "#183965",
              color: "#AA8355",
              padding: "10px",
              textAlign: "left",
            }}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend wrapperStyle={{ color: "#AA8355", marginTop: 200 }} />
          <Line
            type="monotone"
            dataKey="Our Strategy"
            stroke="#AA8355"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Average Gold Performance"
            stroke="#F6F2E7"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="mt-2 text-[10px] text-black">
        Disclaimer: This calculator is for educational purposes only and not financial advice.
        Results are hypothetical and not guarantees of future performance. Investments carry risks,
        including loss of principal. View Full Disclaimer
      </p>
    </div>
  );
};

export default InvestmentCalculator;
