import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";

export default function Home() {
  const faqs = [
    {
      question: "What is compound interest?",
      answer: "Compound interest is interest earned on both your initial investment and previously earned interest. Unlike simple interest (calculated only on the principal), compound interest accelerates growth over time — often called the 'eighth wonder of the world.'"
    },
    {
      question: "What is the Rule of 72?",
      answer: "The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by the annual return rate. At 7% returns, your money doubles in about 10.3 years. At 10%, it doubles in 7.2 years."
    },
    {
      question: "How much will $10,000 grow in 20 years?",
      answer: "At a 7% average annual return with no additional contributions, $10,000 grows to about $38,697. Adding $500/month in contributions brings the total to over $300,000 — that is the power of consistent investing."
    },
    {
      question: "What is a realistic rate of return?",
      answer: "The S&P 500 has historically returned about 10% per year before inflation (7% after inflation). A diversified portfolio might return 6-8% after inflation depending on your asset allocation."
    },
    {
      question: "How does compound interest differ from simple interest?",
      answer: "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all accumulated interest. Over long periods, compound interest dramatically outperforms simple interest."
    },
    {
      question: "Does compounding frequency matter?",
      answer: "Yes, more frequent compounding produces slightly higher returns. Daily compounding yields more than monthly, which yields more than annual. However, the difference is relatively small — the bigger factors are rate of return and time."
    }
  ];

  return (
    <>
      <CompoundInterestCalculator />

      {/* Educational Content */}
      <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The Power of Compound Interest
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              Compound interest is often called the &ldquo;eighth wonder of the
              world&rdquo; &mdash; a quote widely attributed to Albert Einstein,
              who reportedly added: &ldquo;He who understands it, earns it; he
              who doesn&apos;t, pays it.&rdquo; Whether or not Einstein actually
              said it, the principle behind it is undeniably powerful. Unlike
              simple interest, which only earns returns on your original
              principal, compound interest earns returns on your returns. Over
              time, this creates an exponential growth curve that can turn modest
              savings into substantial wealth.
            </p>
            <p>
              Consider a concrete example: if you invest $10,000 at a 7% annual
              return and add $500 per month, after 30 years you would have over
              $680,000 &mdash; even though you only contributed $190,000 out of
              pocket. The remaining $490,000+ came entirely from compound
              interest working on your behalf, year after year. The longer your
              money compounds, the more dramatic the growth becomes.
            </p>
            <p>
              This is precisely why starting early matters so much. An investor
              who begins at age 25 and invests $500/month until age 65 will
              accumulate far more than someone who starts at 35 with the same
              contributions. Those first 10 years of compounding create a
              foundation that the late starter can never fully catch up to, even
              by contributing more money. Time is the single most powerful
              ingredient in the compound interest formula.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The Rule of 72
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              The Rule of 72 is a simple mental math shortcut for estimating how
              long it takes your money to double. Just divide 72 by your
              expected annual rate of return. The result is the approximate
              number of years to double your investment.
            </p>
            <p>
              Here are a few examples to illustrate:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>At 6% return: 72 / 6 = <strong>12 years</strong> to double</li>
              <li>At 8% return: 72 / 8 = <strong>9 years</strong> to double</li>
              <li>At 10% return: 72 / 10 = <strong>7.2 years</strong> to double</li>
              <li>At 12% return: 72 / 12 = <strong>6 years</strong> to double</li>
            </ul>
            <p>
              The Rule of 72 also works in reverse &mdash; you can use it to
              understand the erosion of purchasing power due to inflation. At 3%
              inflation, the purchasing power of your cash is cut in half in
              about 24 years (72 / 3 = 24). This is why keeping large amounts
              of money in a savings account earning below the inflation rate
              actually loses you wealth over time.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Compound Interest Formula
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              The formula used by this calculator to compute compound interest
              with regular contributions is:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center font-mono text-sm sm:text-base overflow-x-auto">
              A = P(1 + r/n)<sup>nt</sup> + PMT &times; [(1 + r/n)<sup>nt</sup> &minus; 1] / (r/n)
            </div>
            <p>Where each variable represents:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>A</strong> = final amount (future value)</li>
              <li><strong>P</strong> = principal (initial investment)</li>
              <li><strong>r</strong> = annual interest rate (as a decimal)</li>
              <li><strong>n</strong> = number of compounding periods per year</li>
              <li><strong>t</strong> = number of years</li>
              <li><strong>PMT</strong> = regular contribution per compounding period</li>
            </ul>
            <p>
              This calculator uses monthly compounding (n = 12), which is the
              most common frequency for investment accounts. The first part of
              the formula calculates the growth of your initial principal, while
              the second part calculates the accumulated value of your regular
              monthly contributions. Together, they give you the total future
              value of your investment.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          })
        }}
      />
      {/* Related Calculators Navigation Grid */}
      <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/savings-goal" className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition group">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">Savings Goal Calculator</h3>
            <p className="text-sm text-gray-500">Find how long to reach your savings target or the monthly contribution needed.</p>
          </a>
          <a href="/investment-growth" className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition group">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">Investment Growth Calculator</h3>
            <p className="text-sm text-gray-500">Project portfolio growth with monthly additions and year-by-year breakdown.</p>
          </a>
          <a href="/rule-of-72" className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition group">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">Rule of 72 Calculator</h3>
            <p className="text-sm text-gray-500">Estimate how long to double your money at any interest rate.</p>
          </a>
          <a href="/inflation" className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition group">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">Inflation Calculator</h3>
            <p className="text-sm text-gray-500">See how inflation erodes purchasing power and find present value of future amounts.</p>
          </a>
          <a href="/retirement" className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition group">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">Retirement Savings Calculator</h3>
            <p className="text-sm text-gray-500">Estimate your nest egg and monthly retirement income using the 4% rule.</p>
          </a>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://compoundinterestcalc.app" }
            ]
          })
        }}
      />
    </>
  );
}
