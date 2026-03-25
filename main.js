const { useState } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null); // 'ADMIN' ή 'WORKER'
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') { 
            setIsAuthenticated(true);
            setRole('ADMIN');
        } else if (pin === '0612') {
            setIsAuthenticated(true);
            setRole('WORKER');
        } else {
            alert('ACCESS DENIED');
            setPin('');
        }
    };

    const renderDiv = (Comp, props) => {
        if (!Comp) return <div className="p-10 text-center glass m-4 brand text-xs uppercase italic font-bold">Station Offline...</div>;
        return <Comp {...props} />;
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950">
                <form onSubmit={handleLogin} className="glass p-10 rounded-[3rem] border border-slate-800 w-full max-w-sm text-center shadow-2xl">
                    <h1 className="brand text-xl tracking-[0.3em] font-black text-white mb-8 italic font-bold">NTG COMMAND</h1>
                    <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                           className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl text-center text-3xl tracking-[0.8em] mb-6 text-white outline-none focus:border-blue-500 font-bold italic"
                           placeholder="PIN" maxLength="4" autoFocus />
                    <button type="submit" className="w-full bg-blue-600 p-5 rounded-2xl brand font-bold uppercase tracking-widest text-sm active:scale-95 italic font-bold">
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
                    <div className="flex justify-between items-center px-4">
                        <div className="text-left font-bold italic">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic font-bold">
                                {role === 'ADMIN' ? 'Director Mode Active' : 'Field Engineer Mode'}
                            </span>
                            <p className="brand text-sm italic font-bold text-white uppercase tracking-tighter">M. SYKINIOTIS</p>
                        </div>
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 px-2">
                        {/* Always Visible for BOTH roles */}
                        <button onClick={() => setView('M1')} className="glass p-7 rounded-[2rem] border-b-4 border-blue-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-shield-halved text-2xl text-blue-400"></i>
                            <span className="text-[9px] font-black uppercase brand text-white italic font-bold">Τ.Α. ΠΛΟΙΩΝ</span>
                        </button>
                        
                        <button onClick={() => setView('M10')} className="glass p-7 rounded-[2rem] border-b-4 border-orange-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                            <i className="fa-solid fa-weight-hanging text-2xl text-orange-400"></i>
                            <span className="text-[9px] font-black uppercase brand text-white italic font-bold">LOAD TESTING</span>
                        </button>

                        {/* ADMIN ONLY TILES - Restore missing menu */}
                        {role === 'ADMIN' && (
                            <>
                                <button onClick={() => setView('M5')} className="glass p-7 rounded-[2rem] border-b-4 border-emerald-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                                    <i className="fa-solid fa-users-viewfinder text-2xl text-emerald-400"></i>
                                    <span className="text-[9px] font-black uppercase brand text-white italic font-bold">STAFF HUB</span>
                                </button>
                                <button onClick={() => setView('M2')} className="glass p-7 rounded-[2rem] border-b-4 border-cyan-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                                    <i className="fa-solid fa-ship text-2xl text-cyan-400"></i>
                                    <span className="text-[9px] font-black uppercase brand text-white italic font-bold">REPAIRS</span>
                                </button>
                                <button onClick={() => setView('M6')} className="glass p-7 rounded-[2rem] border-b-4 border-purple-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                                    <i className="fa-solid fa-chart-line text-2xl text-purple-400"></i>
                                    <span className="text-[9px] font-black uppercase brand text-white italic font-bold">CEO PULSE</span>
                                </button>
                                <button onClick={() => setView('M3')} className="glass p-7 rounded-[2rem] border-b-4 border-red-600 flex flex-col items-center gap-4 active:scale-95 transition-all">
                                    <i className="fa-solid fa-gavel text-2xl text-red-500"></i>
                                    <span className="text-[9px] font-black uppercase brand text-white italic font-bold">LEGAL</span>
                                </button>
                                <button onClick={() => setView('M8')} className="glass p-7 rounded-[2rem] border-b-4 border-emerald-500 flex flex-col items-center gap-4 active:scale-95 transition-all">
                                    <i className="fa-solid fa-house-chimney text-2xl text-emerald-400"></i>
                                    <span className="text-[9px] font-black uppercase brand text-white italic font-bold">MYKONOS</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right duration-500 h-full font-bold italic">
                    {view.startsWith('M1') && renderDiv(window.M1_Safety, { view, setView, supabase: window.supabaseClient })}
                    {view === 'M10' && renderDiv(window.M10LoadTesting, { view, setView, supabase: window.supabaseClient })}
                    {role === 'ADMIN' && view.startsWith('M2') && renderDiv(window.M2_Repairs, { view, setView, supabase: window.supabaseClient })}
                    {role === 'ADMIN' && view.startsWith('M3') && renderDiv(window.M3_Legal, { view, setView, supabase: window.supabaseClient })}
                    {role === 'ADMIN' && view.startsWith('M5') && renderDiv(window.M5_Staff, { view, setView, supabase: window.supabaseClient })}
                    {role === 'ADMIN' && view.startsWith('M6') && renderDiv(window.M6_CEO_Pulse, { view, setView, supabase: window.supabaseClient })}
                    {role === 'ADMIN' && view.startsWith('M8') && renderDiv(window.M8_Mykonos, { view, setView, supabase: window.supabaseClient })}
                    <button onClick={() => setView('HOME')} className="mt-8 text-[10px] text-slate-500 uppercase font-black underline w-full text-center italic font-bold">Back to Bridge</button>
                </div>
            )}
        </div>
    );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
