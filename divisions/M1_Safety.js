window.M1_Safety = function({ view, setView }) {
    // Stage B Logic: Επιλογή Ζώνης
    if (view === 'M1_ZONES') return (
        <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="brand text-blue-400 text-xs italic tracking-widest px-2 uppercase italic font-bold">Επιλογή Ζώνης Τ.Α.</h2>
            <div className="grid grid-cols-1 gap-2">
                {["Engine Room", "Main Deck", "Pump Room"].map(zone => (
                    <button key={zone} onClick={() => alert(`Εκκίνηση ελέγχου σε: ${zone}`)} 
                            className="glass p-4 rounded-2xl text-left border-l-4 border-blue-500 font-black uppercase text-[10px] italic">
                        {zone}
                    </button>
                ))}
            </div>
            <button onClick={() => setView('M1')} className="w-full text-center text-[10px] font-black text-slate-500 uppercase mt-6 tracking-widest italic">Back</button>
        </div>
    );

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center">
                <h2 className="brand text-blue-400 text-xs tracking-widest uppercase italic font-bold">M1 // Τ.Α. ΠΛΟΙΩΝ</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>
            {/* Κουμπί που πλέον ΠΑΤΙΕΤΑΙ */}
            <button onClick={() => setView('M1_ZONES')} className="w-full glass p-6 rounded-3xl flex flex-col items-center gap-2 border-b-2 border-blue-500 active:scale-95 transition-all">
                <i className="fa-solid fa-magnifying-glass text-2xl text-blue-400"></i>
                <span className="text-[9px] font-black uppercase italic">Νέα Επιθεώρηση</span>
            </button>
        </div>
    );
};
