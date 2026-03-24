// Σύνδεση με Supabase (Operational Core)
const supabaseUrl = 'ΤΟ_URL_ΣΟΥ_ΕΔΩ'; 
const supabaseKey = 'ΤΟ_ANON_KEY_ΣΟΥ_ΕΔΩ';
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

const { useState } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');
    const USER_ID = "M. SYKINIOTIS"; // Επίσημη Ταυτότητα Administrator [cite: 215]

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') { // Επιβολή Security PIN [cite: 276]
            setIsAuthenticated(true);
        } else {
            alert('ACCESS DENIED: INVALID PIN');
            setPin('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950">
                <form onSubmit={handleLogin} className="glass p-10 rounded-[3rem] border border-slate-800 w-full max-w-sm text-center shadow-2xl">
                    <div className="mb-8">
                        <i className="fa-solid fa-anchor text-4xl text-blue-500 mb-4"></i>
                        <h1 className="brand text-xl tracking-[0.3em] font-black uppercase text-white">NTG COMMAND</h1>
                    </div>
                    <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                           className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl text-center text-3xl tracking-[0.8em] mb-6 text-white outline-none"
                           placeholder="PIN" maxLength="4" />
                    <button type="submit" className="w-full bg-blue-600 p-5 rounded-2xl brand font-bold uppercase tracking-widest text-sm active:scale-95 transition-all">
                        Unlock Core
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 pb-28 max-w-lg mx-auto relative">
            {view === 'HOME' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center px-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Admin Active</span>
                            <span className="brand text-sm italic font-bold text-white uppercase">{USER_ID}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Live Sync</span>
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setView('M1')} className="glass p-7 rounded-[2.5rem] border-b-4 border-blue-600 flex flex-col items-center gap-4 transition-all active:scale-95">
                            <i className="fa-solid fa-shield-halved text-3xl text-blue-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">Τ.Α. ΠΛΟΙΩΝ</span>
                        </button>
                        
                        <button onClick={() => setView('M5')} className="glass p-7 rounded-[2.5rem] border-b-4 border-emerald-600 flex flex-col items-center gap-4 transition-all active:scale-95">
                            <i className="fa-solid fa-users-viewfinder text-3xl text-emerald-400"></i>
                            <span className="text-[10px] font-black uppercase tracking-widest brand text-white">STAFF HUB</span>
                        </button>
                        
                        {/* Τα υπόλοιπα Divisions M2, M3, M6, M7, M8 ακολουθούν την ίδια λογική */}
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                    {view.startsWith('M1') && <window.M1_Safety view={view} setView={setView} supabase={supabase} />}
                    {view.startsWith('M5') && <window.M5_Staff view={view} setView={setView} supabase={supabase} />}
                </div>
            )}

            {/* Smart Capture Button [cite: 260-262, 315-318] */}
            <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none">
                <button className="h-16 w-16 bg-blue-600 rounded-full border-4 border-slate-950 flex items-center justify-center shadow-2xl active:scale-90 transition-all pointer-events-auto">
                    <i className="fa-solid fa-camera text-2xl text-white"></i>
                </button>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
