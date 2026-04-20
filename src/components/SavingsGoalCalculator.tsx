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

export default function SavingsGoalCalculator() {
  const [mode, setMode] = useState<"time" | "contribution">("time");
  const [goalAmount, setGoalAmount] = useState(100000);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [rate, setRate] = useState(6);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [targetYears, setTargetYears] = useState(10);

  const timeResult = useMemo(() => {
    if (mode !== "time") return null;
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) {
      const months = (goalAmount - currentSavings) / monthlyContribution;
      return {
        months: Math.ceil(Math.max(0, months)),
        years: Math.ceil(Math.max(0, months)) / 12,
        schedule: [],
      };
    }
    let balance = currentSavings;
    let months = 0;
    const schedule: { year: number; balance: number; contributions: number; interest: number }[] = [];
    let yearContributions = currentSavings;
    let yearInterest = 0;

    while (balance < goalAmount && months < 600) {
      const interest = balance * monthlyRate;
      balance += interest + monthlyContribution;
      yearInterest += interest;
      yearContributions += monthlyContribution;
      months++;

      if (months % 12 === 0) {
        schedule.push({
          year: months / 12,
          balance,
          contributions: yearContributions,
          interest: yearInterest,
        });
      }
    }

    if (months % 12 !== 0) {
      schedule.push({
        year: Math.ceil(months / 12),
        balance,
        contributions: yearContributions,
        interest: yearInterest,
      });
    }

    return { months, years: months / 12, schedule };
  }, [mode, goalAmount, currentSavings, rate, monthlyContribution]);

  const contributionResult = useMemo(() => {
    if (mode !== "contribution") return null;
    const monthlyRate = rate / 100 / 12;
    const totalMonths = targetYears * 12;

    let requiredMonthly: number;
    if (monthlyRate === 0) {
      requiredMonthly = (goalAmount - currentSavings) / totalMonths;
    } else {
      const futureValueOfPrincipal = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
      const remaining = goalAmount - futureValueOfPrincipal;
      const annuityFactor = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
      requiredMonthly = remaining / annuityFactor;
    }

    // Generate year-by-year schedule
    let balance = currentSavings;
    let totalContributions = currentSavings;
    let totalInterest = 0;
    const schedule: { year: number; balance: number; contributions: number; interest: number }[] = [];

    for (let y = 1; y <= targetYears; y++) {
      for (let m = 0; m < 12; m++) {
        const interest = balance * monthlyRate;
        totalInterest += interest;
        balance += interest + Math.max(0, requiredMonthly);
        totalContributions += Math.max(0, requiredMonthly);
      }
      schedule.push({ year: y, balance, contributions: totalContributions, interest: totalInterest });
    }

    return { requiredMonthly: Math.max(0, requiredMonthly), schedule };
  }, [mode, goalAmount, currentSavings, rate, targetYears]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Savings Goal Calculator
      </h1>
      <p className="text-gray-600 mb-8">
        Find out how long it will take to reach your savings goal, or calculate
        the monthly contribution needed to hit your target by a specific date.
      </p>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("time")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "time"
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          How Long to Reach Goal?
        </button>
        <button
          onClick={() => setMode("contribution")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "contribution"
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          How Much to Save Monthly?
        </button>
      </div>

      {/* Inputs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Savings Goal
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                min={0}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Savings
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                min={0}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Interest Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                min={0}
                max={30}
                step={0.1}
                className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
          {mode === "time" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Contribution
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  min={0}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Timeline
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={targetYears}
                  onChange={(e) => setTargetYears(Math.max(1, Number(e.target.value)))}
                  min={1}
                  max={50}
                  className="w-full pr-14 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">years</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {mode === "time" && timeResult && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Time to Goal</p>
              <p className="text-2xl font-bold text-gray-900">
                {timeResult.years >= 50
                  ? "50+ years"
                  : `${Math.floor(timeResult.years)} yr ${timeResult.months % 12} mo`}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Total Contributions</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(currentSavings + monthlyContribution * timeResult.months)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Interest Earned</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(
                  goalAmount - (currentSavings + monthlyContribution * timeResult.months)
                )}
              </p>
            </div>
          </div>

          {/* Progress Milestones */}
          {timeResult.schedule.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <h2 className="text-lg font-semibold text-gray-900 p-6 pb-4">
                Progress Milestones
              </h2>
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="text-left px-6 py-3 font-medium text-gray-500">Year</th>
                      <th className="text-right px-6 py-3 font-medium text-gray-500">Balance</th>
                      <th className="text-right px-6 py-3 font-medium text-gray-500">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {timeResult.schedule.map((d) => {
                      const pct = Math.min(100, (d.balance / goalAmount) * 100);
                      return (
                        <tr key={d.year} className="hover:bg-gray-50">
                          <td className="px-6 py-3 text-gray-900">{d.year}</td>
                          <td className="px-6 py-3 text-right font-medium text-gray-900">
                            {formatCurrency(d.balance)}
                          </td>
                          <td className="px-6 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500 w-10 text-right">
                                {pct.toFixed(0)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {mode === "contribution" && contributionResult && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Required Monthly Savings</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(contributionResult.requiredMonthly)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Total You Will Save</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(
                  currentSavings + contributionResult.requiredMonthly * targetYears * 12
                )}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Interest Earned</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(
                  goalAmount -
                    (currentSavings + contributionResult.requiredMonthly * targetYears * 12)
                )}
              </p>
            </div>
          </div>

          {/* Year-by-Year Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
            <h2 className="text-lg font-semibold text-gray-900 p-6 pb-4">
              Year-by-Year Projection
            </h2>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium text-gray-500">Year</th>
                    <th className="text-right px-6 py-3 font-medium text-gray-500">Contributions</th>
                    <th className="text-right px-6 py-3 font-medium text-gray-500">Interest</th>
                    <th className="text-right px-6 py-3 font-medium text-gray-500">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contributionResult.schedule.map((d) => (
                    <tr key={d.year} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-900">{d.year}</td>
                      <td className="px-6 py-3 text-right text-blue-600">
                        {formatCurrency(d.contributions)}
                      </td>
                      <td className="px-6 py-3 text-right text-green-600">
                        {formatCurrency(d.interest)}
                      </td>
                      <td className="px-6 py-3 text-right font-medium text-gray-900">
                        {formatCurrency(d.balance)}
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
          <a href="/retirement" className="text-blue-600 hover:underline text-sm">Retirement Savings Calculator</a>
          <a href="/inflation" className="text-blue-600 hover:underline text-sm">Inflation Calculator</a>
          <a href="/rule-of-72" className="text-blue-600 hover:underline text-sm">Rule of 72 Calculator</a>
        </div>
      </div>
    </div>
  );
}
