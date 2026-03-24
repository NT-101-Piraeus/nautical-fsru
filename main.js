/**
 * NTG COMMAND HUB - MAIN BRIDGE v2.0
 * Leap 2: The Intelligent Network
 */

// 1. Σύνδεση με Supabase (Operational Backbone) [cite: 34, 341]
const supabaseUrl = 'YOUR_SUPABASE_URL'; 
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

const { useState, useEffect } = React;

const App = () => {
    // State Management [cite: 338-340]
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');
    const USER_ID = "M. SYKINIOTIS"; 

    // Πρωτόκολλο Ασφαλείας PIN [cite: 212, 339]
    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') {
            setIsAuthenticated(true);
        } else {
            alert('ACCESS DENIED: INVALID SECURITY PIN');
            setPin('');
        }
    };

    // Επιστροφή στην Αρχική Οθόνη
    const goHome = () => setView('HOME');

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950">
                <form onSubmit={handleLogin} className="glass p-10 rounded-[3rem] border border-slate-800 w-full max-w-sm text-center shadow-2xl animate-in fade-in zoom-in duration-500">
                    <div className="mb-8">
                        <i className="fa-solid fa-anchor text-4xl text-blue-500 mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"></i>
                        <h1 className="brand text-xl tracking-[0.3em] font-black uppercase text-white">NTG COMMAND</h1>
                    </div>
                    <input 
                        type="password" 
                        value={pin} 
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl text-center text-3xl tracking-[0.8em] mb-6 text-white outline-none focus:border-blue-500 transition-all"
                        placeholder="PIN" 
                        maxLength="4" 
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 p-5 rounded-2xl brand font-bold uppercase tracking-widest text-sm transition-all active:scale-95 shadow-lg shadow-blue-900/40">
                        Initiate System Access
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 pb-28 max-w-lg mx-auto relative overflow-hidden">
            {view === 'HOME' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    {/* Header Info [cite: 302, 340] */}
                    <div className="flex justify-between items-center px-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Administrator Master Account</span>
                            <span className="brand text-sm italic font-bold text-white uppercase tracking-tighter">{USER_ID}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Enterprise Sync</span>
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse"></div>
                        </div>
                    </div>

                    {/* Central Grid (The Hub) [cite: 342-350] */}
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setView('M1')} className="glass p-7 rounded-[2.5rem] border-b-4 border-blue-600 hover:border-blue-400 flex flex-col items-center gap-4 transition-all active:scale-95 group">
                            <i className="fa-solid fa-shield-halved text-3xl text-blue-400 group-hover:scale-110 transition-transform"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">Τ.Α. ΠΛΟΙΩΝ</span>
                        </button>
                        
                        <button onClick={() => setView('M5')} className="glass p-7 rounded-[2.5rem] border-b-4 border-emerald-600 hover:border-emerald-400 flex flex-col items-center gap-4 transition-all active:scale-95 group">
                            <i className="fa-solid fa-users-viewfinder text-3xl text-emerald-400 group-hover:scale-110 transition-transform"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">STAFF HUB</span>
                        </button>

                        <button onClick={() => setView('M2')} className="glass p-7 rounded-[2.5rem] border-b-4 border-cyan-600 hover:border-cyan-400 flex flex-col items-center gap-4 transition-all active:scale-95 group">
                            <i className="fa-solid fa-ship text-3xl text-cyan-400 group-hover:scale-110 transition-transform"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">REPAIRS</span>
                        </button>

                        <button onClick={() => setView('M6')} className="glass p-7 rounded-[2.5rem] border-b-4 border-purple-600 hover:border-purple-400 flex flex-col items-center gap-4 transition-all active:scale-95 group">
                            <i className="fa-solid fa-chart-line text-3xl text-purple-400 group-hover:scale-110 transition-transform"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">CEO PULSE</span>
                        </button>

                        <button onClick={() => setView('M8')} className="glass p-7 rounded-[2.5rem] border-b-4 border-orange-600 hover:border-orange-400 flex flex-col items-center gap-4 transition-all active:scale-95 group">
                            <i className="fa-solid fa-house-chimney-user text-3xl text-orange-400 group-hover:scale-110 transition-transform"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">MYKONOS</span>
                        </button>

                        <button onClick={() => setView('M7')} className="glass p-7 rounded-[2.5rem] border-b-4 border-slate-700 opacity-60 flex flex-col items-center gap-4">
                            <i className="fa-solid fa-cart-flatbed-suitcases text-3xl text-slate-500"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-slate-500">MERCHANT</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right duration-500 h-full">
                    {/* Divisional Rendering [cite: 335] */}
                    {view.startsWith('M1') && <window.M1_Safety view={view} setView={setView} supabase={supabase} />}
                    {view.startsWith('M2') && <window.M2_Repairs view={view} setView={setView} supabase={supabase} />}
                    {view.startsWith('M5') && <window.M5_Staff view={view} setView={setView} supabase={supabase} />}
                    {view.startsWith('M6') && <window.M6_CEO_Pulse view={view} setView={setView} supabase={supabase} />}
                    {view.startsWith('M8') && <window.M8_Mykonos view={view} setView={setView} supabase={supabase} />}
                </div>
            )}

            {/* Global Element: Smart Capture [cite: 261, 315, 351] */}
            <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50">
                <button 
                    onClick={() => alert('SMART CAPTURE: Camera Interface Initialized')}
                    className="h-16 w-16 bg-blue-600 rounded-full border-4 border-slate-950 flex items-center justify-center shadow-2xl active:scale-90 transition-all pointer-events-auto shadow-blue-500/30 hover:bg-blue-500"
                >
                    <i className="fa-solid fa-camera text-2xl text-white"></i>
                </button>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
