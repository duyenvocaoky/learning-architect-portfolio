import Landing7NgayPage from "@/components/Landing7NgayPage";
import { getContent } from "@/lib/content";
import { asset } from "@/lib/paths";
import { SITE_URL } from "@/lib/meta";

const { meta } = getContent("landing-7-ngay", "vi");

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: meta.title,
  description: meta.description,
  openGraph: { type: "website", title: meta.title, description: meta.description, locale: "vi_VN", images: [{ url: asset("/og.png"), width: 1200, height: 630 }] },
  icons: { icon: asset("/icon.png"), apple: asset("/apple-icon.png") },
};

export default function Page() {
  return <Landing7NgayPage />;
}
