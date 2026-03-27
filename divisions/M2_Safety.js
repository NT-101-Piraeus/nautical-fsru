// Πρόσθεσε αυτό το State στο M1_Safety.js
const [aiResult, setAiResult] = useState(null);
const [isAnalyzing, setIsAnalyzing] = useState(false);

const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    // Εδώ ο Coder θα βάλει το πραγματικό fetch('https://api.gemini.com/...')
    // Για τώρα, προσομοιώνουμε την απάντηση:
    setTimeout(() => {
        setAiResult({
            header: "⚠️ HAZARD ALERT (Π.Δ. 70/90 - Άρθρα 13 & 15)",
            body: "GAS-FREE: Απαιτείται πιστοποιητικό. O2: 19.5%-22.5%. FIRE SAFETY: Απαιτείται πυροσβεστήρας σε άμεση ετοιμότητα.",
            action: "WAIT"
        });
        setIsAnalyzing(false);
    }, 2000);
};

// Και στο JSX, πάνω από τα κουμπιά δράσης:
{aiResult && (
    <div className={`p-4 rounded-2xl border-2 mb-4 animate-bounce-short ${aiResult.action === 'WAIT' ? 'bg-red-600/10 border-red-500' : 'bg-emerald-600/10 border-emerald-500'}`}>
        <p className="text-[9px] font-black uppercase text-red-500 mb-1">{aiResult.header}</p>
        <p className="text-[8px] leading-tight opacity-90 italic">{aiResult.body}</p>
    </div>
)}
