import CaseStudyPage from "@/components/CaseStudyPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("retail-talent", "en", "/work/retail-talent/");

export default function Page() {
  return <CaseStudyPage slug="retail-talent" lang="en" />;
}
