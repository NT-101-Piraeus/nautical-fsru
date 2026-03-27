const { useState } = React;

const M8_Academy = () => {
    const [selectedManual, setSelectedManual] = useState(null);

    const manuals = [
        { 
            id: 'D01', 
            title: 'Δ-01: ΣΚΟΠΟΣ & ΠΟΛΙΤΙΚΗ', 
            icon: 'fa-handshake',
            content: {
                scope: "Επιθεώρηση, δοκιμή φόρτωσης και συντήρηση εξοπλισμού καθαίρεσης σωστικών μέσων, σκαλών επιβίβασης, βαρούλκων και ανυψωτικού εξοπλισμού.",
                policy: [
                    "Παροχή υπηρεσιών σύμφωνα με τις απαιτήσεις των πελατών.",
                    "Τήρηση Ολοκληρωμένου Συστήματος Διαχείρισης Ποιότητας κατά ISO 9001:2015.",
                    "Συνεχής βελτίωση μέσω διορθωτικών ενεργειών.",
                    "Συμμόρφωση με την ισχύουσα νομοθεσία."
                ]
            }
        },
        { 
            id: 'D02', 
            title: 'Δ-02: ΟΡΓΑΝΩΣΗ ΕΤΑΙΡΕΙΑΣ', 
            icon: 'fa-sitemap',
            content: {
                roles: [
                    { role: "ΓΕΝΙΚΟΣ ΔΙΕΥΘΥΝΤΗΣ", name: "ΜΑΤΘΑΙΟΣ ΣΥΚΙΝΙΩΤΗΣ" },
                    { role: "ΥΠΕΥΘΥΝΟΣ ΠΟΙΟΤΗΤΑΣ", name: "ΜΑΤΘΑΙΟΣ ΣΥΚΙΝΙΩΤΗΣ" },
                    { role: "ΤΕΧΝΙΚΟΣ ΔΙΕΥΘΥΝΤΗΣ", name: "ΜΑΤΘΑΙΟΣ ΣΥΚΙΝΙΩΤΗΣ" },
                    { role: "ΓΡΑΜΜΑΤΕΙΑ", name: "ΠΗΓΗ ΣΥΚΙΝΙΩΤΗ" }
                ],
                structure: "Η επάνδρωση των θέσεων ορίζεται από τον Διευθυντή αναλόγως του όγκου εργασιών."
            }
        },
        { 
            id: 'D03', 
            title: 'Δ-03: ΔΙΑΧΕΙΡΙΣΗ ΠΡΟΣΩΠΙΚΟΥ', 
            icon: 'fa-user-tie',
            content: {
                training: "Αναγνώριση αναγκών εκπαίδευσης στην αρχή κάθε ημερολογιακού έτους.",
                evaluation: "Αξιολόγηση όλου του μόνιμου προσωπικού τουλάχιστον μία φορά ετησίως βάσει του εντύπου Ε-10.",
                criteria: ["Ποιότητα εργασίας", "Αξιοπιστία", "Προσαρμοστικότητα", "Συνεργασία"]
            }
        }
    ];

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[600px] font-bold italic animate-fade">
            <h2 className="brand text-emerald-500 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center italic tracking-tighter">
                M8: NAFTOTRADE ACADEMY
            </h2>

            {!selectedManual ? (
                <div className="grid grid-cols-1 gap-3">
                    {manuals.map(m => (
                        <button key={m.id} onClick={() => setSelectedManual(m)} className="bg-black/40 p-5 rounded-2xl border border-slate-800 flex items-center justify-between active:scale-95 transition-all text-left">
                            <div className="flex items-center gap-4">
                                <i className={`fa-solid ${m.icon} text-emerald-500`}></i>
                                <span className="text-[10px] uppercase font-black">{m.title}</span>
                            </div>
                            <i className="fa-solid fa-chevron-right text-[8px] text-slate-600"></i>
                        </button>
                    ))}
                    <div className="mt-10 p-6 bg-emerald-600/5 border border-dashed border-emerald-500/20 rounded-3xl text-center">
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest leading-relaxed">
                            Πλήρης συμμόρφωση με ISO 9001:2015 <br/> Nautical Technology E.E. Knowledge Base
                        </p>
                    </div>
                </div>
            ) : (
                <div className="animate-fade">
                    <button onClick={() => setSelectedManual(null)} className="mb-6 text-[9px] text-slate-500 uppercase underline italic font-black">← Back to Manuals</button>
                    
                    <div className="bg-black/60 p-6 rounded-[2rem] border border-emerald-500/20 shadow-inner">
                        <h3 className="text-emerald-400 font-black uppercase text-center border-b border-slate-800 pb-3 mb-5 italic tracking-tight">
                            {selectedManual.title}
                        </h3>

                        {selectedManual.id === 'D01' && (
                            <div className="space-y-4 text-[10px] leading-relaxed">
                                <p className="text-white uppercase"><span className="text-emerald-500 mr-2">/</span> Σκοπός:</p>
                                <p className="text-slate-400 font-medium">{selectedManual.content.scope}</p>
                                <p className="text-white uppercase mt-4"><span className="text-emerald-500 mr-2">/</span> Πολιτική Ποιότητας:</p>
                                <ul className="space-y-2">
                                    {selectedManual.content.policy.map((p, i) => (
                                        <li key={i} className="flex gap-2 text-slate-400"><i className="fa-solid fa-check text-emerald-600 mt-1"></i> {p}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {selectedManual.id === 'D02' && (
                            <div className="space-y-4 text-[10px] leading-relaxed">
                                <p className="text-white uppercase mb-3"><span className="text-emerald-500 mr-2">/</span> Οργανόγραμμα:</p>
                                {selectedManual.content.roles.map((r, i) => (
                                    <div key={i} className="flex justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-800 mb-2">
                                        <span className="text-slate-500 text-[8px] uppercase">{r.role}</span>
                                        <span className="text-emerald-400 text-[9px] font-black">{r.name}</span>
                                    </div>
                                ))}
                                <p className="text-slate-500 text-[8px] mt-4 italic italic">{selectedManual.content.structure}</p>
                            </div>
                        )}

                        {selectedManual.id === 'D03' && (
                            <div className="space-y-4 text-[10px] leading-relaxed">
                                <p className="text-white uppercase"><span className="text-emerald-500 mr-2">/</span> Εκπαίδευση:</p>
                                <p className="text-slate-400 font-medium">{selectedManual.content.training}</p>
                                <p className="text-white uppercase mt-4"><span className="text-emerald-500 mr-2">/</span> Κριτήρια Αξιολόγησης (Ε-10):</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedManual.content.criteria.map((c, i) => (
                                        <span key={i} className="px-3 py-1 bg-emerald-600/10 border border-emerald-600/30 rounded-full text-[8px] text-emerald-400 uppercase">{c}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
window.M8_Academy = M8_Academy;
