"use client"
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LogOut, Activity, TrendingUp, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prediction, setPrediction] = useState<number | null>(null);
    const [targetDate, setTargetDate] = useState('2026-12-01');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const history = await api.getSales();
                const formatted = history.map((s: any) => ({
                    name: new Date(s.date).toLocaleDateString(),
                    revenue: s.amount
                })).slice(0, 15);
                setSalesData(formatted);
            } catch (err) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [router]);

    const handlePredict = async () => {
        try {
            const res = await api.predictSales(targetDate);
            setPrediction(res.predicted_sales_amount);
        } catch (error) {
            console.error("Error al predecir ventas", error);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-emerald-500 font-bold">Cargando Inteligencia...</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Centro de Comando Ejecutivo</h1>
                    <p className="text-zinc-400 mt-1">Análisis histórico y pronóstico predictivo impulsado por IA</p>
                </div>
                <button onClick={api.logout} className="p-2 bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors border border-white/10">
                    <LogOut size={20} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg"><DollarSign size={20} /></div>
                        <h3 className="text-zinc-400 font-medium">Ventas Históricas Registradas</h3>
                    </div>
                    <p className="text-4xl font-bold">{salesData.length}</p>
                    <p className="text-sm text-emerald-400 mt-2 font-medium">Operaciones sincronizadas</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><Activity size={20} /></div>
                        <h3 className="text-zinc-400 font-medium">Modelo Predictivo Activo</h3>
                    </div>
                    <p className="text-2xl font-bold border-l-4 border-blue-500 pl-3">Scikit-Learn (Reg. Lineal)</p>
                    <p className="text-sm text-blue-400 mt-2 font-medium">Estado: En Producción</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm min-w-0">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Activity className="text-emerald-400" /> Rendimiento Histórico (/sales)
                    </h3>
                    <div style={{ width: '100%', height: 350, minHeight: 350 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData.length > 0 ? salesData : [
                                { name: 'Ene', revenue: 4000 }, { name: 'Feb', revenue: 3000 }, { name: 'Mar', revenue: 5000 }, { name: 'Abr', revenue: 4500 }
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                                <YAxis stroke="#666" fontSize={12} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="p-6 bg-gradient-to-b from-white/5 to-emerald-500/5 border border-emerald-500/20 rounded-2xl backdrop-blur-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="text-emerald-400" /> Pronóstico (ML API)
                        </h3>
                        <p className="text-sm text-zinc-400 mb-6 flex-grow">Consulta al modelo `/predict-sales` especificando una fecha futura.</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-zinc-500 font-bold mb-2">Fecha Objetivo</label>
                                <input 
                                    type="date" 
                                    value={targetDate}
                                    onChange={(e) => setTargetDate(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-lg focus:outline-none focus:border-emerald-500"
                                />
                            </div>
                            <button 
                                onClick={handlePredict}
                                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl transition-all"
                            >
                                Generar Proyección
                            </button>
                        </div>
                    </div>

                    {prediction !== null && (
                        <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center animate-in zoom-in duration-500">
                            <p className="text-xs text-emerald-400 uppercase font-bold mb-2">Ventas Estimadas para {targetDate}</p>
                            <p className="text-4xl font-extrabold text-white">${prediction.toLocaleString()}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
