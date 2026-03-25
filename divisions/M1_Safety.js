const { useState } = React;

const M1_Dashboard = ({ setView, supabase }) => {
    const [activeTab, setActiveTab] = useState('WATCHLIST');
    const [selectedShip, setSelectedShip] = useState(null);

    // Η επίσημη Watchlist 2026 της NTG
    const shipWatchlist = [
        { id: 'f1', name: 'FELIX', imo: '9513191', task: 'Hot Works Permit', status: 'PENDING' },
        { id: 'a1', name: 'ARIADNI', imo: 'N/A', task: 'Gas-Free Inspection', status: 'PENDING' },
        { id: 'r1', name: 'RIGEL III', imo: 'N/A', task: 'Annual Safety Audit', status: 'DONE' },
        { id: 'n1', name: 'NAFTOCEMENT IV', imo: 'N/A', task: 'Ventilation Check', status: 'PENDING' },
        { id: 'm1', name: 'MINERVA VIRGO', imo: 'N/A', task: 'Full PD 70/90 Audit', status: 'PENDING' }
    ];

    // Checklists βάσει ΠΔ 70/90
    const pd7090Tasks = [
        { id: 'c1', label: 'Atmosphere: O2 (19.5% - 22.5%)', type: 'gas' },
        { id: 'c2', label: 'LEL Check (< 1% for Hot Works)', type: 'gas' },
        { id: 'c3', label: 'Continuous Ventilation Active', type: 'check' },
        { id: 'c4', label: 'PPE: Helmet, Harness, Mask', type: 'check' },
        { id: 'c5', label: 'Hot Works: Fire Ext. on standby', type: 'legal' },
        { id: 'c6', label: 'Emergency Exit: Unblocked', type: 'check' }
    ];

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[600px] font-bold italic text-white">
            {/* Header */}
            <header className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <div>
                    <h2 className="brand text-blue-400 text-lg uppercase">M1 / Safety Officer</h2>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest italic">Compliance: ΠΔ 70/90</p>
                </div>
                <button onClick={() => setView('HOME')} className="bg-slate-800 p-2 rounded-full text-xs">✖</button>
            </header>

            {/* View Logic */}
            {!selectedShip ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                    <h3 className="text-[10px] text-blue-500 uppercase mb-2 tracking-widest">Fleet Watchlist 2026</h3>
                    {shipWatchlist.map(ship => (
                        <div 
                            key={ship.id}
                            onClick={() => setSelectedShip(ship)}
                            className={`p-5 rounded-2xl border-l-4 flex justify-between items-center active:scale-95 transition-all ${ship.status === 'DONE' ? 'bg-slate-800 border-green-500 opacity-60' : 'bg-slate-950 border-blue-600 shadow-lg'}`}
                        >
                            <div>
                                <p className="text-sm font-black uppercase">{ship.name}</p>
                                <p className="text-[10px] text-slate-500 uppercase italic">IMO: {ship.imo}</p>
                            </div>
                            <span className={`text-[9px] font-black px-3 py-1 rounded-lg ${ship.status === 'DONE' ? 'bg-green-500 text-black' : 'bg-blue-600/20 text-blue-400 border border-blue-600'}`}>
                                {ship.status === 'DONE' ? 'DONE' : 'START'}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="animate-in slide-in-from-right duration-400">
                    <div className="bg-blue-600 p-4 rounded-2xl mb-6 shadow-xl relative overflow-hidden">
                        <p className="text-[10px] text-blue-100 uppercase opacity-70">Active Inspection</p>
                        <h4 className="text-xl font-black">{selectedShip.name}</h4>
                        <div className="absolute right-[-10px] top-[-10px] text-6xl opacity-10">🚢</div>
                    </div>

                    <div className="space-y-3 mb-8">
                        {pd7090Tasks.map(task => (
                            <label key={task.id} className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 active:bg-slate-900 transition-colors">
                                <input type="checkbox" className="w-6 h-6 rounded-md accent-blue-600" />
                                <div>
                                    <span className="text-xs uppercase block">{task.label}</span>
                                    {task.type === 'gas' && <span className="text-[8px] text-orange-500 uppercase font-black">Critical measurement</span>}
                                </div>
                            </label>
                        ))}
                    </div>

                    {/* Smart Capture Area */}
                    <div className="grid grid-cols-1 gap-4">
                        <button className="bg-blue-600 h-28 rounded-3xl flex flex-col items-center justify-center shadow-2xl active:scale-95">
                            <span className="text-4xl mb-1">🔵</span>
                            <span className="brand text-[10px] uppercase font-black tracking-tighter">Smart Capture [Evidence]</span>
                        </button>
                        
                        <div className="flex gap-2">
                            <button onClick={() => setSelectedShip(null)} className="flex-1 bg-slate-800 py-4 rounded-xl text-[9px] uppercase">Back</button>
                            <button className="flex-1 bg-green-600 py-4 rounded-xl text-[9px] uppercase font-black">Complete Job</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

window.M1_Safety = M1_Dashboard;
