const M12_StaffHub = ({ setView }) => {
    const staff = [
        { id: 1, name: "Μ. ΣΥΚΙΝΙΩΤΗΣ", role: "Safety Director", status: "On-Site (FELIX)", color: "bg-green-500" },
        { id: 2, name: "ΤΕΧΝΙΚΟΣ UTM 1", role: "UTM Operator", status: "Available", color: "bg-blue-500" },
        { id: 3, name: "ΒΟΗΘΟΣ LOAD TEST", role: "Field Assistant", status: "Offline", color: "bg-slate-500" }
    ];

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[500px] font-bold italic">
            <h2 className="brand text-blue-400 text-lg mb-6 border-b border-slate-700 pb-2 uppercase italic font-bold">M12 Staff Hub</h2>
            <div className="space-y-4">
                {staff.map(person => (
                    <div key={person.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex justify-between items-center shadow-md">
                        <div>
                            <p className="text-sm text-white uppercase font-black italic">{person.name}</p>
                            <p className="text-[9px] text-slate-500 uppercase italic">{person.role}</p>
                        </div>
                        <div className="text-right">
                            <span className={`${person.color} text-[8px] px-2 py-1 rounded-full font-black text-black uppercase italic`}>
                                {person.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-10 bg-blue-600/10 border border-blue-600/30 p-5 rounded-2xl brand text-[10px] text-blue-400 uppercase tracking-widest font-bold italic">
                + Add New Member
            </button>
        </div>
    );
};
window.M12_StaffHub = M12_StaffHub;
