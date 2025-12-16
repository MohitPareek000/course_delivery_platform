import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing image URL', { status: 400 });
  }

  try {
    // Extract file ID from Google Drive URL and try multiple formats
    let fetchUrl = imageUrl;
    const fileIdMatch = imageUrl.match(/[?&]id=([a-zA-Z0-9_-]+)|\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1] || fileIdMatch[2];

      // Try the thumbnail format first (works for publicly shared images)
      fetchUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
      console.log('Attempting Google User Content URL:', fetchUrl);
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

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return new NextResponse(`Failed to load image: ${error}`, { status: 500 });
  }
}
