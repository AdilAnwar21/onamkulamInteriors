// Define the founder data type
import founderImg from "../assets/images/founder.png";
import signatureImg from "../assets/images/signature.png"; // <-- add your signature image

interface FounderData {
  id: number;
  name: string;
  quote: string;
  signature: string; // keep type string, but now hold image path
  image: string;
}

const Founder = () => {
  // Static founder data - no loading state needed
  const founderData: FounderData = {
    id: 1,
    name: "Mr. Noby Onamkulam",
    quote:
      "A home is the most honest story a person can tell. My work is simply to listen deeply and design a space where that story—your story—can unfold beautifully, year after year",
    signature: signatureImg, // use the image instead of text
    image: founderImg,
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden py-6 sm:py-10 lg:py-0">
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Mobile Layout (up to lg) */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-6">
          {/* Photo */}
          <div className="relative">
            <div className="w-40 h-52 sm:w-48 sm:h-64 rounded-xl shadow-lg overflow-hidden">
              <img
                src={founderData.image}
                alt={founderData.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 border-2 border-amber-200/30 rounded-xl" />
            </div>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-xl sm:text-2xl font-light leading-tight mb-2">
              <span className="block text-amber-700 text-sm sm:text-base font-normal mb-2">
                Meet the Visionary Behind Crafting Your Story
              </span>
              <span className="bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent font-bold text-2xl sm:text-3xl">
                {founderData.name}
              </span>
            </h2>
          </div>

          {/* Quote */}
          <div className="relative px-2 sm:px-4">
            <div className="absolute -left-2 -top-2 text-3xl sm:text-4xl text-amber-200 font-serif">
              "
            </div>
            <blockquote className="text-base sm:text-lg text-amber-800 leading-snug italic px-4">
              {founderData.quote}
            </blockquote>
            <div className="absolute -right-2 -bottom-3 text-3xl sm:text-4xl text-amber-200 font-serif">
              "
            </div>
          </div>

          {/* Signature Image */}
          <div className="pt-4 border-t border-amber-200 w-full max-w-xs mx-auto">
            <img
              src={founderData.signature}
              alt="Signature"
              className="mx-auto w-32 sm:w-40 object-contain"
            />
          </div>

          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-amber-600 to-transparent mt-4" />
        </div>

        {/* Desktop Layout (lg and up) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-96 lg:w-96 lg:h-[32rem] rounded-2xl relative overflow-hidden">
                <img
                  src={founderData.image}
                  alt={founderData.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-200/20 rounded-full blur-sm" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-orange-200/15 rounded-full blur-md" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-amber-900 space-y-8 lg:pl-8">
            <div>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light leading-tight mb-2">
                <span className="block text-amber-700 text-2xl lg:text-3xl font-normal mb-4">
                  Meet the man behind all of this
                </span>
                <span className="bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent font-bold">
                  {founderData.name}
                </span>
              </h2>
            </div>

            {/* Quote */}
            <div className="relative">
              <div className="absolute -left-4 -top-2 text-6xl text-amber-200 font-serif">
                "
              </div>
              <blockquote className="text-xl lg:text-2xl text-amber-800 leading-relaxed italic pl-8 pr-4">
                {founderData.quote}
              </blockquote>
              <div className="absolute -right-4 -bottom-6 text-6xl text-amber-200 font-serif">
                "
              </div>
            </div>

            {/* Signature Image */}
            <div className="pt-8 border-t border-amber-200">
              <img
                src={founderData.signature}
                alt="Signature"
                className="w-40 lg:w-48 object-contain"
              />
            </div>

            <div className="w-24 h-0.5 bg-gradient-to-r from-amber-600 to-transparent mt-8" />
          </div>
        </div>
      </div>

      {/* Ambient effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-80 sm:h-80 bg-gray-50 rounded-full blur-3xl opacity-30 lg:w-96 lg:h-96" />
      <div className="absolute bottom-1/4 right-1/4 w-52 h-52 sm:w-60 sm:h-60 bg-gray-100 rounded-full blur-2xl opacity-20 lg:w-64 lg:h-64" />
    </div>
  );
};

export default Founder;
