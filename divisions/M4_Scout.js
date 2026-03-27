const { useState, useEffect } = React;

const M4_Scout = ({ setView }) => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await window.supabaseClient
            .from('intel_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(15);
        
        if (!error) setLeads(data);
        setLoading(false);
    };

    useEffect(() => { fetchLeads(); }, []);

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[550px] font-bold italic animate-fade">
            <h2 className="brand text-cyan-400 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center italic tracking-tighter">
                M4: REPAIR ARRIVALS RADAR
            </h2>

            <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-[10px] text-slate-500 uppercase font-black tracking-widest italic">Market Leads & Arrivals</h3>
                    <button onClick={fetchLeads} className="text-[8px] text-cyan-400 uppercase underline italic">Scan Horizon</button>
                </div>
                
                {loading ? (
                    <div className="text-center p-10 text-[10px] uppercase animate-pulse italic text-cyan-500">Scanning AIS & Maritime Feeds...</div>
                ) : leads.length > 0 ? (
                    leads.map((lead, index) => (
                        <div key={index} className="bg-black/50 p-4 rounded-2xl border border-slate-800 border-l-4 border-l-cyan-600 shadow-md">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[7px] text-cyan-500 uppercase font-black tracking-tighter">New Lead Detected</span>
                                <span className="text-[7px] text-slate-600 uppercase">{new Date(lead.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-[11px] text-white uppercase leading-tight mb-2 italic font-bold">{lead.title}</p>
                            <a href={lead.link} target="_blank" className="text-[8px] text-cyan-400 font-bold uppercase underline italic">Intelligence Details</a>
                        </div>
                    ))
                ) : (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-dashed border-slate-800 text-center italic">
                        <p className="text-[10px] text-slate-600 uppercase">No vessels detected in current scan cycle.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
window.M4_Scout = M4_Scout;
