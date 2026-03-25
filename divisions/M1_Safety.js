const M1_Dashboard = ({ setView }) => {
    return (
        <div className="p-4 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl">
            <header className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <h2 className="brand text-blue-400 text-lg">M1 / SAFETY</h2>
                <span className="bg-green-500 text-[8px] px-2 py-1 rounded-full font-black animate-pulse">LIVE</span>
            </header>

            <div className="grid grid-cols-3 gap-2 mb-8">
                <div className="bg-slate-950 p-3 rounded-xl border-b-2 border-green-500 text-center">
                    <p className="text-[10px] text-slate-500 uppercase">O2</p>
                    <p className="text-lg font-bold">20.9%</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border-b-2 border-green-500 text-center">
                    <p className="text-[10px] text-slate-500 uppercase">LEL</p>
                    <p className="text-lg font-bold">0%</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border-b-2 border-red-500 text-center">
                    <p className="text-[10px] text-slate-500 uppercase">H2S</p>
                    <p className="text-lg font-bold">0.0</p>
                </div>
            </div>

            <button className="w-full bg-blue-600 h-32 rounded-3xl flex flex-col items-center justify-center shadow-xl active:scale-95 transition-all mb-4">
                <span className="text-4xl mb-2">🔵</span>
                <span className="brand text-xs font-black tracking-widest text-white underline">SMART CAPTURE</span>
            </button>
        </div>
    );
};

window.M1_Safety = M1_Dashboard;
