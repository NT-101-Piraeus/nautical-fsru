const { useState } = React;
const M1_Safety = () => {
    const [activeJob, setActiveJob] = useState(null);
    const [jobs, setJobs] = useState([
        { id: 1, vessel: "MT NAVIGATOR", status: "PENDING", type: "Annual", duration: "4h" },
        { id: 2, vessel: "LNG AVALON (FSRU)", status: "PENDING", type: "FSRU Special", duration: "6h" }
    ]);
    const [photos, setPhotos] = useState([]);
    const [checklist, setChecklist] = useState({ gasFree: false, ppe: false, hotWorks: false });

    const completeJob = (id) => {
        if(photos.length === 0) return alert("📸 EVIDENCE REQUIRED!");
        setJobs(jobs.map(j => j.id === id ? {...j, status: "COMPLETED", duration: "COMPLETED"} : j));
        setActiveJob(null);
        setPhotos([]);
    };

    if (activeJob) return (
        <div class="p-6 glass rounded-3xl animate-fade">
            <h2 class="text-blue-400 font-bold mb-4 uppercase">Inspection: {activeJob.vessel}</h2>
            <div class="space-y-3 mb-6">
                {['gasFree', 'ppe', 'hotWorks'].map(item => (
                    <label class="flex items-center gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <input type="checkbox" checked={checklist[item]} onChange={(e) => setChecklist({...checklist, [item]: e.target.checked})} class="w-5 h-5"/>
                        <span class="text-[10px] uppercase font-bold">{item}</span>
                    </label>
                ))}
            </div>
            {activeJob.vessel.includes("FSRU") && (
                <div class="grid grid-cols-2 gap-2 mb-6 p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                    <input type="number" placeholder="O2 %" class="bg-slate-950 p-3 rounded-lg text-xs outline-none border border-slate-800" />
                    <input type="number" placeholder="LEL %" class="bg-slate-950 p-3 rounded-lg text-xs outline-none border border-slate-800" />
                </div>
            )}
            <button onClick={() => setPhotos([...photos, 1])} class="w-full bg-slate-800 p-4 rounded-xl mb-4 border border-slate-700 uppercase font-black text-[10px]">📸 Capture Evidence ({photos.length})</button>
            <button disabled={photos.length === 0} onClick={() => completeJob(activeJob.id)} class={`w-full p-5 rounded-2xl font-black uppercase text-sm ${photos.length > 0 ? 'bg-emerald-600' : 'bg-slate-700 opacity-50'}`}>Proceed to Signature</button>
        </div>
    );

    return (
        <div class="p-4 space-y-4">
            <h2 class="text-center font-bold text-blue-400 border-b border-slate-800 pb-2">M2: SAFETY WATCHLIST</h2>
            {jobs.map(job => (
                <div onClick={() => job.status === 'PENDING' && setActiveJob(job)} class={`p-5 rounded-2xl border ${job.status === 'COMPLETED' ? 'bg-slate-900 border-slate-800 opacity-50' : 'bg-slate-800 border-slate-700 shadow-xl'}`}>
                    <div class="flex justify-between items-center text-[10px] font-black italic">
                        <span>{job.vessel} {job.status === 'COMPLETED' && '✅'}</span>
                        <span class={job.status === 'COMPLETED' ? 'text-emerald-500' : 'text-blue-500'}>{job.duration}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
window.M1_Safety = M1_Safety;
