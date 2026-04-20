"use client";

import { useState, useMemo } from "react";

interface YearData {
  year: number;
  startBalance: number;
  contributions: number;
  interestEarned: number;
  endBalance: number;
  totalContributions: number;
  totalInterest: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export default function InvestmentGrowthCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(25000);
  const [monthlyAddition, setMonthlyAddition] = useState(1000);
  const [rateOfReturn, setRateOfReturn] = useState(8);
  const [timeHorizon, setTimeHorizon] = useState(25);

  const schedule = useMemo(() => {
    const monthlyRate = rateOfReturn / 100 / 12;
    const data: YearData[] = [];
    let balance = initialInvestment;
    let totalContributions = initialInvestment;
    let totalInterest = 0;

    for (let y = 1; y <= timeHorizon; y++) {
      const startBalance = balance;
      let yearInterest = 0;
      let yearContributions = 0;

      for (let m = 0; m < 12; m++) {
        const interest = balance * monthlyRate;
        yearInterest += interest;
        totalInterest += interest;
        balance += interest + monthlyAddition;
        yearContributions += monthlyAddition;
        totalContributions += monthlyAddition;
      }

      data.push({
        year: y,
        startBalance,
        contributions: yearContributions,
        interestEarned: yearInterest,
        endBalance: balance,
        totalContributions,
        totalInterest,
      });
    }
    return data;
  }, [initialInvestment, monthlyAddition, rateOfReturn, timeHorizon]);

  const final = schedule[schedule.length - 1];
  const finalBalance = final?.endBalance ?? initialInvestment;
  const totalContributed = final?.totalContributions ?? initialInvestment;
  const totalInterest = final?.totalInterest ?? 0;
  const interestPercent = finalBalance > 0 ? totalInterest / finalBalance : 0;
  const maxBalance = final?.endBalance ?? 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Investment Growth Calculator
      </h1>
      <p className="text-gray-600 mb-8">
        Project how your investments will grow over time with compound returns
        and regular monthly additions. See a detailed year-by-year breakdown of
        contributions versus interest earned.
      </p>

      {/* Inputs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Investment
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                min={0}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Additions
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={monthlyAddition}
                onChange={(e) => setMonthlyAddition(Number(e.target.value))}
                min={0}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Annual Return
            </label>
            <div className="relative">
              <input
                type="number"
                value={rateOfReturn}
                onChange={(e) => setRateOfReturn(Number(e.target.value))}
                min={0}
                max={30}
                step={0.1}
                className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Horizon
            </label>
            <div className="relative">
              <input
                type="number"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(Math.max(1, Number(e.target.value)))}
                min={1}
                max={50}
                className="w-full pr-14 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Projected Value</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(finalBalance)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalContributed)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Investment Returns</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalInterest)}</p>
          <p className="text-xs text-gray-400 mt-1">
            {formatPercent(interestPercent)} of total value
          </p>
        </div>
      </div>

      {/* Visual Growth Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Growth Projection
        </h2>
        <div className="flex items-end gap-1 h-64">
          {schedule.map((d) => {
            const totalHeight = (d.endBalance / maxBalance) * 100;
            const contribHeight = (d.totalContributions / maxBalance) * 100;
            return (
              <div
                key={d.year}
                className="flex-1 flex flex-col justify-end h-full relative group"
              >
                <div
                  className="bg-green-400 rounded-t-sm min-w-0"
                  style={{ height: `${totalHeight - contribHeight}%` }}
                />
                <div
                  className="bg-blue-500 min-w-0"
                  style={{ height: `${contribHeight}%` }}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 whitespace-nowrap">
                    <p className="font-semibold">Year {d.year}</p>
                    <p>Balance: {formatCurrency(d.endBalance)}</p>
                    <p className="text-blue-300">Invested: {formatCurrency(d.totalContributions)}</p>
                    <p className="text-green-300">Returns: {formatCurrency(d.totalInterest)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Year 1</span>
          <span>Year {timeHorizon}</span>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-sm inline-block" />
            Total Invested
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-400 rounded-sm inline-block" />
            Investment Returns
          </span>
        </div>
      </div>

      {/* Year-by-Year Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
        <h2 className="text-lg font-semibold text-gray-900 p-6 pb-4">
          Year-by-Year Breakdown
        </h2>
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Year</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Start Balance</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Contributions</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Interest Earned</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">End Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schedule.map((d) => (
                <tr key={d.year} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-900">{d.year}</td>
                  <td className="px-6 py-3 text-right text-gray-600">
                    {formatCurrency(d.startBalance)}
                  </td>
                  <td className="px-6 py-3 text-right text-blue-600">
                    {formatCurrency(d.contributions)}
                  </td>
                  <td className="px-6 py-3 text-right text-green-600">
                    {formatCurrency(d.interestEarned)}
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-gray-900">
                    {formatCurrency(d.endBalance)}
                  </td>
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
          <a href="/savings-goal" className="text-blue-600 hover:underline text-sm">Savings Goal Calculator</a>
          <a href="/retirement" className="text-blue-600 hover:underline text-sm">Retirement Savings Calculator</a>
          <a href="/inflation" className="text-blue-600 hover:underline text-sm">Inflation Calculator</a>
          <a href="/rule-of-72" className="text-blue-600 hover:underline text-sm">Rule of 72 Calculator</a>
        </div>
      </div>
    </div>
  );
}
