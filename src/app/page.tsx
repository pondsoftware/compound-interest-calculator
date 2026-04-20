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
    </>
  );
}
