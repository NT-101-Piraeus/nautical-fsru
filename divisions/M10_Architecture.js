const { useState, useEffect } = React;

const M10_Architecture = () => {
    const [systemHealth, setSystemHealth] = useState({
        agentStatus: "ONLINE",
        lastCheck: new Date().toLocaleTimeString(),
        divisions: [
            { id: "M1", status: "OK" },
            { id: "M4", status: "OK" },
            { id: "M5", status: "OK" },
            { id: "M9", status: "OK" }
        ]
    });

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[550px] font-bold italic animate-fade">
            <h2 className="brand text-indigo-400 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center italic tracking-tighter">
                M10: SYSTEM ARCHITECTURE
            </h2>

            {/* AGENT MONITOR CARD */}
            <div className="bg-black/50 p-6 rounded-3xl border border-indigo-500/30 mb-6 shadow-lg shadow-indigo-500/10">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Autonomous Agent Monitor</span>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[9px] text-emerald-500 uppercase font-black">{systemHealth.agentStatus}</span>
                    </div>
                </div>
                <p className="text-[11px] text-white uppercase leading-tight mb-2">
                    Agent is performing 24/7 autonomous logins & data validation.
                </p>
                <div className="flex justify-between mt-4 text-[8px] text-slate-500 uppercase">
                    <span>Last Self-Check:</span>
                    <span className="text-white italic">{systemHealth.lastCheck}</span>
                </div>
            </div>

            {/* DIVISION HEALTH GRID */}
            <h3 className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-3 px-2">Division Integrity</h3>
            <div className="grid grid-cols-2 gap-3">
                {systemHealth.divisions.map(div => (
                    <div key={div.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                        <span className="text-[10px] text-white font-black uppercase">{div.id} Core</span>
                        <i className={`fa-solid fa-circle-check text-[10px] ${div.status === 'OK' ? 'text-emerald-500' : 'text-red-500'}`}></i>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 bg-indigo-600/10 border border-indigo-600/30 p-5 rounded-3xl brand text-[10px] text-indigo-400 uppercase tracking-widest font-black italic">
                Request Hard Reboot
            </button>
        </div>
    );
};
window.M10_Architecture = M10_Architecture;