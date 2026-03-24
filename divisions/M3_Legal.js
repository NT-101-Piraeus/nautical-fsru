window.M3_Legal = function({ setView, supabase }) {
    const redFlags = [
        "Στρατηγικός κατακερματισμός ομίλου (Samsun/Tuzla) [cite: 66]",
        "Χρήση Λιβεριανών εταιρειών-βιτρίνα (Capital/Barker) [cite: 60]",
        "Μετονομασία Naftobulk VII σε Vine I (IMO 9513191) [cite: 116, 192]"
    ];

    const targets = ["Emir Öztürk", "Erkan Zorlu", "Mustafa Kemal Sezer", "Tuğrul Karaca"]; // [cite: 72, 88]

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <h2 className="brand text-red-500 text-xs tracking-widest uppercase italic font-black">M3 // LEGAL VAULT</h2>
            
            {/* Red Flags Section [cite: 31, 55] */}
            <div className="glass p-6 rounded-3xl border border-red-500/30 bg-red-950/10">
                <p className="text-[10px] font-black text-red-500 uppercase mb-4 italic">Critical Red Flags</p>
                {redFlags.map((flag, i) => (
                    <div key={i} className="flex gap-3 mb-3 items-start">
                        <i className="fa-solid fa-circle-exclamation text-red-500 mt-1"></i>
                        <p className="text-[9px] text-white uppercase font-bold italic leading-tight">{flag}</p>
                    </div>
                ))}
            </div>

            {/* Target UBOs [cite: 41, 72] */}
            <div className="glass p-6 rounded-3xl border border-slate-800">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-4 italic">Tracked UBOs (Forensic Monitoring)</p>
                <div className="grid grid-cols-2 gap-2">
                    {targets.map(name => (
                        <div key={name} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[8px] font-black uppercase text-center italic">
                            {name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass p-4 rounded-2xl text-center border border-blue-500/20">
                <p className="text-[8px] text-blue-400 uppercase font-black italic">Alter Ego Doctrine Protection Active [cite: 175]</p>
            </div>
        </div>
    );
};
