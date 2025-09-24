import React from 'react';

const Footer = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Pattern/Texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top Section */}
        <div className="flex-1 px-8 lg:px-16 xl:px-24 pt-16 lg:pt-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 h-full">
              
              {/* Left Column - Brand Statement */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="mb-8 lg:mb-12">
                    <h1 className="text-white text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight">
                      ONAMKULAM
                    </h1>
                  </div>
                  
                  <p className="text-gray-300 text-lg lg:text-xl xl:text-2xl leading-relaxed font-light max-w-md">
                    We transform your<br />
                    vision into beautifully<br />
                    crafted spaces.
                  </p>
                </div>

                {/* Bottom Left - Copyright */}
                <div className="hidden lg:block">
                  <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
                    <span>© All rights Reserved</span>
                    <span>Privacy policy</span>
                    <span>Terms of Service</span>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">
                    mailto: hi@onamkulam.com
                  </div>
                </div>
              </div>

              {/* Middle Column - Navigation */}
              <div className="lg:col-span-3 lg:col-start-7">
                <nav className="space-y-6">
                  <a href="#" className="block text-white text-xl lg:text-2xl hover:text-gray-300 transition-colors duration-300">
                    Home
                  </a>
                  <a href="#" className="block text-white text-xl lg:text-2xl hover:text-gray-300 transition-colors duration-300">
                    Projects
                  </a>
                  <a href="#" className="block text-white text-xl lg:text-2xl hover:text-gray-300 transition-colors duration-300">
                    About Us
                  </a>
                  <a href="#" className="block text-white text-xl lg:text-2xl hover:text-gray-300 transition-colors duration-300">
                    Contact
                  </a>
                </nav>

                {/* Phone Number */}
                <div className="mt-12 lg:mt-16">
                  <p className="text-gray-400 text-base lg:text-lg">
                    (099) 791-00-75
                  </p>
                </div>
              </div>

              {/* Right Column - Social Links */}
              <div className="lg:col-span-3 lg:col-start-10 flex lg:justify-end">
                <div className="space-y-6">
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-300 text-base lg:text-lg">
                    Instagram
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-300 text-base lg:text-lg">
                    Behance
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-300 text-base lg:text-lg">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Large Email */}
        <div className="px-8 lg:px-16 xl:px-24 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              
              {/* Large Email */}
              <div className="flex-1">
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-none tracking-tight">
                  hi@onamkulam.com
                </h2>
              </div>

              {/* Address */}
              <div className="lg:text-right">
                <div className="text-gray-400 text-base lg:text-lg space-y-1">
                  <p>France, Paris</p>
                  <p>Str. Beliеvein Yourself 29</p>
                  <p>App. 390</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Copyright */}
        <div className="lg:hidden px-8 pb-8">
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-2">
            <span>© All rights Reserved</span>
            <span>Privacy policy</span>
            <span>Terms of Service</span>
          </div>
          <div className="text-gray-500 text-sm">
            mailto: hi@onamkulam.com
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-white opacity-30 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-white opacity-50 rounded-full animate-pulse delay-1000 hidden lg:block"></div>
      
      {/* Framer Attribution (as shown in design) */}
      
    </div>
  );
};

export default Footer;