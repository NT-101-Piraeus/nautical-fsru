const { useState, useEffect } = React;

const M1_Dashboard = ({ setView }) => {
    const [activeTab, setActiveTab] = useState('SCHEDULE'); // 'SCHEDULE' ή 'INSPECTION'
    const [selectedShip, setSelectedShip] = useState(null);

    // Dummy data για το αυριανό πρόγραμμα (Αργότερα θα έρχονται από τη Supabase)
    const todayShips = [
        { id: 1, name: 'MINERVA VIRGO', task: 'Gas Measurement & Ventilation', status: 'PENDING' },
        { id: 2, name: 'MSC YUVIKA V', task: 'Load Test Provision Crane', status: 'DONE' },
        { id: 3, name: 'AEGEAN MYTH', task: 'Safety Audit', status: 'PENDING' }
    ];

    const inspectionTasks = [
        { id: 't1', label: 'Atmosphere Testing (O2/LEL)', done: false },
        { id: 't2', label: 'Ventilation Verification', done: false },
        { id: 't3', label: 'PPE Compliance Check', done: false },
        { id: 't4', label: 'Emergency Exit Clear', done: false }
    ];

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[500px] font-bold italic">
            {/* Header */}
            <header className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <div>
                    <h2 className="brand text-blue-400 text-lg uppercase tracking-tighter">M1 / Safety Officer</h2>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">Operator: M. SYKINIOTIS</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            </header>

            {/* Sub-Navigation Tabs */}
            <div className="flex gap-2 mb-6">
                <button 
                    onClick={() => {setActiveTab('SCHEDULE'); setSelectedShip(null);}}
                    className={`flex-1 py-3 rounded-xl brand text-[10px] transition-all ${activeTab === 'SCHEDULE' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}
                >
                    📅 Schedule
                </button>
                <button 
                    className={`flex-1 py-3 rounded-xl brand text-[10px] transition-all ${selectedShip ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-500 opacity-50'}`}
                    disabled={!selectedShip}
                >
                    🔍 Active Job
                </button>
            </div>

            {/* Content Logic */}
            {activeTab === 'SCHEDULE' && !selectedShip && (
                <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
                    <h3 className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">Today's Missions</h3>
                    {todayShips.map(ship => (
                        <div 
                            key={ship.id}
                            onClick={() => setSelectedShip(ship)}
                            className="bg-slate-950 p-5 rounded-2xl border-l-4 border-blue-500 flex justify-between items-center active:scale-95 transition-all"
                        >
                            <div>
                                <p className="text-sm text-white uppercase font-black">{ship.name}</p>
                                <p className="text-[10px] text-slate-500 italic uppercase">{ship.task}</p>
                            </div>
                            <div className={`h-6 w-6 rounded-lg flex items-center justify-center ${ship.status === 'DONE' ? 'bg-green-500/20 text-green-500' : 'bg-slate-800 text-slate-600'}`}>
                                {ship.status === 'DONE' ? '✓' : '...'}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedShip && (
                <div className="animate-in fade-in duration-500">
                    <div className="bg-blue-600/10 p-4 rounded-2xl border border-blue-600/30 mb-6 text-center">
                        <p className="text-[10px] text-blue-400 uppercase">Inspecting Vessel</p>
                        <h4 className="text-xl font-black text-white">{selectedShip.name}</h4>
                    </div>

                    {/* Task Checklist */}
                    <div className="space-y-3 mb-8">
                        {inspectionTasks.map(task => (
                            <label key={task.id} className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 active:bg-slate-800">
                                <input type="checkbox" className="w-6 h-6 rounded-md accent-blue-600" />
                                <span className="text-xs uppercase text-slate-300">{task.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* Smart Capture Area */}
                    <button className="w-full bg-blue-600 h-24 rounded-3xl flex flex-col items-center justify-center shadow-2xl active:scale-95 transition-all">
                        <span className="text-3xl mb-1">🔵</span>
                        <span className="brand text-[9px] font-black uppercase tracking-widest">Smart Capture</span>
                    </button>

                    <button 
                        onClick={() => setSelectedShip(null)}
                        className="w-full mt-6 py-3 text-[9px] text-slate-500 uppercase underline"
                    >
                        Cancel & Return
                    </button>
                </div>
            )}
        </div>
    );
};

window.M1_Safety = M1_Dashboard;
