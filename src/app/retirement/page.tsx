import { Metadata } from "next";
import RetirementCalculator from "@/components/RetirementCalculator";

export const metadata: Metadata = {
  title: "Retirement Savings Calculator — Estimate Your Nest Egg",
  description:
    "Free retirement calculator. Estimate your retirement nest egg based on age, savings, and contributions. See projected monthly retirement income using the 4% safe withdrawal rule.",
  alternates: {
    canonical: "/retirement",
  },
  openGraph: {
    title: "Retirement Savings Calculator",
    description:
      "Estimate your retirement nest egg and projected monthly income. Input your age, savings, contributions, and expected returns.",
    type: "website",
    url: "https://compoundinterestcalc.app/retirement",
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Retirement Savings Calculator",
  description: "Free retirement calculator. Estimate your retirement nest egg based on age, savings, and contributions. See projected monthly retirement income using the 4% safe withdrawal rule.",
  url: "https://compoundinterestcalc.app/retirement",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function RetirementPage() {
  const faqs = [
    {
      question: "What is the 4% rule for retirement?",
      answer:
        "The 4% rule suggests you can safely withdraw 4% of your retirement savings in the first year, then adjust for inflation each subsequent year, and your money should last at least 30 years. For a $1,000,000 nest egg, that means $40,000/year ($3,333/month) in the first year of retirement.",
    },
    {
      question: "How much do I need to retire comfortably?",
      answer:
        "A common guideline is 25x your annual expenses (the inverse of the 4% rule). If you need $60,000/year in retirement, aim for $1,500,000. However, this depends on your lifestyle, healthcare costs, Social Security benefits, and how conservative you want to be.",
    },
    {
      question: "What rate of return should I assume for retirement planning?",
      answer:
        "A commonly used rate is 7% for a stock-heavy portfolio (which accounts for historical stock market returns minus inflation). More conservative investors might use 5-6%. The key is to be realistic — overly optimistic assumptions can leave you short in retirement.",
    },
    {
      question: "How much should I contribute to retirement each month?",
      answer:
        "Financial advisors commonly recommend saving 15-20% of your gross income for retirement. If you started late, you may need to save more. The calculator above helps you see if your current contribution rate will meet your goals, and adjust accordingly.",
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <RetirementCalculator />

      {/* Educational Content */}
      <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Planning for Retirement
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              Retirement planning is fundamentally about answering one question:
              will I have enough money to maintain my lifestyle when I stop
              working? The earlier you start planning and saving, the easier it
              becomes &mdash; thanks to the exponential power of compound
              interest working over decades.
            </p>
            <p>
              The biggest advantage younger investors have is time. Starting
              at age 25 instead of 35 with the same monthly contribution can
              result in nearly double the retirement nest egg, even though you
              only contributed 10 extra years of savings. Those early
              contributions have 40 years to compound and multiply.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The 4% Safe Withdrawal Rule Explained
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              The 4% rule comes from the &ldquo;Trinity Study,&rdquo; which
              analyzed historical market data to determine a sustainable
              withdrawal rate. It found that withdrawing 4% of your portfolio
              in year one (then adjusting for inflation annually) had a very
              high success rate of lasting 30+ years across various market
              conditions.
            </p>
            <p>
              This means your target nest egg should be approximately 25 times
              your desired annual retirement income. Need $80,000/year? Target
              $2,000,000 in retirement savings. This calculator helps you see
              whether your current trajectory will get you there.
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
              { "@type": "ListItem", position: 2, name: "Retirement Savings Calculator", item: "https://compoundinterestcalc.app/retirement" },
            ],
          }),
        }}
      />
    </>
  );
}
