import { SpotifyRefreshTokenGeneratorForm } from "@/components/spotify-refresh-token-generator-form";

const currentYear = new Date().getFullYear();

export default function Home() {
  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Spotify Refresh Token Generator</h1>
        <p className="text-muted-foreground mb-4">Get a Spotify refresh token fast for easy API access. No hassle.</p>
        <a
          href="https://github.com/bryanltobing/spotify-refresh-token-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          View source code on GitHub
        </a>
      </header>
      <SpotifyRefreshTokenGeneratorForm />

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {currentYear} Spotify Refresh Token Generator</p>
        <p className="mt-1">
          This website is not affiliated with or endorsed by Spotify.
        </p>
      </footer>
    </div>
  );
}
