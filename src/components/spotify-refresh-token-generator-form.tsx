"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import qs from "fast-querystring";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const spotifyScopes = [
  { id: "ugc-image-upload", label: "Upload Images" },
  { id: "user-read-playback-state", label: "Read Playback State" },
  { id: "user-modify-playback-state", label: "Modify Playback State" },
  { id: "user-read-currently-playing", label: "Read Currently Playing" },
  { id: "app-remote-control", label: "Remote Control" },
  { id: "streaming", label: "Streaming" },
  { id: "playlist-read-private", label: "Read Private Playlists" },
  { id: "playlist-read-collaborative", label: "Read Collaborative Playlists" },
  { id: "playlist-modify-private", label: "Modify Private Playlists" },
  { id: "playlist-modify-public", label: "Modify Public Playlists" },
  { id: "user-follow-modify", label: "Modify Follow" },
  { id: "user-follow-read", label: "Read Follow" },
  { id: "user-read-playback-position", label: "Read Playback Position" },
  { id: "user-top-read", label: "Read Top" },
  { id: "user-read-recently-played", label: "Read Recently Played" },
  { id: "user-library-modify", label: "Modify Library" },
  { id: "user-library-read", label: "Read Library" },
  { id: "user-read-email", label: "Read Email" },
  { id: "user-read-private", label: "Read Private" },
  { id: "user-soa-link", label: "SOA Link" },
  { id: "user-soa-unlink", label: "SOA Unlink" },
  { id: "soa-manage-entitlements", label: "Manage SOA Entitlements" },
  { id: "soa-manage-partner", label: "Manage SOA Partner" },
  { id: "soa-create-partner", label: "Create SOA Partner" },
];

const formSchema = z.object({
  clientId: z.string().min(1, { message: "Client ID is required" }),
  clientSecret: z.string().min(1, { message: "Client Secret is required" }),
  redirectUri: z.string().min(1, { message: "Redirect URI is required" }),
  scopes: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one scope",
  }),
});

export const SpotifyRefreshTokenGeneratorForm = () => {
  const [isCopied, setIsCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: "",
      clientSecret: "",
      redirectUri: "",
      scopes: [],
    },
  });
  const resetField = form.resetField;

  useEffect(() => {
    if (typeof window !== "undefined") {
      resetField("redirectUri", {
        defaultValue: `${window.location.origin}/callback`,
      });
    }
  }, [form, resetField]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("spotify_client_id", values.clientId);
    localStorage.setItem("spotify_client_secret", values.clientSecret);
    localStorage.setItem("redirect_uri", values.redirectUri);

    window.location.href = `https://accounts.spotify.com/authorize?${qs.stringify(
      {
        response_type: "code",
        client_id: values.clientId,
        scope: values.scopes.join(" "),
        redirect_uri: values.redirectUri,
        show_dialog: true,
      }
    )}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Redirect URI copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Your Refresh Token</CardTitle>
        <CardDescription>
          Make sure you have a Spotify Developer account and have created an
          application in the{" "}
          <a
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://developer.spotify.com/dashboard"
          >
            Spotify Developer Dashboard.
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Spotify Client ID"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can find this in your Spotify Developer Dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientSecret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Secret</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your Spotify Client Secret"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Keep this secret! You can find it in your Spotify Developer
                    Dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="redirectUri"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redirect URI</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input readOnly placeholder="Redirect URI" {...field} />
                      <Button
                        type="button"
                        variant="outline"
                        className="ml-2"
                        onClick={() => copyToClipboard(field.value)}
                      >
                        {isCopied ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        <span className="sr-only">Copy redirect URI</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Use and put this URI in your Spotify Developer Dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scopes"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Scopes</FormLabel>
                    <FormDescription>
                      Select the{" "}
                      <a
                        className="text-primary hover:underline"
                        href="https://developer.spotify.com/documentation/general/guides/scopes/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        permissions
                      </a>{" "}
                      you need for your application.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border p-4">
                    {spotifyScopes.map((scope) => (
                      <FormField
                        key={scope.id}
                        control={form.control}
                        name="scopes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={scope.id}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(scope.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          scope.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== scope.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {scope.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          Authenticate
        </Button>
      </CardFooter>
    </Card>
  );
};
