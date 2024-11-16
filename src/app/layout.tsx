import { ThemeProvider } from "@/components/theme-provider";

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Spotify Refresh Token Generator",
  description:
    "Get a Spotify refresh token fast for easy API access. No hassle.",
  metadataBase: new URL("https://spotify-refresh-token-generator.vercel.app"),
};

const currentYear = new Date().getFullYear();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="px-4 py-10 max-w-4xl mx-auto">
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">
                Spotify Refresh Token Generator
              </h1>
              <p className="text-muted-foreground mb-4">
                Get a Spotify refresh token fast for easy API access. No hassle.
              </p>
              <a
                href="https://github.com/bryanltobing/spotify-refresh-token-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View source code on GitHub
              </a>
            </header>
            <main>{children}</main>
            <footer className="mt-8 text-center text-sm text-muted-foreground">
              <p>© {currentYear} Spotify Refresh Token Generator</p>
              <p className="mt-1">
                This website is not affiliated with or endorsed by Spotify.
              </p>
            </footer>
          </div>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
