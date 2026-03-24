/**
 * NTG COMMAND HUB - MAIN BRIDGE v2.0
 * EMERGENCY STABILITY & DEBUG MODE
 * Keys: sb_publishable_... (NauticalOS_V3)
 */

// 1. Στοιχεία Σύνδεσης (Επίσημα κλειδιά που έστειλες)
const supabaseUrl = 'https://omdarjncczohpfzrqqhr.supabase.co';
const supabaseKey = 'sb_publishable_V-nfUDy5MxEG4SlXkisFBg_GBlD_4Y9';

// 2. Αρχικοποίηση με προστασία σφαλμάτων
let _supabase = null;
const initSupabase = () => {
    try {
        if (window.supabase && window.supabase.createClient) {
            _supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
            return true;
        }
    } catch (e) { console.error("Supabase init error:", e); }
    return false;
};

const { useState, useEffect } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');
    const [dbReady, setDbReady] = useState(false);

    // Έλεγχος αν η Supabase είναι έτοιμη
    useEffect(() => {
        const ready = initSupabase();
        setDbReady(ready);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') setIsAuthenticated(true);
        else { alert('INVALID PIN'); setPin(''); }
    };

    // Ασφαλής φόρτωση των Divisions
    const renderDivision = (DivisionComponent, props) => {
        if (!DivisionComponent || typeof DivisionComponent !== 'function') {
            return (
                <div className="p-10 text-center bg-slate-900 rounded-3xl border border-red-500 m-4">
                    <p className="text-red-500 font-black brand text-[10px] mb-2 uppercase italic">Division Load Failure</p>
                    <p className="text-white text-[8px] uppercase font-bold italic">Το αρχείο .js λείπει ή έχει σφάλμα</p>
                    <button onClick={() => setView('HOME')} className="mt-4 text-[10px] text-blue-400 underline uppercase italic font-bold">Back to Bridge</button>
                </div>
            );
        }
        return <DivisionComponent {...props} />;
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950">
                <form onSubmit={handleLogin} className="glass p-10 rounded-[3rem] border border-slate-800 w-full max-w-sm text-center shadow-2xl">
                    <div className="mb-8">
                        <i className="fa-solid fa-anchor text-4xl text-blue-500 mb-4 shadow-blue-500/20"></i>
                        <h1 className="brand text-xl tracking-[0.3em] font-black text-white italic">NTG COMMAND</h1>
                        {!dbReady && <p className="text-[8px] text-amber-500 mt-2 uppercase animate-pulse italic">Connecting to Cloud...</p>}
                    </div>
                    <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                           className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl text-center text-3xl tracking-[0.8em] mb-6 text-white outline-none focus:border-blue-500"
                           placeholder="PIN" maxLength="4" autoFocus />
                    <button type="submit" className="w-full bg-blue-600 p-5 rounded-2xl brand font-bold uppercase tracking-widest text-sm active:scale-95 shadow-lg">
                        Unlock Core
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 pb-28 max-w-lg mx-auto bg-slate-950 text-white font-bold italic">
            {view === 'HOME' ? (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center px-4 font-bold italic">
                        <div className="flex flex-col text-left font-bold italic">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Administrator Master</span>
                            <span className="brand text-sm italic font-bold text-white uppercase tracking-tighter italic">M. SYKINIOTIS</span>
                        </div>
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 px-2">
                        <button onClick={() => setView('M1')} className="glass p-7 rounded-[2.5rem] border-b-4 border-blue-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-shield-halved text-3xl text-blue-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white italic">Τ.Α. ΠΛΟΙΩΝ</span>
                        </button>
                        
                        <button onClick={() => setView('M5')} className="glass p-7 rounded-[2.5rem] border-b-4 border-emerald-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-users-viewfinder text-3xl text-emerald-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white italic">STAFF HUB</span>
                        </button>

                        <button onClick={() => setView('M2')} className="glass p-7 rounded-[2.5rem] border-b-4 border-cyan-600 flex flex-col items-center gap-4 active:scale-95 transition-all font-bold italic">
                            <i className="fa-solid fa-ship text-3xl text-cyan-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white italic">REPAIRS</span>
                        </button>

                        <button onClick={() => setView('M6')} className="glass p-7 rounded-[2.5rem] border-b-4 border-purple-600 flex flex-col items-center gap-4 active:scale-95 transition-all font-bold italic">
                            <i className="fa-solid fa-chart-line text-3xl text-purple-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white italic">CEO PULSE</span>
                        </button>

                        <button onClick={() => setView('M8')} className="glass p-7 rounded-[2.5rem] border-b-4 border-orange-600 flex flex-col items-center gap-4 active:scale-95 transition-all font-bold italic">
                            <i className="fa-solid fa-house-chimney text-3xl text-orange-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white italic">MYKONOS</span>
                        </button>

                        <button onClick={() => setView('M3')} className="glass p-7 rounded-[2.5rem] border-b-4 border-red-700 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-gavel text-3xl text-red-500"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-red-500 italic">LEGAL Vault</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right duration-500 h-full font-bold italic">
                    {view.startsWith('M1') && renderDivision(window.M1_Safety, { view, setView, supabase: _supabase })}
                    {view.startsWith('M2') && renderDivision(window.M2_Repairs, { view, setView, supabase: _supabase })}
                    {view.startsWith('M3') && renderDivision(window.M3_Legal, { view, setView, supabase: _supabase })}
                    {view.startsWith('M5') && renderDivision(window.M5_Staff, { view, setView, supabase: _supabase })}
                    {view.startsWith('M6') && renderDivision(window.M6_CEO_Pulse, { view, setView, supabase: _supabase })}
                    {view.startsWith('M8') && renderDivision(window.M8_Mykonos, { view, setView, supabase: _supabase })}
                </div>
            )}

            <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50">
                <button onClick={() => alert('Capture Engine Ready')} className="h-16 w-16 bg-blue-600 rounded-full border-4 border-slate-950 flex items-center justify-center shadow-2xl active:scale-90 transition-all pointer-events-auto">
                    <i className="fa-solid fa-camera text-2xl text-white"></i>
                </button>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
