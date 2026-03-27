<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>M2: Safety Watch</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-950 text-white">
    <div id="root"></div>

    <script type="text/babel">
        const { useState } = React;

        const SafetyApp = () => {
            // Εδώ μπαίνει όλος ο κώδικας του Safety που φτιάξαμε (Joblist, Sun Mode κλπ)
            return (
                <div className="p-6">
                    <a href="index.html" className="text-[10px] uppercase underline text-slate-500">← Back to Hub</a>
                    <h1 className="text-blue-500 text-xl font-black italic mt-4">M2: SAFETY WATCH</h1>
                    <p className="mt-10 text-slate-400 italic">SYSTEM READY FOR INSPECTION</p>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<SafetyApp />);
    </script>
</body>
</html>
