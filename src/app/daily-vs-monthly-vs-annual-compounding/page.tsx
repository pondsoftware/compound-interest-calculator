import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daily vs Monthly vs Annual Compounding — Does Frequency Matter?",
  description:
    "Daily vs monthly vs annual compounding: how much extra interest do you actually earn? Side-by-side comparison plus the math behind APY and APR.",
  alternates: {
    canonical: "/daily-vs-monthly-vs-annual-compounding",
  },
  openGraph: {
    title: "Daily vs Monthly vs Annual Compounding",
    description:
      "How compounding frequency affects total returns — with side-by-side calculations and the APY/APR distinction.",
    type: "article",
    url: "https://compoundinterestcalc.app/daily-vs-monthly-vs-annual-compounding",
  },
};

const faqs = [
  {
    question: "Does daily compounding earn significantly more than annual?",
    answer:
      "Not much. On $10,000 at 5% over one year, annual compounding earns $500, monthly earns $511.62, daily earns $513.07, and continuous earns $513.13. The gap between annual and daily is about $13 — roughly 0.13% of principal. The frequency effect compounds over decades, but it never rivals the effect of rate or time.",
  },
  {
    question: "What is APY and how does it relate to compounding frequency?",
    answer:
      "APY (Annual Percentage Yield) is the effective annual return after factoring in compounding frequency. A 5% nominal rate compounded daily produces an APY of 5.127%; compounded monthly, 5.116%. APY lets you compare accounts with different compounding schedules apples-to-apples.",
  },
  {
    question: "Which compounding frequency do banks use?",
    answer:
      "It varies. Most US savings accounts compound daily. Credit cards compound daily on outstanding balances. CDs typically compound daily or monthly. Bonds usually compound semi-annually. Mortgages technically use simple interest, not compound. Always check the disclosed APY rather than the nominal rate.",
  },
  {
    question: "What is continuous compounding?",
    answer:
      "Continuous compounding is the theoretical limit where interest is added every infinitesimally small instant. The formula is A = P × e^(rt). It produces a tiny edge over daily compounding — about 0.001% extra on a 5% rate — and is used mainly in finance theory and options pricing, not retail banking.",
  },
  {
    question: "Should I prioritize a higher rate or more frequent compounding?",
    answer:
      "Always prioritize the higher APY. A 5.0% account compounded daily (APY 5.127%) is worse than a 5.05% account compounded annually (APY 5.05%) only if the second account is genuinely 5.05% APY. Compare APYs directly — they already incorporate frequency.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Daily vs Monthly vs Annual Compounding — Does Frequency Matter?",
  description:
    "How compounding frequency affects total returns, with side-by-side calculations and the APY/APR distinction.",
  url: "https://compoundinterestcalc.app/daily-vs-monthly-vs-annual-compounding",
  mainEntityOfPage: "https://compoundinterestcalc.app/daily-vs-monthly-vs-annual-compounding",
  author: { "@type": "Organization", name: "Compound Interest Calculator" },
  publisher: { "@type": "Organization", name: "Compound Interest Calculator" },
};

export default function CompoundingFrequencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://compoundinterestcalc.app" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Daily vs Monthly vs Annual Compounding",
                item: "https://compoundinterestcalc.app/daily-vs-monthly-vs-annual-compounding",
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Daily vs Monthly vs Annual Compounding
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Does compounding frequency actually matter? Yes — but probably less
            than you think. Here&apos;s the side-by-side math, the APY/APR
            distinction, and how to use frequency information when comparing
            accounts.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The One-Year Comparison</h2>
          <p className="text-gray-600 mb-4">
            $10,000 invested at a 5% nominal annual rate, no contributions:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Frequency</th>
                  <th className="px-4 py-3 font-semibold">Periods / Year</th>
                  <th className="px-4 py-3 font-semibold">End Balance</th>
                  <th className="px-4 py-3 font-semibold">Effective APY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="px-4 py-3 font-medium">Annual</td>
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3">$10,500.00</td>
                  <td className="px-4 py-3">5.000%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Semi-annual</td>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3">$10,506.25</td>
                  <td className="px-4 py-3">5.063%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Quarterly</td>
                  <td className="px-4 py-3">4</td>
                  <td className="px-4 py-3">$10,509.45</td>
                  <td className="px-4 py-3">5.095%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Monthly</td>
                  <td className="px-4 py-3">12</td>
                  <td className="px-4 py-3">$10,511.62</td>
                  <td className="px-4 py-3">5.116%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Daily</td>
                  <td className="px-4 py-3">365</td>
                  <td className="px-4 py-3">$10,513.07</td>
                  <td className="px-4 py-3">5.127%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Continuous</td>
                  <td className="px-4 py-3">∞</td>
                  <td className="px-4 py-3">$10,513.13</td>
                  <td className="px-4 py-3">5.127%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            The gap from annual to daily is $13.07 — about 0.13% of principal.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The 30-Year Comparison</h2>
          <p className="text-gray-600 mb-4">
            $10,000 at 5% for 30 years, no contributions:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Frequency</th>
                  <th className="px-4 py-3 font-semibold">Ending Balance</th>
                  <th className="px-4 py-3 font-semibold">vs Annual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="px-4 py-3 font-medium">Annual</td>
                  <td className="px-4 py-3">$43,219</td>
                  <td className="px-4 py-3">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Quarterly</td>
                  <td className="px-4 py-3">$44,402</td>
                  <td className="px-4 py-3">+$1,183</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Monthly</td>
                  <td className="px-4 py-3">$44,677</td>
                  <td className="px-4 py-3">+$1,458</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Daily</td>
                  <td className="px-4 py-3">$44,812</td>
                  <td className="px-4 py-3">+$1,593</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Continuous</td>
                  <td className="px-4 py-3">$44,817</td>
                  <td className="px-4 py-3">+$1,598</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 mt-4">
            Over 30 years, daily compounding earns about $1,600 more than annual
            — roughly 3.7% extra. Meaningful, but small relative to the
            roughly $33,000 of interest earned overall.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">APR vs APY</h2>
          <div className="text-gray-600 space-y-4">
            <p>
              The distinction between APR and APY exists precisely because of
              compounding frequency.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>APR (Annual Percentage Rate)</strong> is the nominal
                rate, ignoring compounding. A &ldquo;5% APR&rdquo; compounded
                monthly is not 5% — it&apos;s 5.116% effective.
              </li>
              <li>
                <strong>APY (Annual Percentage Yield)</strong> is the effective
                rate, after factoring in compounding. APY is what you actually
                earn (savings) or pay (debt) in a year.
              </li>
            </ul>
            <p>
              Regulators require US banks to disclose APY on savings products
              and APR on loans. The numbers diverge when compounding frequency
              is high. Always compare APY-to-APY when shopping for savings
              accounts.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Formulas</h2>
          <div className="space-y-4 text-gray-700">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold mb-2">Discrete compounding</p>
              <p className="font-mono text-sm">A = P × (1 + r/n)<sup>n×t</sup></p>
              <p className="text-sm text-gray-600 mt-2">
                Where n is periods per year (1 = annual, 12 = monthly, 365 =
                daily).
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold mb-2">Continuous compounding</p>
              <p className="font-mono text-sm">A = P × e<sup>r×t</sup></p>
              <p className="text-sm text-gray-600 mt-2">
                The limit as n → ∞. The Euler number e ≈ 2.71828.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold mb-2">APY from APR</p>
              <p className="font-mono text-sm">APY = (1 + APR/n)<sup>n</sup> − 1</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">What Actually Moves the Needle</h2>
          <p className="text-gray-600 mb-4">
            Three levers control your end balance, ranked by impact:
          </p>
          <ol className="space-y-2 text-gray-600 list-decimal list-inside">
            <li>
              <strong>Time.</strong> An extra 10 years often doubles your
              outcome. Nothing else comes close.
            </li>
            <li>
              <strong>Rate.</strong> Moving from 5% to 8% over 30 years
              transforms $43k into $101k. A 60% rate increase produces a 230%
              outcome.
            </li>
            <li>
              <strong>Frequency.</strong> Moving from annual to daily
              compounding adds a few percent. Worth optimizing, but not the
              place to spend your time.
            </li>
          </ol>
        </section>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tools & Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compound Interest Calculator</p>
              <p className="text-sm text-gray-500">Try different frequencies with your numbers</p>
            </Link>
            <Link href="/compound-interest-formula" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compound Interest Formula</p>
              <p className="text-sm text-gray-500">Step-by-step walkthrough of the math</p>
            </Link>
            <Link href="/compound-vs-simple-interest" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compound vs Simple Interest</p>
              <p className="text-sm text-gray-500">The bigger comparison most people miss</p>
            </Link>
            <Link href="/investment-growth" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Investment Growth Calculator</p>
              <p className="text-sm text-gray-500">Project portfolio growth year by year</p>
            </Link>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
