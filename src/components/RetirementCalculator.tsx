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

function formatPercent(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

interface YearData {
  age: number;
  year: number;
  contributions: number;
  interest: number;
  balance: number;
  totalContributions: number;
  totalInterest: number;
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [expectedReturn, setExpectedReturn] = useState(7);

  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const WITHDRAWAL_RATE = 0.04;

  const schedule = useMemo(() => {
    const monthlyRate = expectedReturn / 100 / 12;
    const data: YearData[] = [];
    let balance = currentSavings;
    let totalContributions = currentSavings;
    let totalInterest = 0;

    for (let y = 1; y <= yearsToRetirement; y++) {
      let yearInterest = 0;
      let yearContributions = 0;

      for (let m = 0; m < 12; m++) {
        const interest = balance * monthlyRate;
        yearInterest += interest;
        totalInterest += interest;
        balance += interest + monthlyContribution;
        yearContributions += monthlyContribution;
        totalContributions += monthlyContribution;
      }

      data.push({
        age: currentAge + y,
        year: y,
        contributions: yearContributions,
        interest: yearInterest,
        balance,
        totalContributions,
        totalInterest,
      });
    }
    return data;
  }, [currentSavings, monthlyContribution, expectedReturn, yearsToRetirement, currentAge]);

  const final = schedule[schedule.length - 1];
  const nestEgg = final?.balance ?? currentSavings;
  const totalContributed = final?.totalContributions ?? currentSavings;
  const totalInterest = final?.totalInterest ?? 0;
  const interestPercent = nestEgg > 0 ? totalInterest / nestEgg : 0;
  const monthlyRetirementIncome = (nestEgg * WITHDRAWAL_RATE) / 12;
  const annualRetirementIncome = nestEgg * WITHDRAWAL_RATE;
  const maxBalance = final?.balance ?? 1;

  // Milestone ages
  const milestones = useMemo(() => {
    const targets = [100000, 250000, 500000, 1000000, 2000000];
    const results: { target: number; age: number | null }[] = [];
    for (const target of targets) {
      const entry = schedule.find((d) => d.balance >= target);
      results.push({ target, age: entry ? entry.age : null });
    }
    return results.filter((m) => m.age !== null);
  }, [schedule]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Retirement Savings Calculator
      </h1>
      <p className="text-gray-600 mb-8">
        Estimate your retirement nest egg based on your current age, savings,
        and monthly contributions. See projected retirement income using the 4%
        safe withdrawal rule.
      </p>

      {/* Inputs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Age
            </label>
            <div className="relative">
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Math.max(18, Math.min(80, Number(e.target.value))))}
                min={18}
                max={80}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retirement Age
            </label>
            <div className="relative">
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Math.max(currentAge + 1, Math.min(85, Number(e.target.value))))}
                min={currentAge + 1}
                max={85}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Retirement Savings
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
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Annual Return
            </label>
            <div className="relative max-w-xs">
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                min={0}
                max={20}
                step={0.1}
                className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Retirement Nest Egg</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(nestEgg)}</p>
          <p className="text-xs text-gray-400 mt-1">at age {retirementAge}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Monthly Income (4% Rule)</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(monthlyRetirementIncome)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {formatCurrency(annualRetirementIncome)}/year
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Total Contributed</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalContributed)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Interest Earned</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalInterest)}</p>
          <p className="text-xs text-gray-400 mt-1">
            {formatPercent(interestPercent)} of nest egg
          </p>
        </div>
      </div>

      {/* Visual Growth Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Retirement Savings Growth
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
                    <p className="font-semibold">Age {d.age}</p>
                    <p>Balance: {formatCurrency(d.balance)}</p>
                    <p className="text-blue-300">Contributed: {formatCurrency(d.totalContributions)}</p>
                    <p className="text-green-300">Interest: {formatCurrency(d.totalInterest)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Age {currentAge + 1}</span>
          <span>Age {retirementAge}</span>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-sm inline-block" />
            Contributions
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-400 rounded-sm inline-block" />
            Interest Earned
          </span>
        </div>
      </div>

      {/* Savings Milestones */}
      {milestones.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Savings Milestones
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {milestones.map((m) => (
              <div key={m.target} className="text-center">
                <p className="text-sm text-gray-500">{formatCurrency(m.target)}</p>
                <p className="text-lg font-bold text-gray-900">Age {m.age}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Year-by-Year Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
        <h2 className="text-lg font-semibold text-gray-900 p-6 pb-4">
          Year-by-Year Breakdown
        </h2>
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Age</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Contributions</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Interest</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schedule.map((d) => (
                <tr key={d.year} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-900">{d.age}</td>
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

      {/* Internal Links */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/" className="text-blue-600 hover:underline text-sm">Compound Interest Calculator</a>
          <a href="/investment-growth" className="text-blue-600 hover:underline text-sm">Investment Growth Calculator</a>
          <a href="/savings-goal" className="text-blue-600 hover:underline text-sm">Savings Goal Calculator</a>
          <a href="/inflation" className="text-blue-600 hover:underline text-sm">Inflation Calculator</a>
          <a href="/rule-of-72" className="text-blue-600 hover:underline text-sm">Rule of 72 Calculator</a>
        </div>
      </div>
    </div>
  );
}
