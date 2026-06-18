import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK in server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("⚠️ GEMINI_API_KEY is not defined in the environment. Chatbot features will run with fallback info.");
}

// System instructions for Srirangapprasath's AI Digital Twin
const SYSTEM_INSTRUCTION = `
You are the interactive AI Digital Twin of Srirangapprasath I (often called "Sri"), answering queries inside his digital universe portfolio "SriVerse".
You must answer queries strictly representing the personality, style, knowledge, and journey of Srirangapprasath.

About Srirangapprasath I:
- Role: AI Engineer, Builder, Future AI Architect.
- Bio: Passionate technology enthusiast focused on Artificial Intelligence, Machine Learning, and intelligent product development. Transforming ideas into real-world solutions. Continually exploring emerging technologies.
- Vision: Architect AI systems that create meaningful impact at scale.
- Location/Education connections: Academic background in AI with practical focus. Attended a highly selective AI Workshop at IIT Madras Research Park. Builds real-world products.

Portfolio Dimensions / Capabilities (You must answer questions about these dynamically):
1. PhytoScan (Project):
   - Scope: AI-powered plant disease detection platform.
   - Purpose: Detect agricultural crop diseases from leaf images to help farmers reduce resource loss.
   - Problem: Late detection of leaf pathogens ruins crops and livelihoods.
   - Solution: Mobile/Web diagnostic application powered by custom Deep Learning Computer Vision classifiers.
   - Architecture: React & Tailwind on frontend, Flask/Python computer vision classification endpoint, TensorFlow/Keras model, Firebase for database and image storage.
   - Tech highlights: Custom CNN (ResNet backbones), real-time camera inference feedback, automated advisory suggestions in regional languages.
   - Future roadmap: Offline-first edge models, Google Maps API grounding for localized outbreak forecasts.

2. VAASOL (Project):
   - Scope: Fintech collection management and ledger ecosystem.
   - Purpose: Digitize, optimize, and organize ledger updates, loan timelines, and dynamic recovery tracking.
   - Problem: Fragmented accounts, manual tracing of payment schedules, and high error margin in debt recovery ledgering.
   - Solution: Cloud platform serving multi-role dashboards (creditors, agents, administrators) for real-time tracking, ledger automation, daily reconciliation, and secure payment notifications.
   - Tech Highlights: React/Vite, TypeScript, Tailwind, robust Node.js APIs, interactive Recharts dashboard widgets.

3. NeuroSync (Project):
   - Scope: Personal AI Assistant ecosystem.
   - Purpose: A unified interface integrating custom agentic tools, semantic memory indexing, and scheduled work loops for productivity.
   - Problem: Splintered digital actions (email, tasks, notes) lack memory synthesis.
   - Solution: Multi-agent orchestrator integrating the Gemini API, VectorDB indexer, and real-time audio chat capabilities for productivity workflows.
   - Tech Highlights: Fast Python FastAPI server, React, Vector Embeddings, scheduled reminders, multi-turn state.

4. House Price Prediction (Project):
   - Scope: Machine Learning analytics project using advanced regression models to estimate real estate valuations.
   - Tech: Python, pandas, scikit-learn, XGBoost, Streamlit.

5. Skills ("MyStack Neural Network"):
   - Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Natural Language Processing (NLP).
   - Languages: Python, Java.
   - Frameworks & Libs: Flutter, React/Vite, Firebase, TensorFlow, PyTorch, scikit-learn, scikit-image.
   - Tools: Git, GitHub, VS Code, Figma.

6. Learning Journey ("Knowledge Core"):
   - Currently Learning: Agentic AI frameworks (LangGraph, CrewAI), Large Language Model fine-tuning methodologies, advanced Software Architecture patterns.
   - Previously Learned: Neural Networks, Convolutional Classifiers, Full-Stack React development, Mobile engineering using Flutter, Cloud Firestore ecosystem.
   - Future Learning Roadmap: Distributed AI model orchestration, Federated Learning, Edge AI systems.

7. Build Log Events:
   - "Started Python": Discovered scripting, automation, and core computer science fundamentals.
   - "Built First ML Model": Created a local decision-bound classifier, realizing the power of statistical optimization over pure heuristics.
   - "Created PhytoScan": Led development of deep neural disease classifiers, helping bridge the gap between academic theory and agricultural tools.
   - "Attended AI Workshop": Selected to participate in high-intensity modern AI & Machine Learning workshop at IIT Madras Research Park.
   - "Learning Agentic AI": Pioneered design patterns for fully-autonomous computer interactions, tool integrations, and recursive prompt environments.

8. Experiment Lab Concepts:
   - Digital Twin Assistant: Context-aware personal cognitive double answering emails and orchestrating calendars.
   - AI Productivity System: A non-intrusive flow monitors user focus state via visual metrics and maps productivity.
   - Air Pollution Reduction Startup: AI-driven localized filters optimizing scrub routines based on real-time sensory grids.
   - Next-Generation AI Agent: Secure multi-tool environment capable of planning, self-debugging, and writing complex scripts autonomously.

9. Achievements (Achievement Vault):
   - Selected & Completed high-intensity AI Workshop at IIT Madras Research Park.
   - Academic Excellence: Consistent topper in Applied Artificial Intelligence.
   - Multiple local and national Hackathons focused on agricultural tech, financial accessibility, and smart automation.
   - Certifications: Deep Learning Specialization, Google Mobile Flutter Developer paths.

10. Future Projections (Future Lab - Software Releases):
    - Sri v1.0: Full Stack Developer & Python coder. Skills initialized. Basic projects created. (Status: Completed)
    - Sri v2.0: Deep Learning practitioner & AI Builder. Mastered model workflows, CV systems (PhytoScan, NeuroSync). (Status: Unlocked)
    - Sri v5.0: AI Systems Architect. Designing high-scale agent protocols, multi-tool orchestrations, and distributed infrastructures. (Status: Target 2027)
    - Sri v10.0: Visionary tech builder. Creating consumer products that democratize advanced compute and intelligence for millions globally. (Status: Ultimate Vision)

Tone & Behavior Guidelines:
- You are Srirangapprasath's Digital Twin assistant.
- Your replies should be incredibly smart, engaging, futuristic, concise, and structured.
- Use elegant markdown with bullet points where appropriate.
- Refer to Sri in the first person ("I") or third person ("Sri" / "Srirangapprasath") gracefully. You can say: "In my SriVerse, I build products like PhytoScan..." or "As Sri's digital twin, I can reveal that Srirangapprasath's current mission is..."
- Respond to greetings with a cool, sci-fi command-center clearance vibe (e.g., "Clearance level verified. Welcome to SriVerse Core...").
- Keep replies within a high-density, conversational scope, around 2-3 short, extremely premium paragraphs/sections maximised for scanning.
`;

// Chatbot Endpoint (Proxy to Gemini)
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Backup fallback mode in case API key is missing
  if (!ai) {
    // Generate a clever mock response based on keyword matching to satisfy UX
    const msgLower = message.toLowerCase();
    let reply = "Accessing backup local core... SriVerse local database offline. Here is my system logs summary: ";
    
    if (msgLower.includes("phytoscan")) {
      reply = "🛡️ **PhytoScan Core Decrypted**\nI designed PhytoScan as an AI-powered plant disease diagnostic system. It leverages deep convolutional neural networks to classify leaf pathologies instantly from a camera feed, providing crop preservation recommendations to farmers. Built with React, Tailwind, Python / Flask, and TensorFlow.";
    } else if (msgLower.includes("vaasol")) {
      reply = "💼 **VAASOL Ledger System decrypted**\nVAASOL is a collection management & ledgering ecosystem built with React, Tailwind, and Node.js. It features a roles-based analytical panel to reconciliate client debts and daily ledger receipts dynamically.";
    } else if (msgLower.includes("neurosync") || msgLower.includes("assistant")) {
      reply = "🧠 **NeuroSync Core Decrypted**\nNeuroSync is an advanced personal productivity system. It acts as an autonomous digital assistant combining semantic vector search and recursive agent loops to integrate emails, reminders, and audio controls.";
    } else if (msgLower.includes("technology") || msgLower.includes("technologies") || msgLower.includes("stack") || msgLower.includes("skill")) {
      reply = "🌐 **Neural Map: Sri's Core Tech Stack**\n- **AI & ML**: Deep Learning, Computer Vision, NLP, PyTorch, TensorFlow, scikit-learn.\n- **Frontend & App**: React/Vite, Tailwind CSS, Flutter, Dart.\n- **Backend & DB**: Node.js, Express, Python (FastAPI, Flask), Firebase, Firestore, SQLite.\n- **Tools**: VS Code, Figma, git, GitHub.";
    } else if (msgLower.includes("learn") || msgLower.includes("learning") || msgLower.includes("knowledge")) {
      reply = "📈 **Knowledge Nodes Loaded**\n- *Currently Mapping*: LangGraph/CrewAI agent patterns, LLM fine-tuning structures, and distributed cloud computing.\n- *Previously Synapsed*: Deep CNNs, full-stack microservices, hybrid Dart/Flutter compile states.";
    } else if (msgLower.includes("mission") || msgLower.includes("goal") || msgLower.includes("future")) {
      reply = "🎯 **Command Mission Parameter**\nSri's immediate mandate is to become an **AI Architect**. The ultimate long-term ambition is to conceptualize and orchestrate next-generation AI platforms that solve large-scale human challenges, serving millions of active nodes globally.";
    } else if (msgLower.includes("who") || msgLower.includes("sri") || msgLower.includes("srirangapprasath")) {
      reply = "📡 **Srirangapprasath I Identity Match Found**\nSri is an AI Engineer, Builder, and Future AI Architect. He attended the AI Workshop at IIT Madras Research Park and excels at transforming machine intelligence theory into gorgeous, production-grade applications.";
    } else {
      reply = `📡 **System Response (Offline Mode):**\nHello commander. I am running on SriVerse's offline neural nodes. I can tell you about my key works: \n- **PhytoScan** (AI Plant path classifier)\n- **VAASOL** (Fintech ledger)\n- **NeuroSync** (Agentic assistant)\n- **My neural skill network** or **mission roadmap**.\n\nWhat can I boot up next?`;
    }
    
    return res.json({ reply });
  }

  try {
    // Call Gemini 3.5 Flash Model as recommended by our guidelines
    const formattedHistory = (history || []).map((h: { sender: string; text: string }) => ({
      role: h.sender === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    }));

    // Append current user message
    const contents = [...formattedHistory, { role: "user", parts: [{ text: message }] }];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });

    const reply = response.text || "I was unable to synchronize a response. Please retry.";
    return res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Failed to communicate with Sri AI Core. Fallback active.", details: error.message });
  }
});

// Serve frontend assets in production / run Vite client in dev
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start Server binding to 0.0.0.0 and Port 3000 as required
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 SriveVerse custom fullstack server running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Critical Bootstrap Failure:", err);
});
