window.M2_Repairs = function({ setView, supabase }) {
    const schedules = [
        { ship: "FELIX", date: "05/04/2026", status: "READY", location: "Drapetsona" },
        { ship: "ARIADNI", date: "12/04/2026", status: "PENDING", location: "Perama" }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center px-2">
                <h2 className="brand text-cyan-400 text-xs tracking-widest uppercase italic font-black font-bold">M2 // REPAIRS WATCHLIST</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Exit</button>
            </div>

            <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 italic underline font-bold italic">ΣΕΠΕ SCHEDULE - APRIL 2026</p>
                {schedules.map(s => (
                    <div key={s.ship} className="glass p-6 rounded-[2.5rem] border-l-8 border-cyan-500 flex justify-between items-center">
                        <div>
                            <h4 className="brand text-sm font-black text-white uppercase">{s.ship}</h4>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">{s.date} // {s.location}</p>
                        </div>
                        <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase ${s.status === 'READY' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-cyan-500/10 text-cyan-400'}`}>
                            {s.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
