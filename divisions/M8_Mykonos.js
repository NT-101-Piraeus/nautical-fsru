vwindow.M8_Mykonos = function({ setView }) {
    const properties = [
        { id: "P-01", name: "Villa Tourlos", capacity: 8, occupied: 5, status: "ACTIVE" },
        { id: "P-02", name: "Ano Mera Studio", capacity: 2, occupied: 2, status: "FULL" }
    ];
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="brand text-orange-400 text-xs italic uppercase tracking-widest">M8 // Mykonos Housing</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>
            {properties.map(p => (
                <div key={p.id} className="glass p-4 rounded-3xl border border-slate-800">
                    <h3 className="text-xs font-black uppercase italic">{p.name}</h3>
                    <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-500">
                        <span>Beds: {p.occupied}/{p.capacity}</span>
                        <span className="text-orange-400">{p.status}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
