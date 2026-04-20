import { Metadata } from "next";
import SavingsGoalCalculator from "@/components/SavingsGoalCalculator";

export const metadata: Metadata = {
  title: "Savings Goal Calculator — How Long to Reach Your Target",
  description:
    "Free savings goal calculator. Find out how long it takes to reach your savings target, or calculate the monthly contribution needed to hit your goal by a specific date.",
  alternates: {
    canonical: "/savings-goal",
  },
  openGraph: {
    title: "Savings Goal Calculator",
    description:
      "Calculate how long to reach your savings goal or find the monthly savings needed to hit your target by a specific date.",
    type: "website",
    url: "https://compoundinterestcalc.app/savings-goal",
  },
};

export default function SavingsGoalPage() {
  const faqs = [
    {
      question: "How do I calculate how long it takes to reach a savings goal?",
      answer:
        "To calculate time to reach a savings goal, you need your target amount, current savings, expected interest rate, and monthly contribution. The calculator compounds interest monthly on your balance plus contributions until the goal is reached.",
    },
    {
      question: "How much should I save each month to reach my goal?",
      answer:
        "The required monthly savings depends on your goal amount, timeline, current savings, and interest rate. Use the 'How Much to Save Monthly' mode to input your goal and timeline — the calculator will determine the exact monthly contribution needed.",
    },
    {
      question: "What interest rate should I use for savings goals?",
      answer:
        "For a high-yield savings account, use 4-5%. For a diversified investment portfolio, 6-8% is reasonable for long-term goals (5+ years). For short-term goals under 2 years, use a more conservative rate matching current savings account yields.",
    },
    {
      question: "Is it better to save a lump sum or contribute monthly?",
      answer:
        "Investing a lump sum earlier generally produces higher returns due to more time compounding. However, regular monthly contributions (dollar-cost averaging) reduce timing risk and are more practical for most people building savings from income.",
    },
  ];

  return (
    <>
      <SavingsGoalCalculator />

      {/* Educational Content */}
      <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Setting Effective Savings Goals
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              A savings goal works best when it is specific, measurable, and
              time-bound. Rather than &ldquo;save more money,&rdquo; define
              exactly what you need: $50,000 for a home down payment in 5
              years, or $20,000 for an emergency fund within 2 years. This
              calculator helps you bridge the gap between your current position
              and your target.
            </p>
            <p>
              The power of compound interest means even small adjustments to
              your monthly contribution or timeline can produce dramatically
              different outcomes. Adding just $100 more per month or extending
              your timeline by a year can significantly reduce the effort
              required to reach your goal.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tips for Reaching Your Savings Goal Faster
          </h2>
          <div className="text-gray-600 space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li>Automate your contributions so you never forget to save</li>
              <li>Increase contributions whenever you receive a raise</li>
              <li>Put windfalls (tax refunds, bonuses) directly toward your goal</li>
              <li>Choose the right account type for your timeline and risk tolerance</li>
              <li>Review and adjust your plan quarterly</li>
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
              { "@type": "ListItem", position: 2, name: "Savings Goal Calculator", item: "https://compoundinterestcalc.app/savings-goal" },
            ],
          }),
        }}
      />
    </>
  );
}
