window.M5_Staff = function({ view, setView }) {
    const [clockStatus, setClockStatus] = React.useState('OFF-DUTY');
    
    const staffList = [
        { id: "T-101", name: "Γ. Παπαδόπουλος", role: "Welder A", status: "ON-SITE", vessel: "FELIX" },
        { id: "T-102", name: "Ν. Λυμπέρης", role: "Electrician", status: "STANDBY", vessel: "-" },
        { id: "T-103", name: "Δ. Μανωλάς", role: "Safety Officer", status: "ON-SITE", vessel: "ARIADNI" }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center">
                <h2 className="brand text-emerald-400 text-xs tracking-widest uppercase italic font-bold">M5 // Workforce Control</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>

            <div className={`glass p-6 rounded-[2.5rem] border-2 transition-all ${clockStatus === 'ON-DUTY' ? 'border-emerald-500 shadow-lg' : 'border-slate-800'}`}>
                <p className="text-[10px] font-black text-slate-500 uppercase mb-4 text-center">Personal Shift Controller</p>
                <button onClick={() => setClockStatus(clockStatus === 'OFF-DUTY' ? 'ON-DUTY' : 'OFF-DUTY')} 
                        className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${clockStatus === 'ON-DUTY' ? 'bg-red-500/10 text-red-500 border border-red-500' : 'bg-emerald-600 text-white shadow-emerald-900/40'}`}>
                    {clockStatus === 'OFF-DUTY' ? 'Initiate Clock-In' : 'Terminate Shift'}
                </button>
            </div>

            <div className="space-y-3">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 italic underline font-bold">Live Personnel Roster</h3>
                {staffList.map(member => (
                    <div key={member.id} className="glass p-4 rounded-3xl flex justify-between items-center border border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${member.status === 'ON-SITE' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></div>
                            <div>
                                <p className="text-xs font-black uppercase italic tracking-tighter">{member.name}</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase">{member.role} // {member.vessel}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
