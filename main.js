const { useState } = React;

function App() {
    const [isLocked, setIsLocked] = useState(true);
    const [view, setView] = useState('HOME');
    const [selectedShip, setSelectedShip] = useState(null);

    if (isLocked) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-center">
                <i className="fa-solid fa-shield-halved text-5xl text-blue-500 mb-8"></i>
                <h2 className="brand text-xs mb-8 tracking-[0.3em]">NTG SECURE ACCESS</h2>
                <input type="password" maxLength="4" placeholder="PIN" 
                       onChange={(e) => { if(e.target.value === '1234') setIsLocked(false); }}
                       className="w-48 bg-slate-900 p-4 rounded-3xl text-center text-blue-500 outline-none border-2 border-blue-500/50" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24 max-w-md mx-auto relative">
            <header className="glass sticky top-0 z-50 p-4 flex justify-between items-center border-b border-blue-500/30">
                <div onClick={() => setView('HOME')} className="cursor-pointer">
                    <p className="text-[10px] font-black text-blue-500 tracking-widest uppercase">NTG COMMAND V2</p>
                    <h1 className="font-bold text-sm italic uppercase">M. SYKINIOTIS</h1>
                </div>
                <button onClick={() => setIsLocked(true)}><i className="fa-solid fa-power-off text-slate-600"></i></button>
            </header>

            <main className="p-4">
                {view === 'HOME' && <HomeMenu setView={setView} />}
                {view.startsWith('M1') && <window.M1_Safety view={view} setView={setView} selectedShip={selectedShip} setSelectedShip={setSelectedShip} />}
                {view.startsWith('M2') && <window.M2_Repairs view={view} setView={setView} />}
                {view === 'M3' && <window.M3_Legal setView={setView} />}
                {view === 'M7' && <window.M7_XGR setView={setView} />}
            </main>
        </div>
    );
}

function HomeMenu({ setView }) {
    const modules = [
        { id: 'M1', name: 'Safety', icon: 'fa-shield', color: 'text-blue-400' },
        { id: 'M2', name: 'Repairs', icon: 'fa-ship', color: 'text-cyan-400' },
        { id: 'M3', name: 'Legal', icon: 'fa-scale-balanced', color: 'text-red-500' },
        { id: 'M7', name: 'X.GR', icon: 'fa-cart-shopping', color: 'text-orange-500' }
    ];
    return (
        <div className="grid grid-cols-2 gap-4">
            {modules.map(m => (
                <button key={m.id} onClick={() => setView(m.id)} className="glass p-6 rounded-[2rem] flex flex-col items-center gap-2 border-b-2 border-blue-500/50">
                    <i className={`fa-solid ${m.icon} text-3xl ${m.color}`}></i>
                    <span className="text-[10px] font-black uppercase italic">{m.name}</span>
                </button>
            ))}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
