window.M7_XGR = function({ setView }) {
    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center">
                <h2 className="brand text-orange-500 text-xs tracking-widest uppercase italic font-bold">M7 // X.GR Merchant</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="glass p-5 rounded-3xl text-center border-b-2 border-orange-500">
                    <i className="fa-solid fa-boxes-stacked text-orange-500 text-xl mb-2"></i>
                    <p className="text-[8px] font-black text-slate-500 uppercase">Stock Items</p>
                    <p className="text-sm font-black text-white">1,240</p>
                </div>
                <div className="glass p-5 rounded-3xl text-center border-b-2 border-emerald-500">
                    <i className="fa-solid fa-cart-shopping text-emerald-500 text-xl mb-2"></i>
                    <p className="text-[8px] font-black text-slate-500 uppercase">Sales Today</p>
                    <p className="text-sm font-black text-white">€3,420</p>
                </div>
            </div>
        </div>
    );
};
