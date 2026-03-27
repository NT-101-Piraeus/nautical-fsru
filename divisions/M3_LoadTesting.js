const { useState, useEffect } = React;

const M3_LoadTesting = ({ userRole }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [swl, setSwl] = useState('');
    const [calculatedLoad, setCalculatedLoad] = useState(0);
    const [vessel, setVessel] = useState('');

    useEffect(() => {
        const val = parseFloat(swl);
        if (!val) { setCalculatedLoad(0); return; }
        let proof = val <= 20 ? val * 1.25 : (val <= 50 ? val + 5 : val * 1.1);
        setCalculatedLoad(proof.toFixed(2));
    }, [swl]);

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[600px] font-bold italic text-white animate-fade">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-2">
                <h2 className="brand text-orange-500 text-lg uppercase tracking-tighter italic">M3: LOAD TEST</h2>
                {userRole === 'DIRECTOR' && (
                    <span className="bg-emerald-600/20 text-emerald-500 text-[8px] px-2 py-1 rounded-md border border-emerald-500/30">ADMIN: FULL ACCESS</span>
                )}
            </div>

            {!selectedService ? (
                <div className="space-y-4">
                    {/* DIRECTOR (1234) ONLY: ISO VAULT ACCESS */}
                    {userRole === 'DIRECTOR' && (
                        <div className="p-5 bg-blue-600/10 border border-blue-500/30 rounded-3xl mb-6 shadow-lg">
                            <p className="text-[9px] text-blue-400 mb-3 uppercase font-black">📁 SHIP ISO VAULT (1234 ONLY)</p>
                            <button className="w-full bg-slate-800 p-4 rounded-2xl text-[10px] flex justify-between items-center active:scale-95 transition-all">
                                <span>Access Offers & ISO Folders</span>
                                <i className="fa-solid fa-folder-tree text-blue-500"></i>
                            </button>
                        </div>
                    )}

                    <p className="text-[9px] text-slate-500 uppercase px-2 font-black italic">Select Inspection Type:</p>
                    {["Cargo Gear", "Means of Access", "BHC Test", "Bollard Pull"].map(s => (
                        <button key={s} onClick={() => setSelectedService(s)} className="w-full bg-black/40 p-5 rounded-2xl border border-slate-800 flex justify-between items-center active:scale-95">
                            <span className="text-[10px] uppercase">{s}</span>
                            <i className="fa-solid fa-chevron-right text-orange-500"></i>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="animate-fade space-y-4">
                    <button onClick={() => {setSelectedService(null); setSwl('');}} className="text-[9px] text-slate-500 uppercase underline italic font-black">← Back</button>
                    <div className="bg-black/30 p-6 rounded-[2.5rem] border border-slate-800 space-y-5">
                        <input type="text" placeholder="VESSEL NAME" value={vessel} onChange={(e)=>setVessel(e.target.value)}
                               className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs outline-none focus:border-orange-500" />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[7px] text-slate-500 uppercase px-1">SWL (Tons)</label>
                                <input type="number" placeholder="0.0" value={swl} onChange={(e)=>setSwl(e.target.value)}
                                       className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-xl text-white outline-none" />
                            </div>
                            <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-center">
                                <p className="text-[7px] text-emerald-500 uppercase">Proof Load</p>
                                <p className="text-xl text-emerald-400 font-black">{calculatedLoad}</p>
                            </div>
                        </div>

                        <button className="w-full bg-orange-600 p-5 rounded-3xl brand text-white uppercase text-[11px] shadow-lg active:scale-95 font-black italic tracking-widest">
                            Submit Work Report ⚓
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
window.M3_LoadTesting = M3_LoadTesting;
