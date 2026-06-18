import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, Cpu, Database, Sparkles, Terminal, Sliders, Target, History,
  FlaskConical, Trophy, Award, Brain, Rocket, Mail, Github,
  Linkedin, FileDown, Search, ArrowRight, CheckCircle2, ChevronRight,
  TrendingUp, CircleDot, Play, ExternalLink, HelpCircle, Code, Workflow, MapPin
} from "lucide-react";
import {
  PROJECTS, SKILL_NODES, SKILL_CONNECTIONS, KNOWLEDGE_NODES,
  MISSION_WIDGETS, BUILD_LOGS, EXPERIMENTS, ACHIEVEMENTS,
  BRAIN_NOTES, SOFTWARE_RELEASES, NETWORK_NODES, Project, SkillNode, KnowledgeNode, ResearchCapsule, Achievement, BrainNote, SoftwareRelease, NetworkContact
} from "../data";

interface PortalOverlayProps {
  portalId: number;
  onClose: () => void;
}

export default function SriVersePortal({ portalId, onClose }: PortalOverlayProps) {
  // Prevent propagation to the universe background so clicks are contained
  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 180 }}
        className="relative w-full max-w-5xl h-fit min-h-[500px] max-h-[90vh] bg-gray-950/90 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-900/20 flex flex-col overflow-hidden backdrop-blur-2xl"
        onClick={handleOverlayClick}
      >
        {/* Hologram Corner Scanning Lines */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
        <div className="absolute bottom-0 inset-x-0 h-[100px] bg-gradient-to-t from-cyan-950/10 to-transparent pointer-events-none" />

        {/* Diagonal aesthetic notches */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 pointer-events-none rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-400 pointer-events-none rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-pink-400 pointer-events-none rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 pointer-events-none rounded-br-xl" />

        {/* Dynamic header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-900 bg-gray-900/35 relative">
          <div className="flex items-center space-x-3">
            <span className="text-cyan-400 animate-pulse text-xs uppercase tracking-widest font-mono select-none px-2 py-0.5 border border-cyan-500/20 bg-cyan-950/30 rounded">
              NODE_0{portalId}
            </span>
            <h2 className="text-xl font-sans tracking-tight font-semibold text-white">
              {getPortalTitle(portalId)}
            </h2>
          </div>
          <button
            id={`portal-close-btn-${portalId}`}
            onClick={onClose}
            className="p-2 border border-white/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-950/20 transition-all font-mono text-xs flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">DISCONNECT</span>
          </button>
        </div>

        {/* Content body with responsive scroll */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {renderPortalContent(portalId)}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Map Portal Titles
function getPortalTitle(id: number): string {
  switch (id) {
    case 1: return "MYHUB // Connected Worlds";
    case 2: return "MYSTACK // living Neural Map";
    case 3: return "KNOWLEDGE CORE // Journey Synapses";
    case 4: return "MISSION CONTROL // Primary Parameters";
    case 5: return "BUILD LOG // Growth Engine";
    case 6: return "EXPERIMENT LAB // Research Capsules";
    case 7: return "ACHIEVEMENT VAULT // Milestones Declassified";
    case 8: return "BRAIN ARCHIVE // Knowledge Repositories";
    case 9: return "FUTURE LAB // Release Logs";
    case 10: return "NETWORK NODE // Relational Grid";
    default: return "SriVerse Sector";
  }
}

// Render dynamic elements inside portfolio portals
function renderPortalContent(id: number) {
  switch (id) {
    case 1:
      return <PortalMyHub />;
    case 2:
      return <PortalMyStack />;
    case 3:
      return <PortalKnowledgeCore />;
    case 4:
      return <PortalMissionControl />;
    case 5:
      return <PortalBuildLog />;
    case 6:
      return <PortalExperimentLab />;
    case 7:
      return <PortalAchievementVault />;
    case 8:
      return <PortalBrainArchive />;
    case 9:
      return <PortalFutureLab />;
    case 10:
      return <PortalNetworkNode />;
    default:
      return <div className="text-center text-gray-500 py-10 font-mono">Quantum sector loading...</div>;
  }
}

// ==================== 1. MYHUB (PROJECTS) ====================
function PortalMyHub() {
  const [activeProj, setActiveProj] = useState<Project | null>(PROJECTS[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full items-start" id="myhub-dimension">
      {/* Worlds Column (3D-like project float buttons) */}
      <div className="md:col-span-4 space-y-3">
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest border-b border-cyan-500/10 pb-2">
          Select Active Domain
        </p>
        <div className="space-y-3 flex md:flex-col overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 gap-2 md:gap-0">
          {PROJECTS.map((proj) => {
            const isActive = activeProj?.id === proj.id;
            return (
              <button
                key={proj.id}
                id={`hologram-world-${proj.id}`}
                onClick={() => setActiveProj(proj)}
                className={`relative w-64 md:w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center space-x-3 shrink-0 ${
                  isActive
                    ? "bg-slate-900/60 border-cyan-400 shadow-md shadow-cyan-900/30 translate-x-1"
                    : "bg-gray-950/40 border-white/5 hover:border-cyan-500/20 hover:bg-gray-900/30"
                }`}
              >
                {/* Floating World Sphere Graphic */}
                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${proj.color} flex items-center justify-center text-white font-mono text-sm relative shrink-0 shadow-lg`}>
                  {proj.id.substring(0, 1).toUpperCase()}
                  {/* Slow orbit ring inside circle */}
                  <div className="absolute inset-0 border border-white/30 rounded-full scale-125 animate-spin duration-10000" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-white font-sans text-sm font-semibold tracking-wide truncate">{proj.title}</h4>
                  <p className="text-gray-400 text-xs truncate">{proj.category}</p>
                </div>
                {isActive && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Domain Projection Display (Project Metrics) */}
      <div className="md:col-span-8 bg-gray-900/25 border border-white/5 rounded-xl p-6 relative overflow-hidden min-h-[400px]">
        {activeProj ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProj.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Main Title Block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-900 pb-5">
                <div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium tracking-wide bg-gradient-to-r ${activeProj.color} text-black uppercase`}>
                    {activeProj.category}
                  </span>
                  <h3 className="text-2xl font-bold font-sans text-white mt-2 select-all shadow-glow">
                    {activeProj.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-cyan-500 border border-cyan-500/20 bg-cyan-950/20 px-2 py-1 rounded">
                    SYS_ALIGN: SYNCHRONIZED
                  </span>
                </div>
              </div>

              {/* Problem / Solution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2 p-4 bg-red-950/10 border border-red-500/10 rounded-lg">
                  <h5 id={`project-${activeProj.id}-problem-header`} className="text-xs font-mono text-red-400 tracking-wider uppercase flex items-center space-x-1.5">
                    <span>⚠️ THE PROBLEM</span>
                  </h5>
                  <p className="text-gray-300 text-xs leading-relaxed">{activeProj.problem}</p>
                </div>

                <div className="space-y-2 p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-lg">
                  <h5 id={`project-${activeProj.id}-solution-header`} className="text-xs font-mono text-emerald-400 tracking-wider uppercase flex items-center space-x-1.5">
                    <span>✅ THE SOLUTION</span>
                  </h5>
                  <p className="text-gray-300 text-xs leading-relaxed">{activeProj.solution}</p>
                </div>
              </div>

              {/* Interactive Virtual Frame Mockup */}
              <div className="border border-white/10 rounded-lg p-5 bg-black/60 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3 border-b border-gray-900 pb-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 tracking-wider uppercase">DEMO_SIMULATOR.SYS</span>
                </div>
                
                {/* Visual Representation */}
                <div className="min-h-[120px] flex flex-col justify-center items-center p-4 bg-gradient-to-b from-slate-900/20 to-black/40 rounded border border-white/5 relative">
                  {activeProj.id === "phytoscan" && (
                    <div className="text-center space-y-2">
                      <div className="flex justify-center space-x-2 animate-bounce">
                        <span className="text-3xl">🍃</span>
                        <span className="text-xl">➡️</span>
                        <span className="text-3xl text-emerald-400">🤖</span>
                      </div>
                      <p className="text-xs font-mono text-emerald-400">CLASS_PROB_CORRECT: 98.4% [EARLY BLIGHT DETECTED]</p>
                      <p className="text-[10px] text-gray-400">Treat leaf with copper fungicide within 48h to preserve cellular tissue.</p>
                    </div>
                  )}
                  {activeProj.id === "vaasol" && (
                    <div className="w-full space-y-2 text-xs">
                      <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 border-b border-cyan-500/10 pb-1">
                        <span>LEDGER RECONCILIATION</span>
                        <span>STATUS: ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-white">
                        <div className="p-1 bg-white/5 rounded"><div className="text-[10px] text-gray-400">Daily collections</div>$14,240</div>
                        <div className="p-1 bg-white/5 rounded"><div className="text-[10px] text-gray-400">Settlements</div>99.2%</div>
                        <div className="p-1 bg-white/5 rounded"><div className="text-[10px] text-gray-400">Active Agencies</div>14</div>
                      </div>
                    </div>
                  )}
                  {activeProj.id === "neurosync" && (
                    <div className="text-center space-y-3">
                      <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-dotted animate-spin mx-auto scale-125" />
                      <p className="text-xs font-mono text-purple-400">"Scanning email context... generated reminder map for calendar. Committing loop."</p>
                    </div>
                  )}
                  {activeProj.id === "house-price" && (
                    <div className="w-full text-xs space-y-2">
                      <p className="font-mono text-yellow-400 text-center">[Regression Model Forecast: R²=0.915]</p>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full" style={{ width: "91%" }} />
                      </div>
                      <div className="flex justify-between text-[9px] text-gray-400">
                        <span>Baseline Mean</span>
                        <span>Hyper-Parameter Grid</span>
                        <span>Prediction Final</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Software Architecture Block */}
              <div className="space-y-2">
                <h5 className="text-[11px] font-mono text-gray-400 tracking-wider uppercase">🧬 CORE SERVICES ARCHITECTURE</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProj.architecture.map((arch, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2.5 bg-gray-900/30 border border-white/5 rounded text-gray-300 text-xs leading-tight">
                      <span className="font-mono text-cyan-400 text-xs py-0.5">[{index+1}]</span>
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features & Roadmap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2.5">
                  <h5 className="text-[11px] font-mono text-gray-400 tracking-wider uppercase">⭐ CORE FEATURES</h5>
                  <ul className="space-y-1.5">
                    {activeProj.features.map((feat, index) => (
                      <li key={index} className="flex items-center space-x-2 text-xs text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2.5">
                  <h5 className="text-[11px] font-mono text-purple-400 tracking-wider uppercase">🛰️ FUTURE ROADMAP</h5>
                  <ul className="space-y-1.5">
                    {activeProj.roadmap.map((road, index) => (
                      <li key={index} className="flex items-start space-x-2 text-xs text-gray-300">
                        <span className="text-purple-400 select-none font-mono font-medium">➔</span>
                        <span>{road}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Highlights Badge Row */}
              <div className="border-t border-gray-900 pt-5">
                <h5 className="text-[10px] font-mono text-gray-500 tracking-wider uppercase mb-2.5">INTEGRATED TECH GRID</h5>
                <div className="flex flex-wrap gap-1.5">
                  {activeProj.techHighlights.map((tech) => (
                    <span key={tech} className="text-xs font-mono text-cyan-300 border border-cyan-500/20 bg-cyan-950/20 px-2.5 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 font-mono">
            Holographic projection ready and waiting.
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== 2. MYSTACK (SKILLS NET) ====================
function PortalMyStack() {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(SKILL_NODES[0]);

  // Track coordinates of from/to for visual connections
  const computedConnections = useMemo(() => {
    return SKILL_CONNECTIONS.map((conn) => {
      const fromNode = SKILL_NODES.find((n) => n.id === conn.from);
      const toNode = SKILL_NODES.find((n) => n.id === conn.to);
      return { fromNode, toNode };
    }).filter((c) => c.fromNode && c.toNode);
  }, []);

  return (
    <div className="space-y-6" id="skills-network-portal">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-900 pb-4">
        <div>
          <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            Cognitive Synapse Network
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Tap on any neuro-node to declassify competency details, integrations, and dependencies.
          </p>
        </div>
        <div className="flex space-x-3 text-xs font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
            <span className="text-gray-400">AI / ML</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
            <span className="text-gray-400">Dev Core</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
            <span className="text-gray-400">Tools</span>
          </div>
        </div>
      </div>

      {/* SVG Living Graph Representation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 bg-black/60 border border-white/5 rounded-xl p-4 relative min-h-[420px] select-none flex flex-col justify-between">
          <div className="absolute top-2 right-3 text-[9px] font-mono text-gray-500">GRID_VIEWPORT: 1000x1000</div>
          
          {/* Svg Connections Wrapper */}
          <div className="relative w-full h-[350px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id="purple-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="blue-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Draw network strands */}
              {computedConnections.map((conn, idx) => {
                const { fromNode, toNode } = conn;
                if (!fromNode || !toNode) return null;
                const isHighlighted = selectedSkill?.id === fromNode.id || selectedSkill?.id === toNode.id;

                return (
                  <g key={idx}>
                    <line
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      stroke={isHighlighted ? "rgba(6, 182, 212, 0.7)" : "rgba(30, 41, 59, 0.55)"}
                      strokeWidth={isHighlighted ? 2.5 : 1}
                      className="transition-all duration-300"
                    />
                    {/* Pulsing energy sphere travelling along active cables */}
                    {isHighlighted && (
                      <circle r="3" fill="#06b6d4" className="animate-pulse">
                        <animateMotion
                          path={`M ${fromNode.x * 5},${fromNode.y * 3.5} L ${toNode.x * 5},${toNode.y * 3.5}`}
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Render Nodes as Interactive holographic buttons */}
            {SKILL_NODES.map((node) => {
              const isSelected = selectedSkill?.id === node.id;
              return (
                <button
                  key={node.id}
                  id={`skill-node-btn-${node.id}`}
                  onClick={() => setSelectedSkill(node)}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 text-[10px] md:text-xs font-mono font-medium rounded-lg border transition-all duration-300 flex items-center space-x-1 ${
                    isSelected
                      ? "bg-slate-900 text-white border-cyan-400 shadow-lg shadow-cyan-900/30 scale-110 z-10"
                      : "bg-gray-950/70 text-gray-400 border-white/5 hover:border-gray-700 hover:text-white"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: node.color }} />
                  <span>{node.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-gray-500 text-center border-t border-white/5 pt-3">
            Nodes automatically distribute energy paths based on algorithmic dependencies.
          </div>
        </div>

        {/* Selected Node Inspector Pane */}
        <div className="lg:col-span-4 bg-gray-905/70 border border-white/5 rounded-xl p-5 flex flex-col justify-between">
          {selectedSkill ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-gray-900 pb-3">
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: selectedSkill.color }} />
                <h4 className="font-mono text-sm uppercase text-white font-bold">{selectedSkill.label}</h4>
              </div>

              <div className="space-y-3 prose prose-invert text-xs text-gray-300 leading-relaxed">
                <p>
                  This synapse represents an architectural asset in Srirangapprasath's AI repertoire.
                </p>
                
                {selectedSkill.category === "ai" && (
                  <div className="p-3 bg-purple-950/20 border border-purple-500/10 rounded">
                    <span className="text-[10px] text-purple-400 font-mono block mb-1">NODE CLASSIFICATION: COGNITIVE</span>
                    Expert integration of ML pipelines, matrix mathematics, neural layer structures, deep pattern diagnostics, and sequence tracking networks.
                  </div>
                )}

                {selectedSkill.category === "dev" && (
                  <div className="p-3 bg-blue-950/20 border border-blue-500/10 rounded">
                    <span className="text-[10px] text-blue-400 font-mono block mb-1">NODE CLASSIFICATION: PRODUCTION SOFTWARE</span>
                    Writing reactive modules, thread-safety, API gateways, mobile ecosystems, state controls, and atomic transaction architectures.
                  </div>
                )}

                {selectedSkill.category === "tools" && (
                  <div className="p-3 bg-teal-950/20 border border-teal-500/10 rounded">
                    <span className="text-[10px] text-teal-400 font-mono block mb-1">NODE CLASSIFICATION: COMPUTE UTILITIES</span>
                    Optimizing work loops, asset tracking, vector rendering, user design wireframing, and cloud deployments.
                  </div>
                )}

                <div>
                  <h5 className="text-[10px] font-mono text-gray-500 tracking-wider">NETWORK HUB SHARING PATHS:</h5>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {SKILL_CONNECTIONS.filter(
                      (c) => c.from === selectedSkill.id || c.to === selectedSkill.id
                    ).map((c) => {
                      const otherId = c.from === selectedSkill.id ? c.to : c.from;
                      const otherNode = SKILL_NODES.find((sn) => sn.id === otherId);
                      return otherNode ? (
                        <span key={otherId} className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/5 text-gray-400">
                          {otherNode.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 font-mono text-xs py-10">Select a neural junction to load telemetry.</div>
          )}

          <div className="mt-6 border-t border-gray-900 pt-4 text-[10px] font-mono text-cyan-400/80 flex items-center justify-between">
            <span>SYNAPSE_SIGNAL: SECURE</span>
            <span>CAP_LEVEL: INTENSE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== 3. KNOWLEDGE CORE ====================
function PortalKnowledgeCore() {
  const [expandedNode, setExpandedNode] = useState<string>("kn-current");

  return (
    <div className="space-y-6" id="knowledge-core-portal">
      <div className="border-b border-gray-900 pb-3">
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
         Evolutionary Learning Synapses
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Explore the current direction, historical foundations, and upcoming technical integrations Srirangapprasath charts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {KNOWLEDGE_NODES.map((node) => {
          const isExpanded = expandedNode === node.id;
          return (
            <button
              key={node.id}
              id={`knowledge-node-card-${node.id}`}
              onClick={() => setExpandedNode(node.id)}
              className={`text-left p-6 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                isExpanded
                  ? "bg-slate-900/60 border-cyan-400 shadow-lg shadow-cyan-900/10 scale-[1.02]"
                  : "bg-gray-950/40 border-white/5 hover:border-cyan-500/20 hover:bg-gray-900/10"
              }`}
            >
              <div className="space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                    node.category === "current" ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/20" :
                    node.category === "previous" ? "text-green-400 bg-green-950/30 border border-green-500/20" :
                    "text-purple-400 bg-purple-950/30 border border-purple-500/20"
                  }`}>
                    {node.category === "current" ? "ACTIVE CORE" : node.category === "previous" ? "COMPLETED" : "PLANNED TARGET"}
                  </span>
                  {isExpanded && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                </div>
                <h3 className="text-base font-semibold text-white font-sans">{node.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{node.description}</p>
              </div>

              <div className="text-[11px] font-mono text-cyan-500 mt-4 flex items-center space-x-1">
                <span>{isExpanded ? "DEEP TELEMETRY ACCESS" : "TAP TO REVEAL TELEMETRY"}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Node Details View */}
      <AnimatePresence mode="wait">
        {expandedNode && (
          <motion.div
            key={expandedNode}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 bg-black/40 border border-white/5 rounded-xl space-y-4"
          >
            <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest border-b border-gray-900 pb-2">
              DECLASSIFIED RESEARCH SYLLABUS:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {KNOWLEDGE_NODES.find((n) => n.id === expandedNode)?.bullets.map((bullet, idx) => {
                const parts = bullet.split(":");
                const heading = parts[0];
                const text = parts[1] || "";
                return (
                  <div key={idx} className="p-4 bg-gray-950/50 border border-white/5 rounded-lg space-y-2">
                    <span className="font-mono text-xs text-cyan-400">0{idx+1} // {heading}</span>
                    <p className="text-gray-300 text-xs leading-relaxed">{text}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== 4. MISSION CONTROL ====================
function PortalMissionControl() {
  return (
    <div className="space-y-6" id="mission-control-portal">
      <div className="border-b border-gray-900 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            Sovereign Command Telemetry
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Displaying real-time priorities, structural missions, and long-term targets steering the SriVerse development flow.
          </p>
        </div>
        <span className="text-[10px] font-mono text-green-400 border border-green-500/20 bg-green-950/20 px-2 py-0.5 rounded select-none">
          SYSTEM_STATE: STABLE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {MISSION_WIDGETS.map((widget, idx) => (
          <div key={idx} className="p-5 bg-gray-950/60 border border-white/5 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[140px]">
            {/* Ambient neon backdrop pulse */}
            <div className={`absolute -right-10 -bottom-10 w-24 h-24 rounded-full filter blur-xl ${
              widget.status === "active" ? "bg-cyan-500/10" :
              widget.status === "synchronized" ? "bg-purple-500/10" : "bg-emerald-500/10"
            }`} />

            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">{widget.title}</span>
              <h3 className="text-base font-bold text-white tracking-wide leading-tight">{widget.value}</h3>
              <p className="text-gray-400 text-xs leading-snug">{widget.sub}</p>
            </div>

            <div className="flex items-center space-x-1.5 mt-3 pt-2 border-t border-white/5">
              <span className={`w-1.5 h-1.5 rounded-full ${
                widget.status === "active" ? "bg-cyan-400 animate-ping" :
                widget.status === "synchronized" ? "bg-purple-400" : "bg-emerald-400/40"
              }`} />
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{widget.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Sci-fi Dashboard graphics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
        <div className="md:col-span-8 bg-black/40 border border-white/5 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Cognitive Resource Allocation Graph</span>
            <span className="text-[9px] font-mono text-cyan-400">INDEX: 0.99A</span>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Machine Intelligence Topologies</span>
                <span className="font-mono text-cyan-400">85%</span>
              </div>
              <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full" style={{ width: "85%" }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Software Product Execution</span>
                <span className="font-mono text-purple-400">70%</span>
              </div>
              <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full" style={{ width: "70%" }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Agentic Action Architectures</span>
                <span className="font-mono text-emerald-400">90%</span>
              </div>
              <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" style={{ width: "90%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-gray-950/40 border border-white/5 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">COMMANDER BIO MATCH</span>
            <div className="text-xs text-gray-300 space-y-1 bg-black/40 p-3 rounded border border-white/5 leading-relaxed">
              <p>
                <strong>Name:</strong> Srirangapprasath I<br />
                <strong>Status:</strong> Active Developer Core<br />
                <strong>Role:</strong> AI Engineer & Builder<br />
              </p>
              <p className="mt-2 text-gray-400 text-[11px]">
                "I thrive on transforming mathematical machine intelligence theories into gorgeous production applications."
              </p>
            </div>
          </div>

          <div className="text-[10px] font-mono text-cyan-400 mt-4">
            LEVEL_VERIFIED // SECURE_NODE
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== 5. BUILD LOG (TIMELINE) ====================
function PortalBuildLog() {
  return (
    <div className="space-y-6" id="build-logs-portal">
      <div className="border-b border-gray-900 pb-3">
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          Public Development Chronicles
        </p>
        <p className="text-gray-400 text-xs mt-1">
          A chronicled scroll representing Srirangapprasath's journey, from compiling basic loops to crafting multi-tool autonomous configurations.
        </p>
      </div>

      {/* Visual Scrolling Timeline */}
      <div className="relative border-l border-cyan-500/20 ml-4 md:ml-32 pl-6 md:pl-8 space-y-8 py-4">
        {BUILD_LOGS.map((log, index) => (
          <div key={index} className="relative group" id={`timeline-card-${index}`}>
            {/* Absolute Left Date Stamp on widescreen */}
            <div className="hidden md:block absolute -left-40 top-1.5 w-32 text-right font-mono text-xs text-cyan-400/80">
              {log.date}
            </div>

            {/* Glowing connecting joint */}
            <div className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-[11px] h-[11px] rounded-full border-2 transition-all ${
              log.status === "active" ? "bg-cyan-400 border-cyan-400 shadow-glow animate-ping" : "bg-gray-950 border-cyan-500/40 group-hover:bg-cyan-500"
            }`} />

            {/* Content card */}
            <div className="p-5 bg-gray-950/55 border border-white/5 rounded-xl hover:border-cyan-500/20 transition-all duration-300">
              {/* Date tag on mobile view */}
              <div className="md:hidden font-mono text-[10px] text-cyan-400 mb-1">{log.date}</div>
              
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-white font-sans">{log.title}</h4>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                  log.status === "active" ? "text-cyan-400 border border-cyan-500/20 bg-cyan-950/20" : "text-gray-400 bg-white/5"
                }`}>
                  {log.status.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2 mt-2">
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{log.achievement}</p>
                <div className="p-3 bg-black/40 border-l border-cyan-500/20 rounded text-[11px] text-cyan-300/90 leading-relaxed font-mono">
                  <span className="text-[10px] text-gray-500 block mb-0.5">LEARNINGS_DECODED:</span>
                  {log.learnings}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== 6. EXPERIMENT LAB ====================
function PortalExperimentLab() {
  const [activeExpIdx, setActiveExpIdx] = useState<number>(0);

  return (
    <div className="space-y-6" id="experiments-portal">
      <div className="border-b border-gray-900 pb-3">
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          Intelligent Hypotheses and Research
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Opening future architecture capsules. These are concepts Sri is actively drafting to address complex technological issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Concept lists column */}
        <div className="md:col-span-5 space-y-3">
          {EXPERIMENTS.map((exp, idx) => (
            <button
              key={exp.id}
              id={`experiment-capsule-selector-${exp.id}`}
              onClick={() => setActiveExpIdx(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex flex-col space-y-2 ${
                activeExpIdx === idx
                  ? "bg-slate-900/60 border-cyan-400 shadow-lg shadow-cyan-950/20"
                  : "bg-gray-950/45 border-white/5 hover:border-cyan-500/25 hover:bg-gray-900/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">{exp.theme}</span>
                <span className="text-[9px] font-mono text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">{exp.status}</span>
              </div>
              <h4 className="text-sm font-bold text-white pr-2 leading-snug">{exp.title}</h4>
              <p className="text-gray-400 text-xs line-clamp-1">{exp.tagline}</p>
            </button>
          ))}
        </div>

        {/* Selected Concept projection card */}
        <div className="md:col-span-7 bg-black/45 border border-white/5 rounded-xl p-6 space-y-5 min-h-[350px]">
          <div className="border-b border-gray-900 pb-4 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-purple-400 tracking-wider uppercase">RESEARCH CAPSULE TELEMETRY</span>
              <h3 className="text-lg font-bold text-white mt-1">{EXPERIMENTS[activeExpIdx].title}</h3>
            </div>
            <span className="text-xs font-mono text-gray-500 select-none">ID: EXP_0{activeExpIdx + 1}</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Abstract Summary</span>
              <p className="text-gray-300 text-xs leading-relaxed font-sans">{EXPERIMENTS[activeExpIdx].abstract}</p>
            </div>

            <div className="p-4 bg-gray-950/70 border border-white/5 rounded-lg space-y-1.5 font-mono text-xs">
              <span className="text-[10px] text-cyan-400 uppercase tracking-wide block">Synthesized System Layout:</span>
              <p className="text-gray-300 text-[11px] leading-relaxed">{EXPERIMENTS[activeExpIdx].architecture}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-white/5 rounded">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Impact Metric</span>
                <span className="text-xs font-mono font-medium text-white">{EXPERIMENTS[activeExpIdx].impactLevel}</span>
              </div>
              <div className="p-3 bg-white/5 rounded">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Development Stage</span>
                <span className="text-xs font-mono font-medium text-pink-400">{EXPERIMENTS[activeExpIdx].status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== 7. ACHIEVEMENT VAULT ====================
function PortalAchievementVault() {
  const [openVaultId, setOpenVaultId] = useState<string>("iit-madras");

  return (
    <div className="space-y-6" id="achievements-vault-portal">
      <div className="border-b border-gray-900 pb-3">
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          Verified Milestones and Credentials
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Opening security-encrypted milestone capsules. Highlighting professional credentials, workshops, and critical development timelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((ach) => {
          const isOpen = openVaultId === ach.id;
          return (
            <div
              key={ach.id}
              className={`p-6 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[220px] relative overflow-hidden ${
                isOpen
                  ? "bg-slate-900/60 border-cyan-400 shadow-xl shadow-cyan-900/10"
                  : "bg-gray-950/45 border-white/5 hover:border-cyan-500/20"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-cyan-400">{ach.date}</span>
                  <Trophy className={`w-4 h-4 transition-all ${isOpen ? "text-cyan-400 scale-110" : "text-gray-500"}`} />
                </div>
                <h4 className="text-sm font-bold text-white font-sans">{ach.title}</h4>
                <p className="text-gray-400 text-[11px] leading-snug line-clamp-2">{ach.event}</p>
              </div>

              <button
                id={`declassify-vault-btn-${ach.id}`}
                onClick={() => setOpenVaultId(isOpen ? "" : ach.id)}
                className="mt-4 w-full py-1.5 border border-white/10 hover:border-cyan-400/30 font-mono text-[10px] text-gray-300 hover:text-cyan-300 bg-white/5 hover:bg-cyan-950/10 rounded uppercase tracking-widest transition-all"
              >
                {isOpen ? "SEAL DATA" : "DECLASSIFY STATE"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Expanded Declassified stories panel */}
      <AnimatePresence mode="wait">
        {openVaultId && (
          <motion.div
            key={openVaultId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 bg-black/45 border border-cyan-500/10 rounded-xl space-y-4 overflow-hidden"
          >
            {(() => {
              const selectedAch = ACHIEVEMENTS.find((a) => a.id === openVaultId);
              if (!selectedAch) return null;
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                    <span className="text-xs font-mono text-cyan-400 tracking-wider">MILESTONE_LOG // DETAILED FILE</span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase">{selectedAch.date}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed font-sans">
                    <div className="p-4 bg-gray-950/80 border border-white/5 rounded-lg space-y-1.5">
                      <span className="font-mono text-cyan-400 text-[10px] block uppercase">🧬 Background Story:</span>
                      <p className="text-gray-300">{selectedAch.story}</p>
                    </div>
                    <div className="p-4 bg-gray-950/80 border border-white/5 rounded-lg space-y-1.5">
                      <span className="font-mono text-cyan-400 text-[10px] block uppercase">🏅 Verified Outcomes:</span>
                      <p className="text-gray-300">{selectedAch.outcome}</p>
                    </div>
                    <div className="p-4 bg-gray-950/80 border border-white/5 rounded-lg space-y-1.5">
                      <span className="font-mono text-cyan-400 text-[10px] block uppercase">🧠 Key Learnings Absorbed:</span>
                      <p className="text-gray-300">{selectedAch.learning}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== 8. BRAIN ARCHIVE (SEARCHABLE KNOWLEDGE) ====================
function PortalBrainArchive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [activeNoteIdx, setActiveNoteIdx] = useState(0);

  // Filter notes on parameters
  const filteredNotes = useMemo(() => {
    return BRAIN_NOTES.filter((note) => {
      const matchQuery =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTag = selectedTag ? note.tags.includes(selectedTag) : true;
      return matchQuery && matchTag;
    });
  }, [searchQuery, selectedTag]);

  // Aggregate tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    BRAIN_NOTES.forEach((note) => note.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);

  return (
    <div className="space-y-6" id="brain-archive-portal">
      <div className="border-b border-gray-900 pb-3">
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
         Decentralized Technical Archive
        </p>
        <p className="text-gray-400 text-xs mt-1">
          A searchable index tracing mathematical formulas, architecture solutions, and developmental heuristics written by Sri.
        </p>
      </div>

      {/* Control Search row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            id="brain-archive-search-input"
            type="text"
            placeholder="Search indexing nodes (e.g. CNN, dropouts, ledger)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-950/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono"
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-[10px] font-mono text-gray-500">Filter Tag:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              id={`filter-tag-btn-${tag}`}
              onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
              className={`px-2 py-1 text-[10px] font-mono rounded-md border transition-all ${
                selectedTag === tag
                  ? "bg-slate-900 text-white border-cyan-400"
                  : "bg-gray-950/40 text-gray-400 border-white/5 hover:border-gray-700"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left filtered targets list */}
        <div className="md:col-span-5 space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, idx) => (
              <button
                key={note.id}
                id={`archive-note-selector-${note.id}`}
                onClick={() => setActiveNoteIdx(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col space-y-1.5 ${
                  activeNoteIdx === idx
                    ? "bg-slate-900/60 border-cyan-400 shadow shadow-cyan-950/20"
                    : "bg-gray-950/45 border-white/5 hover:border-cyan-500/25"
                }`}
              >
                <div className="flex justify-between items-center text-[9px] font-mono mb-0.5">
                  <span className="text-purple-400 uppercase">{note.category}</span>
                  <span className="text-gray-500">{note.timestamp}</span>
                </div>
                <h4 className="text-xs font-bold text-white tracking-wide truncate">{note.title}</h4>
                <p className="text-gray-400 text-[11px] line-clamp-1">{note.summary}</p>
              </button>
            ))
          ) : (
            <div className="text-center text-gray-500 font-mono py-10 border border-white/5 rounded-xl text-xs">
              No matching files indexed in local archive.
            </div>
          )}
        </div>

        {/* Right detailed article display */}
        <div className="md:col-span-7 bg-black/45 border border-white/5 rounded-xl p-5 min-h-[300px] flex flex-col justify-between">
          {filteredNotes[activeNoteIdx] ? (
            <div className="space-y-4">
              <div className="border-b border-gray-900 pb-3 flex justify-between items-start gap-4">
                <div>
                  <span className="text-[9px] font-mono text-cyan-400 border border-cyan-500/20 bg-cyan-950/20 px-1.5 py-0.5 rounded">{filteredNotes[activeNoteIdx].category}</span>
                  <h3 className="text-base font-bold text-white mt-1.5 tracking-tight leading-snug">{filteredNotes[activeNoteIdx].title}</h3>
                </div>
                <span className="text-[10px] font-mono text-gray-500">{filteredNotes[activeNoteIdx].timestamp}</span>
              </div>

              <p className="text-xs text-gray-400 italic bg-white/5 p-3 rounded leading-relaxed">
                "{filteredNotes[activeNoteIdx].summary}"
              </p>

              <div className="text-xs text-gray-300 leading-relaxed space-y-2 whitespace-pre-line font-sans border-t border-gray-900 pt-3">
                {filteredNotes[activeNoteIdx].content}
              </div>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-900">
                {filteredNotes[activeNoteIdx].tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/10 bg-cyan-950/20">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 font-mono py-16 text-xs">
              Select an article listing to download.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== 9. FUTURE LAB (SOFTWARE VERSIONS) ====================
function PortalFutureLab() {
  const [activeVerIdx, setActiveVerIdx] = useState<number>(1); // Default to v2.0 unlocked

  return (
    <div className="space-y-6" id="future-lab-portal">
      <div className="border-b border-gray-900 pb-3">
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
         Evolutionary Release Log
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Tracking technical progression as structured software configurations. See unlocked thresholds and future architectural goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {SOFTWARE_RELEASES.map((release, idx) => {
          const isActive = activeVerIdx === idx;
          return (
            <button
              key={release.version}
              id={`software-release-btn-${release.version}`}
              onClick={() => setActiveVerIdx(idx)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[120px] ${
                isActive
                  ? "bg-slate-900/60 border-cyan-400 shadow shadow-cyan-950/20"
                  : "bg-gray-950/45 border-white/5 hover:border-cyan-500/20"
              }`}
            >
              <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-cyan-400">{release.codename}</span>
                  <span className={`px-1 rounded uppercase ${
                    release.status === "Deployed" ? "text-emerald-400 bg-emerald-950/20" :
                    release.status === "Compiling" ? "text-yellow-400 bg-yellow-950/20 animate-pulse" : "text-gray-500"
                  }`}>{release.status}</span>
                </div>
                <h3 className="text-lg font-bold font-mono text-white mt-1">{release.version}</h3>
              </div>
              <span className="text-[10px] font-mono text-gray-500 block pt-1 border-t border-white/5">DEC_STATE: COMPLIANT</span>
            </button>
          );
        })}
      </div>

      {/* Selected Version Specifications */}
      <AnimatePresence mode="wait">
        {activeVerIdx !== null && (
          <motion.div
            key={activeVerIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 bg-black/45 border border-white/5 rounded-xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-900 pb-3">
              <div>
                <span className="text-[10px] font-mono text-purple-400 tracking-wider uppercase">BUILD CONFIGURATION PARAMETERS</span>
                <h3 className="text-base font-bold text-white mt-1">Sri {SOFTWARE_RELEASES[activeVerIdx].version} specifications</h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 uppercase bg-cyan-950/30 border border-cyan-500/20 px-2 py-0.5 rounded">
                codename: {SOFTWARE_RELEASES[activeVerIdx].codename}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
              {/* Unlocked Skills */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-cyan-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 inline" />
                  <span>UNLOCKED COMPILER ATTRIBUTES</span>
                </h4>
                <ul className="space-y-1.5 text-gray-300">
                  {SOFTWARE_RELEASES[activeVerIdx].skillsUnlocked.map((skill, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Completed Milestones */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-green-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 inline" />
                  <span>COMPLETED RUN LOGS</span>
                </h4>
                <ul className="space-y-1.5 text-gray-300">
                  {SOFTWARE_RELEASES[activeVerIdx].goalsCompleted.map((goal, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-1 h-1 rounded-full bg-green-400" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Future Ambitions */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-purple-400 flex items-center space-x-1">
                  <CircleDot className="w-3.5 h-3.5 text-purple-400 inline" />
                  <span>CORE TARGET AMBITIONS</span>
                </h4>
                <ul className="space-y-1.5 text-gray-300">
                  {SOFTWARE_RELEASES[activeVerIdx].ambitions.map((amb, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                      <span>{amb}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== 10. NETWORK NODE (CONNECTIONS) ====================
function PortalNetworkNode() {
  const [resumeDownloaded, setResumeDownloaded] = useState(false);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setResumeDownloaded(true);
    
    // Simulate premium visual declassification download
    const dialog = document.createElement("a");
    dialog.href = "data:text/plain;charset=utf-8," + encodeURIComponent(
      "Srirangapprasath I - AI Engineer & Product Builder Resume declassified. (This simulates technical payload download link.)"
    );
    dialog.download = "Srirangapprasath_I_Resume.txt";
    document.body.appendChild(dialog);
    dialog.click();
    document.body.removeChild(dialog);

    setTimeout(() => {
      setResumeDownloaded(false);
    }, 3000);
  };

  return (
    <div className="space-y-6" id="network-nexus-portal">
      <div className="border-b border-gray-900 pb-3">
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
         Relational Grid Terminals
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Synchronize data networks directly with Srirangapprasath's external digital repositories and professional platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {NETWORK_NODES.map((node) => {
          const isResume = node.platform === "Secure CV Link";
          return (
            <div
              key={node.platform}
              className="p-5 bg-gray-950/60 border border-white/5 hover:border-cyan-500/20 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[160px] group transition-all duration-300"
            >
              {/* Outer light glow */}
              <div className="absolute right-0 top-0 w-12 h-12 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity filter blur-md" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">{node.platform}</span>
                  {node.platform === "GitHub" && <Github className="w-4 h-4 text-gray-400" />}
                  {node.platform === "LinkedIn" && <Linkedin className="w-4 h-4 text-gray-400" />}
                  {node.platform === "Email Base" && <Mail className="w-4 h-4 text-gray-400" />}
                  {node.platform === "Secure CV Link" && <FileDown className="w-4 h-4 text-gray-400" />}
                </div>
                <h4 className="text-[11px] font-mono text-cyan-300">{node.label}</h4>
                <p className="text-white text-xs select-all font-semibold break-all leading-tight">{node.value}</p>
              </div>

              {isResume ? (
                <button
                  id="resume-mock-download-btn"
                  onClick={handleResumeClick}
                  className="mt-4 w-full py-2 bg-gradient-to-r from-cyan-950/30 to-blue-950/30 hover:from-cyan-900/40 hover:to-blue-900/40 border border-cyan-500/20 hover:border-cyan-400 rounded-lg text-[10px] text-cyan-300 font-mono tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>{resumeDownloaded ? "TRANSMITTING..." : "DOWNLOAD RESUME"}</span>
                </button>
              ) : (
                <a
                  id={`network-link-btn-${node.platform.replace(/\s+/g, '-').toLowerCase()}`}
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-2 bg-gradient-to-r from-cyan-950/20 to-gray-900/50 border border-white/5 hover:border-cyan-400/30 rounded-lg text-[10px] text-gray-300 hover:text-white font-mono tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5"
                >
                  <span>CONNECT NODE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Decorative Interactive footer logs */}
      <div className="border border-white/5 rounded-xl p-4 bg-black/60 relative overflow-hidden">
        <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400">
          <Workflow className="w-4 h-4 animate-spin duration-5000" />
          <span>NETWORK REPLICATION PIPELINES COMPLETE</span>
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed font-sans">
          Each connection links to real portals curated by Srirangapprasath I. Feel free to download the technical payload, submit direct mail requests, or analyze project repositories.
        </p>
      </div>
    </div>
  );
}
