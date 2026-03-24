window.M2_Repairs = function({ setView }) {
    const schedules = [
        { ship: "FELIX", date: "05/04/2026", authority: "ΣΕΠΕ Piraeus", status: "Confirmed" },
        { ship: "ARIADNI", date: "12/04/2026", authority: "IMO Inspection", status: "Pending" }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center">
                <h2 className="brand text-cyan-400 text-xs tracking-widest uppercase italic font-bold">M2 // Repairs Watchlist</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>

            <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 italic font-bold underline">ΣΕΠΕ Schedule - April 2026</h3>
                {schedules.map(s => (
                    <div key={s.ship} className="glass p-5 rounded-3xl border border-slate-800">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-xs font-black text-white italic uppercase tracking-tighter">{s.ship}</h4>
                                <p className="text-[9px] text-slate-500 font-bold uppercase">{s.date} // {s.authority}</p>
                            </div>
                            <span className="text-[8px] font-black px-2 py-1 bg-cyan-500/10 text-cyan-500 rounded uppercase">{s.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
