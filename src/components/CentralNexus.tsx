import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe2, Cpu, GraduationCap, Target, Milestone, FlaskConical,
  Trophy, FolderHeart, Route, Share2, ScanFace, Compass, Volume2, VolumeX, Menu, Layers, Terminal
} from "lucide-react";
import SriVersePortal from "./SriVersePortals";

interface CentralNexusProps {
  onOpenPortal: (id: number) => void;
  activePortal: number | null;
  onClosePortal: () => void;
}

interface PortalItem {
  id: number;
  name: string;
  codename: string;
  icon: React.ComponentType<any>;
  color: string; // Tailwind neon shadow / text color classes
  glowColor: string; // Hex shade or rgba for direct visual glow overlays
}

export default function CentralNexus({ onOpenPortal, activePortal, onClosePortal }: CentralNexusProps) {
  const [rotation, setRotation] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [systemAudio, setSystemAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync real military UTC style time
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hrs = String(d.getHours()).padStart(2, "0");
      const mins = String(d.getMinutes()).padStart(2, "0");
      const secs = String(d.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hrs}:${mins}:${secs} UTC-7`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ambient orbital rotation
  useEffect(() => {
    let animId: number;
    const animateRotation = () => {
      setRotation((prev) => (prev + 0.05) % 360);
      animId = requestAnimationFrame(animateRotation);
    };
    animateRotation();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Track cursor offsets for camera parallax shift
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates around screen center (-1 to 1)
    const normX = (clientX - innerWidth / 2) / (innerWidth / 2);
    const normY = (clientY - innerHeight / 2) / (innerHeight / 2);

    setMousePos({ x: normX, y: normY });
  };

  // Play micro tech buzz beep
  const playPing = () => {
    if (!systemAudio) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime); // high frequency micro beep
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio Context block");
    }
  };

  // Portals definition array
  const portals: PortalItem[] = [
    { id: 1, name: "MYHUB", codename: "PROJECTS_CORE", icon: Globe2, color: "text-green-400 border-green-500/20 shadow-green-500/10", glowColor: "rgba(34, 197, 94, 0.25)" },
    { id: 2, name: "MYSTACK", codename: "NEURAL_SKILLS", icon: Cpu, color: "text-blue-400 border-blue-500/20 shadow-blue-500/10", glowColor: "rgba(59, 130, 246, 0.25)" },
    { id: 3, name: "KNOWLEDGE CORE", codename: "LEARNING_SYNAPSE", icon: GraduationCap, color: "text-purple-400 border-purple-500/20 shadow-purple-500/10", glowColor: "rgba(168, 85, 247, 0.25)" },
    { id: 4, name: "MISSION CONTROL", codename: "DASHBOARD_VALS", icon: Target, color: "text-emerald-400 border-emerald-500/20 shadow-emerald-500/10", glowColor: "rgba(16, 185, 129, 0.25)" },
    { id: 5, name: "BUILD LOG", codename: "DEV_TIMELINE", icon: Milestone, color: "text-yellow-400 border-yellow-500/20 shadow-yellow-500/10", glowColor: "rgba(234, 179, 8, 0.25)" },
    { id: 6, name: "EXPERIMENT LAB", codename: "CONCEPT_PODS", icon: FlaskConical, color: "text-pink-400 border-pink-500/20 shadow-pink-500/10", glowColor: "rgba(236, 72, 153, 0.25)" },
    { id: 7, name: "ACHIEVEMENT VAULT", codename: "VERIFIED_LOGS", icon: Trophy, color: "text-amber-400 border-amber-500/20 shadow-amber-500/10", glowColor: "rgba(245, 158, 11, 0.25)" },
    { id: 8, name: "BRAIN ARCHIVE", codename: "RESEARCH_FILE", icon: FolderHeart, color: "text-teal-400 border-teal-500/20 shadow-teal-500/10", glowColor: "rgba(20, 184, 166, 0.25)" },
    { id: 9, name: "FUTURE LAB", codename: "VERSION_RELEASE", icon: Route, color: "text-fuchsia-400 border-fuchsia-500/20 shadow-fuchsia-500/10", glowColor: "rgba(217, 70, 239, 0.25)" },
    { id: 10, name: "NETWORK NODE", codename: "RELATIONAL_NET", icon: Share2, color: "text-cyan-400 border-cyan-500/20 shadow-cyan-500/10", glowColor: "rgba(6, 182, 212, 0.25)" }
  ];

  // Create stable, completely randomized orbital physics configurations for each portal planet on mount
  const orbitalParams = useMemo(() => {
    return portals.map((portal, index) => {
      // Base radius of orbit: inner planets closer to central sun, outer planets spaced farther
      const baseRadiusX = 220 + index * 34 + (Math.random() - 0.5) * 8;
      
      // Keplerian velocity approximation: inner orbits move faster, with a slight randomized modifier
      const randomSpeedOffset = 0.85 + Math.random() * 0.3;
      const speedFactor = 1.45 * Math.pow(220 / baseRadiusX, 0.72) * randomSpeedOffset;
      
      // Personal orbital inclination (aspect ratio Y vs X)
      const tilt = 0.22 + Math.random() * 0.12;
      
      // Complete 2D planar roll incline (in radians, from -18 to +18 degrees) which angles the orbit
      const rollIncline = (Math.random() - 0.5) * 0.32;
      
      // Randomized initial angle distribution around the orbit
      const initialPhase = Math.random() * 2 * Math.PI;

      // Spontaneous orbit direction (clockwise 85%, counter-clockwise 15% for added space variance)
      const direction = Math.random() > 0.15 ? 1 : -1;

      return {
        id: portal.id,
        radiusX: baseRadiusX,
        speedFactor,
        tilt,
        rollIncline,
        initialPhase,
        direction,
      };
    });
  }, []);

  // Compute collision-free 2D screen positions to completely eliminate any card shielding (overlaps)
  const resolvedPositions = useMemo(() => {
    // 1. Calculate raw orbits 2D projected positions
    let positions = portals.map((portal, index) => {
      const params = orbitalParams[index];
      // compute current theta (angle)
      const theta = params.initialPhase + (rotation * params.speedFactor * params.direction * (Math.PI / 180));
      
      // standard coordinates on direct ellipse
      const px = params.radiusX * Math.cos(theta);
      const py = params.radiusX * params.tilt * Math.sin(theta);
      
      // rotate coordinates by the spatial rollIncline tilt
      const xPos = px * Math.cos(params.rollIncline) - py * Math.sin(params.rollIncline);
      const yPos = px * Math.sin(params.rollIncline) + py * Math.cos(params.rollIncline);
      
      // z-depth metric used for scaling and interactive overlapping zIndices
      const zPos = 80 * Math.sin(theta);
      const scale = 0.8 + (zPos / 80) * 0.18;
      const zIndex = Math.round(50 + zPos);

      return {
        portal,
        params,
        x: xPos,
        y: yPos,
        z: zPos,
        scale,
        zIndex,
        baseX: xPos,
        baseY: yPos,
      };
    });

    // 2. Perform 2D card relaxation passes to remove any overlaps ("no shielding")
    const ITERATIONS = 8;
    const minWidth = 195;  // safety clearance width of a card block
    const minHeight = 90;  // safety clearance height of a card block

    for (let pass = 0; pass < ITERATIONS; pass++) {
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;

          const ratioX = Math.abs(dx) / minWidth;
          const ratioY = Math.abs(dy) / minHeight;

          // If within overlap box
          if (ratioX < 1 && ratioY < 1) {
            const overlapX = minWidth - Math.abs(dx);
            const overlapY = minHeight - Math.abs(dy);

            // Push both symmetrically away in both dimensions
            const pushX = (dx >= 0 ? 1 : -1) * (overlapX * 0.5);
            const pushY = (dy >= 0 ? 1 : -1) * (overlapY * 0.5);

            positions[i].x += pushX;
            positions[i].y += pushY;
            positions[j].x -= pushX;
            positions[j].y -= pushY;
          }
        }
      }
    }

    return positions;
  }, [rotation, orbitalParams]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] w-full flex flex-col justify-between overflow-hidden cursor-default text-white select-none relative z-10"
      id="central-nexus-universe"
    >
      {/* Decorative Technical Headers */}
      <header className="w-full px-6 py-4 border-b border-white/5 bg-black/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 relative z-30 font-mono">
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-lg border border-cyan-500/30 flex items-center justify-center bg-cyan-950/20 hover:border-cyan-400 transition-colors">
            <ScanFace className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h1 id="core-logo-heading" className="text-sm font-bold tracking-widest text-white uppercase sm:text-base font-sans select-all shadow-glow">
              SriVerse Portal Core
            </h1>
            <p className="text-[10px] text-cyan-400/80 tracking-widest uppercase">
              AI ARCHITECT DIGITAL WORKSPACE
            </p>
          </div>
        </div>

        {/* Real-time environmental metrics */}
        <div className="flex items-center space-x-6 text-[10px] text-gray-400">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-gray-500">ENVIRONMENT</span>
            <span className="text-cyan-400">CLOUDRUN NODE_STABLE</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-500">CHRONOS SYNC</span>
            <span className="text-white font-mono">{currentTime || "00:00:00 UTC"}</span>
          </div>

          {/* Sound toggler */}
          <button
            id="nexus-audio-toggle"
            onClick={() => {
              setSystemAudio(!systemAudio);
              playPing();
            }}
            className="p-2 border border-white/10 hover:border-cyan-400 rounded-lg text-gray-400 hover:text-white transition-all bg-white/5 flex items-center space-x-1"
          >
            {systemAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[9px] uppercase tracking-wider font-mono">Audio {systemAudio ? "On" : "Mute"}</span>
          </button>
        </div>
      </header>

      {/* Main command center segment */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center p-4 relative z-20">
        
        {/* PARALLAX 3D WEB CONTAINER (Only for Widescreen viewports) */}
        {!isMobile ? (
          <div
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)`,
              transformStyle: "preserve-3d"
            }}
            className="relative w-full h-[650px] flex items-center justify-center transition-transform duration-300"
          >
            {/* CENTRAL HOLOGRAPHIC CORE */}
            <div className="relative w-80 h-80 rounded-full flex items-center justify-center z-10" style={{ transform: "translateZ(40px)" }}>
              {/* Outer Concentric rings from Sophisticated Dark design instructions */}
              <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-pulse" />
              <div className="absolute inset-8 border border-purple-500/30 rounded-full" />
              <div className="absolute inset-16 border-2 border-cyan-400/15 border-dashed rounded-full animate-spin duration-30000" />

              {/* Center Corey pulsing glass sphere with Sophisticated Dark gradient title */}
              <div className="absolute w-44 h-44 rounded-full bg-[#020205]/85 border border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.25)] flex flex-col items-center justify-center backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center select-none text-center p-4">
                  <h2 className="text-3xl font-bold tracking-tighter bg-gradient-to-b from-white to-blue-400 bg-clip-text text-transparent mb-0.5 uppercase font-sans">
                    SriVerse
                  </h2>
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-2" />
                  <p className="text-[7.5px] tracking-[0.2em] uppercase text-blue-300 font-light font-mono leading-tight">
                    Srirangapprasath I
                  </p>
                  <p className="text-[7px] tracking-widest uppercase text-gray-500 font-mono">
                    AI Architect
                  </p>
                  <Compass className="w-4 h-4 text-cyan-400 animate-spin duration-20000 mt-2.5 opacity-95" />
                </div>
              </div>
            </div>

            {/* INDEPENDENT ORBITAL TRACK RUNWAYS (Planetary paths mapped to randomized inclination orbits) */}
            {orbitalParams.map((params, index) => {
              const rx = params.radiusX;
              const ry = rx * params.tilt;
              
              // Map indexes to matching subtle theme colors matching the portal specs
              const ringColor = index % 3 === 0 
                ? "border-blue-500/[0.04]" 
                : index % 3 === 1 
                  ? "border-purple-500/[0.03]" 
                  : "border-cyan-500/[0.04]";

              return (
                <div
                  key={`orbit-track-${params.id}`}
                  style={{
                    width: `${rx * 2}px`,
                    height: `${ry * 2}px`,
                    transform: `translate3d(0, 0, -50px) rotate(${params.rollIncline}rad)`,
                  }}
                  className={`absolute pointer-events-none rounded-full border ${ringColor}`}
                />
              );
            })}

            {/* ORBITING PORTAL ELEMENTS (Individual dynamic Keplerian orbits with real-time overlap avoidance) */}
            {resolvedPositions.map((pos) => {
              const { portal, scale, zIndex, x, y } = pos;
              const IconComponent = portal.icon;

              return (
                <button
                  key={portal.id}
                  id={`orbit-portal-${portal.id}`}
                  onClick={() => {
                    playPing();
                    onOpenPortal(portal.id);
                  }}
                  style={{
                    transform: `translate3d(${x}px, ${y}px, ${pos.z}px) scale(${scale})`,
                    zIndex: zIndex
                  }}
                  className={`absolute w-44 p-3.5 bg-[#020205]/80 border border-white/10 backdrop-blur-xl rounded-xl hover:border-blue-500/40 hover:bg-white/5 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group shadow-[0_0_15px_rgba(59,130,246,0.05)] hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]`}
                >
                  {/* Subtle color highlight */}
                  <div className="absolute inset-0 rounded-xl bg-white/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-30 blur-md transition-opacity pointer-events-none" style={{ backgroundColor: portal.glowColor }} />

                  {/* Micro indicator tag */}
                  <div className="flex items-center justify-between w-full border-b border-white/5 pb-1 mb-2 text-[8px] font-mono text-gray-500 group-hover:text-cyan-400 tracking-wider">
                    <span>SECTOR_0{portal.id}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-cyan-400" />
                  </div>

                  {/* Portal launcher icon */}
                  <div className={`w-9 h-9 rounded-full border border-white/10 group-hover:border-cyan-400 flex items-center justify-center ${portal.color} transition-all duration-300 relative overflow-hidden group-hover:scale-110 mb-2 bg-white/2`}>
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>

                  <div>
                    <h3 className="text-[11px] font-bold text-white tracking-widest font-mono uppercase group-hover:text-cyan-300">{portal.name}</h3>
                    <p className="text-[8px] font-mono text-gray-400 mt-0.5 tracking-wider truncate w-32">{portal.codename}</p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* RESPONSIVE GRID LAYOUT (Optimized list framework for touchscreens) */
          <div className="w-full space-y-6 py-6" id="nexus-responsive-grid">
            
            {/* Holographic central banner */}
            <div className="p-6 bg-slate-950/70 border border-cyan-400/30 rounded-2xl text-center space-y-3 shadow-lg shadow-cyan-950/10">
              <Compass className="w-10 h-10 text-cyan-400 animate-spin duration-20000 mx-auto" />
              <div className="space-y-1">
                <h2 className="text-lg font-bold font-sans">Srirangapprasath I</h2>
                <p className="text-xs text-cyan-400 font-mono tracking-wider">AI ENGINEER | BUILDER | ARCHITECT</p>
              </div>
              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                Welcome to Srirangapprasath's digital sandbox, called "SriVerse". Explore portfolio portals mapped as dimensional sectors.
              </p>
            </div>

            <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase border-b border-white/5 pb-1 select-none">
              Dimensional Portals
            </p>

            {/* List links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portals.map((portal) => {
                const IconComponent = portal.icon;
                return (
                  <button
                    key={portal.id}
                    id={`mobile-portal-btn-${portal.id}`}
                    onClick={() => {
                      playPing();
                      onOpenPortal(portal.id);
                    }}
                    className="w-full text-left p-4 bg-gray-950/65 border border-white/5 hover:border-cyan-400 rounded-xl flex items-center space-x-3.5 transition-all outline-none"
                  >
                    <div className={`w-9 h-9 rounded-xl border border-white/5 flex items-center justify-center shrink-0 ${portal.color} bg-white/2`}>
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-widest font-mono uppercase">{portal.name}</h4>
                      <p className="text-[9px] font-mono text-cyan-500/80 uppercase mt-0.5">LAUNCH_SECTOR: [0{portal.id}]</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Futuristic Command Console Footer */}
      <footer className="w-full px-6 py-4 border-t border-white/5 bg-black/40 backdrop-blur-md relative z-30 font-mono text-[10px] text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1.5 overflow-hidden">
          <Terminal className="w-3.5 h-3.5 text-cyan-500 animate-pulse shrink-0" />
          <span className="truncate">SRIVERSE // LOG: SYNCHRONIZED [REPLICATION_PORTAL_ACTIVE]</span>
        </div>

        {/* Footer Details from Sophisticated Dark design instructions */}
        <div className="flex items-center gap-6 sm:gap-8 justify-center flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[8.5px] text-[#e0e0ff]/60 tracking-widest uppercase">Lat: 13.0827 N</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-[8.5px] text-[#e0e0ff]/60 tracking-widest uppercase">Long: 80.2707 E</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[8.5px] text-[#e0e0ff]/60 tracking-widest uppercase">Status: Building v5.0</span>
          </div>
        </div>

        <div className="flex space-x-4 shrink-0">
          <span className="hover:text-cyan-400 transition-colors cursor-crosshair">SECURE_LEVEL: FULL</span>
          <span>© 2026 SRIRANGAPPRASATH I</span>
        </div>
      </footer>

      {/* Render selected dimensional overlay modal */}
      <AnimatePresence>
        {activePortal !== null && (
          <SriVersePortal portalId={activePortal} onClose={onClosePortal} />
        )}
      </AnimatePresence>
    </div>
  );
}
