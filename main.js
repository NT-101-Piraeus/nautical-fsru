/**
 * NTG COMMAND HUB - MAIN BRIDGE v2.0
 * Status: STABLE RECOVERY WITH PRODUCTION KEYS
 * Administrator: M. SYKINIOTIS
 */

// 1. Σύνδεση με Supabase (NauticalOS_V3) [cite: 34, 341]
const supabaseUrl = 'https://omdarjncczohpfzrqqhr.supabase.co';
const supabaseKey = 'sb_publishable_V-nfUDy5MxEG4SlXkisFBg_GBlD_4Y9';

let _supabase = null;
try {
    if (window.supabase) {
        _supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    }
} catch (e) {
    console.error("Supabase Initialization Failed:", e);
}

const { useState } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');
    const USER_ID = "M. SYKINIOTIS"; [cite: 340]

    // Πρωτόκολλο Ασφαλείας PIN (Manual 04) [cite: 45, 212, 339]
    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') {
            setIsAuthenticated(true);
        } else {
            alert('ACCESS DENIED: INVALID PIN');
            setPin('');
        }
    };

    // Ασφαλής φόρτωση των Divisions (Modular Engine Logic) 
    const renderDivision = (DivisionComponent, props) => {
        if (typeof DivisionComponent !== 'function') {
            return (
                <div className="h-screen flex flex-col items-center justify-center p-10 text-center bg-slate-950">
                    <i className="fa-solid fa-triangle-exclamation text-4xl text-amber-500 mb-4"></i>
                    <p className="text-amber-500 font-black brand uppercase text-xs tracking-widest">Division Loading Error</p>
                    <p className="text-slate-500 text-[10px] mt-2 uppercase font-bold italic font-bold">Check if the .js file exists in /divisions/</p>
                    <button onClick={() => setView('HOME')} className="mt-8 px-6 py-2 bg-slate-900 rounded-full text-[10px] text-white uppercase font-black border border-slate-800">Return to Bridge</button>
                </div>
            );
        }
        return <DivisionComponent {...props} />;
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950">
                <form onSubmit={handleLogin} className="glass p-10 rounded-[3rem] border border-slate-800 w-full max-w-sm text-center shadow-2xl animate-in zoom-in duration-500">
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
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 p-5 rounded-2xl brand font-bold uppercase tracking-widest text-sm active:scale-95 transition-all shadow-lg shadow-blue-900/40">
                        Initiate Access
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 pb-28 max-w-lg mx-auto relative overflow-hidden bg-slate-950 text-white selection:bg-blue-500/30">
            {view === 'HOME' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center px-4">
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Admin Master Active</span>
                            <span className="brand text-sm italic font-bold text-white uppercase tracking-tighter">{USER_ID}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest italic">Cloud Sync</span>
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
                        </div>
                    </div>

                    {/* Central Grid Navigation (Manual 02) [cite: 342-350] */}
                    <div className="grid grid-cols-2 gap-4 px-2">
                        <button onClick={() => setView('M1')} className="glass p-7 rounded-[2.5rem] border-b-4 border-blue-600 flex flex-col items-center gap-4 transition-all active:scale-95">
                            <i className="fa-solid fa-shield-halved text-3xl text-blue-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">Τ.Α. ΠΛΟΙΩΝ</span>
                        </button>
                        
                        <button onClick={() => setView('M5')} className="glass p-7 rounded-[2.5rem] border-b-4 border-emerald-600 flex flex-col items-center gap-4 transition-all active:scale-95">
                            <i className="fa-solid fa-users-viewfinder text-3xl text-emerald-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white font-bold italic">STAFF HUB</span>
                        </button>

                        <button onClick={() => setView('M2')} className="glass p-7 rounded-[2.5rem] border-b-4 border-cyan-600 flex flex-col items-center gap-4 transition-all active:scale-95 font-bold italic">
                            <i className="fa-solid fa-ship text-3xl text-cyan-400 font-bold italic"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">REPAIRS</span>
                        </button>

                        <button onClick={() => setView('M6')} className="glass p-7 rounded-[2.5rem] border-b-4 border-purple-600 flex flex-col items-center gap-4 transition-all active:scale-95">
                            <i className="fa-solid fa-chart-line text-3xl text-purple-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">CEO PULSE</span>
                        </button>

                        <button onClick={() => setView('M8')} className="glass p-7 rounded-[2.5rem] border-b-4 border-orange-600 flex flex-col items-center gap-4 transition-all active:scale-95">
                            <i className="fa-solid fa-house-chimney text-3xl text-orange-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">MYKONOS</span>
                        </button>

                        <button onClick={() => setView('M3')} className="glass p-7 rounded-[2.5rem] border-b-4 border-red-700 flex flex-col items-center gap-4 transition-all active:scale-95">
                            <i className="fa-solid fa-gavel text-3xl text-red-500"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white text-red-500">LEGAL</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right duration-500 h-full">
                    {/* Router for Divisions (Manual 02 Architecture) [cite: 182, 272] */}
                    {view.startsWith('M1') && renderDivision(window.M1_Safety, { view, setView, supabase: _supabase })}
                    {view.startsWith('M2') && renderDivision(window.M2_Repairs, { view, setView, supabase: _supabase })}
                    {view.startsWith('M3') && renderDivision(window.M3_Legal, { view, setView, supabase: _supabase })}
                    {view.startsWith('M5') && renderDivision(window.M5_Staff, { view, setView, supabase: _supabase })}
                    {view.startsWith('M6') && renderDivision(window.M6_CEO_Pulse, { view, setView, supabase: _supabase })}
                    {view.startsWith('M8') && renderDivision(window.M8_Mykonos, { view, setView, supabase: _supabase })}
                </div>
            )}

            {/* Global Element: Smart Capture [cite: 260-262, 315-318] */}
            <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50 font-bold italic">
                <button 
                    onClick={() => alert('SMART CAPTURE: Deployment Mode Initialized')}
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
