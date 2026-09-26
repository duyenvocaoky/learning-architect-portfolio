import BlogIndexPage from "@/components/BlogIndexPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("blog", "en", "/blog/");

export default function Page() {
  return <BlogIndexPage lang="en" />;
}
