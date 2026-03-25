const { useState, useEffect } = React;

const M10LoadTesting = ({ setView }) => {
    const [swl, setSwl] = useState('');
    const [proofLoad, setProofLoad] = useState(0);
    const [status, setStatus] = useState('Draft');

    const calculateLoad = (val) => {
        const num = parseFloat(val);
        if (!num) return 0;
        // ILO 152 Math: SWL * 1.25 for <= 20t
        return num <= 20 ? (num * 1.25).toFixed(2) : (num + 5).toFixed(2);
    };

    const handleSwlChange = (e) => {
        setSwl(e.target.value);
        setProofLoad(calculateLoad(e.target.value));
    };

    return (
        <div className="p-4 bg-slate-900 rounded-[2rem] border border-slate-800">
            <h2 className="brand text-orange-500 text-lg mb-6 border-b border-slate-700 pb-2 uppercase">M10 Load Testing</h2>
            
            <div className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Safe Working Load (t)</label>
                    <input type="number" value={swl} onChange={handleSwlChange}
                           className="w-full bg-slate-950 h-20 text-4xl font-bold rounded-2xl border-2 border-blue-600 text-center outline-none focus:border-orange-500"
                           placeholder="0.00" />
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border-4 border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400 uppercase mb-1">Target Proof Load</p>
                    <p className="text-5xl font-black text-green-400 font-mono">{proofLoad}t</p>
                </div>

                <button className="w-full bg-slate-700 h-20 rounded-2xl brand font-black text-white text-xs tracking-widest active:scale-95 transition-all">
                    💾 SAVE TO CLOUD
                </button>
            </div>
        </div>
    );
};

window.M10LoadTesting = M10LoadTesting;
