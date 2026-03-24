window.M6_CEO_Pulse = function({ setView }) {
    const projects = [
        { name: "Naftocement IV", revenue: 45000, expenses: 28000, status: "Active" },
        { name: "Terme Shipyard B", revenue: 12000, expenses: 9500, status: "Pending" }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center">
                <h2 className="brand text-purple-400 text-xs tracking-widest uppercase italic font-bold">M6 // CEO Pulse & Analytics</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-2 gap-3">
                <div className="glass p-5 rounded-3xl border-b-4 border-emerald-500 text-center">
                    <p className="text-[8px] font-black text-slate-500 uppercase">Total Revenue</p>
                    <p className="text-lg font-black text-emerald-400">€57,000</p>
                </div>
                <div className="glass p-5 rounded-3xl border-b-4 border-red-500 text-center">
                    <p className="text-[8px] font-black text-slate-500 uppercase">Operational Costs</p>
                    <p className="text-lg font-black text-red-400">€37,500</p>
                </div>
            </div>

            {/* Project Performance */}
            <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 italic underline font-bold">Active Project ROI</h3>
                {projects.map(p => {
                    const profit = ((p.revenue - p.expenses) / p.revenue * 100).toFixed(1);
                    return (
                        <div key={p.name} className="glass p-5 rounded-3xl border border-slate-800">
                            <div className="flex justify-between mb-3">
                                <h4 className="text-xs font-black uppercase italic">{p.name}</h4>
                                <span className="text-[10px] font-black text-emerald-400">+{profit}% ROI</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full" style={{ width: `${profit}%` }}></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};