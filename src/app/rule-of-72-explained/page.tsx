import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rule of 72 Explained — Where It Comes From & When It Works",
  description:
    "Rule of 72 explained: where the number 72 comes from, why it works, when it's accurate, and how to apply it to investing, inflation, and debt.",
  alternates: {
    canonical: "/rule-of-72-explained",
  },
  openGraph: {
    title: "Rule of 72 Explained",
    description:
      "Where the Rule of 72 comes from, why 72 specifically, when the approximation holds, and how to apply it.",
    type: "article",
    url: "https://compoundinterestcalc.app/rule-of-72-explained",
  },
};

const faqs = [
  {
    question: "Where does the number 72 come from?",
    answer:
      "The mathematically precise number for doubling at continuous compounding is 100 × ln(2) ≈ 69.3. 72 is used instead because it is evenly divisible by 2, 3, 4, 6, 8, 9, and 12, making mental math trivial. At rates between 5% and 12% — the realistic range for most investments — 72 produces a better approximation for discrete annual compounding than 69.3 does.",
  },
  {
    question: "How accurate is the Rule of 72?",
    answer:
      "Very accurate between 6% and 10%, where the error is under 0.5 years. At 2% the rule estimates 36 years; the true answer is 35 years (1-year error). At 20% the rule estimates 3.6 years; the true answer is 3.8 years. For estimates in the 6-10% range, treat the rule's output as exact.",
  },
  {
    question: "Does the Rule of 72 work in reverse?",
    answer:
      "Yes. To find the rate needed to double in a target number of years, divide 72 by the target years. To double in 8 years, you need 9% returns (72/8 = 9). To double in 6 years, you need 12% returns (72/6 = 12).",
  },
  {
    question: "Can the Rule of 72 apply to inflation?",
    answer:
      "Yes. At 3% annual inflation, the purchasing power of cash is cut in half in about 24 years (72/3 = 24). At 6% inflation, halving takes about 12 years. Any compounding rate — positive or negative — works with the rule.",
  },
  {
    question: "Are there variants like the Rule of 70 or Rule of 69?",
    answer:
      "Yes. The Rule of 70 is slightly more accurate for low rates and is preferred in academic settings. The Rule of 69.3 is the mathematically exact value for continuous compounding. The Rule of 72 wins in practice because it divides cleanly into more numbers, making it the easiest to use without a calculator.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Rule of 72 Explained — Where It Comes From & When It Works",
  description:
    "Rule of 72 explained: where the number 72 comes from, why it works, when it's accurate, and how to apply it.",
  url: "https://compoundinterestcalc.app/rule-of-72-explained",
  mainEntityOfPage: "https://compoundinterestcalc.app/rule-of-72-explained",
  author: { "@type": "Organization", name: "Compound Interest Calculator" },
  publisher: { "@type": "Organization", name: "Compound Interest Calculator" },
};

export default function RuleOf72ExplainedPage() {
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
                name: "Rule of 72 Explained",
                item: "https://compoundinterestcalc.app/rule-of-72-explained",
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Rule of 72, Explained
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            The Rule of 72 is one of finance&apos;s most useful mental
            shortcuts. Divide 72 by the annual rate and you get the years it
            takes to double. But why 72? When does it break down? And how do
            you use it well?
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Rule in One Sentence</h2>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 text-gray-700">
            <p className="text-lg">
              <strong>Years to double ≈ 72 / annual rate of return.</strong>
            </p>
          </div>
          <p className="text-gray-600 mt-4">
            At 8%, you double in 9 years. At 6%, 12 years. At 12%, 6 years.
            No calculator needed.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Where 72 Comes From</h2>
          <div className="text-gray-600 space-y-4">
            <p>
              The exact doubling time for a compounding investment is given by
              the formula:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center font-mono text-sm sm:text-base">
              t = ln(2) / ln(1 + r)
            </div>
            <p>
              For continuous compounding, this simplifies to t = ln(2) / r ≈
              0.693 / r. Multiply by 100 to express the rate as a percent: t ≈
              69.3 / rate%.
            </p>
            <p>
              So the most mathematically accurate version is actually the
              &ldquo;Rule of 69.3.&rdquo; The reason finance educators use 72
              instead is practical: 72 divides evenly by 2, 3, 4, 6, 8, 9, and
              12. 69.3 divides cleanly by nothing useful. For mental math, 72
              wins.
            </p>
            <p>
              At interest rates in the practical 6-10% range, 72 also happens
              to be a slightly better approximation than 69.3 for{" "}
              <em>annual</em> compounding (as opposed to continuous
              compounding), which is what most investments use. So the rule
              isn&apos;t just easier — it&apos;s also more accurate where it
              matters most.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Accuracy Across Rates</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Rate</th>
                  <th className="px-4 py-3 font-semibold">Rule of 72</th>
                  <th className="px-4 py-3 font-semibold">Exact (years)</th>
                  <th className="px-4 py-3 font-semibold">Error</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="px-4 py-3 font-medium">2%</td>
                  <td className="px-4 py-3">36.0</td>
                  <td className="px-4 py-3">35.0</td>
                  <td className="px-4 py-3">+1.0 yr</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">4%</td>
                  <td className="px-4 py-3">18.0</td>
                  <td className="px-4 py-3">17.7</td>
                  <td className="px-4 py-3">+0.3 yr</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">6%</td>
                  <td className="px-4 py-3">12.0</td>
                  <td className="px-4 py-3">11.9</td>
                  <td className="px-4 py-3">+0.1 yr</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">8%</td>
                  <td className="px-4 py-3">9.0</td>
                  <td className="px-4 py-3">9.0</td>
                  <td className="px-4 py-3">0.0 yr</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">10%</td>
                  <td className="px-4 py-3">7.2</td>
                  <td className="px-4 py-3">7.3</td>
                  <td className="px-4 py-3">−0.1 yr</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">15%</td>
                  <td className="px-4 py-3">4.8</td>
                  <td className="px-4 py-3">5.0</td>
                  <td className="px-4 py-3">−0.2 yr</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">20%</td>
                  <td className="px-4 py-3">3.6</td>
                  <td className="px-4 py-3">3.8</td>
                  <td className="px-4 py-3">−0.2 yr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Exact column uses annual compounding: t = ln(2) / ln(1+r).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Five Useful Applications</h2>
          <ul className="space-y-3 text-gray-600">
            <li>
              <strong>Stock market returns.</strong> At 10% (historical S&amp;P
              500 average), money doubles every 7.2 years. Over a 40-year
              career, that&apos;s ~5.5 doublings — turning $10,000 into about
              $450,000.
            </li>
            <li>
              <strong>Inflation erosion.</strong> At 3% inflation, cash loses
              half its purchasing power every 24 years. At 6%, every 12 years.
            </li>
            <li>
              <strong>Credit card debt.</strong> At 24% APR, an unpaid balance
              doubles in 3 years (72/24 = 3). Compounding works against you
              just as fast as it works for you.
            </li>
            <li>
              <strong>Economic growth.</strong> A country growing GDP at 3%
              doubles its economy in 24 years. At 7% (China&apos;s long-run
              rate), it doubles every 10 years.
            </li>
            <li>
              <strong>Required rate of return.</strong> Want to double your
              money in 9 years? You need 8% returns (72/9 = 8).
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">When to Skip the Rule</h2>
          <p className="text-gray-600 mb-4">
            The Rule of 72 assumes a fixed annual rate and no contributions. If
            either of those assumptions breaks, use a proper calculator:
          </p>
          <ul className="space-y-2 text-gray-600 list-disc list-inside">
            <li>Variable returns (real-world investments)</li>
            <li>Regular contributions (savings plans, 401(k)s)</li>
            <li>Withdrawals or partial redemptions</li>
            <li>Rates below 2% or above 20%, where the approximation breaks down</li>
          </ul>
        </section>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tools & Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/rule-of-72" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Rule of 72 Calculator</p>
              <p className="text-sm text-gray-500">Plug in a rate or target and get exact answers</p>
            </Link>
            <Link href="/how-long-until-savings-double" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">How Long Until Savings Double</p>
              <p className="text-sm text-gray-500">Doubling times by rate with worked examples</p>
            </Link>
            <Link href="/compound-vs-simple-interest" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compound vs Simple Interest</p>
              <p className="text-sm text-gray-500">Side-by-side comparison over 5-40 years</p>
            </Link>
            <Link href="/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <p className="font-medium text-blue-600">Compound Interest Calculator</p>
              <p className="text-sm text-gray-500">Full growth projection with contributions</p>
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
