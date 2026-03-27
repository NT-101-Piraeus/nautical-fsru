const { useState, useEffect } = React;

const M5_Intel = ({ setView }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIntel();
    }, []);

    const fetchIntel = async () => {
        setLoading(true);
        const { data, error } = await window.supabaseClient
            .from('intel_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);
        
        if (!error) setLogs(data);
        setLoading(false);
    };

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[500px] font-bold italic">
            <h2 className="brand text-red-500 text-lg mb-6 border-b border-slate-700 pb-2 uppercase italic text-center">
                M5: INTEL WAR ROOM
            </h2>

            {/* TARGETS STATUS */}
            <div className="grid grid-cols-3 gap-2 mb-8">
                {["ZORLU", "ÖZTÜRK", "KARACA"].map(target => (
                    <div key={target} className="bg-slate-950 p-3 rounded-xl border border-red-900/30 text-center">
                        <p className="text-[8px] text-red-500 font-black tracking-widest uppercase">{target}</p>
                        <div className="h-1 w-full bg-red-900/20 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600 w-1/2 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* LIVE FEED FROM DATABASE */}
            <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Live OSINT Feed</h3>
                    <button onClick={fetchIntel} className="text-[8px] text-blue-400 uppercase">Refresh</button>
                </div>
                
                {loading ? (
                    <div className="text-center p-10 text-[10px] uppercase animate-pulse">Scanning Database...</div>
                ) : logs.length > 0 ? (
                    logs.map((log, index) => (
                        <div key={index} className="bg-black/50 p-4 rounded-2xl border border-slate-800 border-l-4 border-l-red-600 animate-in fade-in slide-in-from-left duration-300">
                            <p className="text-[11px] text-white uppercase leading-tight mb-2 italic font-bold">
                                {log.title}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-[7px] text-slate-500 uppercase">{new Date(log.created_at).toLocaleString('el-GR')}</span>
                                <a href={log.link} target="_blank" className="text-[8px] text-red-500 font-bold uppercase underline italic">View Source</a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-dashed border-slate-800 text-center">
                        <p className="text-[10px] text-slate-600 uppercase italic">No matches detected in recent scans.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
window.M5_Intel = M5_Intel;
