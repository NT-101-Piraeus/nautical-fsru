/**
 * NTG COMMAND HUB - MAIN BRIDGE v2.0
 * Status: OPERATIONAL - ALL STATIONS CONNECTED
 * Administrator: M. SYKINIOTIS
 */

const supabaseUrl = 'https://omdarjncczohpfzrqqhr.supabase.co';
const supabaseKey = 'sb_publishable_V-nfUDy5MxEG4SlXkisFBg_GBlD_4Y9';
const _supabase = window.supabase ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

const { useState } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') { // [cite: 7]
            setIsAuthenticated(true);
        } else {
            alert('ACCESS DENIED');
            setPin('');
        }
    };

    const renderDiv = (Comp, props) => {
        if (!Comp) return <div className="p-10 text-center glass m-4 brand text-[10px]">Loading Division...</div>;
        return <Comp {...props} />;
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950">
                <form onSubmit={handleLogin} className="glass p-10 rounded-[3rem] border border-slate-800 w-full max-w-sm text-center shadow-2xl animate-in zoom-in duration-500">
                    <h1 className="brand text-xl tracking-[0.3em] font-black text-white mb-8">NTG COMMAND</h1>
                    <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                           className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl text-center text-3xl tracking-[0.8em] mb-6 text-white outline-none focus:border-blue-500"
                           placeholder="PIN" maxLength="4" autoFocus />
                    <button type="submit" className="w-full bg-blue-600 p-5 rounded-2xl brand font-bold uppercase tracking-widest text-sm active:scale-95">
                        Initiate Access
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 pb-28 max-w-lg mx-auto bg-slate-950 text-white font-bold italic">
            {view === 'HOME' ? (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center px-4">
                        <div className="text-left font-bold italic">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic font-bold">System Status: Active</span>
                            <p className="brand text-sm italic font-bold text-white uppercase tracking-tighter">M. SYKINIOTIS</p>
                        </div>
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
                    </div>

                    {/* Central Grid Navigation - 6 Stations Connected [cite: 11-17] */}
                    <div className="grid grid-cols-2 gap-4 px-2">
                        <button onClick={() => setView('M1')} className="glass p-7 rounded-[2rem] border-b-4 border-blue-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-shield-halved text-2xl text-blue-400"></i>
                            <span className="text-[9px] font-black uppercase brand text-white italic">Τ.Α. ΠΛΟΙΩΝ</span>
                        </button>
                        <button onClick={() => setView('M5')} className="glass p-7 rounded-[2rem] border-b-4 border-emerald-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-users-viewfinder text-2xl text-emerald-400"></i>
                            <span className="text-[9px] font-black uppercase brand text-white italic">STAFF HUB</span>
                        </button>
                        <button onClick={() => setView('M2')} className="glass p-7 rounded-[2rem] border-b-4 border-cyan-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-ship text-2xl text-cyan-400"></i>
                            <span className="text-[9px] font-black uppercase brand text-white italic">REPAIRS</span>
                        </button>
                        <button onClick={() => setView('M6')} className="glass p-7 rounded-[2rem] border-b-4 border-purple-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-chart-line text-2xl text-purple-400"></i>
                            <span className="text-[9px] font-black uppercase brand text-white italic">CEO PULSE</span>
                        </button>
                        <button onClick={() => setView('M3')} className="glass p-7 rounded-[2rem] border-b-4 border-red-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-gavel text-2xl text-red-500"></i>
                            <span className="text-[9px] font-black uppercase brand text-white italic">LEGAL</span>
                        </button>
                        <button onClick={() => setView('M8')} className="glass p-7 rounded-[2rem] border-b-4 border-orange-500 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-house-chimney text-2xl text-orange-400"></i>
                            <span className="text-[9px] font-black uppercase brand text-white italic">MYKONOS</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right duration-500 h-full font-bold italic">
                    {view.startsWith('M1') && renderDiv(window.M1_Safety, { view, setView, supabase: _supabase })}
                    {view.startsWith('M2') && renderDiv(window.M2_Repairs, { view, setView, supabase: _supabase })}
                    {view.startsWith('M3') && renderDiv(window.M3_Legal, { view, setView, supabase: _supabase })}
                    {view.startsWith('M5') && renderDiv(window.M5_Staff, { view, setView, supabase: _supabase })}
                    {view.startsWith('M6') && renderDiv(window.M6_CEO_Pulse, { view, setView, supabase: _supabase })}
                    {view.startsWith('M8') && renderDiv(window.M8_Mykonos, { view, setView, supabase: _supabase })}
                    <button onClick={() => setView('HOME')} className="mt-8 text-[10px] text-slate-500 uppercase font-black underline w-full text-center italic">Back to Bridge</button>
                </div>
            )}
        </div>
    );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
