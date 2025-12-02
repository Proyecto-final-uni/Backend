import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();
// Configura tu URL y clave pública de Supabase
const supabaseUrl = 'https://ekpshorptsbotbjyxmwf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrcHNob3JwdHNib3Rianl4bXdmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzcwNTAxNCwiZXhwIjoyMDc5MjgxMDE0fQ.NJ_xJuTT1kyltCJBz4gUhnXXL58HfgRUpf70m-1lqg0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function getJwt() {
  try {
    // Inicia sesión con las credenciales del usuario
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'miamo@example.com', // Reemplaza con el correo del usuario
      password: 'miPassword123', // Reemplaza con la contraseña del usuario
    });

    if (error) {
      console.error('Error logging in:', error.message);
      return;
    }

    // Muestra el JWT en la consola
    console.log('JWT:', data.session?.access_token);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

getJwt();
