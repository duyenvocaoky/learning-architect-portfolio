import BlogPostPage from "@/components/BlogPostPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("blog/how-i-design-a-course", "vi", "/blog/how-i-design-a-course/");

export default function Page() {
  return <BlogPostPage slug="how-i-design-a-course" lang="vi" />;
}
