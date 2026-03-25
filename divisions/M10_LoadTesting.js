import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Το connection object σου για τη Supabase

export default function M10LoadTesting() {
  // --- STATE MANAGEMENT ---
  const [ships, setShips] = useState([]);
  const [status, setStatus] = useState('Draft'); // 'Draft' ή 'Certified'
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [formData, setFormData] = useState({
    ship_id: '',
    equipment_type: 'Provision Crane',
    load_cell_sn: '',
    swl: '',
  });

  const [proofLoad, setProofLoad] = useState(0);

  // --- 1. INITIALIZE DATA (Fetch Ships) ---
  useEffect(() => {
    fetchShips();
  }, []);

  const fetchShips = async () => {
    const { data, error } = await supabase.from('ships').select('id, name');
    if (!error && data) setShips(data);
  };

  // --- 2. MATH ENGINE (ILO 152) ---
  const handleSwlChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, swl: value });
    
    const swlNum = parseFloat(value);
    if (!swlNum || swlNum <= 0) {
      setProofLoad(0);
      return;
    }

    // Κανόνες Proof Load
    if (swlNum <= 20) {
      setProofLoad(swlNum * 1.25); // +25%
    } else if (swlNum > 20 && swlNum <= 50) {
      setProofLoad(swlNum + 5); // +5t
    } else {
      setProofLoad(swlNum * 1.10); // +10%
    }
  };

  // --- 3. SAVE / SYNC TO SUPABASE ---
  const handleSave = async () => {
    setIsSyncing(true);
    const payload = {
      ...formData,
      proof_load: proofLoad,
      status: status,
      created_at: new Date()
    };

    const { error } = await supabase.from('load_tests').insert([payload]);
    setIsSyncing(false);
    
    if (!error) {
      alert('✅ ΔΕΔΟΜΕΝΑ ΣΥΓΧΡΟΝΙΣΤΗΚΑΝ (Offline/Online Ready)');
    } else {
      alert('⚠️ Σφάλμα αποθήκευσης.');
    }
  };

  // --- 4. DIGITAL SIGNATURE (Lock & Certify) ---
  const handleMasterSign = () => {
    const confirmSign = window.confirm("Ο Πλοίαρχος επιβεβαιώνει το Test; Το Certificate θα κλειδωθεί.");
    if (confirmSign) {
      setStatus('Certified');
      // Εδώ κανονικά ανοίγουμε ένα Canvas Modal (π.χ. react-signature-canvas)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-slate-900 text-slate-100 min-h-screen">
      
      {/* HEADER & STATUS BADGE */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-blue-400">
          M10 Load Testing
        </h1>
        <span className={`px-4 py-2 rounded-lg text-xl font-bold uppercase ${
          status === 'Certified' ? 'bg-green-600' : 'bg-yellow-500 text-slate-900'
        }`}>
          {status}
        </span>
      </div>

      <div className="space-y-6">
        {/* INPUT: SHIP NAME */}
        <div>
          <label className="block text-lg font-bold mb-2 text-slate-400">Ship Name</label>
          <select 
            className="w-full h-16 text-2xl px-4 rounded-xl bg-slate-800 border-2 border-slate-600 focus:border-blue-500 outline-none"
            value={formData.ship_id}
            onChange={(e) => setFormData({ ...formData, ship_id: e.target.value })}
          >
            <option value="">-- Επιλογή Πλοίου --</option>
            {ships.map(ship => (
              <option key={ship.id} value={ship.id}>{ship.name}</option>
            ))}
          </select>
        </div>

        {/* INPUT: EQUIPMENT & LOAD CELL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-bold mb-2 text-slate-400">Equipment</label>
            <select 
              className="w-full h-16 text-xl px-4 rounded-xl bg-slate-800 border-2 border-slate-600 focus:border-blue-500 outline-none"
              value={formData.equipment_type}
              onChange={(e) => setFormData({ ...formData, equipment_type: e.target.value })}
            >
              <option value="Provision Crane">Provision Crane</option>
              <option value="Hose Handling Crane">Hose Handling Crane</option>
              <option value="Lifeboat Davit">Lifeboat Davit</option>
              <option value="Mooring Winch">Mooring Winch (BHC)</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-bold mb-2 text-slate-400">Load Cell S/N</label>
            <input 
              type="text" 
              placeholder="π.χ. W2300327"
              className="w-full h-16 text-xl px-4 rounded-xl bg-slate-800 border-2 border-slate-600 focus:border-blue-500 outline-none"
              value={formData.load_cell_sn}
              onChange={(e) => setFormData({ ...formData, load_cell_sn: e.target.value })}
            />
          </div>
        </div>

        {/* MATH ENGINE MODULE */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-blue-900 shadow-xl mt-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-xl font-bold mb-2 text-blue-400">SWL (tonnes)</label>
              <input 
                type="number" 
                className="w-full h-20 text-4xl font-bold px-4 rounded-xl bg-slate-900 border-4 border-blue-600 outline-none text-center"
                placeholder="0.00"
                value={formData.swl}
                onChange={handleSwlChange}
                disabled={status === 'Certified'}
              />
            </div>
            <div className="flex flex-col justify-center items-center bg-slate-900 rounded-xl border-4 border-slate-700">
              <label className="text-lg font-bold text-slate-400 mt-2">Target Proof Load</label>
              <span className="text-5xl font-extrabold text-green-400 my-auto">
                {proofLoad ? `${proofLoad.toFixed(2)}t` : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* ACTIONS / GLOVE-FRIENDLY BUTTONS */}
        <div className="pt-8 space-y-4">
          {status === 'Draft' && (
            <button 
              onClick={handleMasterSign}
              className="w-full h-20 bg-blue-600 hover:bg-blue-500 text-white text-2xl font-bold uppercase rounded-2xl shadow-lg transition-colors border-4 border-blue-800"
            >
              ✍️ Capture Master's Signature
            </button>
          )}

          <button 
            onClick={handleSave}
            disabled={isSyncing}
            className="w-full h-24 bg-slate-700 hover:bg-slate-600 text-white text-3xl font-extrabold uppercase rounded-2xl shadow-lg border-4 border-slate-500 flex items-center justify-center gap-4"
          >
            {isSyncing ? 'Συγχρονισμός...' : '💾 SAVE & SYNC (OFFLINE/ONLINE)'}
          </button>
        </div>

      </div>
    </div>
  );
}
