import { motion } from 'framer-motion';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input = ({ value, onChange, placeholder, className = '' }: InputProps) => {
  return (
    <motion.div
      className={`
        bg-white rounded-2xl shadow-soft p-4
        border-2 border-transparent focus-within:border-sage/30
        transition-all duration-300
        ${className}
      `}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-transparent text-base text-deep-gray placeholder-deep-gray/40
          resize-none outline-none leading-relaxed"
      />
    </motion.div>
  );
};
