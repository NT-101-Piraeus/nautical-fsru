window.M5_Staff = function({ view, setView }) {
    const [clockStatus, setClockStatus] = React.useState('OFF-DUTY');
    const staffList = [
        { id: "T-101", name: "Γ. Παπαδόπουλος", role: "Welder A", status: "ON-SITE", vessel: "FELIX" },
        { id: "T-102", name: "Ν. Λυμπέρης", role: "Electrician", status: "STANDBY", vessel: "-" },
        { id: "T-103", name: "Δ. Μανωλάς", role: "Safety Officer", status: "ON-SITE", vessel: "ARIADNI" }
    ];
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="brand text-emerald-400 text-xs italic uppercase tracking-widest">M5 // Workforce Control</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>
            <button onClick={() => setClockStatus(clockStatus === 'OFF-DUTY' ? 'ON-DUTY' : 'OFF-DUTY')} 
                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase ${clockStatus === 'ON-DUTY' ? 'bg-red-500/10 text-red-500 border border-red-500' : 'bg-emerald-600 text-white'}`}>
                {clockStatus === 'OFF-DUTY' ? 'Clock-In' : 'Clock-Out'}
            </button>
            <div className="space-y-3">
                {staffList.map(m => (
                    <div key={m.id} className="glass p-4 rounded-3xl flex justify-between items-center border border-slate-800">
                        <span className="text-xs font-black uppercase italic">{m.name}</span>
                        <span className="text-[9px] text-slate-500 uppercase">{m.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
