const { useState } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234' || pin === '0612') setIsAuthenticated(true);
        else { alert('ACCESS DENIED'); setPin(''); }
    };

    const tiles = [
        // Η Πρώτη Γραμμή με τις 3 Υπηρεσίες
        { id: 'M1', name: 'UTM', icon: 'fa-layer-group', color: 'border-slate-500' },
        { id: 'M2', name: 'Τ.Α. ΠΛΟΙΩΝ', icon: 'fa-shield-halved', color: 'border-blue-600' },
        { id: 'M3', name: 'LOAD TESTING', icon: 'fa-weight-hanging', color: 'border-orange-600' },
        // Οι υπόλοιπες υπηρεσίες
        { id: 'M4', name: 'ARRIVALS', icon: 'fa-radar', color: 'border-cyan-600' },
        { id: 'M5', name: 'WAR ROOM', icon: 'fa-gavel', color: 'border-red-600' },
        { id: 'M6', name: 'CEO PULSE', icon: 'fa-chart-line', color: 'border-purple-600' },
        { id: 'M7', name: 'STARTUP', icon: 'fa-rocket', color: 'border-yellow-500' },
        { id: 'M8', name: 'ACADEMY', icon: 'fa-graduation-cap', color: 'border-emerald-600' },
        { id: 'M9', name: 'OPERATIONS', icon: 'fa-tower-observation', color: 'border-slate-400' },
        { id: 'M10', name: 'QUALITY', icon: 'fa-calendar-check', color: 'border-indigo-500' }, // New: Quality
        { id: 'M11', name: 'SENSORS', icon: 'fa-satellite-dish', color: 'border-pink-600' },
        { id: 'M12', name: 'STAFF HUB', icon: 'fa-users', color: 'border-blue-400' }
    ];

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950">
                <form onSubmit={handleLogin} className="glass p-10 rounded-[3rem] border border-slate-800 w-full max-w-sm text-center animate-fade shadow-2xl">
                    <h1 className="brand text-xl font-black text-white mb-8 italic uppercase tracking-widest">NTG COMMAND v3</h1>
                    <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                           className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl text-center text-3xl mb-6 text-white outline-none focus:border-blue-500 italic"
                           placeholder="PIN" maxLength="4" autoFocus />
                    <button type="submit" className="w-full bg-blue-600 p-5 rounded-2xl brand font-black uppercase active:scale-95 italic">Unlock Core</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 pb-28 max-w-lg mx-auto bg-slate-950 text-white font-bold italic">
            {view === 'HOME' ? (
                <div className="space-y-6 animate-fade">
                    <div className="flex justify-between items-center px-4">
                        <div className="text-left font-bold italic">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Director Mode</span>
                            <p className="brand text-sm text-white uppercase tracking-tighter italic">M. SYKINIOTIS</p>
                        </div>
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    </div>

                    {/* Grid με 3 Στήλες για να χωράνε οι 3 υπηρεσίες στην πρώτη σειρά */}
                    <div className="grid grid-cols-3 gap-2 px-1">
                        {tiles.map(tile => (
                            <button key={tile.id} onClick={() => setView(tile.id)} className={`glass p-3 h-28 rounded-[1.8rem] border-b-4 ${tile.color} flex flex-col items-center justify-center gap-2 active:scale-95 shadow-lg`}>
                                <i className={`fa-solid ${tile.icon} text-lg opacity-80`}></i>
                                <span className="text-[7px] font-black uppercase brand text-center leading-tight">{tile.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="animate-fade h-full">
                    <button onClick={() => setView('HOME')} className="mb-6 text-[10px] text-slate-500 uppercase font-black underline italic">← Back to Bridge</button>
                    {view === 'M2' && window.M1_Safety && <window.M1_Safety setView={setView} />}
                    {view === 'M3' && window.M10LoadTesting && <window.M10LoadTesting setView={setView} />}
                    {view === 'M4' && window.M4_Scout && <window.M4_Scout setView={setView} />}
                    {view === 'M5' && window.M5_Intel && <window.M5_Intel setView={setView} />}
                    {view === 'M12' && window.M12_StaffHub && <window.M12_StaffHub setView={setView} />}
                    
                    {['M1','M6','M7','M8','M9','M10','M11'].includes(view) && (
                        <div className="p-10 glass rounded-3xl text-center brand text-[10px] uppercase font-bold border border-slate-800">
                            <i className="fa-solid fa-microchip mb-4 text-2xl text-blue-500 animate-pulse"></i>
                            <p>{view} : STATION INITIALIZING...</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
