import { RevealTracker } from "@/components/RevealTracker";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-enter">
      <RevealTracker />
      {children}
    </div>
  );
}
