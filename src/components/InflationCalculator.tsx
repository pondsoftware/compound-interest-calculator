"use client";

import { useState, useMemo } from "react";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function InflationCalculator() {
  const [mode, setMode] = useState<"future" | "present">("future");
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(20);
  const [inflationRate, setInflationRate] = useState(3);

  const futureResult = useMemo(() => {
    const rate = inflationRate / 100;
    const futureValue = amount / Math.pow(1 + rate, years);
    const purchasingPowerLost = amount - futureValue;
    const percentLost = (purchasingPowerLost / amount) * 100;

    const schedule = [];
    for (let y = 1; y <= years; y++) {
      const value = amount / Math.pow(1 + rate, y);
      schedule.push({
        year: y,
        nominalAmount: amount,
        realValue: value,
        purchasingPowerLost: amount - value,
        percentLost: ((amount - value) / amount) * 100,
      });
    }

    return { futureValue, purchasingPowerLost, percentLost, schedule };
  }, [amount, years, inflationRate]);

  const presentResult = useMemo(() => {
    const rate = inflationRate / 100;
    const presentValue = amount / Math.pow(1 + rate, years);
    const inflationCost = amount - presentValue;
    const futureEquivalent = amount * Math.pow(1 + rate, years);

    const schedule = [];
    for (let y = 1; y <= years; y++) {
      const needed = amount * Math.pow(1 + rate, y);
      schedule.push({
        year: y,
        futureAmount: needed,
        todaysValue: amount,
        inflationMarkup: needed - amount,
        percentIncrease: ((needed - amount) / amount) * 100,
      });
    }

    return { presentValue, inflationCost, futureEquivalent, schedule };
  }, [amount, years, inflationRate]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Inflation Calculator
      </h1>
      <p className="text-gray-600 mb-8">
        Calculate how inflation erodes purchasing power over time. See what
        today&apos;s money will be worth in the future, or find the present-day
        value of a future amount.
      </p>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("future")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "future"
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          Future Purchasing Power
        </button>
        <button
          onClick={() => setMode("present")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "present"
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          Present Value of Future Amount
        </button>
      </div>

      {/* Inputs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {mode === "future" ? "Today's Amount" : "Future Amount"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={0}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Period
            </label>
            <div className="relative">
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                min={1}
                max={100}
                className="w-full pr-14 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">years</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Inflation Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                min={0}
                max={30}
                step={0.1}
                className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {mode === "future" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Today&apos;s Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(amount)}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">
                Purchasing Power in {years} Years
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(futureResult.futureValue)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Purchasing Power Lost</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(futureResult.purchasingPowerLost)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {futureResult.percentLost.toFixed(1)}% erosion
              </p>
            </div>
          </div>

          {/* Year-by-Year Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
            <h2 className="text-lg font-semibold text-gray-900 p-6 pb-4">
              Purchasing Power Over Time
            </h2>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium text-gray-500">Year</th>
                    <th className="text-right px-6 py-3 font-medium text-gray-500">
                      Real Value
                    </th>
                    <th className="text-right px-6 py-3 font-medium text-gray-500">
                      Power Lost
                    </th>
                    <th className="text-right px-6 py-3 font-medium text-gray-500">
                      % Lost
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {futureResult.schedule.map((d) => (
                    <tr key={d.year} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-900">{d.year}</td>
                      <td className="px-6 py-3 text-right text-blue-600">
                        {formatCurrency(d.realValue)}
                      </td>
                      <td className="px-6 py-3 text-right text-red-600">
                        {formatCurrency(d.purchasingPowerLost)}
                      </td>
                      <td className="px-6 py-3 text-right text-gray-500">
                        {d.percentLost.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {mode === "present" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Future Amount</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(amount)}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Worth in Today&apos;s Dollars</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(presentResult.presentValue)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">
                To Match {formatCurrency(amount)} Today
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(presentResult.futureEquivalent)}
              </p>
              <p className="text-xs text-gray-400 mt-1">needed in {years} years</p>
            </div>
          </div>

          {/* Year-by-Year Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
            <h2 className="text-lg font-semibold text-gray-900 p-6 pb-4">
              Inflation-Adjusted Equivalents
            </h2>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium text-gray-500">Year</th>
                    <th className="text-right px-6 py-3 font-medium text-gray-500">
                      Future Equivalent of {formatCurrency(amount)}
                    </th>
                    <th className="text-right px-6 py-3 font-medium text-gray-500">
                      Inflation Markup
                    </th>
                    <th className="text-right px-6 py-3 font-medium text-gray-500">
                      % Increase
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {presentResult.schedule.map((d) => (
                    <tr key={d.year} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-900">{d.year}</td>
                      <td className="px-6 py-3 text-right font-medium text-gray-900">
                        {formatCurrency(d.futureAmount)}
                      </td>
                      <td className="px-6 py-3 text-right text-red-600">
                        +{formatCurrency(d.inflationMarkup)}
                      </td>
                      <td className="px-6 py-3 text-right text-gray-500">
                        +{d.percentIncrease.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Internal Links */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/" className="text-blue-600 hover:underline text-sm">Compound Interest Calculator</a>
          <a href="/investment-growth" className="text-blue-600 hover:underline text-sm">Investment Growth Calculator</a>
          <a href="/savings-goal" className="text-blue-600 hover:underline text-sm">Savings Goal Calculator</a>
          <a href="/retirement" className="text-blue-600 hover:underline text-sm">Retirement Savings Calculator</a>
          <a href="/rule-of-72" className="text-blue-600 hover:underline text-sm">Rule of 72 Calculator</a>
        </div>
      </div>
    </div>
  );
}
