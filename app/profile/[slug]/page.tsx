import { headers } from "next/headers";
import PublicProfileCard from "@/app/components/PublicProfileCard";

export default async function PublicProfilePage({ params }: { params: { slug: string } }) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const fetchUrl = `${baseUrl}/api/profile/${params.slug}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 sm:p-10">
        <PublicProfileCard fetchUrl={fetchUrl} />
      </div>
    </div>
  );
}
