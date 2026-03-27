const { useState } = React;

const M2_Safety = ({ userRole }) => {
    const [activeVessel, setActiveVessel] = useState(null);
    const [sunMode, setSunMode] = useState(false);
    const [tempArea, setTempArea] = useState('');
    const [tempWorkType, setTempWorkType] = useState('');
    const [dailyTasks, setDailyTasks] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [aiResult, setAiResult] = useState(null);

    const jobs = [
        { id: 1, vessel: "FELIX", duration: "4h", status: "PENDING" },
        { id: 2, vessel: "BADJI MOKHTAR III", duration: "2h", status: "PENDING" }
    ];

    const workRequirements = {
        "Hot Works": ["Fire Safety Standby", "Gas-Free Cert", "Fire Blanket"],
        "Confined Space": ["Gas-Free Check", "Standby Person", "Entrance Log"],
        "Working at Height": ["Safety Harness", "Fall Arrester"],
        "Lifting": ["Gear Cert", "Area Clear", "SWL Verified"]
    };

    const addTask = () => {
        if (!tempArea || !tempWorkType) return;
        setDailyTasks([...dailyTasks, { id: Date.now(), area: tempArea, type: tempWorkType, checks: {}, note: '' }]);
        setTempArea(''); setTempWorkType('');
    };

    const runAI = () => {
        setAiResult({
            header: "⚠️ HAZARD ALERT (Π.Δ. 70/90)",
            body: "HOT WORKS IN PUMP ROOM: Απαιτείται Gas-Free και συνεχή επιτήρηση. O2: 19.5%-22.5%.",
            action: "WAIT"
        });
    };

    const themeClass = sunMode ? "bg-white text-black" : "bg-slate-900 text-white border-slate-800";
    const cardClass = sunMode ? "bg-slate-100 border-slate-300" : "bg-black/40 border-slate-800";

    if (activeVessel) return (
        <div className={`p-4 rounded-[2.5rem] border shadow-2xl min-h-[600px] animate-fade font-bold italic ${themeClass}`}>
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => setActiveVessel(null)} className="text-[9px] uppercase underline italic">← Back</button>
                <button onClick={() => setSunMode(!sunMode)} className="p-2 rounded-full border border-slate-700 bg-slate-800">
                    <i className={`fa-solid ${sunMode ? 'fa-moon' : 'fa-sun text-yellow-500'}`}></i>
                </button>
            </div>

            <h3 className="text-center text-blue-500 uppercase brand mb-6">{activeVessel.vessel} - DAILY JOBLIST</h3>

            {/* BUILDER */}
            <div className={`p-4 rounded-3xl border-2 border-dashed mb-6 ${sunMode ? 'border-slate-3
