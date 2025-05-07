"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Download, BarChart3, DollarSign } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for demonstration
interface Transaction {
  id: string;
  time: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

interface DailyReport {
  date: Date;
  totalSales: number;
  transactionCount: number;
  transactions: Transaction[];
  branch: "Branch A" | "Branch B";
}

const mockReports: DailyReport[] = [
  {
    date: new Date(2023, 10, 20), // Nov 20, 2023
    totalSales: 1250.75,
    transactionCount: 55,
    branch: "Branch A",
    transactions: [
      { id: "T001", time: "09:15 AM", items: [{ name: "Latte", quantity: 2, price: 3.50 }, { name: "Croissant", quantity: 1, price: 2.75 }], total: 9.75 },
      { id: "T002", time: "09:30 AM", items: [{ name: "Espresso", quantity: 1, price: 2.50 }], total: 2.50 },
    ],
  },
  {
    date: new Date(2023, 10, 20), // Nov 20, 2023
    totalSales: 980.50,
    transactionCount: 42,
    branch: "Branch B",
    transactions: [
      { id: "T101", time: "10:05 AM", items: [{ name: "Cappuccino", quantity: 1, price: 3.25 }, { name: "Muffin", quantity: 2, price: 2.00 }], total: 7.25 },
    ],
  },
  {
    date: new Date(), // Today
    totalSales: 320.00,
    transactionCount: 15,
    branch: "Branch A",
    transactions: [
      { id: "T003", time: "10:15 AM", items: [{ name: "Americano", quantity: 1, price: 3.00 }], total: 3.00 },
    ],
  }
];


export default function ReportsPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [selectedBranch, setSelectedBranch] = React.useState<"Branch A" | "Branch B">("Branch A");
  const [report, setReport] = React.useState<DailyReport | null>(null);

  React.useEffect(() => {
    if (selectedDate) {
      const foundReport = mockReports.find(
        r => format(r.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") && r.branch === selectedBranch
      );
      setReport(foundReport || null);
    }
  }, [selectedDate, selectedBranch]);

  const handleDownloadReport = () => {
    if (!report) return;

    let reportText = `Daily Sales Report\n`;
    reportText += `Date: ${format(report.date, "PPP")}\n`;
    reportText += `Branch: ${report.branch}\n`;
    reportText += `Total Sales: $${report.totalSales.toFixed(2)}\n`;
    reportText += `Total Transactions: ${report.transactionCount}\n\n`;
    reportText += `Transactions Summary:\n`;
    report.transactions.forEach(tx => {
      reportText += `  ID: ${tx.id}, Time: ${tx.time}, Total: $${tx.total.toFixed(2)}\n`;
      tx.items.forEach(item => {
        reportText += `    - ${item.name} (Qty: ${item.quantity}, Price: $${item.price.toFixed(2)})\n`;
      });
    });

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `sales_report_${format(report.date, "yyyy-MM-dd")}_${report.branch}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-primary">Daily Sales Reports</h1>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value as "Branch A" | "Branch B")}
            className="p-2 border rounded-md bg-background text-foreground focus:ring-primary focus:border-primary"
          >
            <option value="Branch A">Branch A</option>
            <option value="Branch B">Branch B</option>
          </select>
        </div>
      </div>

      {report ? (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <BarChart3 className="mr-3 h-7 w-7 text-accent" />
              Report for {format(report.date, "PPP")} - {report.branch}
            </CardTitle>
            <CardDescription>Summary of sales and transactions for the selected day and branch.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <div className="flex items-center p-4 bg-secondary rounded-lg">
                <DollarSign className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-muted-foreground">Total Sales</p>
                  <p className="font-bold text-2xl">${report.totalSales.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-secondary rounded-lg">
                <BarChart3 className="h-8 w-8 text-primary mr-3" />
                 <div>
                  <p className="text-muted-foreground">Total Transactions</p>
                  <p className="font-bold text-2xl">{report.transactionCount}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Transactions Details</h3>
              {report.transactions.length > 0 ? (
                <div className="max-h-96 overflow-y-auto pr-2 space-y-3">
                {report.transactions.map(tx => (
                  <Card key={tx.id} className="p-3 bg-background/70">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium">ID: {tx.id} <span className="text-sm text-muted-foreground">({tx.time})</span></p>
                      <p className="font-semibold text-primary">${tx.total.toFixed(2)}</p>
                    </div>
                    <ul className="list-disc list-inside pl-2 text-sm">
                      {tx.items.map((item, index) => (
                        <li key={index} className="text-muted-foreground">
                          {item.name} (Qty: {item.quantity}, Price: ${item.price.toFixed(2)})
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No transactions recorded for this day and branch.</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDownloadReport} disabled={!report}>
              <Download className="mr-2 h-5 w-5" /> Download Report (TXT)
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="shadow-lg">
          <CardContent className="py-12 text-center">
            <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              {selectedDate ? `No report found for ${format(selectedDate, "PPP")} at ${selectedBranch}.` : "Please select a date and branch to view a report."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
