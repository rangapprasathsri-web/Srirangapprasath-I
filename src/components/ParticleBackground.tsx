import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // Resize tracking to avoid stretching
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = entryWidth;
        height = entryHeight;
        canvas.width = entryWidth;
        canvas.height = entryHeight;
      }
    });

    resizeObserver.observe(container);

    // Particle pool setup
    const particleCount = 120;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      pulseRate: number;
      hue: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        size: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        pulseRate: Math.random() * 0.01 + 0.005,
        hue: Math.random() > 0.5 ? 200 : 270, // Blue or Purple
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, width, height);

      // Damp mouse movement
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Draw subtle orbital grid background
      ctx.strokeStyle = "rgba(40, 50, 100, 0.06)";
      ctx.lineWidth = 1;
      const numGridLines = 12;
      for (let i = 1; i <= numGridLines; i++) {
        // Horizontal lines
        const yPos = (height / (numGridLines + 1)) * i;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
        ctx.stroke();

        // Vertical lines
        const xPos = (width / (numGridLines + 1)) * i;
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, height);
        ctx.stroke();
      }

      // Draw cyber net target coordinates under mouse
      if (mouseX > 0 && mouseY > 0) {
        ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
        ctx.lineWidth = 0.5;

        // Draw crosshairs
        ctx.beginPath();
        ctx.moveTo(0, mouseY);
        ctx.lineTo(width, mouseY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(mouseX, 0);
        ctx.lineTo(mouseX, height);
        ctx.stroke();

        // Cursor highlight ring
        ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Render cosmic background particles
      particles.forEach((p) => {
        // Map abstract coordinates to canvas layout bounds
        p.x += p.vx;
        p.y += p.vy;

        // Wrap particles
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha
        p.alpha += p.pulseRate;
        if (p.alpha > 0.8 || p.alpha < 0.2) p.pulseRate = -p.pulseRate;

        // Attract towards mouse if within threshold
        if (mouseX > 0 && mouseY > 0) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x += (dx / dist) * 0.12;
            p.y += (dy / dist) * 0.12;
          }
        }

        // Draw individual cosmic particle
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${Math.max(0.1, p.alpha)})`;
        ctx.shadowColor = `hsla(${p.hue}, 85%, 65%, 0.4)`;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
