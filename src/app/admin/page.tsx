"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, CheckCircle, XCircle, Users, Video } from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [customers, setCustomers] = useState<any[]>([]);
  const [registrants, setRegistrants] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState<"customers" | "webinars">("customers");
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setCustomers(data.customers);
        setRegistrants(data.registrants);
        setIsAuthenticated(true);
      } else {
        alert("Invalid password or server error");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const toggleAccess = async (id: number) => {
    // In a real app, you would make an API call here to update the DB
    // For now, we update local state for demonstration
    setCustomers(customers.map(c => 
      c.id === id ? { ...c, accessGranted: !c.accessGranted } : c
    ));
    alert("In a production environment, this would update the database via an API route.");
  };

  const exportCSV = () => {
    let headers = [];
    let rows = [];
    let filename = "";

    if (activeTab === "customers") {
      headers = ["Name,Email,TV Username,Phone,Plan,Status,Access Granted,Expiry,Created At\n"];
      rows = customers.map(c => 
        `${c.name},${c.email},${c.tradingviewUsername},${c.phone},${c.plan},${c.paymentStatus},${c.accessGranted},${new Date(c.expiresAt).toLocaleDateString()},${new Date(c.createdAt).toLocaleDateString()}`
      );
      filename = "ipe_customers.csv";
    } else {
      headers = ["Name,Email,WhatsApp,Webinar Date,Registered At,Sent Welcome,Sent 24h,Sent 15m\n"];
      rows = registrants.map(r => 
        `${r.name},${r.email},${r.whatsapp},${new Date(r.webinarDate).toLocaleString()},${new Date(r.registeredAt).toLocaleString()},${r.sentWelcome},${r.sentOneDay},${r.sentFifteenMin}`
      );
      filename = "ipe_webinar_registrants.csv";
    }

    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.email.toLowerCase().includes(search.toLowerCase()) || 
                          c.tradingviewUsername.toLowerCase().includes(search.toLowerCase()) ||
                          c.name.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = filterPlan === "all" || c.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const filteredRegistrants = registrants.filter(r => {
    return r.email.toLowerCase().includes(search.toLowerCase()) || 
           r.name.toLowerCase().includes(search.toLowerCase()) ||
           r.whatsapp.includes(search);
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="glass-card p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h1>
          <div className="space-y-4">
            <div>
              <Label>Password</Label>
              <Input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin(e as any)}
                className="bg-white/5 border-white/10 text-white mt-2"
                placeholder="Enter admin password (admin123)"
              />
            </div>
            <Button type="button" onClick={handleLogin} disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white">
              {loading ? "Verifying..." : "Login"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-32">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Manage customers and webinar leads.</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleLogin} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Refresh Data
            </Button>
            <Button onClick={exportCSV} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="flex gap-4 border-b border-white/10 pb-4">
          <Button 
            onClick={() => setActiveTab("customers")} 
            variant={activeTab === "customers" ? "default" : "ghost"}
            className={activeTab === "customers" ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}
          >
            <Users className="w-4 h-4 mr-2" />
            Purchasers ({customers.length})
          </Button>
          <Button 
            onClick={() => setActiveTab("webinars")} 
            variant={activeTab === "webinars" ? "default" : "ghost"}
            className={activeTab === "webinars" ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}
          >
            <Video className="w-4 h-4 mr-2" />
            Webinar Leads ({registrants.length})
          </Button>
        </div>

        <div className="glass-card p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input 
                placeholder={activeTab === "customers" ? "Search by email or TV username..." : "Search by name, email, or WhatsApp..."}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 text-white max-w-md"
              />
            </div>
            {activeTab === "customers" && (
              <div className="flex items-center gap-2">
                <Label>Filter Plan:</Label>
                <select 
                  value={filterPlan} 
                  onChange={e => setFilterPlan(e.target.value)}
                  className="bg-black border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">All Plans</option>
                  <option value="trial">Trial</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="lifetime">Lifetime</option>
                </select>
              </div>
            )}
          </div>

          <div className="rounded-md border border-white/10 overflow-hidden">
            {activeTab === "customers" ? (
              <Table>
                <TableHeader className="bg-white/5 hover:bg-white/5">
                  <TableRow className="border-white/10">
                    <TableHead className="text-gray-300">Customer</TableHead>
                    <TableHead className="text-gray-300">TV Username</TableHead>
                    <TableHead className="text-gray-300">Plan</TableHead>
                    <TableHead className="text-gray-300">Expiry</TableHead>
                    <TableHead className="text-gray-300">Access</TableHead>
                    <TableHead className="text-right text-gray-300">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No customers found in database.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id} className="border-white/10 hover:bg-white/5">
                        <TableCell>
                          <div className="font-medium text-white">{customer.name}</div>
                          <div className="text-xs text-gray-400">{customer.email}</div>
                          <div className="text-xs text-gray-500">{customer.phone}</div>
                        </TableCell>
                        <TableCell className="text-primary font-mono text-sm">{customer.tradingviewUsername}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-white/20 text-gray-300 capitalize">
                            {customer.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300 text-sm">
                          {new Date(customer.expiresAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {customer.accessGranted ? (
                            <Badge className="bg-green-500/20 text-green-400 border-0 flex w-fit items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Granted
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-500/20 text-yellow-500 border-0 flex w-fit items-center gap-1">
                              <XCircle className="w-3 h-3" /> Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleAccess(customer.id)}
                            className="hover:bg-white/10 text-white"
                          >
                            {customer.accessGranted ? "Revoke Access" : "Mark Granted"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader className="bg-white/5 hover:bg-white/5">
                  <TableRow className="border-white/10">
                    <TableHead className="text-gray-300">Lead Info</TableHead>
                    <TableHead className="text-gray-300">WhatsApp</TableHead>
                    <TableHead className="text-gray-300">Webinar Date</TableHead>
                    <TableHead className="text-gray-300">Registered</TableHead>
                    <TableHead className="text-gray-300">Reminders Sent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrants.length === 0 ? (
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No webinar registrants found in database.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRegistrants.map((reg) => (
                      <TableRow key={reg.id} className="border-white/10 hover:bg-white/5">
                        <TableCell>
                          <div className="font-medium text-white">{reg.name}</div>
                          <div className="text-xs text-gray-400">{reg.email}</div>
                        </TableCell>
                        <TableCell className="text-primary font-mono text-sm">{reg.whatsapp}</TableCell>
                        <TableCell className="text-gray-300 text-sm">
                          {new Date(reg.webinarDate).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </TableCell>
                        <TableCell className="text-gray-500 text-xs">
                          {new Date(reg.registeredAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Badge variant="outline" className={reg.sentWelcome ? "bg-green-500/10 border-green-500/50 text-green-400" : "border-gray-700 text-gray-500"}>
                              Welcome
                            </Badge>
                            <Badge variant="outline" className={reg.sentOneDay ? "bg-green-500/10 border-green-500/50 text-green-400" : "border-gray-700 text-gray-500"}>
                              24h
                            </Badge>
                            <Badge variant="outline" className={reg.sentFifteenMin ? "bg-green-500/10 border-green-500/50 text-green-400" : "border-gray-700 text-gray-500"}>
                              15m
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
