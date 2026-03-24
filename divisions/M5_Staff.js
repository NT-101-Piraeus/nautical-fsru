window.M5_Staff = function({ view, setView, supabase }) {
    const [clockStatus, setClockStatus] = React.useState('OFF-DUTY');

    const handleClockToggle = async () => {
        const newStatus = clockStatus === 'OFF-DUTY' ? 'ON-DUTY' : 'OFF-DUTY';
        const action = newStatus === 'ON-DUTY' ? 'CLOCK-IN' : 'CLOCK-OUT';
        
        const { error } = await supabase
            .from('ntg_staff_logs')
            .insert([{ action_type: action, location: 'Piraeus Office' }]);

        if (!error) {
            setClockStatus(newStatus);
            alert(`${action} ΚΑΤΑΓΡΑΦΗΚΕ`);
        } else {
            alert("Database Error");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="brand text-emerald-400 text-xs tracking-widest uppercase italic font-bold">M5 // Staff Hub</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Back</button>
            </div>

            <div className={`glass p-8 rounded-[3rem] border-2 transition-all ${clockStatus === 'ON-DUTY' ? 'border-emerald-500 shadow-lg' : 'border-slate-800'}`}>
                <p className="text-[10px] font-black text-slate-500 uppercase mb-4 text-center">Status: {clockStatus}</p>
                <button onClick={handleClockToggle} 
                        className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${clockStatus === 'ON-DUTY' ? 'bg-red-500/20 text-red-500 border border-red-500' : 'bg-emerald-600 text-white'}`}>
                    {clockStatus === 'OFF-DUTY' ? 'Clock-In' : 'Clock-Out'}
                </button>
            </div>
        </div>
    );
};
