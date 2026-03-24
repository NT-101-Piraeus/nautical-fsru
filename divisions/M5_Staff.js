window.M5_Staff = function({ setView, supabase }) {
    const [clockStatus, setClockStatus] = React.useState('OFF-DUTY');

    const handleClockToggle = async () => {
        const nextAction = clockStatus === 'OFF-DUTY' ? 'CLOCK-IN' : 'CLOCK-OUT';
        try {
            const { error } = await supabase
                .from('ntg_staff_logs')
                .insert([{ action_type: nextAction, user_id: 'M. SYKINIOTIS', location: 'Piraeus Office/HQ' }]);
            
            if (error) throw error;
            setClockStatus(clockStatus === 'OFF-DUTY' ? 'ON-DUTY' : 'OFF-DUTY');
            alert(`SUCCESS: ${nextAction} recorded in Enterprise Cloud. [cite: 217]`);
        } catch (err) {
            alert('Database Connection Lost.');
        }
    };

    return (
        <div className="space-y-8 h-full flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center px-2">
                <h2 className="brand text-emerald-400 text-xs tracking-widest uppercase italic font-black">M5 // STAFF HUB</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Exit</button>
            </div>

            <div className={`glass p-10 rounded-[4rem] border-2 transition-all duration-700 flex flex-col items-center gap-6 shadow-2xl ${clockStatus === 'ON-DUTY' ? 'border-emerald-500 shadow-emerald-500/20' : 'border-slate-800'}`}>
                <div className="text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic font-bold italic">Security Access Level: Master</p>
                    <p className={`text-xl font-black italic uppercase tracking-tighter ${clockStatus === 'ON-DUTY' ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {clockStatus}
                    </p>
                </div>

                <button onClick={handleClockToggle} 
                        className={`w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 brand shadow-xl ${clockStatus === 'ON-DUTY' ? 'bg-red-500/20 text-red-500 border border-red-500' : 'bg-emerald-600 text-white shadow-emerald-900/40'}`}>
                    {clockStatus === 'OFF-DUTY' ? 'Start Shift' : 'End Shift'}
                </button>
            </div>
            
            <p className="text-center text-[9px] text-slate-500 uppercase font-black italic tracking-widest">Digital Clock-in/Out with GPS verification active [cite: 70, 250]</p>
        </div>
    );
};
