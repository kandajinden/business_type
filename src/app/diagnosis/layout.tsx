import { DiagnosisProvider } from "@/lib/diagnosisContext";

export default function DiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DiagnosisProvider>{children}</DiagnosisProvider>;
}
