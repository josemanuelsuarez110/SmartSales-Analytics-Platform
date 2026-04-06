"use client"
import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.login(email, password);
            if (res.access_token) {
                router.push('/dashboard');
            } else {
                setError(res.detail || 'Fallo de autenticación. Verifica tus credenciales.');
            }
        } catch (err) {
            setError('Error de conexión con el servidor. Verifica que esté corriendo en el puerto 8000.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 text-white font-sans">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-in fade-in duration-700">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-4">
                        <Lock className="text-emerald-400" size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">AI BI Platform</h1>
                    <p className="text-zinc-400 text-sm">Ingresa a tu centro de inteligencia ejecutiva</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Email Empresarial</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-sm"
                                placeholder="ceo@empresa.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-semibold text-center animate-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl transition-all flex justify-center items-center gap-2 group mt-6"
                    >
                        Acceder Seguramente
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}
