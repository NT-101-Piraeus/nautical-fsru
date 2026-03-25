const { useState } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '0612') { 
            setIsAuthenticated(true);
        } else {
            alert('ACCESS DENIED - INVALID PIN');
            setPin('');
        }
    };

    const renderDiv = (Comp, props) => {
        if (!Comp) return <div className="p-10 text-center glass m-4 brand text-xs">Division Offline or Loading...</div>;
        return <Comp {...props} />;
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950">
                <form onSubmit={handleLogin} className="glass p-10 rounded-[3rem] border border-slate-800 w-full max-w-sm text-center shadow-2xl">
                    <h1 className="brand text-xl tracking-[0.3em] font-black text-white mb-8">NTG COMMAND</h1>
                    <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                           className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl text-center text-3xl tracking-[0.8em] mb-6 text-white outline-none focus:border-blue-500"
                           placeholder="PIN" maxLength="4" autoFocus />
                    <button type="submit" className="w-full bg-blue-600 p-5 rounded-2xl brand font-bold uppercase tracking-widest text-sm active:scale-95">
                        Unlock Core
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 pb-28 max-w-lg mx-auto bg-slate-950 text-white">
            {view === 'HOME' ? (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center px-4">
                        <div className="text-left">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Director Mode</span>
                            <p className="brand text-sm text-white uppercase">M. SYKINIOTIS</p>
                        </div>
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 px-2">
                        {/* M1: SAFETY */}
                        <button onClick={() => setView('M1')} className="glass p-7 rounded-[2rem] border-b-4 border-blue-600 flex flex-col items-center gap-4 active:scale-95">
                            <i className="fa-solid fa-shield-halved text-2xl text-blue-400"></i>
                            <span className="text-[9px] font-black uppercase brand">Τ.Α. ΠΛΟΙΩΝ</span>
                        </button>
                        {/* M10: LOAD TESTING */}
                        <button onClick={() => setView('M10')} className="glass p-7 rounded-[2rem] border-b-4 border-orange-600 flex flex-col items-center gap-4 active:scale-95">
                            <i className="fa-solid fa-weight-hanging text-2xl text-orange-400"></i>
                            <span className="text-[9px] font-black uppercase brand">LOAD TESTING</span>
                        </button>
                        {/* Υπόλοιπα Tiles... */}
                        <button onClick={() => setView('M3')} className="glass p-7 rounded-[2rem] border-b-4 border-red-600 flex flex-col items-center gap-4 active:scale-95">
                            <i className="fa-solid fa-gavel text-2xl text-red-500"></i>
                            <span className="text-[9px] font-black uppercase brand">LEGAL</span>
                        </button>
                        <button onClick={() => setView('M8')} className="glass p-7 rounded-[2rem] border-b-4 border-emerald-500 flex flex-col items-center gap-4 active:scale-95">
                            <i className="fa-solid fa-house-chimney text-2xl text-emerald-400"></i>
                            <span className="text-[9px] font-black uppercase brand">MYKONOS</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right duration-500 h-full">
                    {view === 'M1' && renderDiv(window.M1_Safety, { setView })}
                    {view === 'M10' && renderDiv(window.M10LoadTesting, { setView })}
                    <button onClick={() => setView('HOME')} className="mt-8 text-[10px] text-slate-500 uppercase font-black underline w-full text-center">Back to Bridge</button>
                </div>
            )}
        </div>
    );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
