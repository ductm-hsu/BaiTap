import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://yrhkhhsugheyjehazrdm.supabase.co'; // URL project
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyaGtoaHN1Z2hleWplaGF6cmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxODM2NTgsImV4cCI6MjA5MTc1OTY1OH0.JovRZOX2AM34iaoTix0yrfSlN-x6zgRI0vw5UoVmWzA'; // Anon Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);