window.M3_Legal = function({ setView }) {
    return (
        <div className="space-y-6 animate-in slide-in-from-right">
            <h2 className="brand text-red-500 text-xs tracking-widest uppercase italic">Legal Vault & Conflicts</h2>
            
            {/* Case 1: Naftocement [cite: 110-112, 347] */}
            <button onClick={() => alert("Naftocement IV Evidence: 12 Files GPS Synced. Case: Vietnam Escape.")} 
                    className="w-full glass p-6 rounded-3xl border-l-4 border-red-600 flex justify-between items-center text-left active:bg-red-950/20">
                <div>
                    <h3 className="font-black text-sm uppercase italic">NAFTOCEMENT IV</h3>
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Vietnam Case // Evidence Vault</p>
                </div>
                <i className="fa-solid fa-folder-closed text-red-900 text-2xl"></i>
            </button>

            {/* Case 2: Terme [cite: 116-118, 348] */}
            <button onClick={() => alert("Terme Shipyard: Investor vs Board Dispute - 8 Survey Logs Active.")} 
                    className="w-full glass p-6 rounded-3xl border-l-4 border-red-600 flex justify-between items-center text-left active:bg-red-950/20">
                <div>
                    <h3 className="font-black text-sm uppercase italic">TERME SHIPYARD</h3>
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Investor/Board Dispute // Audit Log</p>
                </div>
                <i className="fa-solid fa-scale-balanced text-red-900 text-2xl"></i>
            </button>
            
            <button onClick={() => setView('HOME')} className="w-full text-center text-[10px] font-black text-slate-500 uppercase mt-4">Back to Hub</button>
        </div>
    );
};