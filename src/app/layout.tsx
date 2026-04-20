import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "Compound Interest Calculator — See How Your Money Grows",
  description:
    "Free compound interest calculator. See how your investments grow over time with monthly contributions. Visual growth chart shows contributions vs interest earned.",
  openGraph: {
    title: "Compound Interest Calculator",
    description:
      "Free compound interest calculator. See how your investments grow over time with monthly contributions. Visual growth chart shows contributions vs interest earned.",
    type: "website",
    url: "https://compoundinterestcalc.app",
    siteName: "Compound Interest Calculator",
  },
  twitter: {
    card: "summary",
    title: "Compound Interest Calculator",
    description:
      "Free compound interest calculator. See how your investments grow over time with monthly contributions. Visual growth chart shows contributions vs interest earned.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-K7FMZ8XELQ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K7FMZ8XELQ');
        `}
      </Script>
      <body className="min-h-full flex flex-col font-sans bg-gray-50 text-gray-900">
        <header className="bg-orange-500 text-white">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-2 text-xl font-bold text-white no-underline">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              Compound Interest Calculator
            </a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 text-center mb-2">More Free Tools</p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                <a href="https://appliancecostcalculator.net" className="text-orange-600 hover:underline">Appliance Cost Calculator</a>
                <a href="https://sidehustletaxcalculator.net" className="text-orange-600 hover:underline">Side Hustle Tax Calculator</a>
                <a href="https://imageconverters.net" className="text-orange-600 hover:underline">Image Converter</a>
                <a href="https://photometadata.net" className="text-orange-600 hover:underline">Photo Metadata Viewer</a>
                <a href="https://freelancerates.net" className="text-orange-600 hover:underline">Freelance Rate Calculator</a>
                <a href="https://imageresizers.net" className="text-orange-600 hover:underline">Social Image Resizer</a>
                <a href="https://lendingcalculator.net" className="text-orange-600 hover:underline">Mortgage Calculator</a>
                <a href="https://salaryconverter.net" className="text-orange-600 hover:underline">Salary Converter</a>
                <a href="https://printablepolly.com" className="text-orange-600 hover:underline">Printable Polly</a>
                <a href="https://biblegarden.net" className="text-orange-600 hover:underline">Bible Garden</a>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              This calculator assumes a fixed annual return rate compounded
              monthly. Actual investment returns vary and past performance
              does not guarantee future results. This is not financial advice.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
