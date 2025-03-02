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

  // Capture final values to display in the legend
  const finalIndex = data.length - 1;
  const finalOurStrategyValue =
    finalIndex >= 0 ? data[finalIndex]["Our Strategy"] : 0;
  const finalGoldValue =
    finalIndex >= 0 ? data[finalIndex]["Average Gold Performance"] : 0;

  // Custom legend text to show final values
  const legendFormatter = (value) => {
    if (value === "Our Strategy") {
      return `Our Strategy ($${Math.round(finalOurStrategyValue).toLocaleString()})`;
    } else if (value === "Average Gold Performance") {
      return `Average Gold Performance ($${Math.round(finalGoldValue).toLocaleString()})`;
    }
    return value;
  };

  return (
    <div className="p-3 max-w-xl mx-auto bg-[#183965] text-white shadow-lg rounded-xl border border-[#AA8355] border-[0.125px]">
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

      {/* ========== TOP QUESTIONS (KEEP IN DM Serif Display) ========== */}
      <div className="mb-4 font-['DM Serif Display']">
        <div className="flex items-center mb-4">
          <h2 className="text-base font-bold text-white mr-2">
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
            style={{ height: "30px" }} // sets the height of the white input box
            className="w-1/2 text-black border border-[#AA8355] px-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#AA8355]"
          />
        </div>

        <h2 className="text-base font-bold mb-2 text-white">
          How many years do you want to invest for?
        </h2>
      </div>

      {/* ========== EVERYTHING ELSE IN LEAGUE SPARTAN ========== */}
      <div className="font-['League Spartan']">
        <div className="flex justify-between text-[#AA8355] text-xs -mb-1">
          <span>1 year</span>
          <span className="text-base font-bold text-[#AA8355]">
            {years} years
          </span>
          <span>30 years</span>
        </div>

        <input
          type="range"
          min={1}
          max={30}
          step={1}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="w-full -mt-4 mb-4 slider-thumb-gold"
        />

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ left: 50, right: 10 }}>
            <CartesianGrid
              stroke="#FFFFFF"
              strokeDasharray="0"
              strokeOpacity={0.2}     // 50% opacity
              vertical={false}        // Remove all vertical lines
              style={{ strokeWidth: 2 }}  // Make horizontal lines thicker
            />
            <XAxis
              dataKey="year"
              label={{
                value: "Years",
                position: "insideBottom",
                dy: 5,
                fill: "#AA8355",
                style: { fontFamily: "League Spartan" },
              }}
              tick={{ fill: "#AA8355", fontFamily: "League Spartan" }}
              axisLine={{ stroke: "#FFFFFF" }}
              tickLine={{ stroke: "#FFFFFF" }}
              interval={years >= 15 ? 4 : years >= 10 ? 1 : 0}
              minTickGap={10}
            />
            <YAxis
              label={{
                value: "Value ($)",
                angle: -90,
                position: "insideLeft",
                fill: "#AA8355",
                dx: -50,
                style: { fontFamily: "League Spartan" },
              }}
              domain={["auto", "auto"]}
              tick={{ fill: "#AA8355", fontFamily: "League Spartan" }}
              axisLine={{ stroke: "#FFFFFF" }}
              tickLine={{ stroke: "#FFFFFF" }}
              tickFormatter={(tick) => `$${Math.round(tick).toLocaleString()}`}
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
                fontFamily: "League Spartan",
              }}
              labelFormatter={(label) => `Year ${label}`}
            />
            <Legend
              formatter={legendFormatter}
              wrapperStyle={{
                color: "#AA8355",
                marginTop: 200,
                fontFamily: "League Spartan",
              }}
            />
            <Line
              type="monotone"
              dataKey="Our Strategy"
              stroke="#AA8355"
              strokeWidth={5}    // Thicker line
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Average Gold Performance"
              stroke="#F6F2E7"
              strokeWidth={5}    // Thicker line
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <p className="mt-2 text-[10px] text-black">
          Disclaimer: This calculator applies an 8% annual rate for Gold and 7% compound + 8% non-compounding for Our Strategy. It is for informational purposes only and does not constitute financial advice. Results are hypothetical and not guaranteed. Investments carry risk, including loss of principal.{" "}
          <a
            href="https://thegoldstandard.com/disclaimer/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white"
            style={{ fontFamily: "League Spartan" }}
          >
            View Full Disclaimer
          </a>
        </p>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
