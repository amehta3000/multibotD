import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [persona, setPersona] = useState('');
  const [personaLabel, setPersonaLabel] = useState('');
  const [messages, setMessages] = useState([]);

  // Define the personas
  const personas = [
    {
      label: 'Sassy 8yr old girl',
      value: 'You are a sassy 8 year old girl who loves to play game and make silly jokes.',
    },    
    {
      label: 'Snarky 13yr old teenage girl',
      value: 'You are a snarky 13 year old teenage girl who think adults do not know anything and that nothing is exciting.',
    },       
    {
      label: 'Platinum-selling Hip Hop Producer',
      value: 'You are a platinum-selling hip hop producer who loves to give feedback on everything.',
    },
    {
      label: 'Friendly Life Coach',
      value: 'You are a friendly life coach who offers advice and guidance in a compassionate manner.',
    },
    {
      label: 'A music nerd',
      value: 'You are a 40 something music geek who loves good grooves and highly knowledgable about music history after 1960.',
    },
     
  ];



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add the user's message to the messages array
    setMessages([...messages, { type: 'user', content: input }]);
    
    try {
      const result = await axios.post('/api/chat', { prompt: input, persona });
      // Add the bot's response to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', content: result.data.message },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', content: 'Error: Unable to get response from the API' },
      ]);
    }
  
    setInput('');    
  };

  const handlePersonaChange = (e) => {
    const selectedPersona = personas.find(p => p.value === e.target.value);
    setPersona(e.target.value);
    setPersonaLabel(selectedPersona ? selectedPersona.label : '');
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-sky-950 text-white p-4 text-md font-bold flex">
           
          <label className="text-white mr-1"> Chat with a:</label>
          <select
            value={persona}
            onChange={handlePersonaChange}
            className="border rounded-md px-2 py-1 flex-1 text-sky-950  min-w-[100px]"
          >
            <option value="">Select a persona</option>
            {personas.map((p, index) => (
              <option key={index} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>          
          {/* <input
            type="text"
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className="border rounded-md px-2 py-1 text-sky-950 flex-1 min-w-[100px] text-sm font-normal border bg-gray-200"
            placeholder="As an optimistic AI"
          /> */}
        
      </header>
      <div className="flex-1 p-4 overflow-auto space-y-4 pb-24">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.type === 'user' ? 'bg-blue-200' : 'bg-gray-200'
            } px-4 py-2 my-2 rounded-md w-fit max-w-[80%]`}
          >
            <div className="font-bold text-sm text-sky-950">{
              message.type === 'user' ? 'You' : personaLabel || '🤖 PTC-GPT'}</div>
            <pre className="m-0 text-sm" style={{ whiteSpace: 'pre-wrap' }}>{message.content}</pre>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-200 p-4 flex fixed inset-x-0 bottom-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-md px-2 py-1"
          placeholder="What do you wanna chat about?"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 ml-2 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );  

}
