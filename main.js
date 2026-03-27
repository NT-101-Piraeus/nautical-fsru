const { useState } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(''); // DIRECTOR or WORKER
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');

    const handleLogin = (e) => {
        e.preventDefault();
        // ΔΙΟΡΘΩΜΕΝΟ MAPPING
        if (pin === '1234') {
            setRole('DIRECTOR'); // FULL ACCESS
            setIsAuthenticated(true);
        } else if (pin === '0612') {
            setRole('WORKER');   // EMPLOYEE ACCESS
            setIsAuthenticated(true);
        } else {
            alert('ACCESS DENIED - SECURITY BREACH LOGGED');
            setPin('');
        }
    };

    const tiles = [
        { id: 'M1', name: 'UTM', icon: 'fa-layer-group', color: 'border-slate-500' },
        { id: 'M2', name: 'Τ.Α. ΠΛΟΙΩΝ', icon: 'fa-shield-halved', color: 'border-blue-600' },
        { id: 'M3', name: 'LOAD TESTING', icon: 'fa-weight-hanging', color: 'border-orange-600' },
        { id: 'M4', name: 'ARRIVALS', icon: 'fa-radar', color: 'border-cyan-600' },
        { id: 'M5', name: 'WAR ROOM', icon: 'fa-gavel', color: 'border-red-600' },
        { id: 'M6', name: 'CEO PULSE', icon: 'fa-chart-line', color: 'border-purple-600' },
        { id: 'M7', name: 'XGR STARTUP', icon: 'fa-rocket', color: 'border-yellow-500' },
        { id: 'M8', name: 'ACADEMY', icon: 'fa-graduation-cap', color: 'border-emerald-600' },
        { id: 'M9', name: 'OPS & QUALITY', icon: 'fa-clipboard-check', color: 'border-indigo-500' },
        { id: 'M10', name: 'ARCHITECTURE', icon: 'fa-microchip', color: 'border-indigo-400' },
        { id: 'M11', name: 'SENSORS', icon: 'fa-satellite-dish', color: 'border-pink-600' },
        { id: 'M12', name: 'STAFF HUB', icon: 'fa-users', color: 'border-blue-400' },
        { id: 'M13', name: 'MYKONOS', icon: 'fa-house-chimney', color: 'border-blue-300' }
    ];

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center p-6 bg-slate-950 font-bold italic">
                <form onSubmit={handleLogin} className="glass p-10 rounded-[3.5rem] w-full max-w-sm text-center">
                    <h1 className="brand text-xl text-white mb-8 uppercase tracking-widest">NTG COMMAND v3</h1>
                    <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                           className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl text-center text-3xl mb-6 text-white outline-none"
                           placeholder="PIN" maxLength="4" autoFocus />
                    <button type="submit" className="w-
