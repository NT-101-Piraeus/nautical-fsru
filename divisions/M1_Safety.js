window.M1_Safety = function({ view, setView, supabase }) {
    const vessels = ["FELIX", "ARIADNI", "NAFTOCEMENT IV"];

    const startInspection = async (ship) => {
        const { error } = await supabase
            .from('ntg_inspections')
            .insert([{ vessel_name: ship, zone: 'Main Deck', status: 'OPEN' }]);

        if (!error) {
            alert(`Επιθεώρηση Ξεκίνησε: ${ship}`);
            setView('HOME');
        } else {
            alert('Σφάλμα Σύνδεσης Βάσης');
        }
    };

    if (view === 'M1_SELECT_SHIP') return (
        <div className="space-y-4">
            <h2 className="brand text-blue-400 text-xs italic tracking-widest uppercase italic font-bold">Επιλογή Πλοίου</h2>
            {vessels.map(ship => (
                <button key={ship} onClick={() => startInspection(ship)}
                        className="w-full glass p-5 rounded-3xl text-left border-l-4 border-blue-500 font-black uppercase text-xs italic">
                    {ship}
                </button>
            ))}
            <button onClick={() => setView('M1')} className="w-full text-center text-[10px] font-black text-slate-500 uppercase mt-4">Back</button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="brand text-blue-400 text-xs tracking-widest uppercase italic font-bold">M1 // Τ.Α. ΠΛΟΙΩΝ</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>
            
            <button onClick={() => setView('M1_SELECT_SHIP')} className="w-full glass p-8 rounded-[3rem] flex flex-col items-center gap-3 border-b-4 border-blue-500 active:scale-95 transition-all">
                <i className="fa-solid fa-magnifying-glass text-3xl text-blue-400"></i>
                <span className="text-[10px] font-black uppercase tracking-widest italic">Νέα Επιθεώρηση</span>
            </button>
        </div>
    );
};
