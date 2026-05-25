/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Zap, Activity, ArrowUp, RefreshCw, Pause, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function InteractivePhysicsSandbox() {
  const { language, t } = useLanguage();
  const [posX, setPosX] = useState(150);
  const [posY, setPosY] = useState(120);
  const [velX, setVelX] = useState(0);
  const [velY, setVelY] = useState(0);
  const [isGrounded, setIsGrounded] = useState(false);
  const [gravity, setGravity] = useState(0.8);
  const [dashFuel, setDashFuel] = useState(100);
  const [jumpCount, setJumpCount] = useState(0);
  const [physicsTimerActive, setPhysicsTimerActive] = useState(true);

  const [dimensions, setDimensions] = useState({ width: 320, height: 220 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamically observe container resizing to update boundaries
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      // Guarantee fallback boundaries if container is hidden/collapsed
      setDimensions({ 
        width: width > 0 ? width : 320, 
        height: height > 0 ? height : 220 
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Clamping character position within newly observed bounds
  useEffect(() => {
    setPosX((prev) => Math.max(12, Math.min(prev, dimensions.width - 12)));
    setPosY((prev) => Math.max(12, Math.min(prev, dimensions.height - 24)));
  }, [dimensions]);

  // Simulates a kinematic 2D engine loop
  useEffect(() => {
    if (!physicsTimerActive) return;

    const interval = setInterval(() => {
      setPosX((prevX) => {
        let nextX = prevX + velX;
        const mapWidth = dimensions.width;
        
        // Boundary checks for X
        if (nextX < 12) {
          nextX = 12;
          setVelX(0);
        } else if (nextX > mapWidth - 12) {
          nextX = mapWidth - 12;
          setVelX(0);
        }
        return nextX;
      });

      setPosY((prevY) => {
        let nextY = prevY + velY;
        const charSize = 24;
        const mapHeight = dimensions.height;
        const floorY = mapHeight - charSize;

        if (nextY >= floorY) {
          nextY = floorY;
          setVelY(0);
          setIsGrounded(true);
          setJumpCount(0);
        } else {
          // Apply gravity constant
          setVelY((vy) => vy + gravity);
          setIsGrounded(false);
        }
        return nextY;
      });

      // Friction on velocity
      setVelX((vx) => vx * 0.92);

      // Auto recharge dash fuel
      setDashFuel((fuel) => Math.min(100, fuel + 1));
    }, 1000 / 45); // ~15 ms per tick

    return () => clearInterval(interval);
  }, [velX, velY, gravity, physicsTimerActive, dimensions]);

  const handleJump = () => {
    if (isGrounded || jumpCount < 2) {
      setVelY(-12); // vertical impulse
      setJumpCount((j) => j + 1);
      setIsGrounded(false);
    }
  };

  const handleDash = (dir: 'left' | 'right') => {
    if (dashFuel >= 40) {
      setVelX(dir === 'right' ? 14 : -14);
      setVelY(-1.5); // Slight float feel
      setDashFuel((fuel) => fuel - 40);
    }
  };

  const resetSimulator = () => {
    setPosX(dimensions.width / 2 - 12);
    setPosY(dimensions.height / 2 - 12);
    setVelX(0);
    setVelY(0);
    setIsGrounded(false);
    setJumpCount(0);
    setDashFuel(100);
  };

  return (
    <div className="w-full liquid-glass rounded-dashboard p-5 relative overflow-hidden flex flex-col md:flex-row gap-5 items-stretch shadow-primary animate-fade-rise">
      {/* Simulation Stage */}
      <div 
        ref={containerRef} 
        className="relative flex-1 min-h-[240px] bg-[#0A0A0A]/90 border border-white/5 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-4 group"
      >
        {/* Grids layer for physical aesthetics */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        {/* Dynamic Telemetry stats HUD */}
        <div className="absolute top-3 left-3 bg-black/90 border border-white/10 px-3 py-2 rounded-lg text-[9px] font-mono text-white/50 select-none z-10 space-y-0.5">
          <p className="text-white font-semibold flex items-center gap-1">
            <Activity className="w-3 h-3 text-white/85 animate-pulse" />
            {t('physics.telemetry')}
          </p>
          <p>X-Coord: {posX.toFixed(1)}px</p>
          <p>Y-Coord: {posY.toFixed(1)}px</p>
          <p>velX: {velX.toFixed(2)}m/s</p>
          <p>velY: {velY.toFixed(2)}m/s</p>
          <p className="flex items-center gap-1 mt-1">
            {t('physics.grounded')}: 
            <span className={isGrounded ? "text-white font-bold" : "text-white/60"}>
              {isGrounded ? "TRUE" : "FALSE"}
            </span>
          </p>
          <p>{t('physics.jumps')}: {jumpCount}/2</p>
        </div>

        {/* Character Node */}
        <div
          style={{
            transform: `translate3d(${posX}px, ${posY}px, 0)`,
            transition: 'transform 0.02s linear'
          }}
          className="absolute top-0 left-0 w-6 h-6 rounded-md bg-white text-black shadow-primary flex items-center justify-center border border-white/20 select-none"
        >
          <div className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
        </div>

        {/* Level static objects / Floor indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-white/5 border-t border-white/10 flex items-center justify-between px-3 text-[8px] font-mono text-white/40 tracking-wider">
          <span>COLLIDER_PLANE_FLOOR</span>
          <span>STATIC_SOLID</span>
        </div>
        
        {/* Obstacle platform representation */}
        <div className="absolute bottom-16 left-12 w-28 h-2 bg-white/5 rounded-full border border-white/5 flex items-center justify-center">
          <span className="text-[7px] font-mono text-white/30">PASSTHROUGH_BOUNDS</span>
        </div>
      </div>

      {/* Controller Block */}
      <div className="w-full md:w-56 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-title font-bold text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-white" />
              {t('physics.kinematic')}
            </h3>
            <p className="text-[10px] text-white/65 leading-relaxed mt-1 font-light">
              {t('physics.kinematicDesc')}
            </p>
          </div>

          {/* Action triggers */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleJump}
              className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-lg flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.95] cursor-pointer"
              title="Add vertical impulse"
            >
              <ArrowUp className="w-3.5 h-3.5 text-white" />
              <span className="text-[9px] font-mono font-bold">{t('physics.jumpBtn')}</span>
            </button>
            <button
              onClick={() => handleDash('left')}
              className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-lg flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.95] cursor-pointer"
              disabled={dashFuel < 40}
              title="Add negative horizontal impulse"
            >
              <span className="text-[9px] font-mono font-bold">{t('physics.dashL')}</span>
              <span className="text-[8px] text-white/40">Fuel: -40</span>
            </button>
            <button
              onClick={() => handleDash('right')}
              className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-lg flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.95] cursor-pointer"
              disabled={dashFuel < 40}
              title="Add positive horizontal impulse"
            >
              <span className="text-[9px] font-mono font-bold">{t('physics.dashR')}</span>
              <span className="text-[8px] text-white/40">Fuel: -40</span>
            </button>
            <button
              onClick={resetSimulator}
              className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-lg flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.95] cursor-pointer"
              title="Reset position coordinates"
            >
              <RefreshCw className="w-3.5 h-3.5 text-white/60" />
              <span className="text-[9px] font-mono font-bold">{language === 'vi' ? 'ĐẶT LẠI' : 'RESET'}</span>
            </button>
          </div>

          {/* Fuel Level */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9px] font-mono text-white/50">
              <span>{t('physics.fuel')}</span>
              <span className={dashFuel >= 40 ? "text-white" : "text-white/40 font-bold"}>
                {dashFuel}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                style={{ width: `${dashFuel}%` }}
                className="h-full bg-white transition-all duration-150" 
              />
            </div>
          </div>

          {/* Gravity strength Slider */}
          <div className="space-y-1 border-t border-white/5 pt-3">
            <div className="flex items-center justify-between text-[9px] font-mono text-white/50">
              <span>{t('physics.gravity')}</span>
              <span>{gravity.toFixed(2)}N</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={gravity}
              onChange={(e) => setGravity(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>

        {/* Engine switcher bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
          <button
            onClick={() => setPhysicsTimerActive(!physicsTimerActive)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-[9px] font-mono transition-all duration-300 cursor-pointer ${
              physicsTimerActive 
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
            }`}
          >
            {physicsTimerActive ? <Pause className="w-2.5 h-2.5 text-white" /> : <Play className="w-2.5 h-2.5 text-white" />}
            {t('physics.system')}: {physicsTimerActive ? t('physics.running') : t('physics.halted')}
          </button>
        </div>
      </div>
    </div>
  );
}
