import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "キャリア戦闘力診断の結果をシェアされました",
  description:
    "あなたもキャリア戦闘力を測定して、自分だけの勝ち筋を見つけよう。無料・3分で完了。",
  openGraph: {
    title: "お前の勝ち筋、知ってるか？",
    description:
      "あなたもキャリア戦闘力を測定して、自分だけの勝ち筋を見つけよう。無料・3分で完了。",
    type: "website",
  },
};

interface Props {
  params: Promise<{ shareToken: string }>;
}

export default async function SharePage({ params }: Props) {
  const { shareToken } = await params;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs text-[#E84715] font-bold tracking-widest mb-1">
        CAREER SCOUTER
      </p>
      <p className="text-xs text-[#555555] mb-8">
        ── 自分だけの勝ち筋を、知れ。──
      </p>

      <div className="bg-[#1A1A1A] rounded-2xl p-8 max-w-sm w-full mb-8">
        <p className="text-sm text-[#CCCCCC] mb-2">誰かの診断結果が</p>
        <p className="text-sm text-[#CCCCCC] mb-4">シェアされました</p>
        <p className="text-xs text-[#555555]">
          共有トークン: {shareToken.slice(0, 8)}...
        </p>
        <p className="text-xs text-[#999999] mt-4">
          ※ プライバシー保護のため、年齢・性別・職種は表示されません
        </p>
      </div>

      <Link
        href="/"
        className="btn-primary w-[90%] max-w-sm py-4 text-center block"
      >
        あなたも勝ち筋を知る →
      </Link>

      <p className="text-xs text-[#555555] mt-4">無料・3分で完了</p>
    </div>
  );
}
