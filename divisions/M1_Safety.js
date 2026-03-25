const { useState, useEffect, useRef } = React;

const M1_Dashboard = ({ setView }) => {
    const [viewState, setViewState] = useState('LIST'); // LIST, INSPECTION, SIGNATURE
    const [selectedShip, setSelectedShip] = useState(null);
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [selectedZone, setSelectedZone] = useState('');
    const [ppeAlert, setPpeAlert] = useState('');
    const canvasRef = useRef(null);

    // 1. Επίσημη Watchlist ΣΕΠΕ (Μάρτιος-Απρίλιος 2026)
    const shipWatchlist = [
        { id: 'f1', name: 'FELIX', imo: '9464182', zone: 'Δραπετσώνα', duration: '4h' },
        { id: 'a1', name: 'ARIADNI', imo: '9135262', zone: 'Πέραμα', duration: '6h' },
        { id: 'r1', name: 'RIGEL III', imo: '7807744', zone: 'Πέραμα', duration: '2h' },
        { id: 'n1', name: 'NAFTOCEMENT IV', imo: '9123456', zone: 'Ελευσίνα', duration: '3h' }
    ];

    // 2. Ζώνες & PPE Alerts
    const zones = [
        { id: 'z1', label: 'Engine Room', alert: '' },
        { id: 'z2', label: 'Main Deck', alert: '' },
        { id: 'z3', label: 'Pump Room', alert: '🚨 ΠΡΟΣΟΧΗ: Απαιτείται Gas-Free Cert & Αντιεκρηκτικός Φανός.' },
        { id: 'z4', label: 'Tanks (Cargo/Ballast)', alert: '🚨 ΚΡΙΣΙΜΟ: Έλεγχος O2 (19.5%-22.5%) & Gas-Free.' },
        { id: 'z5', label: 'Chimney', alert: '🚨 ΥΨΟΣ: Απαιτείται ζώνη ασφαλείας (Full Body Harness).' },
        { id: 'z6', label: 'Garage (Ro-Ro)', alert: '🚨 ΣΤΑΤΙΚΟΣ: Έλεγχος εξαερισμού & γειώσεων.' }
    ];

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startInspection = (ship) => {
        setSelectedShip(ship);
        setIsTimerActive(true);
        setViewState('INSPECTION');
    };

    // Signature Logic
    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="p-4 bg-slate-950 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[650px] font-bold italic text-white overflow-hidden">
            
            {/* Header με Timer */}
            <header className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                <div className="brand text-blue-400">
                    <h2 className="text-lg leading-tight uppercase">M1 / Safety Officer</h2>
                    <p className="text-[8px] text-slate-500 tracking-[0.2em]">OPERATOR: M. SYKINIOTIS</p>
                </div>
                {isTimerActive && (
                    <div className="bg-red-500/10 px-3 py-1 rounded-full border border-red-500/50 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-mono text-red-500">{formatTime(timer)}</span>
                    </div>
                )}
            </header>

            {viewState === 'LIST' && (
                <div className="space-y-4 animate-in fade-in duration-500">
                    <h3 className="text-[10px] text-blue-500 uppercase tracking-widest px-2 italic">ΣΕΠΕ Watchlist (Active Appointments)</h3>
                    {shipWatchlist.map(ship => (
                        <div key={ship.id} onClick={() => startInspection(ship)} className="bg-slate-900 p-5 rounded-3xl border border-slate-800 flex justify-between items-center active:scale-95 transition-all shadow-lg">
                            <div>
                                <p className="text-sm font-black text-white">{ship.name}</p>
                                <p className="text-[9px] text-slate-500">IMO: {ship.imo} | {ship.zone}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] text-blue-500 uppercase">Duration</p>
                                <p className="text-xs">{ship.duration}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {viewState === 'INSPECTION' && (
                <div className="animate-in slide-in-from-right duration-300">
                    <div className="bg-blue-600 p-5 rounded-3xl mb-6 shadow-2xl">
                        <h4 className="text-xl font-black">{selectedShip.name}</h4>
                        <p className="text-[10px] opacity-80 uppercase tracking-widest">IMO: {selectedShip.imo}</p>
                    </div>

                    <div className="space-y-6">
                        {/* Zone Selection */}
                        <div>
                            <label className="text-[10px] text-slate-500 uppercase mb-2 block italic">Επιλογή Χώρου Επιθεώρησης</label>
                            <select 
                                className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl text-xs outline-none focus:border-blue-500"
                                onChange={(e) => {
                                    const zone = zones.find(z => z.label === e.target.value);
                                    setSelectedZone(e.target.value);
                                    setPpeAlert(zone.alert);
                                }}
                            >
                                <option value="">-- ΕΠΙΛΕΞΤΕ ΧΩΡΟ --</option>
                                {zones.map(z => <option key={z.id} value={z.label}>{z.label}</option>)}
                            </select>
                        </div>

                        {/* PPE ALERT POPUP */}
                        {ppeAlert && (
                            <div className="bg-orange-500/20 border border-orange-500 p-4 rounded-2xl animate-bounce">
                                <p className="text-[10px] text-orange-500 font-black leading-tight uppercase">{ppeAlert}</p>
                            </div>
                        )}

                        {/* PD 70/90 Checkbox List */}
                        <div className="space-y-2">
                             <label className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                                <input type="checkbox" className="w-6 h-6 rounded-lg accent-blue-600" />
                                <span className="text-[10px] uppercase">Θερμές Εργασίες (Hot Works)</span>
                             </label>
                             <label className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                                <input type="checkbox" className="w-6 h-6 rounded-lg accent-blue-600" />
                                <span className="text-[10px] uppercase">Εργασία σε Ύψος (Height)</span>
                             </label>
                             <div className="flex gap-2">
                                <input type="text" placeholder="ΑΛΛΟ (CUSTOM WORK TYPE)" className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-2xl text-[10px] uppercase" />
                             </div>
                        </div>

                        {/* Smart Capture Area */}
                        <button className="w-full bg-blue-600 h-28 rounded-[2rem] flex flex-col items-center justify-center shadow-xl active:scale-95 transition-all">
                            <span className="text-4xl mb-1">🔵</span>
                            <span className="brand text-[9px] uppercase tracking-widest font-black">Smart Capture [Evidence]</span>
                        </button>

                        <button onClick={() => setViewState('SIGNATURE')} className="w-full bg-emerald-600 py-5 rounded-2xl font-black brand text-[10px] uppercase tracking-widest">
                            Proceed to Signature ✍️
                        </button>
                    </div>
                </div>
            )}

            {viewState === 'SIGNATURE' && (
                <div className="animate-in fade-in duration-500 text-center">
                    <h4 className="brand text-blue-400 text-sm mb-4 uppercase">Inspector Signature</h4>
                    <p className="text-[9px] text-slate-500 mb-4 uppercase">Υπογραφή Τεχνικού Ασφαλείας (M. SYKINIOTIS)</p>
                    
                    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl mb-4 border-4 border-slate-800">
                        <canvas 
                            ref={canvasRef}
                            width={350} 
                            height={250} 
                            className="w-full touch-none cursor-crosshair"
                            onMouseDown={(e) => {
                                const ctx = canvasRef.current.getContext('2d');
                                ctx.beginPath();
                                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                                canvasRef.current.isDrawing = true;
                            }}
                            onMouseMove={(e) => {
                                if (!canvasRef.current.isDrawing) return;
                                const ctx = canvasRef.current.getContext('2d');
                                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                                ctx.stroke();
                                ctx.strokeStyle = "#000";
                                ctx.lineWidth = 3;
                            }}
                            onMouseUp={() => canvasRef.current.isDrawing = false}
                        ></canvas>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={clearSignature} className="bg-slate-800 py-4 rounded-xl text-[10px] uppercase">Clear</button>
                        <button onClick={() => {
                            alert("INSPECTION CERTIFIED & LOGGED TO SUPABASE");
                            setIsTimerActive(false);
                            setView('HOME');
                        }} className="bg-green-600 py-4 rounded-xl text-[10px] uppercase font-black">Final Certify</button>
                    </div>
                </div>
            )}
        </div>
    );
};

window.M1_Safety = M1_Dashboard;
