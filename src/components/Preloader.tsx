import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onFinish }: { onFinish: () => void }) => {
  const [show, setShow] = useState(true);
  const text = "ONAMKULAM";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinish, 1200);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  // Particle component
  const Particle = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute w-1 h-1 bg-white/30 rounded-full"
      initial={{ 
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        opacity: 0,
        scale: 0
      }}
      animate={{ 
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 1
      }}
    />
  );

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)"
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
              <Particle key={i} delay={i * 0.1} />
            ))}
          </div>

          {/* Main content container */}
          <div className="relative flex flex-col items-center">
            {/* Glowing orb behind text */}
            <motion.div
              className="absolute w-64 h-64 rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)"
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Text container */}
            <div className="relative flex items-center justify-center space-x-1">
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="text-5xl md:text-7xl font-bold tracking-wider text-white"
                  initial={{ 
                    opacity: 0, 
                    y: 50,
                    filter: "blur(10px)"
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    filter: "blur(0px)"
                  }}
                  exit={{
                    opacity: 0,
                    y: -30,
                    filter: "blur(8px)",
                    transition: { 
                      duration: 0.6,
                      delay: index * 0.03,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  style={{
                    textShadow: "0 0 20px rgba(255,255,255,0.3)"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle line */}
            <motion.div
              className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: "200px", 
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                width: { duration: 1.5, delay: 1 },
                opacity: { duration: 2, delay: 0.8, times: [0, 0.1, 0.9, 1] }
              }}
            />

            {/* Loading indicator */}
            <motion.div
              className="mt-8 flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Expanding circle on exit */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-white"
              initial={{ scale: 0, opacity: 0 }}
              exit={{
                scale: 150,
                opacity: 0,
                transition: { 
                  duration: 1.2, 
                  ease: [0.43, 0.13, 0.23, 0.96]
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;