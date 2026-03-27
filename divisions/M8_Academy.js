const { useState } = React;

const M8_Academy = () => {
    const [selected, setSelected] = useState(null);

    const manuals = [
        { id: 'D01', title: 'Δ-01: ΣΚΟΠΟΣ & ΠΟΛΙΤΙΚΗ', content: 'Η Εταιρεία ειδικεύεται στην επιθεώρηση, δοκιμή φόρτωσης και συντήρηση μέσων καθαίρεσης σωστικών, σκαλών και ανυψωτικού εξοπλισμού. Τηρεί Σύστημα Ποιότητας κατά ISO 9001:2015.' },
        { id: 'D12', title: 'Δ-12: ΕΠΙΘΕΩΡΗΣΗ ΠΛΟΙΩΝ', content: 'Ορίζει τον τρόπο σχεδίασης, υλοποίησης και παρακολούθησης των επιθεωρήσεων σκαλών και ανυψωτικών. Απαιτεί Work Report, φωτογραφίες και πιστοποιητικά.' },
        { id: 'D14', title: 'Δ-14: ΔΙΑΚΡΙΒΩΣΗ ΟΡΓΑΝΩΝ', content: 'Απαιτήσεις ετήσιας διακρίβωσης δυναμομέτρων από εξωτερικό εργαστήριο. Τήρηση ηλεκτρονικού αρχείου Ε-07.' }
    ];

    return (
        <div className="p-4 glass rounded-[2.5rem] min-h-[550px] font-bold italic animate-fade">
            <h2 className="brand text-emerald-500 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center tracking-tighter">M8: NTG ACADEMY</h2>
            {!selected ? (
                <div className="space-y-3">
                    {manuals.map(m => (
                        <button key={m.id} onClick={() => setSelected(m)} className="w-full bg-black/40 p-5 rounded-2xl border border-slate-800 flex items-center gap-4 active:scale-95 text-left">
                            <i className="fa-solid fa-book text-emerald-500 text-xs"></i>
                            <span className="text-[10px] uppercase font-black">{m.title}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="p-4 bg-black/60 rounded-3xl border border-emerald-500/20 text-[11px] leading-relaxed">
                    <button onClick={() => setSelected(null)} className="mb-4 text-[9px] text-slate-500 uppercase underline">← Back</button>
                    <h3 className="text-emerald-400 uppercase mb-4 border-b border-slate-800 pb-2 italic">{selected.title}</h3>
                    <p className="text-slate-300">{selected.content}</p>
                    <div className="mt-8 p-3 bg-emerald-600/10 border border-emerald-500/30 rounded-xl text-center">
                        <p className="text-[8px] text-emerald-500 uppercase font-black">ISO 9001:2015 COMPLIANT</p>
                    </div>
                </div>
            )}
        </div>
    );
};
window.M8_Academy = M8_Academy;
