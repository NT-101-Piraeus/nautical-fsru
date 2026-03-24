window.M3_Legal = function({ setView }) {
    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center">
                <h2 className="brand text-red-500 text-xs tracking-widest uppercase italic font-bold">M3 // Legal Vault</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>

            <div className="glass p-6 rounded-[2.5rem] border border-red-500/30">
                <i className="fa-solid fa-gavel text-red-500 mb-2"></i>
                <h3 className="text-xs font-black uppercase italic text-white mb-4 italic underline font-bold">Case Monitor</h3>
                <div className="space-y-3">
                    <div className="p-3 bg-red-500/5 rounded-2xl border border-red-500/20">
                        <p className="text-[10px] font-black text-red-400">Naftocement IV Dispute</p>
                        <p className="text-[8px] text-slate-500 uppercase">Status: Evidence Collection</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                        <p className="text-[10px] font-black text-slate-400">Terme Shipyard B Agreement</p>
                        <p className="text-[8px] text-slate-500 uppercase">Status: Signed & Archived</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
