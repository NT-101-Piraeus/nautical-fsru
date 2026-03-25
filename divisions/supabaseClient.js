-- 1. ΠΙΝΑΚΑΣ ΠΛΟΙΩΝ (SHIPS' ARRIVALS)
CREATE TABLE IF NOT EXISTS ships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    imo TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    vessel_type TEXT,
    owner TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ΠΙΝΑΚΑΣ ΑΣΦΑΛΕΙΑΣ (SHIPS' SAFETY OFFICER)
CREATE TABLE IF NOT EXISTS safety_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ship_id UUID REFERENCES ships(id),
    technician_name TEXT DEFAULT 'M. SYKINIOTIS',
    check_type TEXT,
    findings JSONB,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ΠΙΝΑΚΑΣ LOAD TESTING (M10) - ΜΕ ΟΛΕΣ ΤΙΣ ΣΤΗΛΕΣ
CREATE TABLE IF NOT EXISTS load_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ship_id UUID REFERENCES ships(id),
    equipment TEXT,
    equipment_type TEXT, -- Προσθήκη για Provision/Davit κλπ [cite: 17, 28]
    load_cell_sn TEXT,   -- Προσθήκη για το Serial Number [cite: 13]
    swl NUMERIC,         -- Safe Working Load [cite: 18]
    proof_load NUMERIC,  -- Υπολογισμένο Proof Load [cite: 18, 24]
    status TEXT DEFAULT 'Draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. EMERGENCY UPDATE (Σε περίπτωση που οι πίνακες προϋπήρχαν)
ALTER TABLE load_tests ADD COLUMN IF NOT EXISTS load_cell_sn TEXT;
ALTER TABLE load_tests ADD COLUMN IF NOT EXISTS equipment_type TEXT;

-- 5. ΕΝΕΡΓΟΠΟΙΗΣΗ SECURITY (RLS)
ALTER TABLE ships ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE load_tests ENABLE ROW LEVEL SECURITY;

-- 6. ΠΟΛΙΤΙΚΕΣ ΠΡΟΣΒΑΣΗΣ (Authenticated Only)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Full Access for Authenticated Users') THEN
        CREATE POLICY "Full Access for Authenticated Users" ON ships FOR ALL TO authenticated USING (true);
        CREATE POLICY "Full Access for Authenticated Users" ON safety_logs FOR ALL TO authenticated USING (true);
        CREATE POLICY "Full Access for Authenticated Users" ON load_tests FOR ALL TO authenticated USING (true);
    END IF;
END $$;
