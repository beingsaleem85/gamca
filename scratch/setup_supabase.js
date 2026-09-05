const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rpfiqafujijlzfhnqfaq.supabase.co';
const supabaseKey = 'sb_publishable_Fmgcs5QBybeWgD4EZejgFQ_kkhDXGL_';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log("Testing Supabase connection to:", supabaseUrl);
    const { data, error } = await supabase.from('medical_token_requests').select('id').limit(1);
    
    if (error) {
      console.log("Table response:", error);
    } else {
      console.log("Supabase table 'medical_token_requests' is READY and accessible!");
    }
  } catch (err) {
    console.error("Error connecting to Supabase:", err);
  }
}

testConnection();
