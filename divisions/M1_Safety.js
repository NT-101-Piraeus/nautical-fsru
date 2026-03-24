window.M1_Safety = function({ view, setView }) {
    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center">
                <h2 className="brand text-blue-400 text-xs tracking-widest uppercase italic font-bold">M1 // Τ.Α. ΠΛΟΙΩΝ</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>
            
            <div className="glass p-5 rounded-[2.5rem] border-2 border-red-600/50 flex items-center gap-4">
                <i className="fa-solid fa-radiation text-2xl text-red-600 animate-pulse"></i>
                <p className="text-[10px] font-black text-red-500 uppercase italic">Hazard Radar: Active Sector Tracking</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button className="glass p-6 rounded-3xl flex flex-col items-center gap-2 border-b-2 border-blue-500 active:scale-95 transition-all">
                    <i className="fa-solid fa-magnifying-glass text-2xl text-blue-400"></i>
                    <span className="text-[9px] font-black uppercase italic">Νέα Επιθεώρηση</span>
                </button>
                <button className="glass p-6 rounded-3xl flex flex-col items-center gap-2 border-b-2 border-slate-700 opacity-50">
                    <i className="fa-solid fa-file-shield text-2xl text-slate-500"></i>
                    <span className="text-[9px] font-black uppercase italic">Ιστορικό Τ.Α.</span>
                </button>
            </div>
        </div>
    );
};
