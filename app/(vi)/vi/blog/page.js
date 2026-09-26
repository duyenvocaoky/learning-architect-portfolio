import BlogIndexPage from "@/components/BlogIndexPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("blog", "vi", "/blog/");

export default function Page() {
  return <BlogIndexPage lang="vi" />;
}
