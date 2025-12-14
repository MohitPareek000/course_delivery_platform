"use client";

import * as React from "react";

const BRANDFETCH_CLIENT_ID = "1idHfSqccAbp2Vb4wMw";

const companies = [
  {
    name: "Swiggy",
    logo: `https://cdn.brandfetch.io/swiggy.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#FC8019",
    textColor: "#FFFFFF"
  },
  {
    name: "Zomato",
    logo: `https://cdn.brandfetch.io/zomato.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#E23744",
    textColor: "#FFFFFF"
  },
  {
    name: "Cred",
    logo: `https://cdn.brandfetch.io/cred.club/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#0B0B0B",
    textColor: "#FFFFFF"
  },
  {
    name: "Accenture",
    logo: `https://cdn.brandfetch.io/accenture.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#A100FF",
    textColor: "#FFFFFF"
  },
  {
    name: "PhonePe",
    logo: `https://cdn.brandfetch.io/phonepe.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#5F259F",
    textColor: "#FFFFFF"
  },
  {
    name: "Paytm",
    logo: `https://cdn.brandfetch.io/paytm.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#00BAF2",
    textColor: "#FFFFFF"
  },
  {
    name: "Flipkart",
    logo: `https://cdn.brandfetch.io/flipkart.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#2874F0",
    textColor: "#FFFFFF"
  },
  {
    name: "Amazon",
    logo: `https://cdn.brandfetch.io/amazon.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#FF9900",
    textColor: "#000000"
  },
  {
    name: "Google",
    logo: `https://cdn.brandfetch.io/google.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#4285F4",
    textColor: "#FFFFFF"
  },
  {
    name: "Microsoft",
    logo: `https://cdn.brandfetch.io/microsoft.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#00A4EF",
    textColor: "#FFFFFF"
  },
];

export function CompanyLogosCarousel() {
  const [failedLogos, setFailedLogos] = React.useState<string[]>([]);

  const handleImageError = (companyName: string) => {
    setFailedLogos(prev => [...prev, companyName]);
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-4 sm:px-8 lg:px-16">
      <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Main Heading */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Learn, Practice & Crack
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            Master in-demand skills with expert-curated courses
          </p>
        </div>

        {/* Company Logos - Horizontal Scrolling */}
        <div className="pt-2 sm:pt-4">
          <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6 lg:mb-8">
            Get interview-ready for Top Tech Companies
          </p>

          <div className="relative overflow-hidden py-4 sm:py-6">
            {/* Gradient fade overlays - stronger fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <div className="flex animate-scroll-logos items-center">
              {/* First set */}
              {companies.map((company, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-3 sm:mx-4 lg:mx-6"
                >
                  <div className="h-16 w-16 flex items-center justify-center p-2 hover:scale-110 transition-transform duration-300">
                    {!failedLogos.includes(company.name) ? (
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-full h-full object-contain"
                        onError={() => handleImageError(company.name)}
                        loading="eager"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <span
                        className="font-bold text-sm text-center"
                        style={{ color: company.bgColor }}
                      >
                        {company.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {companies.map((company, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-3 sm:mx-4 lg:mx-6"
                >
                  <div className="h-16 w-16 flex items-center justify-center p-2 hover:scale-110 transition-transform duration-300">
                    {!failedLogos.includes(company.name) ? (
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-full h-full object-contain"
                        onError={() => handleImageError(company.name)}
                        loading="eager"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <span
                        className="font-bold text-sm text-center"
                        style={{ color: company.bgColor }}
                      >
                        {company.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
