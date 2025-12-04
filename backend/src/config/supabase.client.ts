import * as dotenv from 'dotenv';
dotenv.config();

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey,{
    auth:{
        persistSession:false,
        autoRefreshToken:false,
        detectSessionInUrl:false,
    }
});


//codigo para crear clientes por token 
export function createSupabaseClientForToken(token?: string): SupabaseClient {
  const client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    }
  });
  
  return client;
}

