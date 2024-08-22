import {createClient} from '@supabase/supabase-js';
const URL = 'https://lijwperphjlhfbbejzzr.supabase.co/'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpandwZXJwaGpsaGZiYmVqenpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyNjkxODQsImV4cCI6MjAzOTg0NTE4NH0.SVvgJ6g2fwtxvZ9j78q_xJee1MPd5XkIZ19PnfpolBk';
export const supabase = createClient(URL,API_KEY);