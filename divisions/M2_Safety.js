const { useState } = React;

const M2_Safety = () => {
    const [activeJob, setActiveJob] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [location, setLocation] = useState('');
    
    // ΤΟ ΠΡΑΓΜΑΤΙΚΟ ΣΟΥ ΗΜΕΡΟΛΟΓΙΟ (ΜΑΡΤΙΟΣ/ΑΠΡΙΛΙΟΣ 2026)
    const [jobs, setJobs] = useState([
        { id: 1, vessel: "FELIX", imo: "9464182", time: "07:00", duration: "4h", status: "PENDING" },
        { id: 2, vessel: "BADJI MOKHTAR III", imo: "9827889", time: "11:00", duration: "2h", status: "PENDING" },
        { id: 3, vessel: "ΑΡΙΑΔΝΗ", imo: "9135262", time: "13:00", duration: "2h", status: "PENDING" },
        { id: 4, vessel: "RIGEL III", imo: "7807744", time: "15:00", duration: "2h", status: "PENDING" }
    ]);

    const completeJob = (id) => {
        if (!location) return alert("⚠️ SELECT LOCATION FIRST!");
        if (photos.length === 0) return alert("📸 EVIDENCE REQUIRED!");
        setJobs(jobs.map(j => j.id === id ? {...j, status: "COMPLETED", duration: `OK: ${new Date().toLocaleTimeString()}`} : j));
        setActiveJob(null);
        setPhotos([]);
        setLocation('');
    };

    if (activeJob) return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 animate-fade font-bold italic shadow-2xl">
            <h2 className="text-blue-400 text-xs uppercase brand mb-6">Inspection: {activeJob.vessel} (IMO: {activeJob.imo})</h2>
            
            {/* MISSING DROPDOWN: LOCATION SELECTION */}
            <div className="mb-6">
                <label className="text-[9px] text-slate-500 uppercase px-2 tracking-widest">Inspection Area / Χώρος</label>
                <select 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-4 rounded-2xl mt-1 text-white text-xs outline-none italic font-bold">
                    <option value="">-- SELECT AREA --</option>
                    <option value="Engine Room">Engine Room / Μηχανοστάσιο</option>
                    <option value="Main Deck">Main Deck / Κύριο Κατάστρωμα</option>
                    <option value="Pump Room">Pump Room / Αντλιοστάσιο</option>
                    <option value="Tanks">Tanks / Δεξαμενές (Auto Gas-Free)</option>
                    <option value="Accommodation">Accommodation / Ενδιαίτηση</option>
                </select>
            </div>

            <div className="space-y-3 mb-6">
                {['Gas-Free Check', 'PPE Control', 'Fire Safety', 'LOTO System'].map(item => (
                    <label key={item} className="flex items-center gap-3 bg-black/30 p-4 rounded-2xl border border-slate-800 transition-all active:scale-95">
                        <input type="checkbox" defaultChecked={location === 'Tanks' && item === 'Gas-Free Check'} className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-blue-600"/>
                        <span className="text-[10px] uppercase text-slate-300">{item}</span>
                    </label>
                ))}
            </div>

            <button onClick={() => setPhotos([...photos, {id: Date.now(), time: new Date().toLocaleString()}])} 
                    className="w-full bg-slate-800 p-5 rounded-2xl flex items-center justify-center gap-3 mb-6 active:scale-95 border border-slate-700">
                <i className="fa-solid fa-camera text-blue-500"></i>
                <span className="text-[10px] uppercase">Smart Capture ({photos.length})</span>
            </button>

            <button 
                disabled={photos.length === 0 || !location}
                onClick={() => completeJob(activeJob.id)} 
                className={`w-full p-5 rounded-3xl font-black uppercase text-[11px] tracking-widest transition-all ${photos.length > 0 && location ? 'bg-emerald-600 shadow-lg' : 'bg-slate-800 text-slate-600 opacity-50'}`}>
                Proceed to Signature ✍️
            </button>
            {!location && <p className="text-[7px] text-red-500 text-center mt-2 uppercase font-black tracking-widest">Select Area to Proceed</p>}
        </div>
    );

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[550px] font-bold italic animate-fade">
            <h2 className="brand text-blue-400 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center italic tracking-tighter">M2: SAFETY WATCHLIST</h2>
            <div className="space-y-4">
                {jobs.map(job => (
                    <div key={job.id} onClick={() => job.status === 'PENDING' && setActiveJob(job)} 
                         className={`p-5 rounded-[2rem] border ${job.status === 'COMPLETED' ? 'bg-slate-950 border-slate-800 opacity-60' : 'bg-black/40 border-slate-800 active:scale-95 shadow-md'}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[11px] text-white uppercase font-black">{job.vessel} {job.status === 'COMPLETED' && '✅'}</p>
                                <p className="text-[8px] text-slate-500 uppercase tracking-tighter">IMO: {job.imo} • START: {job.time}</p>
                            </div>
                            <span className={`text-[8px] font-black uppercase ${job.status === 'COMPLETED' ? 'text-emerald-500' : 'text-blue-500'}`}>{job.duration}</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-10 bg-blue-600/10 border border-blue-600/30 p-5 rounded-3xl brand text-[10px] text-blue-400 uppercase tracking-widest italic">+ New Unscheduled Inspection</button>
        </div>
    );
};
window.M2_Safety = M2_Safety;
