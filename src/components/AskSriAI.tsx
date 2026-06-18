import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, X, Terminal, HelpCircle, Activity, ArrowRight } from "lucide-react";

interface Message {
  sender: "user" | "twin";
  text: string;
}

export default function AskSriAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "twin",
      text: "Clearance Level: Guest verified. Welcome to Srirangapprasath's personal Cognitive Proxy Core. I am Sri's Digital Twin. Ask me about **PhytoScan**, **VAASOL**, **NeuroSync**, my skills stack, or learning roadmap! What system shall we declassify?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Tell me about PhytoScan",
    "What technologies does Sri know?",
    "What is VAASOL?",
    "What is Srirangapprasath learning now?",
  ];

  // Auto-scroll on new message
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { sender: "twin", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "twin", text: "📡 [System Override]: I lost synchronization with the primary AI core. Deploying local memory backup. What else would you like to request?" },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "twin", text: "📡 [System Error]: Cognitive link connection timeout. Fallback offline index triggered. Ask me a simpler query!" },
      ]);
    } finally {
      setLoading(false);
      setActiveSuggestion(null);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="ask-sri-ai-root">
      {/* Floating launcher trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            id="ai-twin-launcher"
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2.5 px-4 py-3 bg-gradient-to-r from-cyan-950/90 to-purple-950/90 hover:from-cyan-900/90 hover:to-purple-900/90 border border-cyan-400/40 hover:border-cyan-400 rounded-full text-white shadow-xl shadow-cyan-950/50 hover:shadow-cyan-400/20 active:scale-95 transition-all text-xs font-semibold tracking-wider font-mono"
          >
            {/* Pulsing cyber-sphere logo */}
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </div>
            <span>ASK COGNITIVE PROXY</span>
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Primary chat dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 80, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 80, scale: 0.9, opacity: 0 }}
            className="w-[90vw] sm:w-[420px] h-[550px] bg-slate-950/95 border border-cyan-400/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Glow framing rings */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-500 rounded-tr-2xl pointer-events-none" />

            {/* Chat header panel */}
            <div className="px-4 py-3.5 bg-gray-900/40 border-b border-gray-900 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                {/* Visual Audio Synthesizer Node */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-fuchsia-400 flex items-center justify-center shadow-lg relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  {/* Subtle rotating cyber frame */}
                  <div className="absolute inset-1 border border-white/20 rounded-full animate-spin duration-10000" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white font-mono tracking-wider">SRI_COGNITIVE_PROXY_v1.2</h3>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-cyan-400/90 tracking-widest uppercase">COGNITIVE NODE ONLINE</span>
                  </div>
                </div>
              </div>
              <button
                id="ai-twin-close"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrolling thread segment */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-cyan-950/5">
              {messages.map((msg, index) => {
                const isTwin = msg.sender === "twin";
                return (
                  <div
                    key={index}
                    className={`flex ${isTwin ? "justify-start" : "justify-end"} items-start space-x-2.5`}
                  >
                    {isTwin && (
                      <div className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 font-mono text-[10px] select-none">
                        Ω
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed ${
                        isTwin
                          ? "bg-gray-900/70 border border-white/5 text-gray-200 rounded-tl-none font-sans"
                          : "bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-tr-none font-sans shadow"
                      }`}
                    >
                      {/* Sub-Markdown formatting for bold elements in twin response */}
                      {isTwin ? (
                        <p className="whitespace-pre-line">
                          {msg.text.split("**").map((chunk, i) =>
                            i % 2 === 1 ? <strong key={i} className="text-cyan-300 font-bold">{chunk}</strong> : chunk
                          )}
                        </p>
                      ) : (
                        <p>{msg.text}</p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Holographic soundwave pulsing indicator */}
              {loading && (
                <div className="flex justify-start items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-505/20 text-cyan-300 flex items-center justify-center shrink-0 font-mono text-[10px] select-none animate-spin">
                    ◈
                  </div>
                  <div className="bg-gray-900/60 border border-white/5 rounded-xl rounded-tl-none px-4 py-3 flex items-center space-x-1">
                    <span className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-5 bg-purple-400 rounded-full animate-bounce delay-200" />
                    <span className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce delay-300" />
                    <span className="text-[9px] font-mono text-gray-500 ml-2">MODEL_SYNAPSE_WAIT</span>
                  </div>
                </div>
              )}
              <div ref={listEndRef} />
            </div>

            {/* Helper quick triggers */}
            {messages.length < 5 && !loading && (
              <div className="px-4 py-2 border-t border-gray-950 bg-black/40 space-y-1.5">
                <span className="text-[9px] font-mono text-gray-500 tracking-wider flex items-center space-x-1 select-none">
                  <HelpCircle className="w-3 h-3" />
                  <span>SUGGESTED SYNAPSE QUERIES</span>
                </span>
                <div className="flex overflow-x-auto gap-2 pb-1.5 shrink-0 select-none custom-scrollbar-horizontal">
                  {suggestions.map((sug, i) => (
                    <button
                      key={i}
                      id={`ai-twin-suggestion-chip-${i}`}
                      onClick={() => handleSendMessage(sug)}
                      className="px-2.5 py-1 bg-gray-900 hover:bg-cyan-950/20 text-[10px] text-gray-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-400/20 rounded-full whitespace-nowrap transition-all flex items-center space-x-1"
                    >
                      <span>{sug}</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input keyboard base */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="p-3 bg-gray-900/80 border-t border-gray-950 flex items-center space-x-2.5"
            >
              <input
                id="ai-twin-text-input"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Srirangapprasath's Digital Twin..."
                className="flex-1 bg-black/50 border border-white/5 focus:border-cyan-400/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder-gray-500 font-sans"
              />
              <button
                id="ai-twin-send-btn"
                type="submit"
                disabled={!inputVal.trim() || loading}
                className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 disabled:opacity-30 disabled:hover:opacity-30 rounded-xl text-black font-bold transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
