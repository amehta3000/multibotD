import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const { prompt } = req.body;
    const { prompt, persona } = req.body;
    // const persona = "As an optimistic and helpful AI, ";
    // const persona = "As a sassy 8 year girl, "
    // const persona = "As a snarky 13 year old teenage girl, ";
    // const persona = "As a platinum-selling hip-hop producer who loves to give feedback on everything, ";
    // const persona = "As an knowledgable music DJ who loves all music with good grooves and vibes, ";
    // const persona = "As an overly caring woke father figure who love to dole out random advice, ";    



    const chatGPTResponse = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        // prompt: `${persona}${prompt}`,
        prompt: `${persona ? `${persona}. ` : ''}${prompt}`,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.8,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    const message = chatGPTResponse.data.choices[0].text.trim();
    res.status(200).json({ message });
  } else {
    res.status(405).json({ message: 'Method not supported' });
  }
}
