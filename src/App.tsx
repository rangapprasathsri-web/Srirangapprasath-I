import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, ShieldAlert, Cpu, Sparkles, Binary, Check } from "lucide-react";
import ParticleBackground from "./components/ParticleBackground";
import CentralNexus from "./components/CentralNexus";
import AskSriAI from "./components/AskSriAI";

export default function App() {
  const [booting, setBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [bootIndex, setBootIndex] = useState(0);
  const [activePortal, setActivePortal] = useState<number | null>(null);

  const rawLogs = [
    "🚀 INITIALIZING COGNITIVE CORE SYSTEM [SRIVERSE v2.0]...",
    "📡 SECURING PORTAL SYNAPSE BOUNDARDS (0.0.0.0:3000)...",
    "🍃 COMPILING PHYTOSCAN DEEP LEAF CONVOLUTIONAL CLASSIFIERS...",
    "💼 REPLICATING VAASOL FINANCE CONCURRENCY LEDGER STATES...",
    "🧠 RE-CONNECTING NEUROSYNC AGENTIC ACTIONS...",
    "🛡️ SYNCHRONIZING ENCRYPTED MILITARY ENVELOPE SECRETS...",
    "🧬 ESTABLISHING DIRECT COMMUNICATION WAVEFORMS WITH GEMINI CORES...",
    "✅ SUBSYSTEM COMPILATION WORK COMPLIANT. CLEARANCE GRANTED."
  ];

  // Incrementally print diagnostic cyberpunk logs
  useEffect(() => {
    if (bootIndex < rawLogs.length) {
      const delay = bootIndex === 0 ? 100 : Math.random() * 250 + 100;
      const t = setTimeout(() => {
        setBootLogs((prev) => [...prev, rawLogs[bootIndex]]);
        setBootIndex((i) => i + 1);
      }, delay);
      return () => clearTimeout(t);
    }
  }, [bootIndex]);

  // Audio tone cue on successful entry
  const playSystemWelcome = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Beep 1
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain1.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.15);

      // Beep 2 (delayed chord chime)
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.frequency.setValueAtTime(1200, audioCtx.currentTime);
        gain2.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.25);
      }, 120);

    } catch (e) {
      console.warn("Media blocked");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#020205] text-[#e0e0ff] overflow-x-hidden font-sans select-none" id="sriverse-environment-root">
      {/* Ambient Background Atmosphere from Sophisticated Dark design instructions */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" id="sophisticated-dark-atmosphere">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:40px_40px] opacity-30" />
      </div>

      {/* 1. Global Interactive Cosmic Ambient Canvas particles */}
      <ParticleBackground />

      <AnimatePresence mode="wait">
        {booting ? (
          /* CINEMATIC SUBSYSTEM BOOT SEQUENCER OVERLAY SCREEN */
          <motion.div
            key="sandbox-boot-sequencer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black p-4 select-none"
            id="boot-state-container"
          >
            {/* Hologram aesthetic background accents */}
            <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent top-1/4 pointer-events-none" />
            <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent bottom-1/4 pointer-events-none" />

            <div className="w-full max-w-lg space-y-6 relative">
              {/* Spinning Vector Loader */}
              <div className="flex justify-center mb-2">
                <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-cyan-500/20 flex items-center justify-center animate-spin duration-3000">
                  <Cpu className="w-6 h-6 text-cyan-400 rotate-12" />
                  <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-cyan-400 scale-110 animate-pulse" />
                </div>
              </div>

              {/* Loader Subtitles */}
              <div className="text-center space-y-1 relative">
                <h2 className="text-sm font-bold tracking-widest text-cyan-400 uppercase font-mono">
                  SRIVERSE_CORE_BOOT_SEQUENCE
                </h2>
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                  INITIALIZING DIGITAL REPLICA OF SRIRANGAPPRASATH I
                </p>
              </div>

              {/* Scrolling Diagnostic Cyberpunk logs */}
              <div className="h-44 overflow-y-auto p-4 bg-gray-950/70 border border-white/5 rounded-xl text-[10px] font-mono leading-relaxed text-gray-400 space-y-1.5 custom-scrollbar">
                {bootLogs.map((log, index) => (
                  <div key={index} className="flex items-center space-x-1.5">
                    {index === rawLogs.length - 1 ? (
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-cyan-500 select-none">&gt;&gt;</span>
                    )}
                    <span className={index === rawLogs.length - 1 ? "text-emerald-400 font-semibold" : ""}>{log}</span>
                  </div>
                ))}
                {bootIndex < rawLogs.length && (
                  <div className="flex items-center space-x-1">
                    <span className="text-cyan-500 select-none animate-pulse">&gt;&gt;</span>
                    <span className="w-1.5 h-3 bg-cyan-400 inline-block animate-pulse" />
                  </div>
                )}
              </div>

              {/* Enter Button activation */}
              <AnimatePresence>
                {bootIndex >= rawLogs.length && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    id="enter-universe-btn"
                    onClick={() => {
                      playSystemWelcome();
                      setBooting(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:opacity-95 text-black font-extrabold rounded-xl transition-all font-mono text-xs tracking-widest uppercase shadow-lg shadow-cyan-950/40 hover:shadow-cyan-400/25 active:scale-98 flex items-center justify-center space-x-2"
                  >
                    <span>INITIALIZE PORTAL CONTEXT</span>
                    <Sparkles className="w-3.5 h-3.5 text-black animate-pulse" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* THE CENTRAL INTERACTIVE NEXEUS AND PORTALS STAGE */
          <motion.div
            key="sandbox-universe-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col min-h-screen"
            id="universe-active-stage"
          >
            {/* Holographic grid wallpaper overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_10px_10px,rgba(255,255,255,0.015)_10%,transparent_10%)] pointer-events-none" />

            {/* Central Holographic Nexus Panel */}
            <CentralNexus
              activePortal={activePortal}
              onOpenPortal={(id) => setActivePortal(id)}
              onClosePortal={() => setActivePortal(null)}
            />

            {/* "Ask Sri AI" Virtual Digital Twin Chatbot */}
            <AskSriAI />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
