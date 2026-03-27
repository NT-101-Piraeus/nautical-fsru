const { useState, useEffect } = React;

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
        { id: 'M1', name: 'UTM', icon: 'fa-layer-group', color: 'border-slate-500' },
        { id: 'M2', name: 'Τ.Α. ΠΛΟΙΩΝ', icon: 'fa-shield-halved', color: 'border-blue-600' },
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

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950 font-bold italic">
                <div className="bg-slate-900/50 p-10 rounded-[3.5rem] w-full max-w-sm text-center border border-slate-800 shadow-2xl">
                    <h1 className="brand text-xl text-white mb-8 uppercase tracking-widest italic">NTG COMMAND v3</h1>
                    <form onSubmit={handleLogin}>
                        <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                               className="w-full bg-slate-950 border border-slate-700 p-5 rounded-2xl text-center text-3xl mb-6 text-white outline-none focus:border-blue-500"
                               placeholder="PIN" maxLength="4" autoFocus />
                        <button type="submit" className="w-full bg-blue-600 p-5 rounded-2xl brand uppercase text-white active:scale-95 shadow-lg">Unlock</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 pb-28 max-w-lg mx-auto bg-slate-950 text-white font-bold italic">
            {view === 'HOME' ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-center px-4 pt-4">
                        <p className="brand text-sm uppercase italic">M. SYKINIOTIS</p>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 px-1">
                        {tiles.map(tile => (
                            <button key={tile.id} onClick={() => setView(tile.id)} className={`bg-slate-900/40 backdrop-blur-md p-3 h-28 rounded-[1.8rem] border-b-4 ${tile.color} flex flex-col items-center justify-center gap-2 active:scale-95 shadow-xl`}>
                                <i className={`fa-solid ${tile.icon} text-lg opacity-80`}></i>
                                <span className="text-[7px] font-black uppercase brand text-center leading-tight tracking-tighter">{tile.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="h-full">
                    <button onClick={() => setView('HOME')} className="mb-6 text-[10px] text-slate-500 uppercase underline italic font-black tracking-widest">← Back to Bridge</button>
                    {/* SAFE MAPPING */}
                    {view === 'M1' && (window.M1_UTM ? <window.M1_UTM /> : <Status name="M1 UTM" />)}
                    {view === 'M2' && (window.M2_Safety ? <window.M2_Safety /> : <Status name="M2 SAFETY" />)}
                    {view === 'M3' && (window.M3_LoadTesting ? <window.M3_LoadTesting /> : <Status name="M3 LOAD TEST" />)}
                    {view === 'M4' && (window.M4_Scout ? <window.M4_Scout /> : <Status name="M4 SCOUT" />)}
                    {view === 'M5' && (window.M5_Intel ? <window.M5_Intel /> : <Status name="M5 INTEL" />)}
                    {view === 'M6' && (window.M6_CEO_Pulse ? <window.M6_CEO_Pulse /> : <Status name="M6 CEO PULSE" />)}
                    {view === 'M7' && (window.M7_XGR ? <window.M7_XGR /> : <Status name="M7 XGR" />)}
                    {view === 'M8' && (window.M8_Academy ? <window.M8_Academy /> : <Status name="M8 ACADEMY" />)}
                    {view === 'M9' && (window.M9_Operations ? <window.M9_Operations /> : <Status name="M9 OPERATIONS" />)}
                    {view === 'M10' && (window.M10_Architecture ? <window.M10_Architecture /> : <Status name="M10 ARCHITECTURE" />)}
                    {view === 'M11' && (window.M11_Sensors ? <window.M11_Sensors /> : <Status name="M11 SENSORS" />)}
                    {view === 'M12' && (window.M12_StaffHub ? <window.M12_StaffHub /> : <Status name="M12 STAFF HUB" />)}
                    {view === 'M13' && (window.M13_Mykonos ? <window.M13_Mykonos /> : <Status name="M13 MYKONOS" />)}
                </div>
            )}
        </div>
    );
};

const Status = ({ name }) => (
    <div className="p-10 bg-slate-900/50 rounded-[2.5rem] text-center border border-slate-800 italic uppercase brand text-[10px]">
        <i className="fa-solid fa-microchip mb-4 text-2xl text-blue-500 animate-pulse"></i>
        <p>{name} INITIALIZING...</p>
    </div>
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
