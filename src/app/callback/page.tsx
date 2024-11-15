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
  return <SpotifyRefreshTokenViewerCard code={code.data} />;
}
