export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-grid" />
      {/* Green blob — top-left area */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] blob-green"
        style={{
          filter: 'blur(60px)',
          animation: 'blob-drift 25s ease-in-out infinite',
        }}
      />
      {/* Cyan blob — bottom-right area */}
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] blob-cyan"
        style={{
          filter: 'blur(60px)',
          animation: 'blob-drift 30s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
}
