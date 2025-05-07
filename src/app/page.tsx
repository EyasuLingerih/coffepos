import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, DollarSign, FileText, Smartphone } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">
          Welcome to BrewFlow POS
        </h1>
        <p className="text-xl text-muted-foreground">
          Your seamless Point of Sale solution for coffee shops.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="w-12 h-12 text-accent" />
            </div>
            <CardTitle className="text-2xl text-center">Sales Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Process orders quickly and efficiently. Supports offline mode to keep your business running, always.
            </CardDescription>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/pos" passHref>
              <Button>Go to POS</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Coffee className="w-12 h-12 text-accent" />
            </div>
            <CardTitle className="text-2xl text-center">Inventory Management</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Keep track of your stock levels with ease. Add, remove, and view items across all branches.
            </CardDescription>
          </CardContent>
           <CardFooter className="justify-center">
            <Link href="/inventory" passHref>
              <Button>Manage Inventory</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 text-accent" />
            </div>
            <CardTitle className="text-2xl text-center">Daily Sales Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Generate end-of-day reports summarizing sales and transactions. Export for easy sharing.
            </CardDescription>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/reports" passHref>
              <Button>View Reports</Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

      <section className="text-center py-8 bg-secondary rounded-lg">
        <h2 className="text-3xl font-semibold text-primary mb-4">Built for Your Needs</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center gap-2">
            <Smartphone className="w-8 h-8 text-accent" />
            <p className="text-lg">Offline First</p>
          </div>
          <div className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-accent lucide lucide-git-branch-plus"><path d="M6 3v12"/><path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M15 6a9 9 0 0 0-9 9"/><path d="M18 15v6"/><path d="M21 18h-6"/></svg>
            <p className="text-lg">Multi-Branch Support</p>
          </div>
           <div className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-accent lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <p className="text-lg">Real-time Sync</p>
          </div>
        </div>
      </section>

      <footer className="text-center mt-16 py-6 border-t">
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} BrewFlow POS. All rights reserved.</p>
      </footer>
    </div>
  );
}
