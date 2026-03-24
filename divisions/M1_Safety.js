window.M1_Safety = function({ view, setView, supabase }) {
    const vessels = ["FELIX", "ARIADNI", "NAFTOCEMENT IV", "RIGEL III"];

    const startInspection = async (ship) => {
        try {
            const { error } = await supabase
                .from('ntg_inspections')
                .insert([{ 
                    vessel_name: ship, 
                    zone: 'Main Deck', 
                    inspector: 'M. SYKINIOTIS', 
                    status: 'OPEN' 
                }]);

            if (error) throw error;
            
            alert(`SUCCESS: Τεχνικό Audit ξεκίνησε για το ${ship}. Καταγράφηκε στη βάση!`);
            setView('HOME');
        } catch (err) {
            console.error(err);
            alert('Σφάλμα Σύνδεσης: Τα δεδομένα δεν στάλθηκαν στο Cloud.');
        }
    };

    if (view === 'M1_SELECT_VESSEL') return (
        <div className="space-y-6">
            <h2 className="brand text-blue-400 text-xs italic tracking-widest uppercase font-black px-2 italic">Select Vessel for Audit</h2>
            <div className="grid grid-cols-1 gap-3">
                {vessels.map(ship => (
                    <button key={ship} onClick={() => startInspection(ship)}
                            className="w-full glass p-6 rounded-3xl text-left border-l-8 border-blue-600 font-black uppercase text-xs italic tracking-widest hover:bg-slate-900 transition-all">
                        {ship}
                    </button>
                ))}
            </div>
            <button onClick={() => setView('M1')} className="w-full p-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Back to M1 Home</button>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center px-2">
                <h2 className="brand text-blue-400 text-xs tracking-[0.2em] uppercase italic font-black underline underline-offset-8 decoration-blue-500/30">M1 // Τ.Α. ΠΛΟΙΩΝ</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic hover:text-white">Exit</button>
            </div>
            
            <button onClick={() => setView('M1_SELECT_VESSEL')} className="w-full glass p-10 rounded-[3rem] flex flex-col items-center gap-4 border-b-8 border-blue-600 active:scale-95 transition-all shadow-xl">
                <i className="fa-solid fa-magnifying-glass-chart text-4xl text-blue-400"></i>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] brand text-white italic">Νέα Επιθεώρηση</span>
            </button>

            <div className="glass p-6 rounded-3xl border border-red-900/30 bg-red-950/10">
                <div className="flex items-center gap-3 mb-2">
                    <i className="fa-solid fa-satellite-dish text-red-500 animate-pulse"></i>
                    <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">Hazard Radar: Active</p>
                </div>
                <p className="text-[8px] text-slate-500 uppercase font-bold italic leading-relaxed">System scanning for BLOCK entries in active sectors...</p>
            </div>
        </div>
    );
};
