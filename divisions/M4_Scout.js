const { useState, useEffect } = React;
const M4_Scout = () => {
    const [leads, setLeads] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const { data } = await window.supabaseClient.from('intel_logs').select('*').limit(10);
            if(data) setLeads(data);
        };
        fetch();
    }, []);
    return (
        <div class="p-6">
            <h2 class="text-cyan-400 font-bold mb-6 border-b border-slate-800 pb-2 text-center">M4: ARRIVALS RADAR</h2>
            <div class="space-y-3">
                {leads.length > 0 ? leads.map(l => (
                    <div class="bg-black/40 p-4 rounded-xl border border-slate-800">
                        <p class="text-[10px] font-bold uppercase italic">{l.title}</p>
                        <span class="text-[8px] text-cyan-600 uppercase">{new Date(l.created_at).toLocaleDateString()}</span>
                    </div>
                )) : <p class="text-center text-slate-500 text-[10px] uppercase">Scanning AIS Horizon...</p>}
            </div>
        </div>
    );
};
window.M4_Scout = M4_Scout;
