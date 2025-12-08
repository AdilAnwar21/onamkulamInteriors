import React, { memo } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface QuoteProps {
  scrollProgress: MotionValue<number>;
}

const QuoteChar = ({ char, index, progress, totalChars }: { char: string, index: number, progress: MotionValue<number>, totalChars: number }) => {
  // Logic: Use 70% of scroll progress for the quote animation
  // Check if this char index is less than visible count
  const opacity = useTransform(progress, p => {
    const quoteProgress = Math.min(1, Math.max(0, p / 0.7));
    const visibleChars = Math.floor(quoteProgress * totalChars);
    return index < visibleChars ? 1 : 0;
  });

  const transform = useTransform(progress, p => {
    const quoteProgress = Math.min(1, Math.max(0, p / 0.7));
    const visibleChars = Math.floor(quoteProgress * totalChars);
    return index < visibleChars ? 'translate3d(0,0,0)' : 'translate3d(0, 20px, 0)';
  });

  return (
    <motion.span
      className="inline-block"
      style={{
        opacity,
        transform,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out', // Keep for smoothing/fallback
        willChange: 'opacity, transform'
      }}
    >
      {char}
    </motion.span>
  );
};

const Quote: React.FC<QuoteProps> = memo(({ scrollProgress }) => {
  const quote = "How Your Story Unfolds";
  const words = quote.split(' ');
  let globalCharIndex = 0;
  const totalChars = quote.length;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">

        <blockquote className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-black mb-8 flex flex-wrap justify-center gap-y-2">
          {words.map((word, wordIndex) => {
            return (
              <span
                key={wordIndex}
                className="inline-block whitespace-nowrap mr-[0.25em]"
              >
                {word.split('').map((char, charIndex) => {
                  const el = (
                    <QuoteChar
                      key={charIndex}
                      char={char}
                      index={globalCharIndex}
                      progress={scrollProgress}
                      totalChars={totalChars}
                    />
                  );
                  globalCharIndex++;
                  return el;
                })}
              </span>
            );
          })}
        </blockquote>

      </div>
    </div>
  );
});

export default Quote;