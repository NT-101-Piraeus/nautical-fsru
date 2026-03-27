const { useState } = React;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');
    const [pin, setPin] = useState('');
    const [view, setView] = useState('HOME');

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') { setRole('DIRECTOR'); setIsAuthenticated(true); }
        else if (pin === '0612') { setRole('WORKER'); setIsAuthenticated(true); }
        else { alert('ACCESS DENIED'); setPin(''); }
    };

    const tiles = [
        { id: 'M1', name: 'UTM', icon: 'fa-layer-group', color: 'border-slate-500' },
        { id: 'M2', name: 'SAFETY WATCH', icon: 'fa-shield-halved', color: 'border-blue-600' },
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

    const renderView = () => {
        // Αυτό το αντικείμενο χαρτογραφεί τα IDs με τα window components
        const components = {
            M1: window.M1_UTM,
            M2: window.M2_Safety,
            M3: window.M3_LoadTesting,
            M4: window.M4_Scout,
            M5: window.M5_Intel,
            M6: window.M6_CEO_Pulse,
            M7: window.M7_XGR,
            M8: window.M8_Academy,
            M9: window.M9_Operations,
            M10: window.M10_Architecture,
            M11: window.M11_Sensors,
            M12: window.M12_StaffHub,
            M13: window.
