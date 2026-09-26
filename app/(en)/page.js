import HomePage from "@/components/HomePage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("home", "en", "/");

export default function Page() {
  return <HomePage lang="en" />;
}
