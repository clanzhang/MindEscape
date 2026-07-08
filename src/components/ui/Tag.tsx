import { motion } from 'framer-motion';

interface TagProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Tag = ({ children, selected = false, onClick, className = '' }: TagProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${selected 
          ? 'bg-sage text-white' 
          : 'bg-cream text-deep-gray border border-sage/20 hover:bg-sage/10'
        }
        active:scale-95 cursor-pointer
        ${className}
      `}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};
