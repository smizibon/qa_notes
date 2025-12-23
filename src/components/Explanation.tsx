interface ExplanationProps {
  children: React.ReactNode;
}

export default function Explanation({ children }: ExplanationProps) {
  return (
    <p className="text-gray-300 leading-relaxed">
      {children}
    </p>
  );
}
