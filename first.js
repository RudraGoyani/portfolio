// Run this once on each page
window.addEventListener('pagehide', () => {
  // Close WS, stop intervals, etc. if they exist
  if (window.mySocket?.readyState === WebSocket.OPEN) {
    window.mySocket.close(1000, 'page unload');
  }
  clearInterval(window._intervalId);
  clearTimeout(window._timeoutId);
});
