M10 OPERATIONAL MANUAL (PRO VERSION): LOAD TESTING GUIDE
🎯 PHASE 1: ΠΡΩΤΟΚΟΛΛΟ ΑΣΦΑΛΕΙΑΣ (PRE-LIFT CHECKS)
Προς Coder: Αυτό πρέπει να είναι μια Check-list στην οθόνη με μεγάλα Toggles (Yes/No) πριν ξεκλειδώσει το κουμπί "START TEST".

Πριν την ανύψωση (Structural & Visual Inspection):

Wire Ropes: Έλεγχος για σπασμένα νήματα, τσακίσματα (kinks), διάβρωση ή μειωμένη διάμετρο.

Brakes Condition: Έλεγχος στα τακάκια (brake linings), springs και pins. Καμία διαρροή λαδιού (hydraulic leaks) κοντά στα φρένα.

Structural Points: Έλεγχος σε Sheaves (τροχαλίες), Blocks, Hook (χωρίς ρωγμές/παραμορφώσεις) και ασφάλεια γάντζου (safety latch).

Limit Switches: Δοκιμή (χωρίς φορτίο) των upper/lower limit switches.

⚠️ CLEAR THE AREA: Κορδέλες ασφαλείας, απομάκρυνση πληρώματος, radio check με τον χειριστή του γερανού/βιντσιού.

📡 PHASE 2: ΣΤΗΣΙΜΟ ΕΞΟΠΛΙΣΜΟΥ & M10 APP SYNC
Προς Coder: Εδώ το app μπαίνει σε "Pairing Mode" για να συνδεθεί με την κυψέλη μέσω Bluetooth/Wi-Fi. Πρέπει να δείχνει ένα μεγάλο Real-Time νούμερο (Live Load).

Rigging: Τοποθετούμε το Load Cell ανάμεσα στο γάντζο του γερανού/davit και τον κρίκο του Water Bag (Shackle ➡️ Load Cell ➡️ Shackle ➡️ Waterbag).

App Sync: Ανοίγουμε το M10 App, πατάμε [ SCAN LOAD CELL ].

Tare (Μηδενισμός): Με άδεια τα μπαλόνια (water bags) αλλά κρεμασμένα, πατάμε το κουμπί [ TARE / ZERO ] στο tablet για να αφαιρεθεί το απόβαρο του εξοπλισμού.

Water Hoses: Συνδέουμε τις μάνικες πυρόσβεσης για την πλήρωση.

🏗️ PHASE 3: PROVISION CRANES LOAD TEST (ILO 152 / Class)
Κανόνας (έως 20t SWL): Proof Load = SWL + 25% (SWL x 1.25)

Προς Coder: Η οθόνη εδώ πρέπει να έχει Progress Bar (25% - 50% - 100% - 125%) και ένα τεράστιο κουμπί [ LOG LOAD ].

Step 1 (25% SWL): Γεμίζουμε νερό μέχρι το 25%. Σηκώνουμε ελαφρώς. Ελέγχουμε την ισορροπία του water bag.

Step 2 (50% SWL): Γεμίζουμε στο 50%. Πατάμε [ LOG LOAD ].

Step 3 (100% SWL): Φτάνουμε στο 100% (Ονομαστικό Φορτίο). Κάνουμε ανύψωση (hoist), κατέβασμα (lower) και έλεγχο φρένων (abrupt stop). Πατάμε [ LOG LOAD ].

Step 4 (125% PROOF LOAD): Γεμίζουμε μέχρι το SWL + 25% (π.χ. SWL 5.0t ➡️ Water 6.25t).

Εκτελούμε κινήσεις (Hoisting, Luffing, Slewing) σε Creep Speed (πολύ αργή ταχύτητα).

Φρενάρουμε και κρατάμε το φορτίο στον αέρα. Μετράμε 5 λεπτά. Καμία πτώση ή ολίσθηση φρένου δεν επιτρέπεται.

Step 5: Αδειάζουμε το νερό, πατάμε [ TEST PASSED ] στο App.

🚤 PHASE 4: LIFEBOAT DAVITS LOAD TEST (SOLAS)
Κανόνας 5-Yearly (Dynamic Test): Proof Load = 110% (1.1x) του συνολικού βάρους (Σκάφος + Εξοπλισμός + Άτομα).

Step 1 (50% Load): Γεμίζουμε τα βαρίδια (ή τα ειδικά waterbags μέσα στο σκάφος).

Step 2 (100% Load): Φτάνουμε το κανονικό βάρος. Ελέγχουμε την τάση στα συρματόσχοινα.

Step 3 (110% PROOF LOAD): Προσθέτουμε το +10% Overload.

Step 4 (Dynamic Brake Test): * Χαμηλώνουμε το σκάφος (Lowering) με ταχύτητα.

Κάνουμε Απότομο Φρενάρισμα (Abrupt Stop).

Check: Το φρένο πρέπει να συγκρατήσει το overload των 110% χωρίς να γλιστρήσει (slippage) και τα Davit arms / wire ropes να μην εμφανίσουν δομική παραμόρφωση.

Step 5: Πατάμε [ LOG LOAD ] στο 1.1x και [ TEST PASSED ].

📝 PHASE 5: COMPLIANCE & AUTO-REPORTING
Προς Coder: Μόλις πατηθεί το "TEST PASSED", το σύστημα (μέσω Supabase) δημιουργεί αυτόματα το PDF.

Το App τραβάει το Applied Load από το Bluetooth.

Εφαρμόζει την υπογραφή (M. SYKINIOTIS / Nautical Technology).

Επικαλείται αυτόματα τη νομοθεσία (π.χ. ILO 152 Form 1944 για Cranes ή SOLAS III & MSC.402(96) για Davits).

Σώζει στο Local Cache (λόγω κακού σήματος στο πλοίο) και κάνει Sync στο Cloud μόλις βρει 4G/Wi-Fi.
