import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }

    const { error } = await supabase
      .from('credentials')
      .insert([{ email, password }]);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json({ message: 'Credenciales guardadas' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
}
