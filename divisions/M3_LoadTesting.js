const { useState } = React;

const M3_LoadTesting = ({ userRole }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [reportData, setReportData] = useState({
        vesselName: '', equipment: '', swl: '', testLoad: '',
        sdmbl: '', l1: '', l2: '', result: 'PASS'
    });

    const services = [
        { id: 1, name: "Cargo Gear Inspection & Load Testing", icon: "fa-cranes-ship" },
        { id: 2, name: "Means of Access (Gangways/Ladders)", icon: "fa-stairs" },
        { id: 3, name: "Mooring Winches Brake Test (BHC)", icon: "fa-anchor" },
        { id: 4, name: "Ramps, Stoppers & Pad Eyes", icon: "fa-truck-loading" },
        { id: 5, name: "Bollard Pull Test", icon: "fa-tugboat" }
    ];

    // --- PDF GENERATOR ---
    const generatePDF = () => {
        if (!reportData.vesselName || !reportData.testLoad) {
            alert("⚠️ Σφάλμα: Συμπληρώστε το Όνομα Πλοίου και το Φορτίο (Test Load) πριν την εκτύπωση.");
            return;
        }

        const doc = new window.jspdf.jsPDF();
        const dateToday = new Date().toLocaleDateString('en-GB');

        // Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(249, 115, 22); // Orange-500
        doc.text("NAUTICAL TECHNOLOGY", 105, 20, null, null, "center");
        
        doc.setFontSize(14);
        doc.setTextColor(50, 50, 50);
        doc.text("CERTIFICATE OF TEST AND EXAMINATION", 105, 30, null, null, "center");
        doc.line(20, 35, 190, 35);

        // Body
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        
        const startY = 50;
        doc.text(`Date of Service:`, 20, startY); doc.setFont("helvetica", "bold"); doc.text(`${dateToday}`, 65, startY);
        doc.setFont("helvetica", "normal"); doc.text(`Vessel Name:`, 20, startY + 10); doc.setFont("helvetica", "bold"); doc.text(`${reportData.vesselName.toUpperCase()}`, 65, startY + 10);
        doc.setFont("helvetica", "normal"); doc.text(`Service Type:`, 20, startY + 20); doc.setFont("helvetica", "bold"); doc.text(`${selectedService.name}`, 65, startY + 20);
        doc.setFont("helvetica", "normal"); doc.text(`Equipment:`, 20, startY + 30); doc.setFont("helvetica", "bold"); doc.text(`${reportData.equipment || 'N/A'}`, 65, startY + 30);

        // Load Box
        doc.setFillColor(240, 248, 255);
        doc.rect(20, 95, 170, 30, "F");
        doc.rect(20, 95, 170, 30, "S");
        doc.setFontSize(13);
        doc.setFont("helvetica", "normal"); doc.text(`Safe Working Load (SWL):`, 25, 107);
        doc.setFont("helvetica", "bold"); doc.text(`${reportData.swl} t`, 95, 107);
        doc.setFont("helvetica", "normal"); doc.text(`Applied Proof Load:`, 25, 117);
        doc.setTextColor(0, 128, 0); doc.text(`${reportData.testLoad} t`, 95, 117);

        // Result
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text("We hereby declare that a general inspection and operation test took place.", 20, 145);
        doc.text("The items have been tested and found in good working order.", 20, 152);
        doc.setFont("helvetica", "bold"); doc.text(`RESULT: ${reportData.result}`, 20, 165);

        // Signature Boxes
        doc.rect(20, 185, 80, 50); 
        doc.setFontSize(9);
        doc.text("Tested by / Surveyor:", 25, 193);
        doc.setFont("helvetica", "normal"); doc.text("M. SYKINIOTIS", 25, 200);
        doc.text("(Sign & Company Stamp)", 25, 230);

        doc.rect(110, 185, 80, 50); 
        doc.setFontSize(9); doc.setFont("helvetica", "bold");
        doc.text("Acknowledged by Master:", 115, 193);
        doc.setFont("helvetica", "normal"); doc.text("(Sign & Ship's Stamp)", 115, 230);

        doc.save(`${reportData.vesselName}_CERT11.pdf`);
    };

    // Math Engines
    const handleSwlChange = (e) => {
        const val = parseFloat(e.target.value);
        let proof = '';
        if (val > 0) {
            if (selectedService?.id === 1) {
                if (val <= 20) proof = (val * 1.25).toFixed(2);
                else if (val <= 50) proof = (val + 5).toFixed(2);
                else proof = (val * 1.1).toFixed(2);
            } else { proof = (val * 1.1).toFixed(2); }
        }
        setReportData({ ...reportData, swl: e.target.value, testLoad: proof });
    };

    const handleBhcChange = (field, value) => {
        const newData = { ...reportData, [field]: value };
        const sdmbl = parseFloat(newData.sdmbl), l1 = parseFloat(newData.l1), l2 = parseFloat(newData.l2);
        if (sdmbl > 0 && l1 > 0 && l2 > 0) {
            newData.testLoad = (0.60 * sdmbl * (l1 / l2)).toFixed(2);
        } else { newData.testLoad = ''; }
        setReportData(newData);
    };

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[650px] font-bold italic text-white animate-fade pb-10">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-2">
                <h2 className="brand text-orange-500 text-lg uppercase tracking-tighter italic italic">M3: LOAD TEST ENGINE</h2>
                {userRole === 'DIRECTOR' && <span className="bg-emerald-600/20 text-emerald-500 text-[8px] px-2 py-1 rounded-md">ADMIN</span>}
            </div>

            {!selectedService ? (
                <div className="space-y-4">
                    {userRole === 'DIRECTOR' && (
                        <div className="p-5 bg-blue-600/10 border border-blue-500/30 rounded-3xl mb-6">
                            <p className="text-[9px] text-blue-400 mb-3 uppercase font-black tracking-widest italic">📁 SHIP ISO VAULT</p>
                            <button className="w-full bg-slate-800 p-4 rounded-2xl text-[10px] flex justify-between items-center active:scale-95 transition-all">
                                <span>Access Records</span> <i className="fa-solid fa-folder-tree text-blue-500"></i>
                            </button>
                        </div>
                    )}
                    <p className="text-[9px] text-slate-500 uppercase px-2 font-black italic">Select Service:</p>
                    {services.map(s => (
                        <button key={s.id} onClick={() => setSelectedService(s)} className="w-full bg-black/40 p-5 rounded-2xl border border-slate-800 flex justify-between items-center active:scale-95 transition-all">
                            <div className="flex items-center gap-4">
                                <i className={`fa-solid ${s.icon} text-orange-500 text-lg`}></i>
                                <span className="text-[10px] uppercase font-black">{s.name}</span>
                            </div>
                            <i className="fa-solid fa-chevron-right text-slate-700"></i>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="animate-fade space-y-5">
                    <button onClick={() => {setSelectedService(null); setReportData({vesselName:'', equipment:'', swl:'', testLoad:'', sdmbl:'', l1:'', l2:'', result:'PASS'});}} 
                            className="text-[9px] text-slate-500 uppercase underline italic font-black">← Back</button>
                    
                    <div className="bg-black/30 p-6 rounded-[2.5rem] border border-slate-800 space-y-5 shadow-inner">
                        <h3 className="text-[11px] text-white uppercase border-b border-slate-800 pb-2 italic italic">{selectedService.name}</h3>
                        
                        <div>
                            <label className="text-[8px] text-slate-500 uppercase px-2 font-black italic italic italic">Vessel Name</label>
                            <input type="text" placeholder="MT FELIX" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl mt-1 text-xs outline-none focus:border-orange-500 text-slate-300"
                                   value={reportData.vesselName} onChange={(e) => setReportData({...reportData, vesselName: e.target.value})} />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {selectedService?.id === 3 ? (
                                <div className="grid grid-cols-3 gap-2">
                                    {['sdmbl', 'l1', 'l2'].map(field => (
                                        <div key={field}>
                                            <label className="text-[8px] text-slate-500 uppercase px-1 italic font-black italic">{field.toUpperCase()}</label>
                                            <input type="number" className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl mt-1 text-sm outline-none focus:border-orange-500 font-bold text-white text-center"
                                                   value={reportData[field]} onChange={(e) => handleBhcChange(field, e.target.value)} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <label className="text-[9px] text-slate-500 uppercase px-2 italic font-black italic">SWL (Tons)</label>
                                    <input type="number" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl mt-1 text-sm outline-none focus:border-orange-500 font-bold text-white"
                                           value={reportData.swl} onChange={handleSwlChange} />
                                </div>
                            )}

                            <div className="bg-slate-950 border-2 border-emerald-500/30 p-4 rounded-[1.8rem] text-center shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                                <label className="text-[9px] text-emerald-500 uppercase font-black italic tracking-tighter italic">Target Test Load / Jack Force</label>
                                <div className="mt-1"><span className="text-3xl font-black text-emerald-400 tracking-tighter animate-pulse">{reportData.testLoad ? `${reportData.testLoad} t` : '-'}</span></div>
                            </div>
                        </div>

                        <button onClick={generatePDF} className="w-full bg-orange-600 hover:bg-orange-500 p-6 rounded-3xl brand text-white uppercase text-[14px] shadow-lg active:scale-95 transition-all mt-4 font-black italic tracking-widest border-b-4 border-orange-800 flex justify-center items-center gap-3">
                            <i className="fa-solid fa-print text-xl"></i>
                            Generate Printable PDF ⚓
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

window.M3_LoadTesting = M3_LoadTesting;
