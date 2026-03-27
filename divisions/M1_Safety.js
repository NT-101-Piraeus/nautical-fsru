const { useState, useEffect } = React;

const M1_Safety = ({ setView }) => {
    const [inspections, setInspections] = useState([
        { id: 1, vessel: "MT NAVIGATOR", type: "Annual", status: "PENDING", duration: "4h", location: "Deck" },
        { id: 2, vessel: "LNG AVALON", type: "FSRU Special", status: "PENDING", duration: "6h", location: "Pump Room" }
    ]);
    
    const [activeJob, setActiveJob] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [checklist, setChecklist] = useState({
        gasFree: false, ventilation: false, lifting: false, escape: false,
        loto: false, ppe: false, hotWorks: false, height: false,
        o2: "", lel: ""
    });

    // 1. SMART LOGIC: Auto-Tick Gas-Free & FSRU Logic
    const updateChecklist = (field, value) => {
        let newChecklist = { ...checklist, [field]: value };
        
        // Auto-tick Gas-Free for Tanks/Pump Room
        if (field === 'location' && (value === 'Tanks' || value === 'Pump Room')) {
            newChecklist.gasFree = true;
        }
        setChecklist(newChecklist);
    };

    // 2. WATERMARK & CAPTURE LOGIC
    const handleCapture = () => {
        const timestamp = new Date().toLocaleString('el-GR');
        // Προσομοίωση λήψης με Watermark
        const newPhoto = {
            id: Date.now(),
            url: "https://via.placeholder.com/300x200?text=Inspection+Evidence",
            time: timestamp
        };
        setPhotos([...photos, newPhoto]);
        alert(`Photo Captured with Watermark: ${timestamp}`);
    };

    // 3. COMPLETE INSPECTION
    const completeInspection = (id) => {
        setInspections(inspections.map(job => 
            job.id === id ? { ...job, status: "COMPLETED", duration: `COMPLETED: ${new Date().toLocaleTimeString()}` } : job
        ));
        setActiveJob(null);
        setPhotos([]);
        setChecklist({ gasFree: false, ventilation: false, o2: "", lel: "" });
    };

    if (activeJob) {
        return (
            <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 animate-fade font-bold italic">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-blue-400 text-xs uppercase brand">Active Inspection: {activeJob.vessel}</h2>
                    <button onClick={() => setActiveJob(null)} className="text-[10px] text-slate-500 underline">Cancel</button>
                </div>

                {/* CHECKLIST SECTION */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                    {[
                        { id: 'gasFree', label: 'Gas-Free / Atmosphere' },
                        { id: 'ventilation', label: 'Ventilation OK' },
                        { id: 'lifting', label: 'Lifting Ops / Equipment' },
                        { id: 'escape', label: 'Escape Routes Clear' },
                        { id: 'loto', label: 'Electrical / LOTO' },
                        { id: 'ppe', label: 'PPE / Μ.Α.Π. Check' },
                        { id: 'hotWorks', label: 'Hot Works Permit' },
                        { id: 'height', label: 'Working at Height' }
                    ].map(item => (
                        <label key={item.id} className="flex items-center gap-3 bg-black/30 p-4 rounded-2xl border border-slate-800">
                            <input 
                                type="checkbox" 
                                checked={checklist[item.id]} 
                                onChange={(e) => updateChecklist(item.id, e.target.checked)}
                                className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-blue-600"
                            />
                            <span className="text-[10px] uppercase text-slate-300">{item.label}</span>
                        </label>
                    ))}
                </div>

                {/* 4. LNG / FSRU EXCEPTION INPUTS */}
                {activeJob.type.includes("FSRU") && (
                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-blue-900/10 border border-blue-500/30 rounded-2xl">
                        <div>
                            <label className="text-[8px] text-blue-400 uppercase">O2 Concentration %</label>
                            <input type="number" placeholder="20.9" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-700 text-white text-xs mt-1 outline-none" />
                        </div>
                        <div>
                            <label className="text-[8px] text-blue-400 uppercase">LEL %</label>
                            <input type="number" placeholder="0.0" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-700 text-white text-xs mt-1 outline-none" />
                        </div>
                    </div>
                )}

                {/* SMART CAPTURE BUTTON */}
                <button 
                    onClick={handleCapture}
                    className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center justify-center gap-3 mb-6 active:scale-95">
                    <i className="fa-solid fa-camera text-blue-500"></i>
                    <span className="text-[10px] uppercase">Smart Capture (Watermarked)</span>
                    {photos.length > 0 && <span className="bg-blue-600 text-[8px] px-2 py-1 rounded-full">{photos.length}</span>}
                </button>

                {/* HARD STOP: DISABLED IF NO PHOTOS */}
                <button 
                    disabled={photos.length === 0}
                    onClick={() => completeInspection(activeJob.id)}
                    className={`w-full p-5 rounded-3xl brand text-[11px] uppercase tracking-widest transition-all ${photos.length > 0 ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-600 grayscale cursor-not-allowed'}`}>
                    <i className="fa-solid fa-signature mr-2"></i>
                    Proceed to Signature
                </button>
                {photos.length === 0 && <p className="text-[7px] text-red-500 text-center mt-2 uppercase font-black">Evidence required to unlock signature</p>}
            </div>
        );
    }

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[550px] font-bold italic animate-fade">
            <h2 className="brand text-blue-400 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center italic tracking-tighter">
                M2: SAFETY WATCHLIST
            </h2>

            <div className="space-y-4">
                {inspections.map(job => (
                    <div 
                        key={job.id} 
                        onClick={() => job.status === 'PENDING' && setActiveJob(job)}
                        className={`p-5 rounded-[2rem] border transition-all ${job.status === 'COMPLETED' ? 'bg-slate-950 opacity-60 border-slate-800' : 'bg-black/40 border-slate-800 active:scale-95 shadow-lg'}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-[11px] text-white uppercase font-black">{job.vessel}</p>
                                    {job.status === 'COMPLETED' && <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i>}
                                </div>
                                <p className="text-[8px] text-slate-500 uppercase">{job.type} • {job.location}</p>
                            </div>
                            <div className="text-right">
                                <span className={`text-[7px] font-black uppercase ${job.status === 'COMPLETED' ? 'text-emerald-500' : 'text-blue-500'}`}>
                                    {job.duration}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-10 bg-blue-600/10 border border-blue-600/30 p-5 rounded-3xl brand text-[10px] text-blue-400 uppercase tracking-widest font-black italic">
                + New Unscheduled Inspection
            </button>
        </div>
    );
};
window.M1_Safety = M1_Safety;
