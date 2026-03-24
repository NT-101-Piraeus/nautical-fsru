window.M8_Mykonos = function({ view, setView, supabase }) {
    const [properties, setProperties] = React.useState([]);

    React.useEffect(() => {
        const fetchHousing = async () => {
            const { data } = await supabase.from('ntg_housing').select('*');
            if (data) setProperties(data);
        };
        fetchHousing();
    }, []);

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center px-2">
                <h2 className="brand text-orange-400 text-xs tracking-widest uppercase italic font-black font-bold">M8 // MYKONOS HOUSING</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Exit</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {properties.map(p => (
                    <div key={p.id} className="glass p-8 rounded-[3rem] border border-slate-800/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                            <i className="fa-solid fa-umbrella-beach text-4xl"></i>
                        </div>
                        <div className="relative z-10">
                            <h3 className="brand text-sm font-black text-white uppercase italic mb-4">{p.property_name}</h3>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Occupancy</p>
                                    <p className="text-xl font-black text-orange-400 brand">{p.occupancy}</p>
                                </div>
                                <span className={`text-[8px] font-black px-3 py-1 rounded-lg uppercase ${p.status === 'FULL' ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                                    {p.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
