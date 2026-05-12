import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compound Interest Formula — Step-by-Step Walkthrough with Examples",
  description:
    "Compound interest formula explained step-by-step. Includes the lump-sum formula, the contributions formula, and worked examples you can verify by hand.",
  alternates: {
    canonical: "/compound-interest-formula",
  },
  openGraph: {
    title: "Compound Interest Formula Walkthrough",
    description:
      "Step-by-step compound interest formula with worked examples — for lump sums and regular contributions.",
    type: "article",
    url: "https://compoundinterestcalc.app/compound-interest-formula",
  },
};

const faqs = [
  {
    question: "What is the compound interest formula?",
    answer:
      "For a lump sum: A = P × (1 + r/n)^(n×t), where A is the future value, P is the principal, r is the annual rate (as a decimal), n is compounding periods per year, and t is years. For continuous compounding, the formula simplifies to A = P × e^(r×t).",
  },
  {
    question: "What is the formula for compound interest with monthly contributions?",
    answer:
      "A = P × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) − 1) / (r/n)]. The first term grows the initial principal. The second term sums the future value of a series of equal contributions made at the start of each period.",
  },
  {
    question: "How do I calculate compound interest by hand?",
    answer:
      "Convert your rate to a decimal, divide by the number of compounding periods per year, add 1, raise that to the power of total periods, then multiply by your principal. Example: $1,000 at 5% monthly for 10 years = 1000 × (1 + 0.05/12)^(12×10) = 1000 × 1.6470 = $1,647.01.",
  },
  {
    question: "What is the difference between the discrete and continuous compounding formulas?",
    answer:
      "Discrete compounding uses A = P × (1 + r/n)^(n×t) with a finite number of compounding periods. Continuous compounding uses A = P × e^(r×t), which is the mathematical limit as n approaches infinity. Discrete is what banks actually use; continuous is mainly used in finance theory.",
  },
  {
    question: "What does 'compounding period' mean in the formula?",
    answer:
      "A compounding period is the interval at which interest is calculated and added to the balance. n in the formula equals the number of compounding periods per year: 1 for annual, 4 for quarterly, 12 for monthly, 365 for daily. The smaller the period, the more often interest gets re-invested.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Compound Interest Formula — Step-by-Step Walkthrough with Examples",
  description:
    "Compound interest formula walkthrough for lump sums and contributions, with worked examples you can verify by hand.",
  url: "https://compoundinterestcalc.app/compound-interest-formula",
  mainEntityOfPage: "https://compoundinterestcalc.app/compound-interest-formula",
  author: { "@type": "Organization", name: "Compound Interest Calculator" },
  publisher: { "@type": "Organization", name: "Compound Interest Calculator" },
};

export default function CompoundInterestFormulaPage() {
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
                name: "Compound Interest Formula",
                item: "https://compoundinterestcalc.app/compound-interest-formula",
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Compound Interest Formula
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            The compound interest formula looks intimidating but breaks down
            cleanly once you walk through it. This page covers the lump-sum
            version, the version with regular contributions, and three worked
            examples you can verify by hand.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Lump-Sum Formula</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center font-mono text-base sm:text-lg mb-4">
            A = P × (1 + r/n)<sup>n × t</sup>
          </div>
          <ul className="text-gray-600 space-y-2 list-disc list-inside">
            <li><strong>A</strong> = future value (the amount you end up with)</li>
            <li><strong>P</strong> = principal (the amount you start with)</li>
            <li><strong>r</strong> = annual interest rate, as a decimal (5% = 0.05)</li>
            <li><strong>n</strong> = compounding periods per year (12 for monthly)</li>
            <li><strong>t</strong> = number of years</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Walking Through It</h2>
          <ol className="space-y-3 text-gray-600 list-decimal list-inside">
            <li>
              <strong>r / n</strong> — split the annual rate across the
              compounding periods. At 6% compounded monthly, the per-period
              rate is 0.06 / 12 = 0.005, or 0.5% per month.
            </li>
            <li>
              <strong>1 + r/n</strong> — adds the per-period growth factor.
              0.5% growth in a month means your balance multiplies by 1.005.
            </li>
            <li>
              <strong>(1 + r/n)<sup>n × t</sup></strong> — raises that growth
              factor to the total number of compounding periods. 10 years × 12
              months = 120 periods. 1.005<sup>120</sup> = 1.8194.
            </li>
            <li>
              <strong>P × (1 + r/n)<sup>n × t</sup></strong> — multiplies by
              your starting principal. $10,000 × 1.8194 = $18,194.
            </li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Worked Example #1: Lump Sum</h2>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 text-gray-700 space-y-2">
            <p><strong>Question:</strong> How much will $5,000 grow to in 15 years at 7% compounded monthly?</p>
            <p><strong>Plug in:</strong> P = 5000, r = 0.07, n = 12, t = 15</p>
            <p className="font-mono text-sm">A = 5000 × (1 + 0.07/12)<sup>12×15</sup></p>
            <p className="font-mono text-sm">A = 5000 × (1.005833)<sup>180</sup></p>
            <p className="font-mono text-sm">A = 5000 × 2.8489</p>
            <p><strong>Answer: $14,244.35</strong></p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Formula with Contributions</h2>
          <p className="text-gray-600 mb-4">
            When you add money regularly (a monthly contribution to a 401k or
            savings account), the formula adds a second term:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center font-mono text-sm sm:text-base mb-4">
            A = P × (1 + r/n)<sup>n × t</sup> + PMT × [((1 + r/n)<sup>n × t</sup> − 1) / (r/n)]
          </div>
          <ul className="text-gray-600 space-y-2 list-disc list-inside">
            <li><strong>PMT</strong> = contribution per compounding period (e.g., monthly deposit)</li>
            <li>The first term grows your starting principal.</li>
            <li>The second term sums the future values of every contribution.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Worked Example #2: Monthly Contributions
          </h2>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 text-gray-700 space-y-2">
            <p><strong>Question:</strong> $10,000 starting balance, $500/month, 7% annual return, 20 years.</p>
            <p><strong>Plug in:</strong> P = 10000, r = 0.07, n = 12, t = 20, PMT = 500</p>
            <p className="font-mono text-sm">A = 10000 × (1.005833)<sup>240</sup> + 500 × [((1.005833)<sup>240</sup> − 1) / 0.005833]</p>
            <p className="font-mono text-sm">A = 10000 × 4.0387 + 500 × 520.93</p>
            <p className="font-mono text-sm">A = 40,387.39 + 260,463.33</p>
            <p><strong>Answer: $300,850.72</strong></p>
            <p className="text-sm">Of that, $130,000 came from your pocket (10k start + 240 × $500). The other ~$170,000 is compound interest.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Worked Example #3: Find the Rate
          </h2>
          <p className="text-gray-600 mb-4">
            You can also solve the formula for rate, time, or principal. To
            find the rate needed to grow $5,000 into $20,000 in 25 years:
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 text-gray-700 space-y-2">
            <p className="font-mono text-sm">20,000 = 5,000 × (1 + r)<sup>25</sup></p>
            <p className="font-mono text-sm">4 = (1 + r)<sup>25</sup></p>
            <p className="font-mono text-sm">1 + r = 4<sup>1/25</sup> = 1.0573</p>
            <p><strong>Answer: r ≈ 5.73% per year</strong></p>
            <p className="text-sm">Quadrupling in 25 years requires about 5.7% returns.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Continuous-Compounding Variant</h2>
          <p className="text-gray-600 mb-4">
            For continuous compounding (the theoretical limit as n → ∞), the
            formula simplifies dramatically:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center font-mono text-base sm:text-lg mb-4">
            A = P × e<sup>r × t</sup>
          </div>
          <p className="text-gray-600">
            Where <strong>e</strong> ≈ 2.71828 is Euler&apos;s number. This is
            mostly used in academic finance and options pricing — retail
            accounts compound at discrete intervals (daily at finest), so the
            discrete formula above is what matters for personal finance.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Common Variables to Solve For</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Find</th>
                  <th className="px-4 py-3 font-semibold">Rearranged Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="px-4 py-3 font-medium">Future value (A)</td>
                  <td className="px-4 py-3 font-mono">P × (1 + r/n)<sup>n×t</sup></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Principal (P)</td>
                  <td className="px-4 py-3 font-mono">A / (1 + r/n)<sup>n×t</sup></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Rate (r)</td>
                  <td className="px-4 py-3 font-mono">n × [(A/P)<sup>1/(n×t)</sup> − 1]</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Time (t)</td>
                  <td className="px-4 py-3 font-mono">ln(A/P) / [n × ln(1 + r/n)]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tools & Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compound Interest Calculator</p>
              <p className="text-sm text-gray-500">Run the formula with your inputs</p>
            </Link>
            <Link href="/daily-vs-monthly-vs-annual-compounding" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compounding Frequency</p>
              <p className="text-sm text-gray-500">How n affects the answer</p>
            </Link>
            <Link href="/compound-vs-simple-interest" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compound vs Simple Interest</p>
              <p className="text-sm text-gray-500">Why this formula matters at all</p>
            </Link>
            <Link href="/investment-growth" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Investment Growth Calculator</p>
              <p className="text-sm text-gray-500">Year-by-year breakdown with contributions</p>
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
