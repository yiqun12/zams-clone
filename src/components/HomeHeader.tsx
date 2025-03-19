import { Logo } from "./Logo";

export function HomeHeader() {
  return (
    <div className="flex flex-col space-y-8">
      <Logo />

      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">
          Hey <span className="bg-gradient-to-r from-[#311D3A] via-[#8C417D] to-[#B7549B] bg-clip-text text-transparent">there</span>,
        </h1>
        <h2 className="text-3xl font-semibold">
          What&#39;s you <span className="bg-gradient-to-r from-[#311D3A] via-[#8C417D] to-[#5E49DB] bg-clip-text text-transparent">like to ask today?</span>
        </h2>
      </div>
    </div>
  );
}
