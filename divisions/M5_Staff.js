window.M5_Staff = function({ view, setView }) {
    const USER_ID = "M. SYKINIOTIS";
    const [clockStatus, setClockStatus] = React.useState('OFF-DUTY');
    const [shiftStart, setShiftStart] = React.useState(null);

    // Δείγμα Προσωπικού (Σύνδεση με M9 Fleet DB μελλοντικά)
    const staffList = [
        { id: "T-101", name: "Γ. Παπαδόπουλος", role: "Welder A", status: "ON-SITE", vessel: "FELIX" },
        { id: "T-102", name: "Ν. Λυμπέρης", role: "Electrician", status: "STANDBY", vessel: "-" },
        { id: "T-103", name: "Δ. Μανωλάς", role: "Safety Officer", status: "ON-SITE", vessel: "ARIADNI" }
    ];

    const handleClockToggle = () => {
        const now = new Date().toLocaleTimeString();
        if (clockStatus === 'OFF-DUTY') {
            setClockStatus('ON-DUTY');
            setShiftStart(now);
            alert(`CLOCK-IN SUCCESS\nUser: ${USER_ID}\nTime: ${now}\nLocation: Piraeus Sector`);
        } else {
            setClockStatus('OFF-DUTY');
            alert(`CLOCK-OUT SUCCESS\nTotal Shift recorded for ${USER_ID}`);
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="brand text-emerald-400 text-xs tracking-widest uppercase italic">M5 // Workforce Control</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>

            {/* Quick Action: Clock-In/Out */}
            <div className={`glass p-6 rounded-[2.5rem] border-2 transition-all ${clockStatus === 'ON-DUTY' ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-slate-800'}`}>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase">Current Status</p>
                        <p className={`text-sm font-black italic ${clockStatus === 'ON-DUTY' ? 'text-emerald-500' : 'text-slate-400'}`}>{clockStatus}</p>
                    </div>
                    {shiftStart && <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase">Started At</p>
                        <p className="text-sm font-black text-white italic">{shiftStart}</p>
                    </div>}
                </div>
                <button onClick={handleClockToggle} 
                        className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 ${clockStatus === 'ON-DUTY' ? 'bg-red-500/10 text-red-500 border border-red-500' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'}`}>
                    {clockStatus === 'OFF-DUTY' ? 'Initiate Shift (Clock-In)' : 'Terminate Shift (Clock-Out)'}
                </button>
            </div>

            {/* Personnel Roster */}
            <div className="space-y-3">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Live Personnel Roster</h3>
                {staffList.map(member => (
                    <div key={member.id} className="glass p-4 rounded-3xl flex justify-between items-center border border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${member.status === 'ON-SITE' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-tighter">{member.name}</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase">{member.role} // {member.vessel}</p>
                            </div>
                        </div>
                        <i className="fa-solid fa-chevron-right text-slate-800 text-xs"></i>
                    </div>
                ))}
            </div>

            {/* Admin Metrics */}
            <div className="grid grid-cols-2 gap-3">
                <div className="glass p-4 rounded-3xl text-center border-b-2 border-blue-500">
                    <p className="text-[8px] font-black text-slate-500 uppercase">Active Now</p>
                    <p className="text-xl font-black text-blue-400">42</p>
                </div>
                <div className="glass p-4 rounded-3xl text-center border-b-2 border-purple-500">
                    <p className="text-[8px] font-black text-slate-500 uppercase">Total Hours</p>
                    <p className="text-xl font-black text-purple-400">312h</p>
                </div>
            </div>
        </div>
    );
};