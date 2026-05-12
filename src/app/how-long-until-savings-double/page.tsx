import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Long Until Your Savings Double? — Doubling Time by Rate",
  description:
    "How long until your savings double? Doubling times from 1% to 15% returns, the Rule of 72 shortcut, and worked examples for stocks, bonds, and high-yield savings.",
  alternates: {
    canonical: "/how-long-until-savings-double",
  },
  openGraph: {
    title: "How Long Until Your Savings Double?",
    description:
      "Doubling time by rate of return, plus what realistic returns look like for stocks, bonds, and savings accounts.",
    type: "article",
    url: "https://compoundinterestcalc.app/how-long-until-savings-double",
  },
};

const faqs = [
  {
    question: "How long does it take for money to double?",
    answer:
      "Use the Rule of 72: divide 72 by your annual rate of return. At 7%, your money doubles in about 10.3 years. At 10%, 7.2 years. At 4% (a high-yield savings rate), 18 years. Lower rates mean dramatically longer doubling times.",
  },
  {
    question: "How long for savings to double at 5%?",
    answer:
      "About 14.4 years using the Rule of 72 (72/5 = 14.4). The exact answer using ln(2)/ln(1.05) is 14.2 years. 5% is roughly the rate of a competitive high-yield savings account or short-term Treasury in 2026.",
  },
  {
    question: "How long for savings to double at 7%?",
    answer:
      "About 10.3 years using the Rule of 72 (72/7 = 10.3). The exact answer is 10.24 years. 7% is roughly the historical real return of the S&P 500 after inflation.",
  },
  {
    question: "Why does the doubling time shrink so fast as rates rise?",
    answer:
      "Because the relationship is logarithmic, not linear. Doubling from 4% to 8% — a 100% increase in the rate — cuts the doubling time roughly in half (from 18 to 9 years). But going from 8% to 16% only cuts it in half again. Each additional percentage point matters less in absolute years.",
  },
  {
    question: "Can my savings double if I add regular contributions?",
    answer:
      "Yes, and much faster. The Rule of 72 only applies to a lump sum with no contributions. If you're adding monthly, your balance doubles in far less time — sometimes 3-5 years for a young saver — because contributions and growth both push the balance up.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Long Until Your Savings Double? — Doubling Time by Rate",
  description:
    "Doubling time by rate of return, with worked examples for stocks, bonds, and high-yield savings.",
  url: "https://compoundinterestcalc.app/how-long-until-savings-double",
  mainEntityOfPage: "https://compoundinterestcalc.app/how-long-until-savings-double",
  author: { "@type": "Organization", name: "Compound Interest Calculator" },
  publisher: { "@type": "Organization", name: "Compound Interest Calculator" },
};

export default function HowLongUntilSavingsDoublePage() {
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
                name: "How Long Until Savings Double",
                item: "https://compoundinterestcalc.app/how-long-until-savings-double",
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Long Until Your Savings Double?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            The answer depends entirely on your rate of return. Here&apos;s a
            quick reference table, the math behind it, and realistic doubling
            times for the most common types of savings and investments.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Doubling Time at a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Annual Return</th>
                  <th className="px-4 py-3 font-semibold">Rule of 72 Estimate</th>
                  <th className="px-4 py-3 font-semibold">Exact Years</th>
                  <th className="px-4 py-3 font-semibold">Typical Account Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="px-4 py-3 font-medium">0.5%</td>
                  <td className="px-4 py-3">144 yr</td>
                  <td className="px-4 py-3">138.98 yr</td>
                  <td className="px-4 py-3">Big-bank checking</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">2%</td>
                  <td className="px-4 py-3">36 yr</td>
                  <td className="px-4 py-3">35.00 yr</td>
                  <td className="px-4 py-3">Basic savings account</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">4%</td>
                  <td className="px-4 py-3">18 yr</td>
                  <td className="px-4 py-3">17.67 yr</td>
                  <td className="px-4 py-3">High-yield savings, short Treasuries</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">5%</td>
                  <td className="px-4 py-3">14.4 yr</td>
                  <td className="px-4 py-3">14.21 yr</td>
                  <td className="px-4 py-3">Competitive HYSA, CDs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">7%</td>
                  <td className="px-4 py-3">10.3 yr</td>
                  <td className="px-4 py-3">10.24 yr</td>
                  <td className="px-4 py-3">S&P 500 real return (after inflation)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">10%</td>
                  <td className="px-4 py-3">7.2 yr</td>
                  <td className="px-4 py-3">7.27 yr</td>
                  <td className="px-4 py-3">S&P 500 historical nominal return</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">12%</td>
                  <td className="px-4 py-3">6.0 yr</td>
                  <td className="px-4 py-3">6.12 yr</td>
                  <td className="px-4 py-3">Aggressive growth portfolio</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">15%</td>
                  <td className="px-4 py-3">4.8 yr</td>
                  <td className="px-4 py-3">4.96 yr</td>
                  <td className="px-4 py-3">Concentrated equity, individual stocks</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Exact column: t = ln(2) / ln(1 + r), annual compounding.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Underlying Formula</h2>
          <div className="text-gray-600 space-y-4">
            <p>
              For a lump sum compounding annually with no contributions:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center font-mono text-sm sm:text-base">
              Years to double = ln(2) / ln(1 + r)
            </div>
            <p>
              Where r is your annual rate of return as a decimal (5% = 0.05).
              The Rule of 72 (72 / rate%) is the same formula approximated for
              mental math — accurate within 0.5 years at typical investment
              rates.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Doubling Times in Context</h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <p className="font-semibold text-gray-900 mb-1">High-yield savings (4-5%)</p>
              <p>
                Doubles in 14-18 years. Realistic for the cash portion of an
                emergency fund. Won&apos;t beat inflation if inflation runs
                above 4%, so don&apos;t expect doubling of <em>purchasing power</em>.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Treasury bonds (4-5% nominal)</p>
              <p>
                Doubles in roughly the same 14-18 years as HYSA, with similar
                inflation caveats. Tax advantages on state income tax may shift
                the effective return up slightly.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">S&amp;P 500 (10% nominal, 7% real)</p>
              <p>
                Doubles in 7.2 years nominal or 10.3 years in inflation-adjusted
                terms. Over a 40-year career, that&apos;s 5-6 doublings of real
                purchasing power.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Aggressive growth (12-15%)</p>
              <p>
                Doubles in 5-6 years if sustained — but high-return strategies
                also tend to have higher variance and longer drawdowns. The
                average return matters less than the sequence of returns over
                the timeframe you actually need the money.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Contributions Change Everything
          </h2>
          <p className="text-gray-600 mb-4">
            The doubling-time tables above assume a lump sum with no
            contributions. If you&apos;re contributing every month, your
            balance doubles in dramatically less time. Example:
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 text-gray-700 space-y-2">
            <p>
              <strong>Starting balance:</strong> $10,000
            </p>
            <p>
              <strong>Monthly contribution:</strong> $500
            </p>
            <p>
              <strong>Annual return:</strong> 7%
            </p>
            <p>
              <strong>Time to double:</strong> ~1.5 years (vs 10.3 with no
              contributions)
            </p>
          </div>
          <p className="text-gray-600 mt-4">
            For young savers, contributions matter far more than rate of
            return. For retirees with no new contributions, rate of return is
            everything.
          </p>
        </section>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tools & Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/rule-of-72" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Rule of 72 Calculator</p>
              <p className="text-sm text-gray-500">Get exact doubling times for any rate</p>
            </Link>
            <Link href="/rule-of-72-explained" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Rule of 72 Explained</p>
              <p className="text-sm text-gray-500">The math behind the shortcut</p>
            </Link>
            <Link href="/savings-goal" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Savings Goal Calculator</p>
              <p className="text-sm text-gray-500">Time or contribution needed to hit a target</p>
            </Link>
            <Link href="/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compound Interest Calculator</p>
              <p className="text-sm text-gray-500">Add contributions to see real doubling speed</p>
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
