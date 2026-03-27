const { useState } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') { setRole('DIRECTOR'); setIsAuthenticated(true); }
        else if (pin === '0612') { setRole('WORKER'); setIsAuthenticated(true); }
        else { alert('ACCESS DENIED'); setPin(''); }
    };

    const tiles = [
        { id: 'M1', name: 'UTM', icon: 'fa-layer-group', color: 'border-slate-500' },
        { id: 'M2', name: 'SAFETY WATCH', icon: 'fa-shield-halved', color: 'border-blue-600' },
        { id: 'M3', name: 'LOAD TESTING', icon: 'fa-weight-hanging', color: 'border-orange-600' },
        { id: 'M4', name: 'ARRIVALS', icon: 'fa-radar', color: 'border-cyan-600' },
        { id: 'M5', name: 'WAR ROOM', icon: 'fa-gavel', color: 'border-red-600' },
        { id: 'M6', name: 'CEO PULSE', icon: 'fa-chart-line', color: 'border-purple-600' },
        { id: 'M7', name: 'XGR STARTUP', icon: 'fa-rocket', color: 'border-yellow-500' },
        { id: 'M8', name: 'ACADEMY', icon: 'fa-graduation-cap', color: 'border-emerald-600' },
        { id: 'M9', name: 'OPS & QUALITY', icon: 'fa-clipboard-check', color: 'border-indigo-500' },
        { id: 'M10', name: 'ARCHITECTURE', icon: 'fa-microchip', color: 'border-indigo-400' },
        { id: 'M11', name: 'SENSORS', icon: 'fa-satellite-dish', color: 'border-pink-600' },
        { id: 'M12', name: 'STAFF HUB', icon: 'fa-users', color: 'border-blue-400' },
        { id: 'M13', name: 'MYKONOS', icon: 'fa-house-chimney', color: 'border-blue-300' }
    ];

    return (
        <div className="min-h-screen p-4 pb-28 max-w-lg mx-auto bg-slate-950 text-white font-bold italic">
            {!isAuthenticated ? (
                <div className="h-screen flex items-center justify-center animate-fade">
                    <form onSubmit={handleLogin} className="glass p-10 rounded-[3.5rem] w-full text-center">
                        <h1 className="brand text-xl mb-8 uppercase tracking-widest">NTG COMMAND v3</h1>
                        <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                               className="w-full bg-slate-900 p-5 rounded-2xl text-center text-3xl mb-6 outline-none" placeholder="PIN" maxLength="4" autoFocus />
                        <button type="submit" className="w-full bg-blue-600 p-5 rounded-2xl brand uppercase">Unlock</button>
                    </form>
                </div>
            ) : (
                view === 'HOME' ? (
                    <div className="space-y-6 animate-fade">
                        <div className="flex justify-between items-center px-4 pt-4">
                            <p className="brand text-sm uppercase italic">{role} MODE</p>
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 px-1">
                            {tiles.map(tile => (
                                <button key={tile.id} onClick={() => setView(tile.id)} className={`glass p-3 h-28 rounded-[1.8rem] border-b-4 ${tile.color} flex flex-col items-center justify-center gap-2 active:scale-95`}>
                                    <i className={`fa-solid ${tile.icon} text-lg opacity-80`}></i>
                                    <span className="text-[7px] font-black uppercase brand text-center leading-tight tracking-tighter">{tile.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade">
                        <button onClick={() => setView('HOME')} className="mb-6 text-[10px] text-slate-500 uppercase underline">← Back</button>
                        {view === 'M1' && <div className="p-10 glass rounded-3xl text-center">M1: UTM - STANDBY</div>}
                        {view === 'M2' && window.M2_Safety && <window.M2_Safety userRole={role} />}
                        {view === 'M3' && window.M3_LoadTesting && <window.M3_LoadTesting userRole={role} />}
                        {/* Τα υπόλοιπα Divisions παραμένουν ως έχουν */}
                    </div>
                )
            )}
        </div>
    );
};
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
