import { Metadata } from "next";
import RuleOf72Calculator from "@/components/RuleOf72Calculator";

export const metadata: Metadata = {
  title: "Rule of 72 Calculator — How Long to Double Your Money",
  description:
    "Free Rule of 72 calculator. Instantly estimate how long it takes to double your money at any interest rate. Comparison table of common rates and exact doubling times.",
  alternates: {
    canonical: "/rule-of-72",
  },
  openGraph: {
    title: "Rule of 72 Calculator",
    description:
      "Estimate how long it takes to double your money at any interest rate using the Rule of 72. Includes comparison table and exact calculations.",
    type: "website",
    url: "https://compoundinterestcalc.app/rule-of-72",
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Rule of 72 Calculator",
  description: "Free Rule of 72 calculator. Instantly estimate how long it takes to double your money at any interest rate. Comparison table of common rates and exact doubling times.",
  url: "https://compoundinterestcalc.app/rule-of-72",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function RuleOf72Page() {
  const faqs = [
    {
      question: "What is the Rule of 72?",
      answer:
        "The Rule of 72 is a simple formula to estimate how long it takes an investment to double. Divide 72 by the annual interest rate to get the approximate number of years to double. For example, at 8% return, your money doubles in about 9 years (72 / 8 = 9).",
    },
    {
      question: "How accurate is the Rule of 72?",
      answer:
        "The Rule of 72 is most accurate for interest rates between 6% and 10%, where the error is less than 0.5 years. At very low rates (1-2%) or very high rates (20%+), the approximation becomes less precise. For exact results, use the formula: years = ln(2) / ln(1 + rate).",
    },
    {
      question: "Can the Rule of 72 be used for inflation?",
      answer:
        "Yes. The Rule of 72 works for any compounding growth rate. At 3% annual inflation, the purchasing power of your money is halved in about 24 years (72 / 3 = 24). This highlights why holding cash long-term without investing erodes your wealth.",
    },
    {
      question: "Why is 72 used instead of another number?",
      answer:
        "72 is chosen because it is divisible by many common numbers (2, 3, 4, 6, 8, 9, 12) making mental math easy. The mathematically precise number would be 69.3 (which equals 100 × ln(2)), but 72 provides a better approximation at typical investment rates and is easier to divide mentally.",
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <RuleOf72Calculator />

      {/* Educational Content */}
      <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How the Rule of 72 Works
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              The Rule of 72 is a mental math shortcut that lets you quickly
              estimate the doubling time of any investment. The formula is
              simple: divide 72 by your annual rate of return. The result is
              the approximate number of years for your money to double.
            </p>
            <p>
              This works because of the mathematical properties of compound
              growth. The exact formula for doubling time is ln(2) / ln(1 + r),
              where r is the decimal interest rate. For rates between 5% and
              12%, the number 72 produces a remarkably close approximation to
              this formula while being far easier to calculate in your head.
            </p>
            <p>
              The rule also works in reverse: if you want to double your money
              in a specific number of years, divide 72 by those years to find
              the required rate of return. Need to double in 6 years? You need
              about 12% annual returns (72 / 6 = 12).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Practical Applications of the Rule of 72
          </h2>
          <div className="text-gray-600 space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Investment planning:</strong> Quickly gauge how long before your portfolio doubles</li>
              <li><strong>Inflation awareness:</strong> Understand how fast rising prices erode your savings</li>
              <li><strong>Debt assessment:</strong> See how quickly debt doubles if left unpaid at a given APR</li>
              <li><strong>GDP growth:</strong> Estimate how long for an economy to double in size</li>
              <li><strong>Population growth:</strong> Project when a population will double at a given growth rate</li>
            </ul>
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
              { "@type": "ListItem", position: 2, name: "Rule of 72 Calculator", item: "https://compoundinterestcalc.app/rule-of-72" },
            ],
          }),
        }}
      />
    </>
  );
}
