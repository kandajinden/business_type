import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "診断結果｜キャリア戦闘力診断",
  description: "あなたのキャリア戦闘力の診断結果を表示します。",
};

interface Props {
  params: Promise<{ resultId: string }>;
}

export default async function ResultIdPage({ params }: Props) {
  const { resultId } = await params;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs text-[#E84715] font-bold tracking-widest mb-1">
        CAREER SCOUTER
      </p>
      <p className="text-xs text-[#555555] mb-8">
        ── 自分だけの勝ち筋を知れ ──
      </p>
      <h1 className="text-xl font-bold text-[#1A1A1A] mb-4">診断結果</h1>
      <p className="text-sm text-[#555555] mb-2">
        結果ID: <span className="font-mono text-[#1A1A1A]">{resultId}</span>
      </p>
      <p className="text-xs text-[#999999]">
        ※ バックエンド連携後に完全な結果画面が表示されます
      </p>
    </div>
  );
}
