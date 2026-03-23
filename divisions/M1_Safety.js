window.M1_Safety = function({ view, setView, selectedShip, setSelectedShip }) {
    const USER_ID = "M. SYKINIOTIS";
    
    // Τεχνικές Ζώνες Επιθεώρησης (Manual 01)
    const techZones = ["Engine Room", "Main Deck", "Pump Room", "Bridge", "Accommodation", "Chimney / Funnel"];

    // Πρόγραμμα ΣΕΠΕ Απρίλιος 2026 (Manual 02 Integration)
    const sepeShips = [
        { name: 'FELIX', imo: '9464182', port: 'DRAPETSONA', time: '07:00', attended: true },
        { name: 'BADJI MOKHTAR III', imo: '9827889', port: 'ELEFSINA', time: '11:00', attended: false },
        { name: 'ARIADNI', imo: '9135262', port: 'PIRAEUS', time: '13:00', attended: false },
        { name: 'RIGEL III', imo: '7807744', port: 'PERAMA', time: '15:00', attended: false }
    ];

    // --- VIEW: SAFETY HUB (Tactical Tiles) ---
    if (view === 'M1') return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center">
                <h2 className="brand text-blue-400 text-xs tracking-widest uppercase">Safety Tactical Hub</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back to Hub</button>
            </div>
            
            {/* Hazard Radar (Clickable) */}
            <div onClick={() => alert("BLOCK 01: Hot Works without permit - FELIX\nBLOCK 02: Gas Leak Detector OOR - PIRAEUS")} 
                 className="hazard-pulse glass p-4 rounded-3xl border-2 border-red-600 flex items-center gap-4 cursor-pointer active:scale-95 transition-all">
                <i className="fa-solid fa-radiation text-2xl text-red-600 animate-pulse"></i>
                <div>
                    <p className="text-[10px] font-black text-red-500 uppercase leading-none">Hazard Radar: 2 BLOCK ENTRIES</p>
                    <p className="text-[8px] text-slate-400 mt-1 uppercase italic tracking-tighter">Click to view violation details</p>
                </div>
            </div>

            {/* Tactical Tiles Grid */}
            <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setView('M1_INSPECTION')} className="glass p-6 rounded-3xl flex flex-col items-center gap-2 border-b-2 border-blue-500 active:bg-blue-500/10 transition-all">
                    <i className="fa-solid fa-rocket text-2xl text-blue-400"></i>
                    <span className="text-[9px] font-black uppercase tracking-widest">Inspection</span>
                </button>
                <button onClick={() => alert("Digital Logbook: Syncing with Supabase...")} className="glass p-6 rounded-3xl flex flex-col items-center gap-2 border-b-2 border-emerald-500 opacity-80">
                    <i className="fa-solid fa-book text-2xl text-emerald-500"></i>
                    <span className="text-[9px] font-black uppercase tracking-widest">Logbook</span>
                </button>
                <button onClick={() => alert("Generating Executive PDF Report...")} className="glass p-6 rounded-3xl flex flex-col items-center gap-2 border-b-2 border-purple-500 opacity-80">
                    <i className="fa-solid fa-file-pdf text-2xl text-purple-500"></i>
                    <span className="text-[9px] font-black uppercase tracking-widest">Reports</span>
                </button>
                <button onClick={() => alert("Wallet: PIN Required for Financial Data")} className="glass p-6 rounded-3xl flex flex-col items-center gap-2 border-b-2 border-yellow-500 opacity-80">
                    <i className="fa-solid fa-wallet text-2xl text-yellow-500"></i>
                    <span className="text-[9px] font-black uppercase tracking-widest">Wallet</span>
                </button>
            </div>

            {/* IoT Alert Section */}
            <div className="glass p-4 rounded-3xl flex justify-between items-center border border-yellow-500/20">
                <p className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">
                    <i className="fa-solid fa-bolt mr-2"></i>IoT: Gas Detector GD-04
                </p>
                <span className="text-[8px] font-black bg-yellow-900/50 px-2 py-0.5 rounded text-yellow-400 italic">CALIBRATION REQ</span>
            </div>
        </div>
    );

    // --- VIEW: SELECT VESSEL (Step 1) ---
    if (view === 'M1_INSPECTION') return (
        <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="brand text-blue-400 text-xs italic tracking-widest px-2 uppercase">1. Select Vessel (April 2026)</h2>
            <div className="space-y-3">
                {sepeShips.map(ship => (
                    <button key={ship.name} onClick={() => { setSelectedShip(ship.name); setView('M1_ZONE'); }} 
                            className="w-full glass p-5 rounded-3xl text-left border-l-4 border-blue-500 flex justify-between items-center active:bg-blue-900/20 transition-all">
                        <div>
                            <h3 className="font-black text-sm tracking-tighter uppercase">{ship.name}</h3>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{ship.port} // Time: {ship.time}</p>
                        </div>
                        {ship.attended ? 
                            <i className="fa-solid fa-circle-check text-green-500 text-lg"></i> : 
                            <i className="fa-solid fa-circle-xmark text-slate-700 text-lg"></i>
                        }
                    </button>
                ))}
            </div>
            <button onClick={() => setView('M1')} className="w-full text-center text-[10px] font-black text-slate-500 uppercase mt-6 tracking-widest">Back</button>
        </div>
    );

    // --- VIEW: SELECT ZONE (Step 2) ---
    if (view === 'M1_ZONE') return (
        <div className="space-y-4 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center px-2 mb-4">
                <h2 className="brand text-blue-400 text-xs italic uppercase underline underline-offset-8 decoration-blue-500/50">2. Select Zone ({selectedShip})</h2>
                <button onClick={() => setView('M1_INSPECTION')} className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Back</button>
            </div>
            <div className="grid grid-cols-1 gap-2">
                {techZones.map(z => (
                    <button key={z} onClick={() => alert(`Audit Engine Initialized for ${selectedShip} // ${z}\nAgent: ${USER_ID}`)} 
                            className="w-full glass p-5 rounded-2xl text-left flex justify-between items-center border border-slate-800 active:bg-blue-600/20 transition-all">
                        <span className="text-xs font-black tracking-widest uppercase">{z}</span>
                        <i className="fa-solid fa-crosshairs text-blue-900"></i>
                    </button>
                ))}
            </div>
        </div>
    );

    return null;
};
