const { useState, useEffect } = React;

const App = () => {
    // --- AUTH & NAVIGATION STATES ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(''); // DIRECTOR or WORKER
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');

    // --- LOGIN HANDLER (SYNCED PIN LOGIC) ---
    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') {
            setRole('DIRECTOR'); // Full Access / ISO Vault
            setIsAuthenticated(true);
        } else if (pin === '0612') {
            setRole('WORKER');   // Restricted / Field Ops
            setIsAuthenticated(true);
        } else {
            alert('ACCESS DENIED - SECURITY BREACH LOGGED');
            setPin('');
        }
    };

    // --- TILES DEFINITION (13 DIVISIONS) ---
    const tiles = [
        { id: 'M1', name: 'SAFETY WATCH', icon: 'fa-shield-halved', color: 'border-blue-600' },
        { id: 'M2', name: 'REPAIRS DB', icon: 'fa-wrench', color: 'border-slate-500' },
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

    // --- LOGIN SCREEN UI ---
    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950 font-bold italic">
                <div className="glass p-10 rounded-[3.5rem] w-full max-w-sm text-center shadow-2xl animate-fade">
                    <h1 className="brand text-xl text-white mb-8 uppercase tracking-widest italic font-black">
                        NTG COMMAND v3
                    </h1>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="password" 
                            value={pin} 
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl text-center text-3xl mb-6 text-white outline-none focus:border-blue-500 transition-all"
                            placeholder="PIN" 
                            maxLength="4" 
                            autoFocus 
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 p-5 rounded-2xl brand uppercase text-white font-black active:scale-95 shadow-lg"
                        >
                            Unlock Bridge
                        </button>
                    </form>
                    <p className="mt-6 text-[8px] text-slate-500 uppercase tracking-widest opacity-50">
                        Authorized Personnel Only / 2026 Core
                    </p>
                </div>
            </div>
        );
    }

    // --- MAIN DASHBOARD (THE BRIDGE) ---
    return (
        <div className="min-h-screen p-4 pb-28 max-w-lg mx-auto bg-slate-950 text-white font-bold italic">
            {view === 'HOME' ? (
                <div className="space-y-6 animate-fade">
                    {/* TOP HEADER */}
                    <div className="flex justify-between items-center px-4 pt-4">
                        <div className="text-left font-bold italic">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">
                                {role} LOGGED IN
                            </span>
                            <p className="brand text-sm uppercase tracking-tighter italic font-black">
                                M. SYKINIOTIS
                            </p>
                        </div>
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    </div>

                    {/* TILE GRID */}
                    <div className="grid grid-cols-3 gap-2 px-1">
                        {tiles.map(tile => (
                            <button 
                                key={tile.id} 
                                onClick={() => setView(tile.id)} 
                                className={`glass p-3 h-28 rounded-[1.8rem] border-b-4 ${tile.color} flex flex-col items-center justify-center gap-2 active:scale-95 shadow-xl transition-all group`}
                            >
                                <i className={`fa-solid ${tile.icon} text-lg opacity-80 group-hover:scale-110 transition-transform`}></i>
                                <span className="text-[7px] font-black uppercase brand text-center leading-tight tracking-tighter">
                                    {tile.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="animate-fade h-full">
                    {/* BACK BUTTON */}
                    <button 
                        onClick={() => setView('HOME')} 
                        className="mb-6 text-[10px] text-slate-500 uppercase underline italic font-black tracking-widest"
                    >
                        ← Back to Bridge
                    </button>
                    
                    {/* DYNAMIC DIVISION ROUTING (SAFE LOAD) */}
                    <div className="min-h-[500px]">
                        {view === 'M1' && (window.M1_Safety ? <window.M1_Safety userRole={role} /> : <Initializing name="M1 SAFETY WATCH" />)}
                        {view === 'M2' && <Initializing name="M2 REPAIRS DB" />}
                        {view === 'M3' && (window.M3_LoadTesting ? <window.M3_LoadTesting userRole={role} /> : <Initializing name="M3 LOAD TESTING" />)}
                        {view === 'M4' && (window.M4_Scout ? <window.M4_Scout /> : <Initializing name="M4 ARRIVALS" />)}
                        {view === 'M5' && (window.M5_Intel ? <window.M5_Intel /> : <Initializing name="M5 WAR ROOM" />)}
                        {view === 'M6' && (window.M6_CEO_Pulse ? <window.M6_CEO_Pulse /> : <Initializing name="M6 CEO PULSE" />)}
                        {view === 'M7' && (window.M7_XGR ? <window.M7_XGR /> : <Initializing name="M7 XGR STARTUP" />)}
                        {view === 'M8' && (window.M8_Academy ? <window.M8_Academy /> : <Initializing name="M8 ACADEMY" />)}
                        {view === 'M9' && (window.M9_Operations ? <window.M9_Operations /> : <Initializing name="M9 OPERATIONS" />)}
                        {view === 'M10' && (window.M10_Architecture ? <window.M10_Architecture /> : <Initializing name="M10 ARCHITECTURE" />)}
                        {view === 'M11' && (window.M11_Sensors ? <window.M11_Sensors /> : <Initializing name="M11 SENSORS" />)}
                        {view === 'M12' && (window.M12_StaffHub ? <window.M12_StaffHub /> : <Initializing name="M12 STAFF HUB" />)}
                        {view === 'M13' && (window.M13_Mykonos ? <window.M13_Mykonos /> : <Initializing name="M13 MYKONOS" />)}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- FALLBACK COMPONENT (PREVENTS BLACK SCREEN) ---
const Initializing = ({ name }) => (
    <div className="p-10 glass rounded-[3rem] text-center border border-slate-800 italic animate-fade">
        <i className="fa-solid fa-microchip mb-4 text-2xl text-blue-500 animate-pulse"></i>
        <h3 className="brand text-[10px] uppercase font-black tracking-widest text-slate-300">{name}</h3>
        <p className="text-[8px] text-slate-500 mt-2 uppercase font-bold italic">
            Connecting to NauticalOS v3 Core...
        </p>
    </div>
);

// --- RENDER ENGINE ---
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
