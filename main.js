const { useState, useEffect } = React;

function App() {
    // PIN Persistence Logic [cite: 301-302, 313]
    const [isLocked, setIsLocked] = useState(true);
    const [view, setView] = useState('HOME');
    const [selectedShip, setSelectedShip] = useState(null);

    // Audit Trail Identity [cite: 37, 126, 316]
    const USER_ID = "M. SYKINIOTIS";

    const handleUnlock = (val) => {
        if (val === '1234') setIsLocked(false); // Master PIN [cite: 313]
    };

    if (isLocked) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950">
                <i className="fa-solid fa-shield-halved text-5xl text-blue-500 mb-8"></i>
                <h2 className="brand text-xs mb-8 tracking-[0.3em] uppercase">SYSTEM ENCRYPTED</h2>
                <input type="password" maxLength="4" placeholder="PIN" 
                       onChange={(e) => handleUnlock(e.target.value)}
                       className="w-48 bg-slate-900 p-4 rounded-3xl pin-input outline-none shadow-xl shadow-blue-500/20" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24 max-w-md mx-auto relative flex flex-col">
            <header className="glass sticky top-0 z-50 p-4 flex justify-between items-center border-b border-blue-500/30">
                <div onClick={() => setView('HOME')} className="cursor-pointer">
                    <p className="text-[10px] font-black text-blue-500 tracking-[0.2em] mb-1 uppercase leading-none italic">NTG COMMAND HUB</p>
                    <h1 className="font-bold text-sm tracking-tighter uppercase italic">{USER_ID}</h1>
                </div>
                <button onClick={() => setIsLocked(true)}><i className="fa-solid fa-power-off text-slate-600"></i></button>
            </header>

            <main className="p-4 flex-1 overflow-y-auto">
                {view === 'HOME' && <HomeMenu setView={setView} />}
                
                {/* Διασύνδεση με τα Modules [cite: 280, 298] */}
                {view.startsWith('M1') && <window.M1_Safety view={view} setView={setView} selectedShip={selectedShip} setSelectedShip={setSelectedShip} />}
                {view.startsWith('M2') && <window.M2_Repairs view={view} setView={setView} />}
                {view === 'M3' && <window.M3_Legal setView={setView} />}
                {view === 'M5' && <window.M5_Staff setView={setView} />}
                {view === 'M6' && <window.M6_CEOPulse setView={setView} />}
                {view === 'M7' && <window.M7_XGR setView={setView} />}
                {view === 'M8' && <window.M8_Mykonos setView={setView} />}
            </main>

            {/* Global Smart Capture Button [cite: 361-363] */}
            <div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-50">
                <label className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] border-4 border-slate-950 pointer-events-auto active:scale-90 transition-all cursor-pointer">
                    <i className="fa-solid fa-camera text-3xl text-white"></i>
                    <input type="file" accept="image/*" capture="environment" className="hidden" />
                </label>
            </div>
        </div>
    );
}

function HomeMenu({ setView }) {
    const modules = [
        { id: 'M1', name: 'Safety', icon: 'fa-shield', color: 'text-blue-400', border: 'border-blue-500' },
        { id: 'M2', name: 'Repairs', icon: 'fa-ship', color: 'text-cyan-400', border: 'border-cyan-500' },
        { id: 'M3', name: 'Legal', icon: 'fa-scale-balanced', color: 'text-red-500', border: 'border-red-500' },
        { id: 'M5', name: 'Staff', icon: 'fa-users', color: 'text-emerald-500', border: 'border-emerald-500' },
        { id: 'M6', name: 'CEO Pulse', icon: 'fa-chart-line', color: 'text-purple-500', border: 'border-purple-500' },
        { id: 'M7', name: 'X.GR', icon: 'fa-cart-shopping', color: 'text-orange-500', border: 'border-orange-500' },
        { id: 'M8', name: 'LIVE IN MYKONOS', icon: 'fa-house-chimney', color: 'text-pink-500', border: 'border-pink-500' }
    ];

    return (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
            {modules.map(m => (
                <button key={m.id} onClick={() => setView(m.id)} className={`glass p-6 rounded-[2.5rem] flex flex-col items-center gap-2 border-b-2 ${m.border}`}>
                    <i className={`fa-solid ${m.icon} text-3xl ${m.color}`}></i>
                    <span className="text-[10px] font-black uppercase tracking-widest italic">{m.name}</span>
                </button>
            ))}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);