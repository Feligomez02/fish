const { createClient } = require('@supabase/supabase-js');

module.exports = (req, res) => {
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

    supabase
        .from('credentials')
        .insert([{ email, password }])
        .then(({ data, error }) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            res.status(200).json({ message: 'Credentials saved' });
        });
};
