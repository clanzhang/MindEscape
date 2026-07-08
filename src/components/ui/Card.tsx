import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Card = ({ children, className = '', onClick, style }: CardProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-soft overflow-hidden
        ${onClick ? 'cursor-pointer active:scale-98' : ''}
        ${className}
      `}
      style={style}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.div>
  );
};
