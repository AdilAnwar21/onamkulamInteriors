import React from 'react';

interface QuoteProps {
  scrollProgress: number;
}

const Quote: React.FC<QuoteProps> = ({ scrollProgress }) => {
  const quote = "Design is not just what it looks like and feels like. Design is how it works.";
  
  // Calculate how many characters should be visible based on scroll progress
  // Use 70% of scroll progress for quote, leave 30% for author and hold time
  const totalChars = quote.length;
  const quoteProgress = Math.min(1, scrollProgress / 0.7);
  const visibleChars = Math.floor(quoteProgress * totalChars);
  
  // Calculate author visibility (starts after quote is complete, at 70% scroll progress)
//   const authorProgress = Math.max(0, (scrollProgress - 0.7) / 0.2);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Quote */}
        <blockquote className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-black mb-8">
          {quote.split('').map((char, index) => {
            const isVisible = index < visibleChars;
            // const charProgress = Math.max(0, Math.min(1, (visibleChars - index) / 5));
            
            return (
              <span
                key={index}
                className={`inline-block transition-all duration-300 ease-out ${
                  char === ' ' ? 'w-4' : ''
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  transitionDelay: `${index * 20}ms`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </blockquote>
        
        {/* Author */}
        
      </div>
    </div>
  );
};

export default Quote;