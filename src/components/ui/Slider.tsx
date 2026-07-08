import { useState, useCallback } from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unit?: string;
}

export const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  unit = '',
}: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(event.target.value));
  }, [onChange]);

  const handleMouseDown = useCallback(() => setIsDragging(true), []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-deep-gray/70">{label}</span>
          <span className="text-sm font-medium text-deep-gray">{value}{unit}</span>
        </div>
      )}
      <div className="relative h-2 bg-cream rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-sage rounded-full transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full
            shadow-soft transition-all duration-150 pointer-events-none
            ${isDragging ? 'scale-125' : 'scale-100'}
          `}
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    </div>
  );
};
