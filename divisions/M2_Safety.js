const { useState, useEffect } = React;

const M1_Safety = () => {
    const [activeJob, setActiveJob] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [location, setLocation] = useState('');
    const [workType, setWorkType] = useState('');
    
    const [jobs] = useState([
        { id: 1, vessel: "FELIX", imo: "9464182", time: "07:00", duration: "4h", status: "PENDING" },
        { id: 2, vessel: "BADJI MOKHTAR III", imo: "9827889", time: "11:00", duration: "2h", status: "PENDING" },
        { id: 3, vessel: "ΑΡΙΑΔΝΗ", imo: "9135262", time: "13:00", duration: "2h", status: "PENDING" },
        { id: 4, vessel: "RIGEL III", imo: "7807744", time: "15:00", duration: "2h", status: "PENDING" }
    ]);

    const workRequirements = {
        "Hot Works": ["Fire Safety Standby", "Gas-Free Certificate", "PPE Checked", "Fire Blanket"],
        "Confined Space": ["Gas-Free Check (O2/LEL)", "Standby Person", "Entrance Log", "Oxygen Resuscitator"],
        "Working at Height": ["Safety Harness", "Area Cordoned", "Wind Speed Check", "Fall Arrester"],
        "Lifting": ["Gear Certification", "Area Clear", "SWL Verified", "Signaller Present"],
        "Electrical": ["LOTO System", "Insulated Tools", "Voltage Check", "Arc Flash PPE"],
        "Other": ["General PPE", "Risk Assessment", "Toolbox Talk"]
    };

    if (activeJob) return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 animate-fade font-bold italic shadow-2xl">
            <h2 className="text-blue-400 text-[10px] uppercase brand mb-6 border-b border-slate-800 pb-2 italic">
                M1: SAFETY WATCHLIST | {activeJob.vessel}
            </h2>
            
            {/* HIERARCHY STEP 1: SELECT AREA */}
            <div className="mb-4">
                <label className="text-[8px] text-slate-500 uppercase px-2 tracking-widest italic font-black">1. Inspection Area / Χώρος</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-4 rounded-2xl mt-1 text-white text-xs outline-none italic font-bold">
                    <option value="">-- SELECT AREA --</option>
                    <option value="Engine Room">Engine Room / Μηχανοστάσιο</option>
                    <option value="Main Deck">Main Deck / Κύριο Κατάστρωμα</option>
                    <option value="Garage">Garage / Ro-Ro (Ro-Ro Spaces)</option>
                    <option value="Chimney">Chimney / Τσιμινιέρα</option>
                    <option value="Pump Room">Pump Room / Αντλιοστάσιο</option>
                    <option value="Tanks">Tanks / Δεξαμενές</option>
                </select>
            </div>

            {/* HIERARCHY STEP 2: SELECT WORK TYPE */}
            {location && (
                <div className="mb-6 animate-fade">
                    <label className="text-[8px] text-slate-500 uppercase px-2 tracking-widest italic font-black">2. Work Type / Εργασία</label>
                    <select value={workType} onChange={(e) => setWorkType(e.target.value)}
                        className="w-full bg-blue-600/10 border border-blue-500/30 p-4 rounded-2xl mt-1 text-blue-400 text-xs outline-none font-bold italic">
                        <option value="">-- SELECT WORK TYPE --</option>
                        {Object.keys(workRequirements).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* HIERARCHY STEP 3: DYNAMIC CHECKBOXES */}
            {workType && (
                <div className="space-y-3 mb-6 animate-fade">
                    <label className="text-[8px] text-slate-500 uppercase px-2 italic font-black">3. Required Controls (Π.Δ. 70/90)</label>
                    {workRequirements[workType].map(item => (
                        <label key={item} className="flex items-center gap-3 bg-black/30 p-4 rounded-2xl border border-slate-800 transition-all active:scale-95">
                            <input type="checkbox" className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-blue-600"/>
                            <span className="text-[10px] uppercase text-slate-300 tracking-tighter italic">{item}</span>
                        </label>
                    ))}
                </div>
            )}

            {/* SMART CAPTURE & AI HAZARD BUTTON */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <button onClick={() => setPhotos([...photos, {id: Date.now()}])} 
                        className="bg-slate-800 p-5 rounded-2xl flex flex-col items-center gap-1 border border-slate-700 active:scale-95 shadow-lg">
                    <i className="fa-solid fa-camera text-blue-500 text-lg"></i>
                    <span className="text-[8px] uppercase">Smart Capture ({photos.length})</span>
                </button>
                <button className="bg-blue-600/10 p-5 rounded-2xl flex flex-col items-center gap-1 border border-blue-500/30 active:scale-95 shadow-lg group">
                    <i className="fa-solid fa-robot text-blue-400 text-lg group-hover:animate-bounce"></i>
                    <span className="text-[8px] uppercase text-blue-400 italic font-black">🤖 AI HAZARD ANALYSIS</span>
                </button>
            </div>

            <button disabled={photos.length === 0 || !workType}
                className={`w-full p-5 rounded-3xl font-black uppercase text-[11px] tracking-widest transition-all ${photos.length > 0 && workType ? 'bg-emerald-600 shadow-xl' : 'bg-slate-800 text-slate-600 opacity-50 cursor-not-allowed'}`}>
                Proceed to Signature ✍️
            </button>
        </div>
    );

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[550px] font-bold italic animate-fade">
            <h2 className="brand text-blue-400 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center italic tracking-tighter">
                M1: SAFETY WATCHLIST
            </h2>
            <div className="space-y-4">
                {jobs.map(job => (
                    <div key={job.id} onClick={() => setActiveJob(job)} 
                         className="p-5 rounded-[2rem] border bg-black/40 border-slate-800 active:scale-95 shadow-md flex justify-between items-center group hover:border-blue-500/50 transition-all cursor-pointer">
                        <div>
                            <p className="text-[11px] text-white uppercase font-black italic">{job.vessel}</p>
                            <p className="text-[8px] text-slate-500 uppercase tracking-tighter">IMO: {job.imo} • START: {job.time}</p>
                        </div>
                        <i className="fa-solid fa-shield-halved text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                ))}
            </div>
            <p className="text-[7px] text-slate-600 text-center mt-6 uppercase tracking-widest italic font-black">Sync with ΣΕΠΕ & Π.Δ. 70/90 Engine</p>
        </div>
    );
};
window.M1_Safety = M1_Safety;
