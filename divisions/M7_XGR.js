window.M7_XGR = function({ setView }) {
    return (
        <div className="space-y-4 animate-in slide-in-from-right">
            <h2 className="brand text-orange-500 text-xs italic uppercase tracking-widest">X.GR Merchant Catalog</h2>
            <div className="space-y-2">
                <div className="glass p-4 rounded-2xl flex justify-between items-center border border-slate-800">
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Gas Detector GX-2009</span>
                    <span className="text-xs font-black text-orange-500 tracking-tighter">€420</span>
                </div>
                <div className="glass p-4 rounded-2xl flex justify-between items-center border-l-4 border-red-600">
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Oil Filter Marine-X</span>
                    <span className="text-xs font-black text-red-500 uppercase italic">Low Stock Alert</span>
                </div>
            </div>
            <button onClick={() => setView('HOME')} className="w-full text-center text-[10px] font-black text-slate-500 uppercase mt-4 tracking-widest">Back to Hub</button>
        </div>
    );
};