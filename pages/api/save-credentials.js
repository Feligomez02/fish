import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from '../../lib/supabase';

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { email, password } = req.body;

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }

    // Obtener configuración de Supabase
    const { url, key } = getSupabaseConfig();
    const supabase = createClient(url, key);

    // Insertar en base de datos
    const { data, error } = await supabase
      .from('credentials')
      .insert([{ email, password }]);

    if (error) {
      console.error('Error de Supabase:', error);
      return res.status(500).json({ message: `Error: ${error.message}` });
    }

    return res.status(200).json({ message: 'Credenciales guardadas exitosamente' });

  } catch (error) {
    console.error('Error en API:', error);
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
}
