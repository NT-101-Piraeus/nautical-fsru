const { useState } = React;

const M10_LoadTesting = ({ setView }) => {
    const [reportType, setReportType] = useState('SERVICE');
    const [vessel, setVessel] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = () => {
        setLoading(true);
        // Εδώ θα μπει η λογική που θα στέλνει τα δεδομένα στα δικά σου Templates
        setTimeout(() => {
            alert(`Generating ${reportType} Report for ${vessel}...`);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[550px] font-bold italic animate-fade">
            <h2 className="brand text-orange-500 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center italic font-bold tracking-tighter">
                M3: LOAD TESTING REPORTS
            </h2>

            {/* REPORT TYPE SELECTOR */}
            <div className="flex gap-2 mb-6">
                <button 
                    onClick={() => setReportType('SERVICE')}
                    className={`flex-1 p-4 rounded-2xl text-[10px] uppercase font-black transition-all ${reportType === 'SERVICE' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' : 'bg-slate-800 text-slate-500'}`}>
                    Service Report
                </button>
                <button 
                    onClick={() => setReportType('WORK')}
                    className={`flex-1 p-4 rounded-2xl text-[10px] uppercase font-black transition-all ${reportType === 'WORK' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' : 'bg-slate-800 text-slate-500'}`}>
                    Work Report
                </button>
            </div>

            {/* DATA INPUT SECTION */}
            <div className="space-y-4 mb-8">
                <div>
                    <label className="text-[9px] text-slate-500 uppercase px-2">Vessel Name / IMO</label>
                    <input 
                        type="text" 
                        value={vessel}
                        onChange={(e) => setVessel(e.target.value)}
                        placeholder="ENTER SHIP NAME..." 
                        className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl mt-1 text-white text-sm outline-none focus:border-orange-500 italic font-bold"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[9px] text-slate-500 uppercase px-2">Test Load (Tons)</label>
                        <input type="number" placeholder="0.0" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl mt-1 text-white text-sm outline-none focus:border-orange-500 italic font-bold" />
                    </div>
                    <div>
                        <label className="text-[9px] text-slate-500 uppercase px-2">Cert. Number</label>
                        <input type="text" placeholder="NT-2024-XXX" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl mt-1 text-white text-sm outline-none focus:border-orange-500 italic font-bold" />
                    </div>
                </div>

                <div>
                    <label className="text-[9px] text-slate-500 uppercase px-2">Observations / Deficiencies</label>
                    <textarea rows="3" placeholder="REMARKS..." className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl mt-1 text-white text-xs outline-none focus:border-orange-500 italic font-bold"></textarea>
                </div>
            </div>

            {/* ACTION BUTTON */}
            <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-orange-600 p-5 rounded-3xl brand text-[12px] text-white uppercase tracking-widest font-black active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3">
                {loading ? (
                    <i className="fa-solid fa-sync animate-spin"></i>
                ) : (
                    <i className="fa-solid fa-file-pdf"></i>
                )}
                {loading ? "PROCESSING..." : `GENERATE ${reportType} PDF`}
            </button>

            <p className="text-[8px] text-slate-600 text-center mt-6 uppercase font-black">
                Automatically synced with Naftotrade Cloud Base
            </p>
        </div>
    );
};
window.M10_LoadTesting = M10_LoadTesting;
