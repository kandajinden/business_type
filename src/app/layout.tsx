import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "キャリア戦闘力診断｜自分だけの勝ち筋を知れ",
  description:
    "無料・3分で完了。あなたのキャリア戦闘力を測定し、8タイプの勝ち筋から「あなたの成果の出し方」を特定。",
  openGraph: {
    title: "あなたの勝ち筋、知ってるか？",
    description:
      "無料・3分で完了。あなたのキャリア戦闘力を測定し、8タイプの勝ち筋から「あなたの成果の出し方」を特定。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className="pt-14 md:pt-16">{children}</main>
      </body>
    </html>
  );
}
