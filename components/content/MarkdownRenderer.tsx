"use client";

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-gray w-full max-w-none [&>*:first-child]:!mt-0 md:overflow-x-visible overflow-x-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Custom image component - mobile responsive with proxy for CORS
          img: ({ node, ...props }) => {
            const { src, alt } = props;
            if (!src) return null;

            // Proxy Google Drive images through our API to avoid CORS issues
            const proxiedSrc = src.includes('drive.google.com')
              ? `/api/proxy-image?url=${encodeURIComponent(src)}`
              : src;

            return (
              <span className="block my-4 md:my-6 w-full">
                <img
                  src={proxiedSrc}
                  alt={alt || 'Course Image'}
                  className="rounded-lg shadow-md w-full h-auto object-contain"
                  style={{ maxWidth: '100%' }}
                  loading="lazy"
                  onError={(e) => {
                    console.error('Image failed to load:', src);
                    // Fallback: show a placeholder
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      const fallback = document.createElement('div');
                      fallback.className = 'bg-gray-100 rounded-lg p-4 text-center text-gray-500 text-sm';
                      fallback.textContent = 'Image could not be loaded';
                      target.parentElement.appendChild(fallback);
                    }
                  }}
                />
              </span>
            );
          },

          // Custom heading styles - mobile responsive
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 !mt-0 mb-3 md:mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-5 md:mt-6 mb-2 md:mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mt-4 mb-2" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mt-3 mb-1.5" {...props} />
          ),

          // Custom paragraph styling - mobile responsive
          p: ({ node, ...props }) => (
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4" {...props} />
          ),

          // Custom code block styling - mobile responsive
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="bg-gray-100 text-gray-800 px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono whitespace-nowrap"
                  style={{ wordBreak: 'keep-all' }}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className={`block bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm font-mono ${className || ''}`}
                {...props}
              >
                {children}
              </code>
            );
          },

          // Custom list styling - mobile responsive
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mb-3 md:mb-4 text-sm sm:text-base text-gray-700 pl-2 sm:pl-0" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 mb-3 md:mb-4 text-sm sm:text-base text-gray-700 pl-2 sm:pl-0" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),

          // Custom link styling - mobile responsive
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:text-blue-800 underline text-sm sm:text-base break-words"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // Custom blockquote styling - mobile responsive
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-2 sm:border-l-4 border-blue-500 pl-3 sm:pl-4 italic text-gray-600 my-3 md:my-4 text-sm sm:text-base"
              {...props}
            />
          ),

          // Custom table styling - fully mobile responsive
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3 md:my-4 -mx-2 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200 border text-xs sm:text-sm" {...props} />
              </div>
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-50 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border-t text-xs sm:text-sm text-gray-700" {...props} />
          ),

          // Custom hr styling - mobile responsive
          hr: ({ node, ...props }) => (
            <hr className="my-4 md:my-6 border-gray-300" {...props} />
          ),

          // Custom strong/bold styling
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-gray-900" {...props} />
          ),

          // Custom em/italic styling
          em: ({ node, ...props }) => (
            <em className="italic" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
