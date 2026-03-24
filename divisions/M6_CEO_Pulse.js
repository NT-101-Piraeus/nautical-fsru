window.M6_CEO_Pulse = function({ setView, supabase }) {
    // Στατικά δεδομένα για το Leap 2 - Στο Leap 3 θα έρχονται 100% από τη βάση
    const stats = { revenue: 85000, expenses: 42000 };
    const profitability = ((stats.revenue - stats.expenses) / stats.revenue * 100).toFixed(1);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center px-2">
                <h2 className="brand text-purple-400 text-xs tracking-widest uppercase italic font-black">M6 // CEO PULSE</h2>
                <button onClick={() => setView('HOME')} className="text-[10px] font-black text-slate-500 uppercase italic">Exit</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="glass p-8 rounded-[3rem] border-b-8 border-emerald-500 text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Total Enterprise ROI</p>
                    <p className="text-4xl font-black text-emerald-400 brand">+{profitability}%</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-6 rounded-3xl border-b-4 border-blue-500 text-center">
                        <p className="text-[8px] font-black text-slate-500 uppercase">Revenue</p>
                        <p className="text-lg font-black text-white">€{stats.revenue.toLocaleString()}</p>
                    </div>
                    <div className="glass p-6 rounded-3xl border-b-4 border-red-500 text-center">
                        <p className="text-[8px] font-black text-slate-500 uppercase">Expenses</p>
                        <p className="text-lg font-black text-white">€{stats.expenses.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="glass p-6 rounded-3xl border border-slate-800">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Strategic Alerts</h3>
                <div className="flex items-center gap-3 text-emerald-500 text-[10px] font-bold uppercase italic">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>All projects are currently within budget limits</span>
                </div>
            </div>
        </div>
    );
};
