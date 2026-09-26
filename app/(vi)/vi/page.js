import HomePage from "@/components/HomePage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("home", "vi", "/");

export default function Page() {
  return <HomePage lang="vi" />;
}
