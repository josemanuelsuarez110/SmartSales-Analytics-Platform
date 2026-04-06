"use client"
import KPIWidget from "@/components/KPIWidget";
import { UserCheck, Clock, BookOpen, Search } from 'lucide-react';

export default function HRDashboard() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-700">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Talent & Productivity Hub</h2>
        <p className="text-muted-foreground text-gray-500">Monitor organizational KPIs and employee performance.</p>
      </header>

      <section className="dashboard-grid">
        <KPIWidget 
          title="Retention Rate" 
          value="94.2" 
          unit="%" 
          trend={{ type: 'up', value: 1.5 }}
          icon={<UserCheck size={20} />} 
        />
        <KPIWidget 
          title="Avg Training" 
          value="12.4" 
          unit="h" 
          trend={{ type: 'up', value: 4.2 }}
          icon={<BookOpen size={20} />} 
        />
        <KPIWidget 
          title="Performance" 
          value="4.1" 
          unit="/5" 
          icon={<TrendingUp size={20} />} 
        />
        <KPIWidget 
          title="Avg Overtime" 
          value="8.5" 
          unit="h" 
          trend={{ type: 'down', value: 2.1 }}
          icon={<Clock size={20} />} 
        />
      </section>

      <section className="glass-card">
        <h3 className="text-lg font-semibold mb-6">Talent Distribution by Dept</h3>
        <div className="space-y-6">
          {[
            { dept: 'Sales', count: 45, perf: 4.5 },
            { dept: 'Engineering', count: 120, perf: 4.8 },
            { dept: 'HR & Ops', count: 15, perf: 4.2 },
            { dept: 'Marketing', count: 32, perf: 4.0 },
          ].map((item) => (
            <div key={item.dept} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.dept}</span>
                <span className="text-emerald-400">{item.count} Employees</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${(item.perf / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { TrendingUp } from 'lucide-react';
