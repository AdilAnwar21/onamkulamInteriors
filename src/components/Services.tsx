import { useRef } from "react";

interface ServicesScrollProps {
  scrollProgress: number;
}

const services = [
  {
    id: 1,
    title: "Renovation & Remodeling",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e9b6c2b5f20?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: 2,
    title: "Interior Design",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1616627982044-8a1b20e3ef5c?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: 3,
    title: "Space Planning",
    images: [
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154356-596af9009c95?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];

const ServicesScroll = ({ scrollProgress }: ServicesScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate which service is active
  const index = Math.floor(scrollProgress * services.length);
  const activeIndex = Math.min(index, services.length - 1);

  return (
    <div ref={containerRef} className="flex w-full h-screen bg-black text-white">
      {/* Left Side - Text */}
      <div className="flex flex-col justify-center items-start w-1/2 px-16">
        <span className="text-sm text-gray-400">Services</span>
        <h2 className="text-6xl font-light leading-tight">
          {services[activeIndex].title}
        </h2>
        <button className="mt-8 flex items-center gap-2 text-white hover:opacity-80 transition">
          View All →
        </button>
      </div>

      {/* Right Side - Scrolling Images */}
      <div className="relative w-1/2 h-full overflow-hidden">
        <div
          className="absolute inset-0 flex flex-col transition-transform duration-500"
          style={{
            transform: `translateY(-${activeIndex * 100}%)`,
          }}
        >
          {services.map((service) =>
            service.images.map((src, i) => (
              <div
                key={`${service.id}-${i}`}
                className="w-full h-screen flex items-center justify-center"
              >
                <img
                  src={src}
                  alt={service.title}
                  className="rounded-2xl w-[90%] h-[85%] object-cover shadow-lg"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesScroll;
