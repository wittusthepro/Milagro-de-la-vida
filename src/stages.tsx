import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Clock } from 'lucide-react';
import { cn } from './lib/utils';

export const Stage1 = ({ onComplete }: { onComplete: () => void }) => {
  const [order, setOrder] = useState<string[]>([]);
  const hormones = ['LH', 'FSH', 'Estrógeno'];
  const correctOrder = ['FSH', 'Estrógeno', 'LH'];

  const handleSelect = (h: string) => {
    if (order.includes(h)) return;
    const newOrder = [...order, h];
    setOrder(newOrder);
    if (newOrder.length === 3) {
      if (newOrder.join(',') === correctOrder.join(',')) {
        setTimeout(onComplete, 1000);
      } else {
        setTimeout(() => setOrder([]), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-lg text-center text-slate-600">
        Para comenzar el viaje, el ovario debe liberar un óvulo. Selecciona las hormonas en el orden correcto para provocar la ovulación.
      </p>
      <div className="flex gap-4">
        {hormones.map((h) => (
          <button
            key={h}
            onClick={() => handleSelect(h)}
            disabled={order.includes(h)}
            className={cn(
              "px-6 py-3 rounded-xl font-semibold text-lg transition-all",
              order.includes(h) ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-pink-100 text-pink-600 hover:bg-pink-200 hover:scale-105 active:scale-95 shadow-sm"
            )}
          >
            {h}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-24 h-12 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center font-medium text-slate-500">
            {order[i] || '?'}
          </div>
        ))}
      </div>
      {order.length === 3 && order.join(',') !== correctOrder.join(',') && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-medium">
          Orden incorrecto. ¡Inténtalo de nuevo!
        </motion.p>
      )}
      {order.length === 3 && order.join(',') === correctOrder.join(',') && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 font-medium flex items-center gap-2">
          <Check className="w-5 h-5" /> ¡Ovulación exitosa!
        </motion.p>
      )}
    </div>
  );
};

export const Stage2 = ({ onComplete }: { onComplete: () => void }) => {
  const [guess, setGuess] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim().toUpperCase() === 'COLESTEROL') {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-lg text-center text-slate-600">
        Los espermatozoides viajan por el tracto femenino y sufren la "capacitación" para volverse hiperactivos. ¿Qué molécula se elimina de su membrana para permitir esto?
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          placeholder="Escribe la molécula..."
          className={cn(
            "w-full px-4 py-3 rounded-xl border-2 text-center text-xl font-bold tracking-widest outline-none transition-colors",
            error ? "border-red-400 bg-red-50 text-red-600" : "border-blue-200 focus:border-blue-400 text-blue-700"
          )}
        />
        <button type="submit" className="px-8 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-md">
          Comprobar
        </button>
      </form>
      <p className="text-sm text-slate-400 italic">Pista: Empieza por C y termina en L.</p>
    </div>
  );
};

export const Stage3 = ({ onComplete }: { onComplete: () => void }) => {
  const options = ['Acrosina', 'Hialuronidasa', 'Pepsina', 'Amilasa'];
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (opt: string) => {
    setSelected(opt);
    if (opt === 'Hialuronidasa') {
      setTimeout(onComplete, 1000);
    } else {
      setTimeout(() => setSelected(null), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-lg text-center text-slate-600">
        El óvulo está rodeado por la Corona Radiata, unida por ácido hialurónico. ¿Qué enzima necesita el espermatozoide para abrirse paso?
      </p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            disabled={selected !== null}
            className={cn(
              "px-4 py-4 rounded-xl font-medium text-lg transition-all border-2",
              selected === opt && opt === 'Hialuronidasa' ? "bg-green-100 border-green-400 text-green-700" :
              selected === opt && opt !== 'Hialuronidasa' ? "bg-red-100 border-red-400 text-red-700" :
              "bg-white border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export const Stage4 = ({ onComplete }: { onComplete: () => void }) => {
  const [code, setCode] = useState('');
  const keys = ['Z', 'X', 'P', 'A', '1', '2', '3', '4', 'C'];

  const handlePress = (k: string) => {
    if (k === 'C') {
      setCode('');
      return;
    }
    if (code.length >= 3) return;
    
    const next = code + k;
    setCode(next);
    
    if (next === 'ZP3') {
      setTimeout(onComplete, 800);
    } else if (next.length === 3) {
      setTimeout(() => setCode(''), 800);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-lg text-center text-slate-600">
        El espermatozoide ha llegado a la Zona Pelúcida. Debe unirse a un receptor específico para liberar sus enzimas. Introduce el código del receptor.
      </p>
      
      <div className="w-48 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-3xl font-mono text-green-400 tracking-widest shadow-inner">
        {code.padEnd(3, '_')}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => handlePress(k)}
            className={cn(
              "w-14 h-14 rounded-full font-bold text-xl shadow-sm transition-transform active:scale-90",
              k === 'C' ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            {k}
          </button>
        ))}
      </div>
      {code.length === 3 && code !== 'ZP3' && (
        <p className="text-red-500 font-medium">Acceso denegado</p>
      )}
      {code === 'ZP3' && (
        <p className="text-green-500 font-medium">Reacción acrosómica iniciada</p>
      )}
    </div>
  );
};

export const Stage5 = ({ onComplete }: { onComplete: () => void }) => {
  const [active, setActive] = useState([false, false, false, false, false]);
  const [timeLeft, setTimeLeft] = useState(8);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started && timeLeft > 0 && !active.every(Boolean)) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !active.every(Boolean)) {
      setStarted(false);
      setActive([false, false, false, false, false]);
      setTimeLeft(8);
    }
  }, [started, timeLeft, active]);

  useEffect(() => {
    if (active.every(Boolean) && started) {
      setTimeout(onComplete, 500);
    }
  }, [active, started, onComplete]);

  const handleClick = (index: number) => {
    if (!started) setStarted(true);
    const newActive = [...active];
    newActive[index] = true;
    setActive(newActive);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-lg text-center text-slate-600">
        ¡Un espermatozoide ha entrado! Rápido, evita la polispermia. Activa los 5 gránulos corticales antes de que se acabe el tiempo para endurecer la cubierta.
      </p>
      
      <div className="text-2xl font-bold flex items-center gap-2">
        <Clock className={cn("w-6 h-6", timeLeft <= 3 ? "text-red-500 animate-pulse" : "text-slate-500")} />
        <span className={timeLeft <= 3 ? "text-red-500" : "text-slate-700"}>00:0{timeLeft}</span>
      </div>

      <div className="relative w-64 h-64 bg-orange-50 rounded-full border-4 border-orange-200 p-4">
        {active.map((isActive, i) => {
          const positions = [
            { top: '10%', left: '40%' },
            { top: '40%', left: '10%' },
            { top: '70%', left: '30%' },
            { top: '60%', left: '70%' },
            { top: '20%', left: '70%' },
          ];
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={isActive}
              style={positions[i]}
              className={cn(
                "absolute w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center",
                isActive ? "bg-green-400 scale-110 shadow-lg shadow-green-200" : "bg-orange-400 hover:bg-orange-500 hover:scale-105 animate-bounce shadow-md"
              )}
            >
              {isActive && <Check className="w-6 h-6 text-white" />}
            </button>
          );
        })}
      </div>
      {!started && timeLeft === 8 && (
        <p className="text-sm text-slate-500 animate-pulse">Haz clic en un gránulo para empezar</p>
      )}
      {timeLeft === 0 && !active.every(Boolean) && (
        <p className="text-red-500 font-medium">¡Tiempo agotado! Inténtalo de nuevo.</p>
      )}
    </div>
  );
};

export const Stage6 = ({ onComplete }: { onComplete: () => void }) => {
  const [val, setVal] = useState(0);

  const handleSubmit = () => {
    if (val === 46) {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      <p className="text-lg text-center text-slate-600">
        Los pronúcleos masculino y femenino se unen. Cada uno aporta 23 cromosomas. Ajusta el medidor para formar un cigoto diploide sano.
      </p>
      
      <div className="w-full px-4 py-8 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-6">
        <div className="text-5xl font-black text-indigo-500">
          {val}
        </div>
        
        <input
          type="range"
          min="0"
          max="50"
          value={val}
          onChange={(e) => setVal(parseInt(e.target.value))}
          className="w-full h-3 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors shadow-md w-full"
        >
          Fusionar Pronúcleos
        </button>
      </div>
    </div>
  );
};

export const Stage7 = ({ onComplete }: { onComplete: () => void }) => {
  const [order, setOrder] = useState<string[]>([]);
  const stages = ['Mórula', 'Blastocisto', 'Cigoto'];
  const correctOrder = ['Cigoto', 'Mórula', 'Blastocisto'];

  const handleSelect = (s: string) => {
    if (order.includes(s)) return;
    const newOrder = [...order, s];
    setOrder(newOrder);
    if (newOrder.length === 3) {
      if (newOrder.join(',') === correctOrder.join(',')) {
        setTimeout(onComplete, 1000);
      } else {
        setTimeout(() => setOrder([]), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-lg text-center text-slate-600">
        El cigoto viaja hacia el útero mientras se divide. Ordena las etapas de desarrollo correctamente.
      </p>
      <div className="flex gap-4">
        {stages.map((s) => (
          <button
            key={s}
            onClick={() => handleSelect(s)}
            disabled={order.includes(s)}
            className={cn(
              "px-6 py-3 rounded-xl font-semibold text-lg transition-all",
              order.includes(s) ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-teal-100 text-teal-700 hover:bg-teal-200 hover:scale-105 active:scale-95 shadow-sm"
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-4 items-center">
        {[0, 1, 2].map((i) => (
          <React.Fragment key={i}>
            <div className="w-28 h-12 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center font-medium text-slate-500 bg-white">
              {order[i] || '?'}
            </div>
            {i < 2 && <ArrowRight className="text-slate-300" />}
          </React.Fragment>
        ))}
      </div>
      {order.length === 3 && order.join(',') !== correctOrder.join(',') && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-medium">
          Ese no es el orden correcto.
        </motion.p>
      )}
      {order.length === 3 && order.join(',') === correctOrder.join(',') && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 font-medium">
          ¡Desarrollo correcto!
        </motion.p>
      )}
    </div>
  );
};

export const Stage8 = ({ onComplete }: { onComplete: () => void }) => {
  const [layer, setLayer] = useState('');
  const [day, setDay] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (layer === 'Endometrio' && day === '6-7') {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      <p className="text-lg text-center text-slate-600">
        El blastocisto ha llegado al útero. Debe unirse a la pared uterina para continuar su desarrollo. Selecciona el lugar y el momento correctos.
      </p>
      
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-slate-700">Capa del útero:</label>
          <select 
            value={layer} 
            onChange={(e) => setLayer(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 bg-white focus:border-rose-400 outline-none text-slate-700"
          >
            <option value="">Selecciona una capa...</option>
            <option value="Miometrio">Miometrio</option>
            <option value="Endometrio">Endometrio</option>
            <option value="Perimetrio">Perimetrio</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-slate-700">Día post-fecundación:</label>
          <select 
            value={day} 
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 bg-white focus:border-rose-400 outline-none text-slate-700"
          >
            <option value="">Selecciona el día...</option>
            <option value="1">Día 1</option>
            <option value="3">Día 3</option>
            <option value="6-7">Días 6-7</option>
            <option value="14">Día 14</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!layer || !day}
          className="w-full px-8 py-3 bg-rose-500 text-white rounded-xl font-semibold hover:bg-rose-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          Implantar
        </button>
      </div>
      
      {error && (
        <p className="text-red-500 font-medium">Lugar o momento incorrecto. El blastocisto no puede sobrevivir ahí.</p>
      )}
    </div>
  );
};
