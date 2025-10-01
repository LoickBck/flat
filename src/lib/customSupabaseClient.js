import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ntnrbnlktjfrchrpkjgx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50bnJibmxrdGpmcmNocnBramd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjQ4OTYsImV4cCI6MjA3MzE0MDg5Nn0.xugh-drskWdcma0zO88AImBJkqtgbOqp6zGO61NoApU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);