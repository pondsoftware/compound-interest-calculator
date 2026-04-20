"use client";

import { useState, useMemo } from "react";

const commonRates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15];

export default function RuleOf72Calculator() {
  const [mode, setMode] = useState<"rate" | "years">("rate");
  const [inputRate, setInputRate] = useState(7);
  const [inputYears, setInputYears] = useState(10);

  const rateResult = useMemo(() => {
    const doublingTime = inputRate > 0 ? 72 / inputRate : Infinity;
    const exactDoublingTime =
      inputRate > 0 ? Math.log(2) / Math.log(1 + inputRate / 100) : Infinity;
    return { doublingTime, exactDoublingTime };
  }, [inputRate]);

  const yearsResult = useMemo(() => {
    const requiredRate = inputYears > 0 ? 72 / inputYears : Infinity;
    const exactRate =
      inputYears > 0 ? (Math.pow(2, 1 / inputYears) - 1) * 100 : Infinity;
    return { requiredRate, exactRate };
  }, [inputYears]);

  const comparisonTable = useMemo(() => {
    return commonRates.map((rate) => {
      const rule72 = 72 / rate;
      const exact = Math.log(2) / Math.log(1 + rate / 100);
      return {
        rate,
        rule72: rule72.toFixed(1),
        exact: exact.toFixed(1),
        difference: Math.abs(rule72 - exact).toFixed(2),
      };
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Rule of 72 Calculator
      </h1>
      <p className="text-gray-600 mb-8">
        Use the Rule of 72 to quickly estimate how long it takes to double your
        money at a given interest rate, or find the rate needed to double your
        money in a specific number of years.
      </p>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("rate")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "rate"
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          Rate to Doubling Time
        </button>
        <button
          onClick={() => setMode("years")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "years"
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          Doubling Time to Rate
        </button>
      </div>

      {/* Input */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        {mode === "rate" ? (
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Interest Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={inputRate}
                onChange={(e) => setInputRate(Number(e.target.value))}
                min={0.1}
                max={100}
                step={0.1}
                className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
        ) : (
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desired Doubling Time
            </label>
            <div className="relative">
              <input
                type="number"
                value={inputYears}
                onChange={(e) => setInputYears(Math.max(1, Number(e.target.value)))}
                min={1}
                max={100}
                className="w-full pr-14 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">years</span>
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {mode === "rate" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">Rule of 72 Estimate</p>
            <p className="text-2xl font-bold text-gray-900">
              {rateResult.doublingTime === Infinity
                ? "N/A"
                : `${rateResult.doublingTime.toFixed(1)} years`}
            </p>
            <p className="text-xs text-gray-400 mt-1">72 / {inputRate} = {rateResult.doublingTime === Infinity ? "N/A" : rateResult.doublingTime.toFixed(1)}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">Exact Calculation</p>
            <p className="text-2xl font-bold text-blue-600">
              {rateResult.exactDoublingTime === Infinity
                ? "N/A"
                : `${rateResult.exactDoublingTime.toFixed(2)} years`}
            </p>
            <p className="text-xs text-gray-400 mt-1">ln(2) / ln(1 + r)</p>
          </div>
        </div>
      )}

      {mode === "years" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">Rule of 72 Estimate</p>
            <p className="text-2xl font-bold text-gray-900">
              {yearsResult.requiredRate === Infinity
                ? "N/A"
                : `${yearsResult.requiredRate.toFixed(2)}%`}
            </p>
            <p className="text-xs text-gray-400 mt-1">72 / {inputYears} = {yearsResult.requiredRate === Infinity ? "N/A" : yearsResult.requiredRate.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">Exact Rate Needed</p>
            <p className="text-2xl font-bold text-blue-600">
              {yearsResult.exactRate === Infinity
                ? "N/A"
                : `${yearsResult.exactRate.toFixed(2)}%`}
            </p>
            <p className="text-xs text-gray-400 mt-1">2^(1/n) - 1</p>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
        <h2 className="text-lg font-semibold text-gray-900 p-6 pb-4">
          Doubling Time at Common Interest Rates
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Interest Rate</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Rule of 72</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Exact Years</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comparisonTable.map((row) => (
                <tr
                  key={row.rate}
                  className={`hover:bg-gray-50 ${
                    mode === "rate" && row.rate === inputRate ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-6 py-3 text-gray-900">{row.rate}%</td>
                  <td className="px-6 py-3 text-right text-gray-900">{row.rule72} years</td>
                  <td className="px-6 py-3 text-right text-blue-600">{row.exact} years</td>
                  <td className="px-6 py-3 text-right text-gray-400">{row.difference} years</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internal Links */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/" className="text-blue-600 hover:underline text-sm">Compound Interest Calculator</a>
          <a href="/investment-growth" className="text-blue-600 hover:underline text-sm">Investment Growth Calculator</a>
          <a href="/savings-goal" className="text-blue-600 hover:underline text-sm">Savings Goal Calculator</a>
          <a href="/inflation" className="text-blue-600 hover:underline text-sm">Inflation Calculator</a>
          <a href="/retirement" className="text-blue-600 hover:underline text-sm">Retirement Savings Calculator</a>
        </div>
      </div>
    </div>
  );
}
