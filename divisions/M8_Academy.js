const { useState } = React;

const M8_Academy = () => {
    const [selectedManual, setSelectedManual] = useState(null);

    const manuals = [
        { id: 'D01', title: 'Δ-01: ΣΚΟΠΟΣ & ΠΟΛΙΤΙΚΗ', icon: 'fa-handshake' },
        { id: 'D03', title: 'Δ-03: ΔΙΑΧΕΙΡΙΣΗ ΠΡΟΣΩΠΙΚΟΥ', icon: 'fa-user-gear' },
        { id: 'D12', title: 'Δ-12: ΕΠΙΘΕΩΡΗΣΗ ΕΞΟΠΛΙΣΜΟΥ', icon: 'fa-ship' }
    ];

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[600px] font-bold italic animate-fade">
            <h2 className="brand text-emerald-500 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center italic tracking-tighter">
                M8: NAFTOTRADE ACADEMY
            </h2>

            {!selectedManual ? (
                <div className="grid grid-cols-1 gap-3">
                    {manuals.map(m => (
                        <button key={m.id} onClick={() => setSelectedManual(m.id)} className="bg-black/40 p-5 rounded-2xl border border-slate-800 flex items-center gap-4 active:scale-95 transition-all text-left">
                            <i className={`fa-solid ${m.icon} text-emerald-500`}></i>
                            <span className="text-[10px] uppercase font-black">{m.title}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="animate-fade">
                    <button onClick={() => setSelectedManual(null)} className="mb-4 text-[9px] text-slate-500 uppercase underline">← Back to Manuals</button>
                    
                    {selectedManual === 'D01' && (
                        <div className="space-y-4 bg-black/60 p-6 rounded-3xl border border-emerald-500/20 text-[11px] leading-relaxed">
                            <h3 className="text-emerald-400 font-black uppercase text-center border-b border-slate-800 pb-2 mb-4 italic">Δ-01: ΣΚΟΠΟΣ & ΠΟΛΙΤΙΚΗ ΠΟΙΟΤΗΤΑΣ</h3>
                            <p className="text-white uppercase"><span className="text-emerald-500">•</span> ΣΚΟΠΟΣ:</p>
                            <p className="text-slate-400">Η Εταιρεία ειδικεύεται στην επιθεώρηση, δοκιμή φόρτωσης και συντήρηση μέσων καθαίρεσης σωστικών, σκαλών και ανυψωτικού εξοπλισμού[cite: 33, 71].</p>
                            
                            <p className="text-white uppercase mt-4"><span className="text-emerald-500">•</span> ΠΟΛΙΤΙΚΗ ΠΟΙΟΤΗΤΑΣ (ISO 9001:2015):</p>
                            <ul className="text-slate-400 space-y-2 list-disc pl-4">
                                <li>Παροχή υπηρεσιών σύμφωνα με τις απαιτήσεις των πελατών[cite: 72].</li>
                                <li>Συνεχής παρακολούθηση ενδιάμεσων και τελικών υπηρεσιών[cite: 74].</li>
                                <li>Συνεχής βελτίωση της αποδοτικότητας του συστήματος μέσω διορθωτικών ενεργειών[cite: 76].</li>
                                <li>Συμμόρφωση με τις ισχύουσες νομοθετικές διατάξεις[cite: 76].</li>
                            </ul>
                            
                            <div className="mt-6 p-4 bg-emerald-600/10 border border-emerald-500/30 rounded-xl text-center">
                                <p className="text-[8px] text-emerald-500 font-black uppercase tracking-widest italic">ΣΥΜΜΟΡΦΩΣΗ: 100% OPERATIONAL</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
window.M8_Academy = M8_Academy;