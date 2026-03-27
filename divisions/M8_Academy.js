const { useState } = React;

const M8_Academy = () => {
    const [selected, setSelected] = useState(null);

    const manuals = [
        { 
            id: 'D01', title: 'Δ-01: ΣΚΟΠΟΣ & ΠΟΛΙΤΙΚΗ', icon: 'fa-handshake',
            text: "Η Nautical Technology Ε.Ε. δεσμεύεται για παροχή υπηρεσιών υψηλής ποιότητας (UTM, Load Test, Τ.Α. Πλοίων) με βάση το ISO 9001:2015. Στόχος είναι η μηδενική αστοχία και η πλήρης ικανοποίηση του πελάτη."
        },
        { 
            id: 'D03', title: 'Δ-03: ΔΙΑΧΕΙΡΙΣΗ ΠΡΟΣΩΠΙΚΟΥ', icon: 'fa-user-gear',
            text: "Κάθε εργαζόμενος αξιολογείται ετησίως (Έντυπο Ε-10). Η εκπαίδευση είναι συνεχής και αφορά νέες τεχνολογίες μετρήσεων και κανονισμούς ασφαλείας."
        },
        { 
            id: 'D12', title: 'Δ-12: ΕΠΙΘΕΩΡΗΣΗ ΕΞΟΠΛΙΣΜΟΥ', icon: 'fa-ship',
            text: "Κρίσιμη διαδικασία για σκάλες και ανυψωτικά. Απαιτείται: 1. Οπτικός έλεγχος, 2. Δοκιμή υπό φορτίο (αν απαιτείται), 3. Work Report (CERT 11), 4. Φωτογραφική τεκμηρίωση."
        },
        { 
            id: 'D14', title: 'Δ-14: ΔΙΑΚΡΙΒΩΣΗ ΟΡΓΑΝΩΝ', icon: 'fa-compass',
            text: "Όλα τα όργανα μετρήσεων (UTM, Load Cells) πρέπει να διακριβώνονται ετησίως. Τα πιστοποιητικά τηρούνται στο ηλεκτρονικό αρχείο Ε-07."
        }
    ];

    return (
        <div className="p-4 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl min-h-[600px] font-bold italic animate-fade">
            <h2 className="brand text-emerald-500 text-lg mb-6 border-b border-slate-700 pb-2 uppercase text-center tracking-tighter">M8: NAFTOTRADE ACADEMY</h2>
            
            {!selected ? (
                <div className="space-y-3">
                    {manuals.map(m => (
                        <button key={m.id} onClick={() => setSelected(m)} className="w-full bg-black/40 p-5 rounded-2xl border border-slate-800 flex items-center gap-4 active:scale-95 text-left">
                            <i className={`fa-solid ${m.icon} text-emerald-500`}></i>
                            <span className="text-[10px] uppercase font-black">{m.title}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="p-4 bg-black/60 rounded-3xl border border-emerald-500/20 text-[11px] leading-relaxed">
                    <button onClick={() => setSelected(null)} className="mb-4 text-[9px] text-slate-500 uppercase underline">← Back</button>
                    <h3 className="text-emerald-400 uppercase mb-4 border-b border-slate-800 pb-2 italic">{selected.title}</h3>
                    <p className="text-slate-300 italic">{selected.text}</p>
                    <div className="mt-10 p-4 bg-emerald-600/10 border border-emerald-500/30 rounded-xl text-center">
                        <p className="text-[8px] text-emerald-500 uppercase font-black">Authorized by Director</p>
                    </div>
                </div>
            )}
        </div>
    );
};
window.M8_Academy = M8_Academy;
