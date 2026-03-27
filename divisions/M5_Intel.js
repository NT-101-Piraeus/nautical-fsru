const { useState, useEffect } = React;

const M5_Intel = () => {
    const [alerts, setAlerts] = useState([
        { id: 1, target: "Emir Öztürk", status: "MONITORING", lastChange: "None", severity: "LOW", source: "KRS Poland" },
        { id: 2, target: "Alasund (Iceland)", status: "ALERT", lastChange: "Possible 404 detected", severity: "HIGH", source: "Website Scraper" },
        { id: 3, target: "S.V. NIKOLAY", status: "GEOFENCE LIVE", lastChange: "At Samsun Port", severity: "CRITICAL", source: "MarineTraffic API" }
    ]);

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[600px] font-bold italic text-white animate-fade">
            <h2 className="brand text-red-500 text-lg mb-6 border-b border-red-900/30 pb-2 uppercase text-center italic tracking-widest">
                M5: WAR ROOM (OSINT)
            </h2>

            <div className="space-y-4">
                {alerts.map(alert => (
                    <div key={alert.id} className="bg-black/40 p-5 rounded-3xl border border-slate-800 relative overflow-hidden group">
                        {alert.severity === 'CRITICAL' && <div className="absolute top-0 left-0 w-1 h-full bg-red-600 animate-pulse"></div>}
                        
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter italic">Target Entity</p>
                                <h3 className="text-sm uppercase font-black text-white italic">{alert.target}</h3>
                            </div>
                            <span className={`text-[8px] px-2 py-1 rounded-full border ${alert.severity === 'CRITICAL' ? 'bg-red-900/20 border-red-600 text-red-500' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                                {alert.severity} PRIORITY
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                                <p className="text-[7px] text-slate-500 uppercase">Status</p>
                                <p className={`text-[9px] font-black ${alert.status === 'ALERT' ? 'text-orange-500' : 'text-emerald-500'}`}>{alert.status}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                                <p className="text-[7px] text-slate-500 uppercase">Last Sync</p>
                                <p className="text-[9px] text-slate-300">12h ago</p>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-red-600/5 border border-red-500/10 rounded-xl">
                            <p className="text-[8px] text-slate-400 italic font-medium tracking-tight">
                                <i className="fa-solid fa-bolt text-red-500 mr-2"></i>
                                Source: {alert.source} | Querying Polish KRS & Google Dorks...
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 bg-red-600 p-5 rounded-3xl brand text-white uppercase text-[11px] shadow-lg active:scale-95 transition-all font-black italic tracking-widest border-b-4 border-red-900">
                Trigger Manual Global Scan 📡
            </button>
        </div>
    );
};
window.M5_Intel = M5_Intel;
