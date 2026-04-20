import { Metadata } from "next";
import InflationCalculator from "@/components/InflationCalculator";

export const metadata: Metadata = {
  title: "Inflation Calculator — Future Purchasing Power & Present Value",
  description:
    "Free inflation calculator. See how inflation erodes purchasing power over time. Calculate what today's money will be worth in the future, or find the present value of future amounts.",
  alternates: {
    canonical: "/inflation",
  },
  openGraph: {
    title: "Inflation Calculator",
    description:
      "Calculate how inflation erodes purchasing power. See what today's money will be worth in the future or find present value of future amounts.",
    type: "website",
    url: "https://compoundinterestcalc.app/inflation",
  },
};

export default function InflationPage() {
  const faqs = [
    {
      question: "What is a good inflation rate to use for calculations?",
      answer:
        "The US Federal Reserve targets 2% annual inflation. Historical US inflation has averaged about 3% over the last century. For conservative planning, use 3%. For recent years (2022-2024) inflation ran higher at 4-8%, but long-term projections typically use 2.5-3.5%.",
    },
    {
      question: "How does inflation affect my savings?",
      answer:
        "Inflation reduces the purchasing power of cash over time. If your savings earn less interest than the inflation rate, you are effectively losing money. For example, $100,000 in a 1% savings account loses real value every year if inflation is 3% — after 10 years, your money buys only about $82,000 worth of goods.",
    },
    {
      question: "How can I protect my money from inflation?",
      answer:
        "Invest in assets that historically outpace inflation: stocks (7-10% average return), real estate, TIPS (Treasury Inflation-Protected Securities), and I-Bonds. Keeping large amounts in low-interest savings accounts is one of the biggest wealth-eroding mistakes people make.",
    },
    {
      question: "What is the difference between nominal and real returns?",
      answer:
        "Nominal returns are the raw percentage gain on an investment before accounting for inflation. Real returns subtract the inflation rate. If your investment earned 8% and inflation was 3%, your real return was approximately 5%. Real returns show your actual increase in purchasing power.",
    },
  ];

  return (
    <>
      <InflationCalculator />

      {/* Educational Content */}
      <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Inflation and Purchasing Power
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              Inflation is the gradual increase in prices over time, which
              means each dollar buys less in the future than it does today.
              While 2-3% annual inflation might seem small, it compounds just
              like interest &mdash; except it works against you. At 3%
              inflation, prices double roughly every 24 years.
            </p>
            <p>
              This is why simply saving money in a checking account is not
              enough. If your savings earn 0.5% but inflation runs at 3%, you
              are losing 2.5% of your purchasing power every year. Over 20
              years, that means your cash can only buy about 60% of what it
              could when you first saved it.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Inflation Matters for Financial Planning
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              When planning for retirement or long-term goals, you must
              account for inflation. A retirement that costs $50,000/year today
              will cost approximately $90,000/year in 20 years at 3% inflation.
              Failing to plan for this means your savings may run out faster
              than expected.
            </p>
            <p>
              This calculator helps you understand both directions: what your
              current money will be worth in the future (purchasing power
              erosion), and what you would need to save in the future to match
              today&apos;s purchasing power.
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
              { "@type": "ListItem", position: 2, name: "Inflation Calculator", item: "https://compoundinterestcalc.app/inflation" },
            ],
          }),
        }}
      />
    </>
  );
}
