import { SpotifyRefreshTokenViewerCard } from "@/components/spotify-refresh-token-viewer-card";
import { z } from "zod";
import { notFound } from "next/navigation";

export default async function Callback({
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const code = await z.string().safeParseAsync((await searchParams).code);

  if (!code.success) {
    notFound();
  }
  return (
    <div className="p-4 pt-24 max-w-4xl mx-auto">
      <SpotifyRefreshTokenViewerCard code={code.data} />
    </div>
  );
}
