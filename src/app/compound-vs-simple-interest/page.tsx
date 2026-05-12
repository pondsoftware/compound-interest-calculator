import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compound vs Simple Interest — Side-by-Side Comparison & Examples",
  description:
    "Compound vs simple interest explained with side-by-side examples. See how the two methods diverge over 10, 20, and 30 years, and which one applies to your savings or loan.",
  alternates: {
    canonical: "/compound-vs-simple-interest",
  },
  openGraph: {
    title: "Compound vs Simple Interest",
    description:
      "Side-by-side comparison of compound and simple interest with worked examples over 10, 20, and 30 years.",
    type: "article",
    url: "https://compoundinterestcalc.app/compound-vs-simple-interest",
  },
};

const faqs = [
  {
    question: "What is the main difference between compound and simple interest?",
    answer:
      "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus any interest already earned. Over time, compound interest produces exponentially larger returns because every interest payment becomes part of the new base.",
  },
  {
    question: "Is compound interest always better than simple interest?",
    answer:
      "For savers and investors, yes — compound interest produces more growth. For borrowers, simple interest is better because it caps interest at the principal balance and doesn't accumulate on top of itself. Mortgages and car loans typically use simple interest; credit cards and savings accounts use compound interest.",
  },
  {
    question: "What types of accounts use compound interest?",
    answer:
      "Savings accounts, money market accounts, certificates of deposit (CDs), retirement accounts (401k, IRA), brokerage accounts, and credit card balances all use compound interest. The compounding frequency varies — daily, monthly, quarterly, or annually.",
  },
  {
    question: "How much faster does compound interest grow than simple interest?",
    answer:
      "Over 10 years at 7% on $10,000, simple interest yields $17,000 while compound interest yields $19,672 — a $2,672 difference. Over 30 years, simple interest yields $31,000 while compound interest yields $76,123 — the gap balloons to $45,123 because each year's gains compound on top of previous gains.",
  },
  {
    question: "Do mortgages use simple or compound interest?",
    answer:
      "US mortgages use simple interest, calculated daily based on the outstanding principal. Each monthly payment covers the accrued interest first, then reduces the principal. Because the principal balance shrinks every month, less interest accrues over time, even though the rate stays the same.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Compound vs Simple Interest — Side-by-Side Comparison & Examples",
  description:
    "Compound vs simple interest explained with side-by-side examples. See how the two methods diverge over 10, 20, and 30 years.",
  url: "https://compoundinterestcalc.app/compound-vs-simple-interest",
  mainEntityOfPage: "https://compoundinterestcalc.app/compound-vs-simple-interest",
  author: { "@type": "Organization", name: "Compound Interest Calculator" },
  publisher: { "@type": "Organization", name: "Compound Interest Calculator" },
};

export default function CompoundVsSimpleInterestPage() {
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
                name: "Compound vs Simple Interest",
                item: "https://compoundinterestcalc.app/compound-vs-simple-interest",
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Compound vs Simple Interest
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Two very different ways to calculate interest — and over long
            horizons, the gap between them is enormous. Here&apos;s how each one
            works, when it applies, and what the difference looks like in real
            dollars.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Short Version</h2>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 text-gray-700">
            <p className="mb-3">
              <strong>Simple interest</strong> is calculated only on the original
              principal. The interest payment is the same every period.
            </p>
            <p className="mb-3">
              <strong>Compound interest</strong> is calculated on the principal
              plus all previously accrued interest. The interest payment grows
              every period because the base grows.
            </p>
            <p>
              Same rate, same time, very different outcome. The longer the
              horizon, the more the two diverge.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Formulas</h2>
          <div className="space-y-4 text-gray-700">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold mb-2">Simple interest</p>
              <p className="font-mono text-sm">A = P × (1 + r × t)</p>
              <p className="text-sm text-gray-600 mt-2">
                Interest each year: P × r (always the same)
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold mb-2">Compound interest (annual compounding)</p>
              <p className="font-mono text-sm">A = P × (1 + r)<sup>t</sup></p>
              <p className="text-sm text-gray-600 mt-2">
                Interest each year: previous balance × r (grows every year)
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Where <strong>P</strong> = principal, <strong>r</strong> = annual
              rate (as a decimal), <strong>t</strong> = time in years.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Side-by-Side: $10,000 at 7% Over Time
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Year</th>
                  <th className="px-4 py-3 font-semibold">Simple Interest</th>
                  <th className="px-4 py-3 font-semibold">Compound Interest</th>
                  <th className="px-4 py-3 font-semibold">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="px-4 py-3 font-medium">5</td>
                  <td className="px-4 py-3">$13,500</td>
                  <td className="px-4 py-3">$14,026</td>
                  <td className="px-4 py-3">$526</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">10</td>
                  <td className="px-4 py-3">$17,000</td>
                  <td className="px-4 py-3">$19,672</td>
                  <td className="px-4 py-3">$2,672</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">20</td>
                  <td className="px-4 py-3">$24,000</td>
                  <td className="px-4 py-3">$38,697</td>
                  <td className="px-4 py-3">$14,697</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">30</td>
                  <td className="px-4 py-3">$31,000</td>
                  <td className="px-4 py-3">$76,123</td>
                  <td className="px-4 py-3">$45,123</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">40</td>
                  <td className="px-4 py-3">$38,000</td>
                  <td className="px-4 py-3">$149,745</td>
                  <td className="px-4 py-3">$111,745</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Annual compounding assumed for the compound column.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">When Each Type Applies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Simple Interest Is Used For</h3>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                <li>Most mortgages (US daily-accrual)</li>
                <li>Auto loans</li>
                <li>Personal loans and student loans</li>
                <li>Many short-term bonds and Treasury bills</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Compound Interest Is Used For</h3>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                <li>Savings accounts and money market accounts</li>
                <li>Certificates of deposit (CDs)</li>
                <li>401(k), IRA, and brokerage accounts</li>
                <li>Credit card balances (compounded daily)</li>
                <li>Reinvested dividends and bond interest</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Why the Compound Gap Grows
          </h2>
          <p className="text-gray-600 mb-4">
            In year one, both methods earn the same interest because the base
            is identical. From year two onward, compound interest starts earning
            interest on the interest it earned last year — and that effect
            snowballs. By year 30 of the example above, compound interest is
            growing by about $5,000 per year just from interest on prior
            interest. That&apos;s why time horizon matters more than rate for
            long-term savers.
          </p>
        </section>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tools & Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compound Interest Calculator</p>
              <p className="text-sm text-gray-500">See compounding in action with your numbers</p>
            </Link>
            <Link href="/compound-interest-formula" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compound Interest Formula</p>
              <p className="text-sm text-gray-500">Step-by-step walkthrough of the math</p>
            </Link>
            <Link href="/daily-vs-monthly-vs-annual-compounding" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compounding Frequency</p>
              <p className="text-sm text-gray-500">Daily vs monthly vs annual: does it matter?</p>
            </Link>
            <Link href="/rule-of-72-explained" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Rule of 72 Explained</p>
              <p className="text-sm text-gray-500">The mental math behind doubling time</p>
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
