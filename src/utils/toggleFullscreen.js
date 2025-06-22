export const toggleFullscreen = (setFullscreen) => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    setFullscreen(true);
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    setFullscreen(false);
  }
};
