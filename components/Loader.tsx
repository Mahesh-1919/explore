"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AdaptiveShimmerUIProps {
  className?: string;
  itemCount?: number;
  forceDarkMode?: boolean;
}

export default function Component({
  className,
  itemCount = 8,
  forceDarkMode,
}: AdaptiveShimmerUIProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (forceDarkMode !== undefined) {
      setIsDarkMode(forceDarkMode);
    } else {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      setIsDarkMode(darkModeMediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      darkModeMediaQuery.addEventListener("change", handleChange);

      return () =>
        darkModeMediaQuery.removeEventListener("change", handleChange);
    }
  }, [forceDarkMode]);

  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto p-4 transition-colors ",
        isDarkMode ? "bg-background" : "bg-secondary",
        className
      )}
      role="status"
      aria-label="Loading products"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(itemCount)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-lg shadow-md transition-colors ",
              isDarkMode ? "bg-secondary/50" : "bg-secondary"
            )}
          >
            {/* Product Image */}
            <div
              className={cn(
                "aspect-w-1 aspect-h-1 w-full rounded-lg mb-4 shimmer",
                isDarkMode ? "bg-secondary" : "bg-gray-200"
              )}
            ></div>

            {/* Product Title */}
            <div
              className={cn(
                "h-4 rounded shimmer w-3/4 mb-2",
                isDarkMode ? "bg-secondary" : "bg-gray-200"
              )}
            ></div>
            <div
              className={cn(
                "h-4 rounded shimmer w-1/2 mb-4",
                isDarkMode ? "bg-secondary" : "bg-gray-200"
              )}
            ></div>

            {/* Price */}
            <div
              className={cn(
                "h-6 rounded shimmer w-1/4 mb-4",
                isDarkMode ? "bg-secondary" : "bg-gray-200"
              )}
            ></div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, starIndex) => (
                <div
                  key={starIndex}
                  className={cn(
                    "w-4 h-4 mr-1 rounded shimmer",
                    isDarkMode ? "bg-secondary" : "bg-gray-200"
                  )}
                ></div>
              ))}
              <div
                className={cn(
                  "h-4 rounded shimmer w-8 ml-2",
                  isDarkMode ? "bg-secondary" : "bg-gray-200"
                )}
              ></div>
            </div>

            {/* Action Button */}
            <div
              className={cn(
                "h-10 rounded shimmer w-full",
                isDarkMode ? "bg-secondary" : "bg-gray-200"
              )}
            ></div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes lightShimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes darkShimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .shimmer {
          animation: lightShimmer 2s infinite linear;
          background: linear-gradient(
            to right,
            #f0f0f0 4%,
            #e0e0e0 25%,
            #f0f0f0 36%
          );
          background-size: 1000px 100%;
        }
        :global(.dark) .shimmer {
          animation: darkShimmer 2s infinite linear;
          background: linear-gradient(
            to right,
            #374151 4%,
            #4b5563 25%,
            #374151 36%
          );
          background-size: 1000px 100%;
        }
      `}</style>
    </div>
  );
}
