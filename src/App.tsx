import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { TabBar } from '@/components/layout/TabBar';
import { Home } from '@/pages/Home';
import { Plan } from '@/pages/Plan';
import { Explore } from '@/pages/Explore';
import { History } from '@/pages/History';
import { Profile } from '@/pages/Profile';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const pageTransition = {
  type: 'spring',
  damping: 30,
  stiffness: 300,
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showTabBar = ['/', '/explore', '/history', '/profile'].includes(location.pathname);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {showTabBar && <TabBar />}
    </>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan/:id" element={<Plan />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
