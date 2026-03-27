
const M1_UTM = () => {
    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[550px] font-bold italic animate-fade text-white">
            <h2 className="brand text-slate-400 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center italic tracking-tighter">
                M1: UTM MEASUREMENTS
            </h2>
            <div className="flex flex-col items-center justify-center h-64 opacity-50">
                <i className="fa-solid fa-layer-group text-4xl mb-4 text-slate-600"></i>
                <p className="text-[10px] uppercase tracking-widest font-black">Waiting for Thickness Gauging Data</p>
            </div>
            <button className="w-full bg-slate-800 p-5 rounded-3xl brand text-white uppercase text-[11px] shadow-lg active:scale-95 italic font-black tracking-widest border border-slate-700">
                Import Survey Data ⚓
            </button>
        </div>
    );
};
window.M1_UTM = M1_UTM;
