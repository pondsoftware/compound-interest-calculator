import { Metadata } from "next";
import InvestmentGrowthCalculator from "@/components/InvestmentGrowthCalculator";

export const metadata: Metadata = {
  title: "Investment Growth Calculator — Project Your Portfolio Value",
  description:
    "Free investment growth calculator. Project how your portfolio grows over time with compound returns and monthly additions. Year-by-year breakdown of contributions vs returns.",
  alternates: {
    canonical: "/investment-growth",
  },
  openGraph: {
    title: "Investment Growth Calculator",
    description:
      "Project how your investments grow over time with compound returns and regular monthly additions. Detailed year-by-year breakdown.",
    type: "website",
    url: "https://compoundinterestcalc.app/investment-growth",
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Investment Growth Calculator",
  description: "Free investment growth calculator. Project how your portfolio grows over time with compound returns and monthly additions. Year-by-year breakdown of contributions vs returns.",
  url: "https://compoundinterestcalc.app/investment-growth",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function InvestmentGrowthPage() {
  const faqs = [
    {
      question: "What is a realistic annual return for investments?",
      answer:
        "The S&P 500 has historically returned about 10% per year before inflation (roughly 7% after inflation). A balanced portfolio of stocks and bonds might return 6-8%. More conservative investments like bonds return 3-5%. Your actual return depends on asset allocation and market conditions.",
    },
    {
      question: "How do monthly contributions affect investment growth?",
      answer:
        "Monthly contributions have a powerful compounding effect. Each contribution begins earning returns immediately, creating a snowball effect. For example, contributing $500/month at 8% return grows to over $700,000 in 25 years — even though you only contributed $150,000 out of pocket.",
    },
    {
      question: "Should I invest a lump sum or dollar-cost average?",
      answer:
        "Statistically, lump-sum investing beats dollar-cost averaging about two-thirds of the time because markets tend to rise. However, dollar-cost averaging reduces the risk of investing at a market peak and is psychologically easier for many investors.",
    },
    {
      question: "How does compound growth differ from linear growth?",
      answer:
        "Linear growth adds the same dollar amount each year. Compound growth earns returns on your returns, creating exponential growth. Early on the difference is small, but over 20-30 years compound growth dramatically outpaces linear growth. This is why time in the market matters so much.",
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <InvestmentGrowthCalculator />

      {/* Educational Content */}
      <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Investment Growth
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              Investment growth comes from two sources: your contributions and
              the returns earned on your portfolio. Over long time periods, the
              returns component almost always exceeds your total contributions
              &mdash; this is the power of compound growth working in your
              favor.
            </p>
            <p>
              The year-by-year breakdown above shows this dynamic clearly. In
              the early years, most of your balance comes from contributions.
              But as time passes, the interest earned each year grows larger
              and larger, eventually dwarfing your annual contributions. This
              is why starting early is the single most impactful decision an
              investor can make.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Key Factors That Drive Investment Growth
          </h2>
          <div className="text-gray-600 space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Time horizon:</strong> The longer you invest, the more compounding works in your favor</li>
              <li><strong>Rate of return:</strong> Even 1-2% difference in annual returns compounds to huge differences over decades</li>
              <li><strong>Consistency:</strong> Regular monthly contributions build wealth steadily regardless of market timing</li>
              <li><strong>Starting amount:</strong> A larger initial investment gets a head start on compounding</li>
              <li><strong>Fees and taxes:</strong> Minimizing investment costs keeps more of your returns working for you</li>
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
              { "@type": "ListItem", position: 2, name: "Investment Growth Calculator", item: "https://compoundinterestcalc.app/investment-growth" },
            ],
          }),
        }}
      />
    </>
  );
}
