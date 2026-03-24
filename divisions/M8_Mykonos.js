window.M8_Mykonos = function({ setView, supabase }) {
    const properties = [
        { name: "Villa Tourlos", beds: "5/8", status: "ACTIVE" },
        { name: "Ano Mera Hub", beds: "2/2", status: "FULL" }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center px-2">
                <h2 className="brand text-orange-400 text-xs tracking-widest uppercase italic font-black">M8 // LIVE IN MYKONOS</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Exit</button>
            </div>

            {properties.map(p => (
                <div key={p.name} className="glass p-6 rounded-[2.5rem] border border-slate-800">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="brand text-sm font-black text-white uppercase italic">{p.name}</h3>
                        <span className={`text-[8px] font-black px-2 py-1 rounded uppercase ${p.status === 'FULL' ? 'bg-orange-500/20 text-orange-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                            {p.status}
                        </span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Occupancy: {p.beds}</span>
                        <i className="fa-solid fa-bed"></i>
                    </div>
                </div>
            ))}
        </div>
    );
};
