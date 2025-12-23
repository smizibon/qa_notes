interface TipBoxProps {
  children: React.ReactNode;
}

export default function TipBox({ children }: TipBoxProps) {
  return (
    <div className="mt-6 bg-gradient-to-r from-blue-950/50 to-cyan-950/30 backdrop-blur-sm border-l-4 border-blue-400 rounded-2xl p-5 relative overflow-hidden group hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <p className="text-sm text-blue-100 relative z-10 leading-relaxed">
        <strong className="font-semibold text-blue-300 text-base">💡 Tip:</strong> {children}
      </p>
    </div>
  );
}
