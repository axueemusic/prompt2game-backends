const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;
const GEMINI_API_KEY = 'AIzaSyBcChrzCGrmJ0TrS_H-RnxJjt9pUSCQMKk';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;
    const systemPrompt = `You are a professional web/game developer. Generate a complete, working HTML file based on the user prompt. Include all HTML, CSS, and JavaScript inside one file. Make it clean, responsive, mobile-friendly, and visually attractive. No download or export button. Just show the code preview.`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nUser prompt: ${prompt}`
                    }]
                }]
            })
        });
        const data = await response.json();
        // Debug log
        console.log('Gemini API response:', JSON.stringify(data));
        res.json({ content: data.candidates[0].content.parts[0].text });
    } catch (err) {
        console.error('Gemini API Error:', err);
        res.status(500).json({ error: 'Failed to fetch from Gemini API' });
    }
});

app.listen(PORT, () => {
    console.log(`https://quasar-weak-ironclad.glitch.me`);
});
