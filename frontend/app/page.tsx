"use client"
import Link from 'next/link';
import { ArrowRight, BrainCircuit, BarChart3, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-inter selection:bg-emerald-500/30">
            {/* Nav */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5">
                <div className="flex items-center gap-2">
                    <BrainCircuit className="text-emerald-400" size={28} />
                    <span className="font-bold text-xl tracking-tighter">AI BI Core</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                    <span className="hover:text-white cursor-pointer transition-colors">Platform</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Solutions</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Enterprise</span>
                </div>
                <Link 
                    href="/login" 
                    className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-emerald-400 transition-all"
                >
                    Launch Terminal
                </Link>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-4 animate-in slide-in-from-top duration-1000">
                        <Zap size={14} className="text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Next-Gen Predictive Analytics</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent animate-in zoom-in-95 duration-1000">
                        Transform Data into <br />
                        <span className="text-emerald-500">Autonomous Strategy</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        The ultimate executive intelligence platform. Modular, secure, and powered by 
                        multi-model AI engines for revenue projection and churn avoidance.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
                        <Link 
                            href="/login" 
                            className="bg-emerald-500 hover:bg-emerald-600 text-black px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all group"
                        >
                            Executive Login
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-10 py-4 rounded-xl font-bold text-lg transition-all">
                            View API Specs
                        </button>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40">
                    {[
                        { icon: BarChart3, title: 'Multi-Model Forecasting', desc: 'Regression and time-series models trained on your transactional flow.' },
                        { icon: ShieldCheck, title: 'JWT Secure Core', desc: 'Enterprise-grade authentication with stateless JWT token management.' },
                        { icon: BrainCircuit, title: 'Customer Segmentation', desc: 'Automated clustering to identify your highest-value users and VIP segments.' },
                    ].map((feature, i) => (
                        <div key={i} className="glass-card p-10 hover:border-emerald-500/30 transition-all group">
                            <feature.icon className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 text-center text-gray-600 text-sm">
                <p>&copy; 2026 AI BI Platform. Engineered with Precision for the Global Enterprise.</p>
            </footer>
        </div>
    );
}
