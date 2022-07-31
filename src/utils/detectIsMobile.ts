export default function detectIsMobile(): boolean {
  const isLandscape = window.screen.orientation.type.startsWith("landscape");
  if (!isLandscape && window.innerWidth <= 768) return true;
  if (isLandscape && window.innerWidth <= 1024) return true;
  return false;
}
