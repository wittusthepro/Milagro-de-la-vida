/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Stage1, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7, Stage8 } from './stages';
import { Lock, RefreshCcw, Baby } from 'lucide-react';
import { cn } from './lib/utils';

const STAGES = [
  { id: 1, title: 'El Despertar', component: Stage1 },
  { id: 2, title: 'La Preparación', component: Stage2 },
  { id: 3, title: 'La Primera Barrera', component: Stage3 },
  { id: 4, title: 'El Escudo Protector', component: Stage4 },
  { id: 5, title: 'Bloqueo de Seguridad', component: Stage5 },
  { id: 6, title: 'La Fusión', component: Stage6 },
  { id: 7, title: 'La División', component: Stage7 },
  { id: 8, title: 'El Nuevo Hogar', component: Stage8 },
];

export default function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    if (currentStage < STAGES.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      setCompleted(true);
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const reset = () => {
    setCurrentStage(0);
    setCompleted(false);
  };

  const CurrentComponent = STAGES[currentStage].component;

  return (
    <div className="min-h-screen bg-rose-50 text-slate-800 font-sans flex flex-col items-center py-12 px-4 overflow-hidden">
      
      <div className="max-w-3xl w-full flex flex-col items-center">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-rose-600 mb-4 tracking-tight">
            El Milagro de la Vida
          </h1>
          <p className="text-lg text-rose-400 font-medium">
            Escape Room: Fecundación e Implantación
          </p>
        </div>

        {!completed && (
          <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-2 px-2">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Etapa {currentStage + 1} de {STAGES.length}
              </span>
              <span className="text-sm font-bold text-rose-500 uppercase tracking-wider text-right">
                {STAGES[currentStage].title}
              </span>
            </div>
            <div className="h-3 w-full bg-rose-100 rounded-full overflow-hidden flex">
              {STAGES.map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "h-full flex-1 border-r border-rose-50 last:border-0 transition-colors duration-500",
                    idx < currentStage ? "bg-rose-400" : idx === currentStage ? "bg-rose-300 animate-pulse" : "bg-transparent"
                  )}
                />
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="w-full bg-white rounded-3xl shadow-xl shadow-rose-100/50 p-8 md:p-12 border border-rose-50"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-500">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  {STAGES[currentStage].title}
                </h2>
                
                <div className="w-full flex justify-center">
                  <CurrentComponent onComplete={handleComplete} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-white rounded-3xl shadow-xl shadow-rose-100/50 p-8 md:p-12 border border-rose-50 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                <Baby className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-black text-slate-800 mb-4">
                ¡Misión Cumplida!
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-md">
                Has guiado con éxito el proceso desde la ovulación hasta la implantación. ¡El embarazo ha comenzado!
              </p>
              <button
                onClick={reset}
                className="flex items-center gap-2 px-8 py-4 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-200"
              >
                <RefreshCcw className="w-5 h-5" />
                Jugar de nuevo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
