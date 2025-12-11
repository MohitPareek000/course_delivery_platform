"use client";

import * as React from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  videoUrl: string;
  onProgressUpdate: (watchedDuration: number, totalDuration: number) => void;
  initialProgress?: number;
  classId: string;
  onMarkComplete?: () => void;
}

export function VideoPlayer({
  videoUrl,
  onProgressUpdate,
  initialProgress = 0,
  classId,
}: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [showControls, setShowControls] = React.useState(true);
  const [watchedDuration, setWatchedDuration] = React.useState(initialProgress);
  const hideControlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [youtubePlayer, setYoutubePlayer] = React.useState<any>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Detect mobile device
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  // Check if URL is an iframe-embeddable link (Scaler, YouTube, etc.)
  const isIframeUrl = videoUrl.includes('scaler.com') || videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  // Check if it's a Scaler meeting URL (not embeddable)
  const isScalerMeeting = videoUrl.includes('scaler.com/meetings/');

  // Load YouTube IFrame API
  React.useEffect(() => {
    if (!isIframeUrl || isScalerMeeting || !videoId) return;

    let progressInterval: NodeJS.Timeout | null = null;
    let player: any = null;
    let maxWatchedTime = initialProgress;

    // Load YouTube IFrame API script
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    const initPlayer = () => {
      const container = document.getElementById(`youtube-player-${classId}`);
      if (!container || !videoId) return;

      // Clear any existing iframe in the container
      container.innerHTML = '';

      player = new (window as any).YT.Player(`youtube-player-${classId}`, {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 0,
          controls: 0, // Hide YouTube controls - we'll use custom controls
          modestbranding: 1,
          rel: 0,
          fs: 0, // Disable native fullscreen - we'll use custom fullscreen
          disablekb: 0, // Enable keyboard controls
          iv_load_policy: 3, // Hide video annotations
          cc_load_policy: 0, // Hide closed captions by default
          playsinline: 1, // Play inline on iOS
          origin: window.location.origin, // Set origin for security
          enablejsapi: 1 // Enable JS API for better control
        },
        events: {
          onStateChange: (event: any) => {
            // Update playing state based on YouTube player state
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === (window as any).YT.PlayerState.ENDED) {
              setIsPlaying(false);
              // When video ends, mark as 100% watched
              try {
                if (player && typeof player.getDuration === 'function') {
                  const videoDuration = player.getDuration();
                  if (videoDuration > 0) {
                    setDuration(videoDuration);
                    setWatchedDuration(videoDuration);
                    setCurrentTime(videoDuration);
                    onProgressUpdate(videoDuration, videoDuration);
                  }
                } else if (duration > 0) {
                  // Fallback to stored duration
                  setWatchedDuration(duration);
                  setCurrentTime(duration);
                  onProgressUpdate(duration, duration);
                }
              } catch (error) {
                console.error('Error getting duration on video end:', error);
              }
            }
          },
          onReady: (event: any) => {
            try {
              if (event.target && typeof event.target.getDuration === 'function') {
                const videoDuration = event.target.getDuration();
                if (videoDuration > 0) {
                  setDuration(videoDuration);
                }

                // Resume from saved position if available
                if (initialProgress > 0 && typeof event.target.seekTo === 'function') {
                  // Don't resume if video is almost complete (within last 5 seconds)
                  if (initialProgress < videoDuration - 5) {
                    event.target.seekTo(initialProgress, true);
                    setCurrentTime(initialProgress);
                  }
                }

                // Set up interval to track progress
                if (progressInterval) {
                  clearInterval(progressInterval);
                }

                progressInterval = setInterval(() => {
                  try {
                    if (player && typeof player.getCurrentTime === 'function') {
                      const current = player.getCurrentTime();
                      setCurrentTime(current);

                      // Track maximum watched time (cap at video duration)
                      if (current > maxWatchedTime) {
                        maxWatchedTime = Math.min(current, videoDuration);
                        setWatchedDuration(maxWatchedTime);

                        // Save progress immediately when we reach a new maximum
                        onProgressUpdate(maxWatchedTime, videoDuration);
                      }
                    }
                  } catch (error) {
                    console.error('Error tracking progress:', error);
                  }
                }, 1000);
              }
            } catch (error) {
              console.error('Error in onReady callback:', error);
            }
          }
        }
      });
      setYoutubePlayer(player);
    };

    // Set up the callback
    const currentCallback = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (currentCallback) currentCallback();
      initPlayer();
    };

    // If API is already loaded
    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      if (player && player.destroy) {
        try {
          player.destroy();
        } catch (error) {
          console.error('Error destroying player:', error);
        }
      }
    };
  }, [videoId, isIframeUrl, isScalerMeeting]);

  // Manual complete button handler for iframe videos
  const handleMarkComplete = () => {
    // Mark the video as fully watched
    const estimatedDuration = 600; // 10 minutes default
    const finalDuration = duration > 0 ? duration : estimatedDuration;
    setWatchedDuration(finalDuration);
    setCurrentTime(finalDuration);
    onProgressUpdate(finalDuration, finalDuration);
  };

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);

      // Resume from saved position if available
      if (initialProgress > 0) {
        // Don't resume if video is almost complete (within last 5 seconds)
        if (initialProgress < video.duration - 5) {
          video.currentTime = initialProgress;
          setCurrentTime(initialProgress);
        }
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);

      // Update watched duration (cap at video duration)
      if (video.currentTime > watchedDuration) {
        const cappedDuration = Math.min(video.currentTime, video.duration);
        setWatchedDuration(cappedDuration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [watchedDuration, initialProgress]);

  // Save progress every 5 seconds (for native video only)
  React.useEffect(() => {
    if (isIframeUrl) return; // Skip for YouTube videos - they save progress immediately

    const interval = setInterval(() => {
      if (watchedDuration > 0 && duration > 0) {
        onProgressUpdate(watchedDuration, duration);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [watchedDuration, duration, onProgressUpdate, isIframeUrl]);

  // Hide controls after 3 seconds of inactivity
  const resetHideControlsTimeout = () => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const togglePlay = () => {
    // Handle YouTube player
    if (youtubePlayer) {
      try {
        if (isPlaying) {
          youtubePlayer.pauseVideo();
        } else {
          youtubePlayer.playVideo();
        }
      } catch (error) {
        console.error('Error toggling YouTube playback:', error);
      }
      return;
    }

    // Handle native video
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    // Handle YouTube player
    if (youtubePlayer) {
      try {
        if (isMuted) {
          youtubePlayer.unMute();
        } else {
          youtubePlayer.mute();
        }
        setIsMuted(!isMuted);
      } catch (error) {
        console.error('Error toggling YouTube mute:', error);
      }
      return;
    }

    // Handle native video
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);

    // Handle YouTube player
    if (youtubePlayer) {
      try {
        youtubePlayer.seekTo(newTime, true);
        setCurrentTime(newTime);
      } catch (error) {
        console.error('Error seeking YouTube video:', error);
      }
      return;
    }

    // Handle native video
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const changePlaybackSpeed = () => {
    const currentIndex = playbackSpeeds.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % playbackSpeeds.length;
    const newRate = playbackSpeeds[nextIndex];

    // Handle YouTube player
    if (youtubePlayer) {
      try {
        youtubePlayer.setPlaybackRate(newRate);
        setPlaybackRate(newRate);
      } catch (error) {
        console.error('Error changing YouTube playback speed:', error);
      }
      return;
    }

    // Handle native video
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate;
    }
    setPlaybackRate(newRate);
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        // Try different fullscreen methods for better mobile compatibility
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
          // Safari
          await (container as any).webkitRequestFullscreen();
        } else if ((container as any).mozRequestFullScreen) {
          // Firefox
          await (container as any).mozRequestFullScreen();
        } else if ((container as any).msRequestFullscreen) {
          // IE/Edge
          await (container as any).msRequestFullscreen();
        }

        // On mobile, try to lock orientation to landscape
        if (isMobile && 'screen' in window && 'orientation' in window.screen) {
          try {
            await (window.screen.orientation as any).lock('landscape').catch(() => {
              // Orientation lock might fail, that's okay
            });
          } catch (e) {
            // Orientation lock not supported
          }
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Handle fullscreen change events
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);

      // Unlock orientation when exiting fullscreen
      if (!isCurrentlyFullscreen && isMobile && 'screen' in window && 'orientation' in window.screen) {
        try {
          (window.screen.orientation as any).unlock();
        } catch (e) {
          // Ignore
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [isMobile]);

  // Handle orientation changes on mobile
  React.useEffect(() => {
    if (!isMobile) return;

    const handleOrientationChange = () => {
      // Auto-enter fullscreen when device rotates to landscape
      if (window.matchMedia('(orientation: landscape)').matches && !isFullscreen && isPlaying) {
        toggleFullscreen();
      }
      // Auto-exit fullscreen when device rotates to portrait
      else if (window.matchMedia('(orientation: portrait)').matches && isFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.matchMedia('(orientation: landscape)').addEventListener('change', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.matchMedia('(orientation: landscape)').removeEventListener('change', handleOrientationChange);
    };
  }, [isMobile, isFullscreen, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const watchedPercentage = duration > 0 ? (watchedDuration / duration) * 100 : 0;

  return (
    <>
      {/* Global styles to hide YouTube branding in fullscreen */}
      <style jsx global>{`
        /* Hide YouTube branding and controls in fullscreen */
        :fullscreen .ytp-chrome-top,
        :fullscreen .ytp-watermark,
        :fullscreen .ytp-show-cards-title,
        :fullscreen .ytp-youtube-button,
        :fullscreen .ytp-title,
        :fullscreen .ytp-title-link,
        :fullscreen .ytp-gradient-top,
        :fullscreen .ytp-cards-teaser,
        :fullscreen .ytp-endscreen-content {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* Webkit fullscreen (Safari, Chrome) */
        :-webkit-full-screen .ytp-chrome-top,
        :-webkit-full-screen .ytp-watermark,
        :-webkit-full-screen .ytp-show-cards-title,
        :-webkit-full-screen .ytp-youtube-button,
        :-webkit-full-screen .ytp-title,
        :-webkit-full-screen .ytp-title-link,
        :-webkit-full-screen .ytp-gradient-top,
        :-webkit-full-screen .ytp-cards-teaser,
        :-webkit-full-screen .ytp-endscreen-content {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* Mozilla fullscreen (Firefox) */
        :-moz-full-screen .ytp-chrome-top,
        :-moz-full-screen .ytp-watermark,
        :-moz-full-screen .ytp-show-cards-title,
        :-moz-full-screen .ytp-youtube-button,
        :-moz-full-screen .ytp-title,
        :-moz-full-screen .ytp-title-link,
        :-moz-full-screen .ytp-gradient-top,
        :-moz-full-screen .ytp-cards-teaser,
        :-moz-full-screen .ytp-endscreen-content {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* MS fullscreen (Edge) */
        :-ms-fullscreen .ytp-chrome-top,
        :-ms-fullscreen .ytp-watermark,
        :-ms-fullscreen .ytp-show-cards-title,
        :-ms-fullscreen .ytp-youtube-button,
        :-ms-fullscreen .ytp-title,
        :-ms-fullscreen .ytp-title-link,
        :-ms-fullscreen .ytp-gradient-top,
        :-ms-fullscreen .ytp-cards-teaser,
        :-ms-fullscreen .ytp-endscreen-content {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* Target the YouTube iframe specifically when its container is in fullscreen */
        div:fullscreen iframe[src*="youtube.com"] {
          pointer-events: none !important;
        }

        div:fullscreen iframe[src*="youtube.com"] + * {
          pointer-events: auto !important;
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative bg-black rounded-lg overflow-hidden group"
        onMouseMove={resetHideControlsTimeout}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
      {/* Video Element or Iframe */}
      {isScalerMeeting ? (
        <div className="w-full aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
          <div className="text-center space-y-6">
            <div className="text-7xl mb-4">🎥</div>
            <h3 className="text-2xl font-bold">Watch Video Lesson</h3>
            <p className="text-gray-300 max-w-md text-base leading-relaxed">
              Click the button below to start watching this video lesson.
            </p>
            <a
              href={videoUrl}
              className="inline-flex items-center gap-2 mt-6 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all hover:scale-105 font-semibold text-lg shadow-lg"
            >
              <Play className="w-5 h-5" />
              Watch Video
            </a>
          </div>
        </div>
      ) : isIframeUrl ? (
        <div className="relative">
          <div
            ref={iframeRef}
            id={`youtube-player-${classId}`}
            className="w-full aspect-video"
            onClick={togglePlay}
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full aspect-video"
          onClick={togglePlay}
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      )}

      {/* Play/Pause Overlay - For both YouTube and native video */}
      {!isScalerMeeting && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
          <button
            onClick={togglePlay}
            className={cn(
              "rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors pointer-events-auto",
              isMobile ? "w-24 h-24" : "w-20 h-20"
            )}
          >
            <Play className={cn("text-white ml-1", isMobile ? "w-12 h-12" : "w-10 h-10")} />
          </button>
        </div>
      )}

      {/* Controls - For both YouTube and native video */}
      {!isScalerMeeting && (
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Progress Bar */}
          <div className="mb-3">
            <div className={cn(
              "relative bg-gray-600 rounded-full cursor-pointer",
              isMobile ? "h-2" : "h-1.5"
            )}>
              {/* Watched portion (in light gray) */}
              <div
                className="absolute h-full bg-gray-400 rounded-full"
                style={{ width: `${watchedPercentage}%` }}
              />
              {/* Current playback position */}
              <div
                className="absolute h-full bg-secondary rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className={cn(
                  "absolute inset-0 w-full opacity-0 cursor-pointer",
                  isMobile ? "h-8 -translate-y-3" : "h-full"
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-white">
            <div className={cn("flex items-center", isMobile ? "gap-2" : "gap-3")}>
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className={cn(
                  "hover:bg-white/20 rounded transition-colors touch-manipulation",
                  isMobile ? "p-3" : "p-2"
                )}
              >
                {isPlaying ? (
                  <Pause className={cn(isMobile ? "w-6 h-6" : "w-5 h-5")} />
                ) : (
                  <Play className={cn(isMobile ? "w-6 h-6" : "w-5 h-5")} />
                )}
              </button>

              {/* Volume Button */}
              <button
                onClick={toggleMute}
                className={cn(
                  "hover:bg-white/20 rounded transition-colors touch-manipulation",
                  isMobile ? "p-3" : "p-2"
                )}
              >
                {isMuted ? (
                  <VolumeX className={cn(isMobile ? "w-6 h-6" : "w-5 h-5")} />
                ) : (
                  <Volume2 className={cn(isMobile ? "w-6 h-6" : "w-5 h-5")} />
                )}
              </button>

              {/* Time */}
              <span className={cn(isMobile ? "text-xs" : "text-sm")}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className={cn("flex items-center", isMobile ? "gap-1" : "gap-2")}>
              {/* Playback Speed */}
              <button
                onClick={changePlaybackSpeed}
                className={cn(
                  "hover:bg-white/20 rounded transition-colors touch-manipulation",
                  isMobile ? "px-2 py-2 text-xs" : "px-3 py-1 text-sm"
                )}
              >
                {playbackRate}x
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className={cn(
                  "hover:bg-white/20 rounded transition-colors touch-manipulation",
                  isMobile ? "p-3" : "p-2"
                )}
              >
                <Maximize className={cn(isMobile ? "w-6 h-6" : "w-5 h-5")} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Watch Progress Indicator - For both YouTube and native video */}
      {!isScalerMeeting && watchedPercentage >= 98 && watchedPercentage < 100 && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          Almost done! Keep watching to complete.
        </div>
      )}
      </div>
    </>
  );
}
