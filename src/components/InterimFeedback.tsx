"use client";

interface Props {
  interimPower: number;
  onContinue: () => void;
}

export default function InterimFeedback({ interimPower, onContinue }: Props) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-[#1A1A1A] rounded-2xl p-8 max-w-md w-full">
        <p className="text-xs text-[#E84715] font-bold tracking-widest mb-4">
          SCANNING...
        </p>
        <p className="text-sm text-[#555555] mb-2">現在の戦闘力</p>
        <p className="power-number text-4xl text-white mb-4">
          推定 {interimPower.toLocaleString()}
        </p>
        <p className="text-sm text-[#CCCCCC] leading-relaxed mb-6">
          まだ本当の力は測りきれていません。
          <br />
          残りの15問で精度が跳ね上がります。
        </p>
        <button
          onClick={onContinue}
          className="btn-primary w-full py-3"
        >
          測定を続ける →
        </button>
      </div>
    </div>
  );
}
