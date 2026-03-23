window.M2_Repairs = function({ view, setView }) {
    // Δεδομένα από το ΣΕΠΕ Απρίλιος 2026
    const repairsData = [
        { name: 'FELIX', imo: '9464182', port: 'DRAPETSONA', end: '2026-04-05' },
        { name: 'BADJI MOKHTAR III', imo: '9827889', port: 'ELEFSINA', end: '2026-04-30' },
        { name: 'ARIADNI', imo: '9135262', port: 'PIRAEUS', end: '2026-03-28' },
        { name: 'RIGEL III', imo: '7807744', port: 'PERAMA', end: '2026-04-15' }
    ];

    const calculateDays = (dateStr) => {
        const diff = new Date(dateStr) - new Date();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    };

    return (
        <div className="space-y-4 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center px-2 mb-4">
                <h2 className="brand text-cyan-400 text-xs italic uppercase">Repairs Controller</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase">Back</button>
            </div>
            {repairsData.map(ship => {
                const daysLeft = calculateDays(ship.end);
                return (
                    <div key={ship.name} className="glass p-5 rounded-3xl border-l-4 border-cyan-500 flex justify-between items-center">
                        <div>
                            <h3 className="font-black text-sm tracking-tighter uppercase">{ship.name}</h3>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{ship.port}</p>
                        </div>
                        <div className="text-right">
                            <span className={`text-[8px] font-black px-2 py-1 rounded ${daysLeft < 3 ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                {daysLeft} DAYS LEFT
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};