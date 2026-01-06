import { NextRequest, NextResponse } from 'next/server';

// Server-side image cache to prevent repeated fetches from Google Drive
// This dramatically reduces network egress costs
interface CachedImage {
  buffer: ArrayBuffer;
  contentType: string;
  timestamp: number;
}

const imageCache = new Map<string, CachedImage>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 100; // Maximum number of images to cache

// Clean up old cache entries periodically
function cleanupCache() {
  const now = Date.now();
  for (const [key, value] of imageCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      imageCache.delete(key);
    }
  }
  // If still over limit, remove oldest entries
  if (imageCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(imageCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE);
    toRemove.forEach(([key]) => imageCache.delete(key));
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing image URL', { status: 400 });
  }

  // Create cache key from URL
  const cacheKey = imageUrl;

  // Check cache first
  const cached = imageCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return new NextResponse(cached.buffer, {
      status: 200,
      headers: {
        'Content-Type': cached.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'HIT',
      },
    });
  }

  try {
    // Extract file ID from Google Drive URL and try multiple formats
    let fetchUrl = imageUrl;
    const fileIdMatch = imageUrl.match(/[?&]id=([a-zA-Z0-9_-]+)|\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1] || fileIdMatch[2];

      // Try the thumbnail format first (works for publicly shared images)
      fetchUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
    }

    // Fetch the image with proper headers and follow redirects
    const response = await fetch(fetchUrl, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      return new NextResponse(`Failed to fetch image: ${response.status}`, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Check if Google Drive returned HTML instead of an image
    if (contentType.includes('text/html')) {
      console.error('Google Drive returned HTML - image may not be publicly accessible');
      return new NextResponse('Image is not publicly accessible. Please check Google Drive sharing settings.', { status: 403 });
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();

    // Store in cache
    imageCache.set(cacheKey, {
      buffer: imageBuffer,
      contentType,
      timestamp: Date.now(),
    });

    // Cleanup old entries periodically
    if (imageCache.size > MAX_CACHE_SIZE * 0.9) {
      cleanupCache();
    }

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return new NextResponse(`Failed to load image: ${error}`, { status: 500 });
  }
}
