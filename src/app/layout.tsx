import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <p className="text-xl font-bold text-gray-900">
              Compound Interest Calculator
            </p>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 text-center mb-2">More Free Tools</p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                <a href="https://appliancecostcalculator.net" className="text-blue-600 hover:underline">Appliance Cost Calculator</a>
                <a href="https://sidehustletaxcalculator.net" className="text-blue-600 hover:underline">Side Hustle Tax Calculator</a>
                <a href="https://imageconverters.net" className="text-blue-600 hover:underline">Image Converter</a>
                <a href="https://photometadata.net" className="text-blue-600 hover:underline">Photo Metadata Viewer</a>
                <a href="https://freelancerates.net" className="text-blue-600 hover:underline">Freelance Rate Calculator</a>
                <a href="https://imageresizers.net" className="text-blue-600 hover:underline">Social Image Resizer</a>
                <a href="https://lendingcalculator.net" className="text-blue-600 hover:underline">Mortgage Calculator</a>
                <a href="https://salaryconverter.net" className="text-blue-600 hover:underline">Salary Converter</a>
                <a href="https://printablepolly.com" className="text-blue-600 hover:underline">Printable Polly</a>
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
