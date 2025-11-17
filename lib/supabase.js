export const getSupabaseConfig = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;

  if (!url) {
    throw new Error('SUPABASE_URL no está configurado');
  }
  if (!key) {
    throw new Error('SUPABASE_KEY no está configurado');
  }

  return { url, key };
};
