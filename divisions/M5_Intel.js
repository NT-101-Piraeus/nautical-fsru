const { useState, useEffect } = React;

const M5_Intel = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            const { data } = await window.supabaseClient
                .from('osint_alerts')
                .select('*')
                .order('created_at', { ascending: false });
            setAlerts(data || []);
        };
        fetchAlerts();
        // Refresh κάθε 5 λεπτά
        const interval = setInterval(fetchAlerts, 300000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 min-h-[600px] font-bold italic animate-fade">
            <h2 className="brand text-red-500 text-lg mb-6 border-b border-red-900/30 pb-2 uppercase text-center italic">M5: WAR ROOM (LIVE OSINT)</h2>
            <div className="space-y-4">
                {alerts.length === 0 ? (
                    <p className="text-center text-[10px] text-slate-500 uppercase">No active alerts. Scanning background...</p>
                ) : (
                    alerts.map(alert => (
                        <div key={alert.id} className="bg-black/40 p-5 rounded-3xl border border-red-900/20 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-sm uppercase font-black text-white italic">{alert.target}</h3>
                                <span className="text-[8px] bg-red-600 text-white px-2 py-1 rounded-full uppercase italic">ALERT</span>
                            </div>
                            <p className="text-[9px] text-slate-400 leading-tight uppercase font-black">{alert.details}</p>
                            <p className="text-[7px] text-slate-600 mt-4 uppercase italic tracking-widest">Source: {alert.source}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
window.M5_Intel = M5_Intel;
