'use client';

import React, { useState, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export const AIConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Welcome to the Stadium! I'm your AI Concierge. How can I help you navigate today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        gsap.fromTo(chatRef.current,
          { scale: 0.8, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
        );
      }, 0);
    } else {
      gsap.to(chatRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => setIsOpen(false)
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await resp.json();
      
      setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting to the stadium network. Please try again." }]);
    } finally {
      setIsTyping(false);
      // Auto scroll
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div 
          ref={chatRef}
          className="glass-card mb-4 w-[320px] h-[450px] flex flex-col overflow-hidden origin-bottom-right"
        >
          {/* Header */}
          <div className="bg-cyan-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <span className="font-bold">AI Concierge</span>
            </div>
            <button onClick={toggleChat} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`${
                  m.role === 'ai' 
                    ? 'bg-cyan-50 text-cyan-950 rounded-tl-none mr-8' 
                    : 'bg-cyan-600 text-white rounded-tr-none ml-8'
                } p-3 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-300`}
                dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            ))}
            {isTyping && (
              <div className="bg-cyan-50 text-cyan-950 rounded-2xl rounded-tl-none p-3 text-sm mr-8 w-12 flex justify-center">
                <Loader2 className="animate-spin text-cyan-600" size={18} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-cyan-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-cyan-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <button 
              onClick={handleSend}
              aria-label="Send message"
              className="bg-cyan-600 text-white p-2 rounded-xl hover:bg-cyan-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-white text-cyan-600' : 'bg-cyan-600 text-white'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </button>
    </div>
  );
};
