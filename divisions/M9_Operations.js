const { useState, useEffect } = React;

const M9_Operations = ({ setView }) => {
    const [tab, setTab] = useState('INVENTORY'); // INVENTORY, RENTALS, QUALITY

    // ΔΕΔΟΜΕΝΑ ΑΠΟ ΤΑ ΠΙΣΤΟΠΟΙΗΤΙΚΑ ΣΟΥ
    const inventory = [
        { id: 1, name: "LOAD CELL 50T (DIN 04)", sn: "220632", calDate: "2025-04-17", calExpiry: "2026-04-17", status: "OK" },
        { id: 2, name: "UTM (SIUI CTS-30C)", sn: "M02321225250R", calDate: "2025-11-14", calExpiry: "2026-11-14", status: "OK" },
        { id: 3, name: "WATER BAGS (SET 1)", sn: "WB-PIR-01", calDate: "N/A", calExpiry: "N/A", status: "RENTED" },
        { id: 4, name: "WATER BAGS (SET 2)", sn: "WB-PIR-02", calDate: "N/A", calExpiry: "N/A", status: "AVAILABLE" }
    ];

    const rentals = [
        { id: 101, client: "ABC SHIPPING", vessel: "MT NAVIGATOR", equipment: "Water Bags 50T", dateOut: "2024-03-20", status: "ACTIVE" },
        { id: 102, client: "ZORLU MARITIME", vessel: "TERM TERSANESI", equipment: "Load Cell 50T", dateOut: "2024-03-25", status: "PENDING" }
    ];

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[600px] font-bold italic animate-fade">
            <h2 className="brand text-indigo-400 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center italic tracking-tighter">
                M9: OPS & QUALITY BASE
            </h2>

            {/* SUB-TABS SELECTOR */}
            <div className="flex gap-1 mb-6 bg-slate-950 p-1 rounded-2xl border border-slate-800">
                <button onClick={() => setTab('INVENTORY')} className={`flex-1 p-3 rounded-xl text-[8px] uppercase font-black transition-all ${tab === 'INVENTORY' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Inventory</button>
                <button onClick={() => setTab('RENTALS')} className={`flex-1 p-3 rounded-xl text-[8px] uppercase font-black transition-all ${tab === 'RENTALS' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Rentals</button>
                <button onClick={() => setTab('QUALITY')} className={`flex-1 p-3 rounded-xl text-[8px] uppercase font-black transition-all ${tab === 'QUALITY' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>ISO Log</button>
            </div>

            {/* TAB CONTENT: INVENTORY */}
            {tab === 'INVENTORY' && (
                <div className="space-y-3">
                    {inventory.map(item => (
                        <div key={item.id} className="bg-black/40 p-4 rounded-2xl border border-slate-800">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-[10px] text-white uppercase font-black">{item.name}</p>
                                <span className={`text-[7px] px-2 py-0.5 rounded-full font-black ${item.status === 'AVAILABLE' ? 'bg-emerald-500 text-black' : 'bg-orange-500 text-black'}`}>{item.status}</span>
                            </div>
                            <p className="text-[8px] text-slate-500 mb-2 uppercase">S/N: {item.sn}</p>
                            <div className="flex justify-between border-t border-slate-800 pt-2 mt-2">
                                <div>
                                    <p className="text-[7px] text-slate-600 uppercase">Last Cal</p>
                                    <p className="text-[9px] text-slate-300">{item.calDate}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[7px] text-red-400 uppercase">Expiry</p>
                                    <p className="text-[9px] text-red-500 font-black underline">{item.calExpiry}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB CONTENT: RENTALS */}
            {tab === 'RENTALS' && (
                <div className="space-y-3">
                    <button className="w-full bg-indigo-600/20 border border-indigo-600/40 p-4 rounded-2xl text-[10px] uppercase font-black text-indigo-400 mb-4">+ Create New Rental Order</button>
                    {rentals.map(rent => (
                        <div key={rent.id} className="bg-slate-950 p-4 rounded-2xl border-l-4 border-l-indigo-500 border border-slate-800 shadow-md">
                            <div className="flex justify-between mb-1">
                                <p className="text-[10px] text-white uppercase font-black">{rent.vessel}</p>
                                <span className="text-[7px] text-indigo-400 font-black uppercase italic">{rent.status}</span>
                            </div>
                            <p className="text-[8px] text-slate-500 uppercase mb-2">{rent.client}</p>
                            <div className="flex justify-between items-center text-[8px] text-slate-400 uppercase">
                                <span>Item: {rent.equipment}</span>
                                <span>Out: {rent.dateOut}</span>
                            </div>
                            <button className="w-full mt-3 bg-slate-800 p-2 rounded-xl text-[7px] uppercase font-black text-slate-400">Generate Delivery Note</button>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB CONTENT: QUALITY (ISO) */}
            {tab === 'QUALITY' && (
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center">
                    <i className="fa-solid fa-calendar-check text-2xl text-indigo-500 mb-4 opacity-50"></i>
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-4 tracking-widest">ISO 9001:2015 Log (E-07)</p>
                    <div className="space-y-2 text-left">
                        <div className="p-3 bg-black/30 rounded-xl border border-slate-800 flex justify-between">
                            <span className="text-[8px] text-slate-400 uppercase tracking-tighter italic">Calibration Checkup cycle</span>
                            <span className="text-[8px] text-emerald-500 font-black italic italic">ACTIVE</span>
                        </div>
                        <div className="p-3 bg-black/30 rounded-xl border border-slate-800 flex justify-between">
                            <span className="text-[8px] text-slate-400 uppercase tracking-tighter italic">Maintenance Log Update</span>
                            <span className="text-[8px] text-slate-600 font-black italic">PENDING</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
window.M9_Operations = M9_Operations;