/**
 * NTG - SUPABASE CONNECTION BRIDGE
 * Database: NauticalOS_V3 (omdarjncczohpfzrqqhr)
 * Status: SECURED & ACTIVE
 */

const supabaseUrl = 'https://omdarjncczohpfzrqqhr.supabase.co';
const supabaseKey = 'sb_publishable_V-nfUDy5MxEG4SlXkisFBg_GBlD_4Y9';

// Δημιουργία του συνδέσμου στο παγκόσμιο αντικείμενο window
if (window.supabase) {
    window.supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
    console.log("⚓ NTG BRIDGE: Supabase Connection Established.");
} else {
    console.error("🚨 NTG BRIDGE: Supabase Library not found!");
}
