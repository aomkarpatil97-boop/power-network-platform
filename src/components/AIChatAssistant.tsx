
import React, { useState, useRef, useEffect } from 'react';
// Added MapPin and ExternalLink to imports for grounding display
import { Send, Sparkles, X, User, Bot, Loader2, MapPin, ExternalLink } from 'lucide-react';
import { getSmartRecommendation } from '../services/geminiService';

const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Updated messages state to include grounding chunks
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string, grounding?: any[]}[]>([
    { role: 'assistant', text: "Hello! I'm your powerNest AI assistant. How can I help you today? I can find chargers, explain EV maintenance, or help you book a service." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    // Get user location if available
    let location = undefined;
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));
      location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    } catch (e) {
      console.log("Location not available for AI context");
    }

    const response = await getSmartRecommendation(userMsg, location);
    // Store both text and grounding metadata in the state
    setMessages(prev => [...prev, { role: 'assistant', text: response.text, grounding: response.grounding }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-h-[600px] h-[calc(100vh-120px)] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col z-50 animate-in slide-in-from-bottom-8 duration-300">
          <header className="p-4 border-b flex justify-between items-center bg-slate-900 rounded-t-3xl text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="font-bold font-display">powerNest AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-slate-800 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-emerald-600" /> : <Bot className="w-4 h-4 text-slate-600" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-emerald-500 text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                    {msg.text}
                    {/* Render grounding chunks as links if they exist, as required by the Gemini guidelines */}
                    {msg.grounding && msg.grounding.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-300/30 space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Verified Sources & Locations:</p>
                        <div className="flex flex-col gap-1">
                          {msg.grounding.map((chunk, idx) => {
                            if (chunk.maps) {
                              return (
                                <a 
                                  key={idx} 
                                  href={chunk.maps.uri} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                                >
                                  <MapPin className="w-3 h-3" /> {chunk.maps.title || 'View on Maps'}
                                </a>
                              );
                            }
                            if (chunk.web) {
                              return (
                                <a 
                                  key={idx} 
                                  href={chunk.web.uri} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                                >
                                  <ExternalLink className="w-3 h-3" /> {chunk.web.title || 'Source'}
                                </a>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask about range, chargers, or repairs..."
                className="flex-1 px-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-slate-900 text-white p-2 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;