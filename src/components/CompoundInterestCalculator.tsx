"use client";

import { useState, useMemo } from "react";

interface YearData {
  year: number;
  totalContributions: number;
  totalInterest: number;
  balance: number;
  realBalance: number;
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

function calculateFinalBalance(
  principal: number,
  monthly: number,
  rate: number,
  years: number
): number {
  const monthlyRate = rate / 100 / 12;
  let balance = principal;
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance += balance * monthlyRate + monthly;
    }
  }
  return balance;
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [adjustForInflation, setAdjustForInflation] = useState(false);
  const [inflationRate, setInflationRate] = useState(3);

  const schedule = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const annualInflation = inflationRate / 100;
    const data: YearData[] = [];
    let balance = principal;
    let totalContributions = principal;
    let totalInterest = 0;

    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        const interest = balance * monthlyRate;
        totalInterest += interest;
        balance += interest + monthly;
        totalContributions += monthly;
      }
      const realBalance = balance / Math.pow(1 + annualInflation, y);
      data.push({
        year: y,
        totalContributions,
        totalInterest,
        balance,
        realBalance,
      });
    }
    return data;
  }, [principal, monthly, rate, years, inflationRate]);

  const final = schedule[schedule.length - 1];
  const totalContributed = final?.totalContributions ?? principal;
  const totalInterest = final?.totalInterest ?? 0;
  const finalBalance = final?.balance ?? principal;
  const realFinalBalance = final?.realBalance ?? principal;
  const purchasingPowerLost = finalBalance - realFinalBalance;
  const interestPercent = finalBalance > 0 ? totalInterest / finalBalance : 0;

  const maxBalance = final?.balance ?? 1;

  // "What If I Started Earlier?" comparison
  const comparison = useMemo(() => {
    const now = calculateFinalBalance(principal, monthly, rate, years);
    const fiveYearsAgo = calculateFinalBalance(principal, monthly, rate, years + 5);
    const tenYearsAgo = calculateFinalBalance(principal, monthly, rate, years + 10);
    return {
      now,
      fiveYearsAgo,
      fiveYearsDiff: fiveYearsAgo - now,
      tenYearsAgo,
      tenYearsDiff: tenYearsAgo - now,
    };
  }, [principal, monthly, rate, years]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Compound Interest Calculator
      </h1>
      <p className="text-gray-600 mb-8">
        See how your investments grow over time with compound interest and
        regular monthly contributions. Adjust the inputs below and watch the
        growth chart update instantly.
      </p>

      {/* Inputs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Investment
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                min={0}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Contribution
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                min={0}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Return Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                min={0}
                max={30}
                step={0.1}
                className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                %
              </span>
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
                max={50}
                className="w-full pr-14 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                years
              </span>
            </div>
          </div>
        </div>

        {/* Inflation Toggle */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={adjustForInflation}
                onChange={(e) => setAdjustForInflation(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-orange-200 rounded-full peer peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
            </label>
            <span className="text-sm font-medium text-gray-700">
              Adjust for inflation
            </span>
          </div>
          {adjustForInflation && (
            <div className="mt-4 max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Inflation Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  min={0}
                  max={20}
                  step={0.1}
                  className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      {adjustForInflation ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">Nominal Final Balance</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(finalBalance)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">
              Real (Today&apos;s Dollars)
            </p>
            <p className="text-2xl font-bold text-orange-600">
              {formatCurrency(realFinalBalance)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">
              Purchasing Power Lost to Inflation
            </p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(purchasingPowerLost)}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">Final Balance</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(finalBalance)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Contributed</p>
            <p className="text-2xl font-bold text-orange-600">
              {formatCurrency(totalContributed)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">Interest Earned</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totalInterest)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {formatPercent(interestPercent)} of final balance
            </p>
          </div>
        </div>
      )}

      {/* Visual Growth Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Growth Over Time
        </h2>
        <div className="flex items-end gap-1 h-64">
          {schedule.map((d) => {
            const totalHeight = (d.balance / maxBalance) * 100;
            const contribHeight = (d.totalContributions / maxBalance) * 100;
            return (
              <div
                key={d.year}
                className="flex-1 flex flex-col justify-end h-full relative group"
              >
                {/* Interest portion (top) */}
                <div
                  className="bg-green-400 rounded-t-sm min-w-0"
                  style={{ height: `${totalHeight - contribHeight}%` }}
                />
                {/* Contributions portion (bottom) */}
                <div
                  className="bg-orange-500 min-w-0"
                  style={{ height: `${contribHeight}%` }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 whitespace-nowrap">
                    <p className="font-semibold">Year {d.year}</p>
                    <p>Balance: {formatCurrency(d.balance)}</p>
                    <p className="text-orange-300">
                      Contributed: {formatCurrency(d.totalContributions)}
                    </p>
                    <p className="text-green-300">
                      Interest: {formatCurrency(d.totalInterest)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Year 1</span>
          <span>Year {years}</span>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-orange-500 rounded-sm inline-block" />
            Contributions
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-400 rounded-sm inline-block" />
            Interest Earned
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
                <th className="text-left px-6 py-3 font-medium text-gray-500">
                  Year
                </th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">
                  Contributions
                </th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">
                  Interest Earned
                </th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">
                  Balance
                </th>
                {adjustForInflation && (
                  <th className="text-right px-6 py-3 font-medium text-gray-500">
                    Real Balance
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schedule.map((d) => (
                <tr key={d.year} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-900">{d.year}</td>
                  <td className="px-6 py-3 text-right text-orange-600">
                    {formatCurrency(d.totalContributions)}
                  </td>
                  <td className="px-6 py-3 text-right text-green-600">
                    {formatCurrency(d.totalInterest)}
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-gray-900">
                    {formatCurrency(d.balance)}
                  </td>
                  {adjustForInflation && (
                    <td className="px-6 py-3 text-right font-medium text-orange-600">
                      {formatCurrency(d.realBalance)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* What If I Started Earlier? */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          What If I Started Earlier?
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          See how much more you could have with the same inputs but more time in
          the market.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-5 text-center border border-gray-200">
            <p className="text-sm font-medium text-gray-500 mb-1">
              Starting Now ({years} years)
            </p>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(comparison.now)}
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-5 text-center border border-orange-200">
            <p className="text-sm font-medium text-orange-700 mb-1">
              Started 5 Years Ago ({years + 5} years)
            </p>
            <p className="text-xl font-bold text-orange-900">
              {formatCurrency(comparison.fiveYearsAgo)}
            </p>
            <p className="text-sm text-orange-600 mt-1">
              +{formatCurrency(comparison.fiveYearsDiff)} more
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-5 text-center border border-green-200">
            <p className="text-sm font-medium text-green-700 mb-1">
              Started 10 Years Ago ({years + 10} years)
            </p>
            <p className="text-xl font-bold text-green-900">
              {formatCurrency(comparison.tenYearsAgo)}
            </p>
            <p className="text-sm text-green-600 mt-1">
              +{formatCurrency(comparison.tenYearsDiff)} more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
