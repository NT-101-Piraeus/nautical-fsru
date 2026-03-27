const M6_CEO_Pulse = () => {
    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[550px] font-bold italic animate-fade">
            <h2 className="brand text-purple-500 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center tracking-tighter">M6: DIRECTOR'S PULSE</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-black/40 p-4 rounded-2xl border border-slate-800 text-center">
                    <p className="text-[7px] text-slate-500 uppercase mb-1">Monthly Goal</p>
                    <p className="text-xl text-white font-black">92%</p>
                </div>
                <div className="bg-black/40 p-4 rounded-2xl border border-slate-800 text-center">
                    <p className="text-[7px] text-slate-500 uppercase mb-1">Active Jobs</p>
                    <p className="text-xl text-purple-500 font-black">04</p>
                </div>
            </div>
            <div className="space-y-3">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                    <span className="text-[10px] uppercase">Pending Work Reports</span>
                    <span className="bg-red-600 text-[8px] px-2 py-1 rounded-full text-white">3</span>
                </div>
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center text-emerald-500">
                    <span className="text-[10px] uppercase italic">Revenue Stream (LIVE)</span>
                    <i className="fa-solid fa-arrow-trend-up"></i>
                </div>
            </div>
        </div>
    );
};
window.M6_CEO_Pulse = M6_CEO_Pulse;
