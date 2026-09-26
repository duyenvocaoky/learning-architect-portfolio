import CaseStudyPage from "@/components/CaseStudyPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("retail-talent", "vi", "/work/retail-talent/");

export default function Page() {
  return <CaseStudyPage slug="retail-talent" lang="vi" />;
}
