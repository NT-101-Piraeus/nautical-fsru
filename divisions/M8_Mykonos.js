window.M8_Mykonos = function({ setView }) {
    // Δείγμα Καταλυμάτων (Assets στην Μύκονο)
    const properties = [
        { id: "P-01", name: "Villa Tourlos", capacity: 8, occupied: 5, status: "ACTIVE", nextCleaning: "2026-03-26" },
        { id: "P-02", name: "Ano Mera Studio", capacity: 2, occupied: 2, status: "FULL", nextCleaning: "2026-03-25" },
        { id: "P-03", name: "Ornos Staff House", capacity: 12, occupied: 0, status: "MAINTENANCE", nextCleaning: "N/A" }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-umbrella-beach text-orange-400 text-lg"></i>
                    <h2 className="brand text-orange-400 text-xs tracking-widest uppercase italic">M8 // Live in Mykonos</h2>
                </div>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2">
                <div className="glass p-3 rounded-2xl text-center border-b-2 border-orange-500">
                    <p className="text-[7px] font-black text-slate-500 uppercase">Total Beds</p>
                    <p className="text-sm font-black">22</p>
                </div>
                <div className="glass p-3 rounded-2xl text-center border-b-2 border-emerald-500">
                    <p className="text-[7px] font-black text-slate-500 uppercase">Available</p>
                    <p className="text-sm font-black text-emerald-400">15</p>
                </div>
                <div className="glass p-3 rounded-2xl text-center border-b-2 border-red-500">
                    <p className="text-[7px] font-black text-slate-500 uppercase">Alerts</p>
                    <p className="text-sm font-black text-red-500">1</p>
                </div>
            </div>

            {/* Property List */}
            <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 font-bold italic underline">Managed Accommodations</h3>
                {properties.map(p => (
                    <div key={p.id} className="glass p-4 rounded-3xl border border-slate-800 hover:border-orange-500/50 transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="text-xs font-black uppercase italic tracking-tighter">{p.name}</h4>
                                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{p.id} // Mykonos Sector</p>
                            </div>
                            <span className={`text-[8px] font-black px-2 py-1 rounded uppercase italic ${
                                p.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' : 
                                p.status === 'FULL' ? 'bg-orange-500/10 text-orange-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                                {p.status}
                            </span>
                        </div>
                        
                        {/* Occupancy Bar */}
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-3">
                            <div 
                                className={`h-full transition-all duration-1000 ${p.status === 'MAINTENANCE' ? 'bg-red-500' : 'bg-orange-500'}`} 
                                style={{ width: `${(p.occupied / p.capacity) * 100}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between items-center text-[9px] font-bold uppercase text-slate-400">
                            <span>Beds: {p.occupied} / {p.capacity}</span>
                            <span>Next Cleaning: {p.nextCleaning}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Asset Button */}
            <button className="w-full glass p-4 rounded-3xl flex items-center justify-center gap-3 border-dashed border-slate-700 active:scale-95 transition-all">
                <i className="fa-solid fa-house-chimney-medical text-slate-500 text-xs"></i>
                <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest italic">Register New Accommodation</span>
            </button>
        </div>
    );
};