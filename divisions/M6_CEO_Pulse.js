const M6_CEO_Pulse = () => {
    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[550px] font-bold italic animate-fade">
            <h2 className="brand text-purple-500 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center tracking-tighter">M6: DIRECTOR'S PULSE</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-black/40 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[7px] text-slate-500 uppercase font-black">Monthly Targets</p>
                    <p className="text-xl text-white font-black">84%</p>
                </div>
                <div className="bg-black/40 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[7px] text-slate-500 uppercase font-black">Active Projects</p>
                    <p className="text-xl text-purple-500 font-black">12</p>
                </div>
            </div>
            <div className="space-y-3">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                    <span className="text-[9px] uppercase">Pending Certificates</span>
                    <span className="bg-red-600 text-[8px] px-2 py-1 rounded-full text-white font-black">5</span>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center text-emerald-500">
                    <span className="text-[9px] uppercase">Revenue Flow (MARCH)</span>
                    <i className="fa-solid fa-chart-line"></i>
                </div>
            </div>
        </div>
    );
};
window.M6_CEO_Pulse = M6_CEO_Pulse;
