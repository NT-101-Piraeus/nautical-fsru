const M5_Intel = ({ setView }) => {
    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[500px] font-bold italic">
            <h2 className="brand text-red-500 text-lg mb-6 border-b border-slate-700 pb-2 uppercase italic font-bold tracking-tighter text-center">
                M5: INTEL WAR ROOM
            </h2>

            {/* TABS: LEGAL vs INTEL */}
            <div className="flex gap-2 mb-6">
                <button className="flex-1 bg-slate-800 p-3 rounded-xl text-[10px] uppercase font-black text-slate-400">Legal Vault</button>
                <button className="flex-1 bg-red-600/20 border border-red-600/50 p-3 rounded-xl text-[10px] uppercase font-black text-red-500">Target Tracking</button>
            </div>

            {/* TARGETS LIST */}
            <div className="grid grid-cols-3 gap-2 mb-8">
                {["ZORLU", "ÖZTÜRK", "KARACA"].map(target => (
                    <div key={target} className="bg-slate-950 p-3 rounded-xl border border-red-900/30 text-center">
                        <p className="text-[8px] text-red-500 font-black tracking-widest uppercase">{target}</p>
                        <div className="h-1 w-full bg-red-900/20 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600 w-1/3 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* INTEL FEED (Εδώ θα εμφανίζονται τα δεδομένα από την Python) */}
            <div className="space-y-4">
                <h3 className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Live OSINT Feed</h3>
                <div className="bg-black/50 p-4 rounded-2xl border border-slate-800 border-l-4 border-l-red-600">
                    <p className="text-[11px] text-white uppercase leading-tight mb-2 italic">
                        No active matches in the last hour.
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] text-slate-600 uppercase font-bold tracking-tighter">System Scan: OK</span>
                        <span className="text-[8px] text-red-500 font-bold uppercase animate-pulse italic">Scanning...</span>
                    </div>
                </div>
            </div>

            <button className="w-full mt-10 bg-slate-800 p-5 rounded-2xl brand text-[10px] text-slate-400 uppercase tracking-widest font-bold italic">
                Request Deep Manual Search
            </button>
        </div>
    );
};
window.M5_Intel = M5_Intel;