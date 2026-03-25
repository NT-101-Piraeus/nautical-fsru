import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://omdarjncczohpfzrqqhr.supabase.co'
const supabaseAnonKey = 'sb_publishable_V-nfUDy5MxEG4SlXkisFBg_GBlD_4Y9'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
