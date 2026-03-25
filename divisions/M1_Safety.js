// NTG - M1 SHIPS' SAFETY OFFICER DASHBOARD (MVP)
const M1_Dashboard = () => {
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const checkPin = (value) => {
    if (value === "0612") setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return (
      <div className="bg-slate-900 h-screen flex flex-col items-center justify-center p-10">
        <h1 className="text-white mb-5 text-xl font-bold">SHIPS' SAFETY OFFICER</h1>
        <input 
          type="password" 
          placeholder="ENTER PIN" 
          className="text-center p-4 rounded-xl text-2xl w-full max-w-xs"
          onChange={(e) => checkPin(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-800 min-h-screen p-4 text-white font-sans">
      <header className="flex justify-between items-center mb-8 border-b border-slate-600 pb-4">
        <h2 className="text-lg font-bold">NTG - M. SYKINIOTIS</h2>
        <span className="bg-green-500 px-3 py-1 rounded-full text-xs">LIVE RADAR</span>
      </header>

      {/* HAZARD RADAR SECTION */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-slate-700 p-4 rounded-2xl border-b-4 border-green-500">
          <p className="text-xs text-slate-400">O2</p>
          <p className="text-xl font-mono">20.9%</p>
        </div>
        <div className="bg-slate-700 p-4 rounded-2xl border-b-4 border-green-500">
          <p className="text-xs text-slate-400">LEL</p>
          <p className="text-xl font-mono">0%</p>
        </div>
        <div className="bg-slate-700 p-4 rounded-2xl border-b-4 border-red-500">
          <p className="text-xs text-slate-400">H2S</p>
          <p className="text-xl font-mono">0.0</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-1 gap-6">
        <button className="bg-blue-600 h-40 rounded-3xl flex flex-col items-center justify-center shadow-2xl active:scale-95 transition-all">
          <span className="text-5xl mb-2">🔵</span>
          <span className="font-bold tracking-widest">SMART CAPTURE</span>
        </button>
        
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-slate-700 p-6 rounded-2xl flex flex-col items-center">
            <span>📝</span>
            <span className="text-xs mt-2">CHECKLIST</span>
          </button>
          <button className="bg-slate-700 p-6 rounded-2xl flex flex-col items-center">
            <span>⚓</span>
            <span className="text-xs mt-2">VESSEL INFO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
