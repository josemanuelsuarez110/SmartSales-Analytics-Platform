"use client"
import KPIWidget from "@/components/KPIWidget";
import SalesChart from "@/components/SalesChart";
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-white">Sales Executive Overview</h2>
        <p className="text-muted-foreground mt-1 text-gray-500">Real-time performance metrics and revenue analysis.</p>
      </header>

      <section className="dashboard-grid">
        <KPIWidget 
          title="Total Revenue" 
          value="12.5k" 
          unit="$" 
          trend={{ type: 'up', value: 12.5 }}
          icon={<DollarSign size={20} />} 
        />
        <KPIWidget 
          title="Active Customers" 
          value="1,204" 
          trend={{ type: 'up', value: 4.2 }}
          icon={<Users size={20} />} 
        />
        <KPIWidget 
          title="Conversion Rate" 
          value="3.2" 
          unit="%" 
          trend={{ type: 'down', value: 0.8 }}
          icon={<TrendingUp size={20} />} 
        />
        <KPIWidget 
          title="Open Deals" 
          value="45" 
          icon={<ShoppingBag size={20} />} 
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4">Top Regions</h3>
          <div className="space-y-4">
            {['North America', 'EMEA', 'Asia Pacific', 'Latin America'].map((region, i) => (
              <div key={region} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                <span className="text-sm">{region}</span>
                <span className="text-emerald-400 font-bold">${10 - i}.4k</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
