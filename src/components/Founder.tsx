import founderImg from "../assets/images/founder.png";
import signatureImg from "../assets/images/signature.png";

interface FounderData {
  id: number;
  name: string;
  quote: string;
  signature: string;
  image: string;
}

const Founder = () => {
  const founderData: FounderData = {
    id: 1,
    name: "Mr. Noby Onamkulam",
    quote:
      "A home is the most honest story a person can tell. My work is simply to listen deeply and design a space where that story—your story—can unfold beautifully, year after year",
    signature: signatureImg.src,
    image: founderImg.src,
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden py-12">
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-6">
          {/* Photo */}
          <div className="w-40 h-52 sm:w-48 sm:h-64 rounded-xl overflow-hidden">
            <img
              src={founderData.image}
              alt={founderData.name}
              className="w-full h-full  object-center"
            />
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-light leading-tight mb-2">
            <span className="block text-black text-sm sm:text-base font-normal mb-2">
              Meet the Visionary Behind Crafting Your Story
            </span>
            <span className="bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent font-bold text-2xl sm:text-3xl">
              {founderData.name}
            </span>
          </h2>

          {/* Quote */}
          <div className="relative max-w-xl mx-auto px-4">
            <div className="absolute -left-2 -top-2 text-3xl sm:text-4xl text-amber-200 font-serif">
              &ldquo;
            </div>
            <blockquote className="text-base sm:text-lg text-amber-800 leading-snug italic">
              {founderData.quote}
            </blockquote>
            <div className="absolute -right-2 -bottom-3 text-3xl sm:text-4xl text-amber-200 font-serif">
              &rdquo;
            </div>
          </div>

          {/* Signature */}
          <div className="pt-4 border-t border-amber-200 w-full max-w-xs mx-auto">
            <img
              src={founderData.signature}
              alt="Signature"
              className="mx-auto w-32 sm:w-40 object-contain"
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Photo */}
          <div className="flex justify-center">
            <div className="w-80 h-96 lg:w-96 lg:h-[32rem] rounded-2xl overflow-hidden ">
              <img
                src={founderData.image}
                alt={founderData.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center text-left space-y-8">
            <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-16">
              <span className="block text-black text-2xl lg:text-3xl font-normal mb-10">
                Meet the Visionary Behind Crafting Your Story
              </span>
              <span className="bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent font-bold">
                {founderData.name}
              </span>
            </h2>

            {/* Quote */}
            <div className="relative max-w-xl mt-16">
              <div className="absolute -left-4 -top-2 text-6xl text-amber-200 font-serif">
                &ldquo;
              </div>
              <blockquote className="text-xl lg:text-2xl text-amber-800 leading-relaxed italic pl-10">
                {founderData.quote}
              </blockquote>
              <div className="absolute -right-4 -bottom-6 text-6xl text-amber-200 font-serif">
                &rdquo;
              </div>
            </div>

            {/* Signature */}
            <div className="pt-6 border-t border-amber-200 w-full max-w-sm">
              <img
                src={founderData.signature}
                alt="Signature"
                className="w-40 lg:w-48 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gray-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-gray-100 rounded-full blur-2xl opacity-20" />
    </div>
  );
};

export default Founder;
