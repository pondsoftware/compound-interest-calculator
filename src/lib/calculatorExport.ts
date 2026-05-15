export interface ExportYearRow {
  year: number;
  totalContributions: number;
  totalInterest: number;
  balance: number;
  realBalance: number;
}

export interface ExportData {
  principal: number;
  monthly: number;
  annual: number;
  rate: number;
  years: number;
  adjustForInflation: boolean;
  inflationRate: number;
  finalBalance: number;
  totalContributed: number;
  totalInterest: number;
  realFinalBalance: number;
  schedule: ExportYearRow[];
}

const SITE_URL = "compoundinterestcalc.app";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

function inputRows(d: ExportData): [string, string][] {
  const rows: [string, string][] = [
    ["Initial Investment", formatCurrency(d.principal)],
    ["Monthly Contribution", formatCurrency(d.monthly)],
    ["Additional Annual Contribution", formatCurrency(d.annual)],
    ["Annual Return Rate", `${d.rate}%`],
    ["Time Period", `${d.years} years`],
  ];
  if (d.adjustForInflation) {
    rows.push(["Annual Inflation Rate", `${d.inflationRate}%`]);
  }
  return rows;
}

function summaryRows(d: ExportData): [string, string][] {
  if (d.adjustForInflation) {
    return [
      ["Nominal Final Balance", formatCurrency(d.finalBalance)],
      ["Real Final Balance (Today's Dollars)", formatCurrency(d.realFinalBalance)],
      ["Total Contributed", formatCurrency(d.totalContributed)],
      ["Interest Earned", formatCurrency(d.totalInterest)],
      ["Purchasing Power Lost to Inflation", formatCurrency(d.finalBalance - d.realFinalBalance)],
    ];
  }
  return [
    ["Final Balance", formatCurrency(d.finalBalance)],
    ["Total Contributed", formatCurrency(d.totalContributed)],
    ["Interest Earned", formatCurrency(d.totalInterest)],
  ];
}

export async function exportToPdf(d: ExportData): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Compound Interest Calculator", 40, 50);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120);
  doc.text(`Generated ${todayStamp()} • ${SITE_URL}`, 40, 68);
  doc.setTextColor(0);

  autoTable(doc, {
    startY: 90,
    head: [["Inputs", ""]],
    body: inputRows(d),
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235] },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 220 } },
    margin: { left: 40, right: 40 },
  });

  const afterInputs = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  autoTable(doc, {
    startY: afterInputs + 20,
    head: [["Summary", ""]],
    body: summaryRows(d),
    theme: "striped",
    headStyles: { fillColor: [22, 163, 74] },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 260 } },
    margin: { left: 40, right: 40 },
  });

  const afterSummary = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  const head = d.adjustForInflation
    ? [["Year", "Contributions", "Interest Earned", "Balance", "Real Balance"]]
    : [["Year", "Contributions", "Interest Earned", "Balance"]];

  const body = d.schedule.map((r) => {
    const base = [
      String(r.year),
      formatCurrency(r.totalContributions),
      formatCurrency(r.totalInterest),
      formatCurrency(r.balance),
    ];
    if (d.adjustForInflation) base.push(formatCurrency(r.realBalance));
    return base;
  });

  autoTable(doc, {
    startY: afterSummary + 20,
    head,
    body,
    theme: "grid",
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 9 },
    columnStyles: { 0: { halign: "left" }, 1: { halign: "right" }, 2: { halign: "right" }, 3: { halign: "right" }, 4: { halign: "right" } },
    margin: { left: 40, right: 40 },
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount} • ${SITE_URL}`,
      pageWidth - 40,
      doc.internal.pageSize.getHeight() - 20,
      { align: "right" }
    );
  }

  doc.save(`compound-interest-${todayStamp()}.pdf`);
}

export async function exportToExcel(d: ExportData): Promise<void> {
  const ExcelJS = (await import("exceljs")).default;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = SITE_URL;
  workbook.created = new Date();

  const summary = workbook.addWorksheet("Summary");
  summary.columns = [
    { header: "Field", key: "field", width: 38 },
    { header: "Value", key: "value", width: 24 },
  ];
  summary.getRow(1).font = { bold: true };

  summary.addRow({ field: "INPUTS", value: "" }).font = { bold: true };
  for (const [label, value] of inputRows(d)) {
    summary.addRow({ field: label, value });
  }
  summary.addRow({});
  summary.addRow({ field: "RESULTS", value: "" }).font = { bold: true };
  for (const [label, value] of summaryRows(d)) {
    summary.addRow({ field: label, value });
  }
  summary.addRow({});
  summary.addRow({ field: "Generated", value: todayStamp() });
  summary.addRow({ field: "Source", value: SITE_URL });

  const schedule = workbook.addWorksheet("Year-by-Year");
  const cols = [
    { header: "Year", key: "year", width: 8 },
    { header: "Contributions", key: "contributions", width: 18 },
    { header: "Interest Earned", key: "interest", width: 18 },
    { header: "Balance", key: "balance", width: 18 },
  ];
  if (d.adjustForInflation) {
    cols.push({ header: "Real Balance", key: "realBalance", width: 18 });
  }
  schedule.columns = cols;
  schedule.getRow(1).font = { bold: true };

  const currencyFmt = '"$"#,##0';
  for (const r of d.schedule) {
    const row: Record<string, number> = {
      year: r.year,
      contributions: r.totalContributions,
      interest: r.totalInterest,
      balance: r.balance,
    };
    if (d.adjustForInflation) row.realBalance = r.realBalance;
    schedule.addRow(row);
  }
  ["B", "C", "D", "E"].forEach((col) => {
    schedule.getColumn(col).numFmt = currencyFmt;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer as ArrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `compound-interest-${todayStamp()}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
