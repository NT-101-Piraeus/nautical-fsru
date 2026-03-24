window.M3_Legal = function({ view, setView, supabase }) {
    const [cases, setCases] = React.useState([]);

    React.useEffect(() => {
        const fetchCases = async () => {
            const { data } = await supabase.from('ntg_legal_cases').select('*').order('priority', { ascending: false });
            if (data) setCases(data);
        };
        fetchCases();
    }, []);

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center px-2">
                <h2 className="brand text-red-500 text-xs tracking-widest uppercase italic font-black underline underline-offset-8 decoration-red-500/30">M3 // LEGAL VAULT</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Exit</button>
            </div>

            <div className="space-y-4">
                {cases.map(c => (
                    <div key={c.id} className="glass p-6 rounded-[2.5rem] border-l-8 border-red-600 flex justify-between items-center shadow-xl">
                        <div>
                            <h4 className="brand text-sm font-black text-white uppercase italic">{c.case_name}</h4>
                            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">Priority: {c.priority}</p>
                        </div>
                        <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase ${c.status === 'ACTIVE' ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                            {c.status}
                        </span>
                    </div>
                ))}
            </div>

            <div className="glass p-6 rounded-3xl border border-red-900/20 bg-red-950/5">
                <p className="text-[8px] text-slate-500 uppercase font-black italic text-center">Protected by NTG Legal Encryption Protocol</p>
            </div>
        </div>
    );
};
