import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mx-auto">About our apps</h1>

      <p className="text-sm text-white text-center mt-2 max-w-md mx-auto">
        A visual collection of our most recent works - each piece crafted with intention, emotion and style.
      </p>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
        <div className="max-w-sm w-full rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
            alt="Showcase Image"
            width={400}
            height={500}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold">Our Latest Features</h1>
          <p className="text-sm text-white mt-2">
            Ship Beautiful Frontends Without the Overhead — Customizable, Scalable and Developer-Friendly UI Components.
          </p>

          <div className="flex flex-col gap-10 mt-6">

            {/* Feature 1 */}
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <Image
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
                  alt="Flash Emoji"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-white">Lightning-Fast Performance</h3>
                <p className="text-sm text-white">Built with speed — minimal load times and optimized.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <Image
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
                  alt="Color Emoji"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-white">Beautifully Designed Components</h3>
                <p className="text-sm text-white">Modern, pixel-perfect UI components ready for any project.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <Image
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
                  alt="Puzzle Emoji"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-white">Plug-and-Play Integration</h3>
                <p className="text-sm text-white">Simple setup with support for React, Next.js and Tailwind CSS.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
