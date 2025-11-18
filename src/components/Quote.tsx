import React, { memo } from 'react';

interface QuoteProps {
  scrollProgress: number;
}

const Quote: React.FC<QuoteProps> = memo(({ scrollProgress }) => {
  const quote = "How Your Story Unfolds";
  
  // Logic: Use 70% of scroll progress for the quote animation
  const totalChars = quote.length;
  // Clamp progress between 0 and 1 based on the 0.7 threshold
  const quoteProgress = Math.min(1, Math.max(0, scrollProgress / 0.7));
  const visibleChars = Math.floor(quoteProgress * totalChars);
  
  // Helper to reconstruct the text into words to prevent mobile line-break issues
  const words = quote.split(' ');
  let globalCharIndex = 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        <blockquote className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-black mb-8 flex flex-wrap justify-center gap-y-2">
          {words.map((word, wordIndex) => {
            
            // Render the word wrapper
            return (
              <span 
                key={wordIndex} 
                // 'whitespace-nowrap' prevents the word from breaking in the middle
                // 'inline-block' allows transforms
                className="inline-block whitespace-nowrap mr-[0.25em]" 
              >
                {word.split('').map((char, charIndex) => {
                  // Determine if this specific character should be visible
                  const isVisible = globalCharIndex < visibleChars;
                  const currentIndex = globalCharIndex;
                  
                  // Increment the global counter so the animation flows through the whole sentence
                  globalCharIndex++;

                  return (
                    <span
                      key={charIndex}
                      className="inline-block"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        // Use translate3d for hardware acceleration
                        transform: isVisible ? 'translate3d(0,0,0)' : 'translate3d(0, 20px, 0)',
                        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                        // Stagger delay slightly for a "typing" effect
                        transitionDelay: `${currentIndex * 30}ms`,
                        willChange: 'opacity, transform'
                      }}
                    >
                      {char}
                    </span>
                  );
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