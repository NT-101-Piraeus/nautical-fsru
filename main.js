const supabaseUrl = 'https://omdarjncczohpfzrqqhr.supabase.co';
const supabaseKey = 'sb_publishable_V-nfUDy5MxEG4SlXkisFBg_GBlD_4Y9';
const _supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const { useState } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') setIsAuthenticated(true);
        else { alert('INVALID PIN'); setPin(''); }
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950 text-white">
                <form onSubmit={handleLogin} className="glass p-10 rounded-[3rem] border border-slate-800 w-full max-w-sm text-center">
                    <h1 className="brand text-xl mb-8 tracking-widest text-blue-500 font-black">NTG COMMAND</h1>
                    <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                           className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl text-center text-3xl mb-6 text-white outline-none"
                           placeholder="PIN" maxLength="4" autoFocus />
                    <button type="submit" className="w-full bg-blue-600 p-5 rounded-2xl brand font-bold uppercase tracking-widest">Unlock Core</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 max-w-lg mx-auto text-white font-bold italic">
            {view === 'HOME' ? (
                <div className="space-y-8 animate-in fade-in duration-500 text-left font-bold italic">
                    <h2 className="brand text-sm italic font-black uppercase text-slate-500 italic">M. SYKINIOTIS // Director</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setView('M1')} className="glass p-8 rounded-[2rem] border-b-4 border-blue-600 flex flex-col items-center gap-4">
                            <i className="fa-solid fa-shield-halved text-2xl text-blue-400"></i>
                            <span className="text-[10px] font-black brand uppercase italic">Τ.Α. ΠΛΟΙΩΝ</span>
                        </button>
                        <button onClick={() => setView('M5')} className="glass p-8 rounded-[2rem] border-b-4 border-emerald-600 flex flex-col items-center gap-4">
                            <i className="fa-solid fa-users text-2xl text-emerald-400"></i>
                            <span className="text-[10px] font-black brand uppercase italic">STAFF HUB</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="h-full">
                    {view.startsWith('M1') && window.M1_Safety && <window.M1_Safety view={view} setView={setView} supabase={_supabase} />}
                    {view.startsWith('M5') && window.M5_Staff && <window.M5_Staff view={view} setView={setView} supabase={_supabase} />}
                    <button onClick={() => setView('HOME')} className="mt-10 text-[10px] text-slate-500 uppercase font-black underline">Back to Bridge</button>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
