import { cn } from "#/lib/cn";
import { GithubInfo } from "fumadocs-ui/components/github-info";

export function GitHubRepo({ className, token, ...rest }: Parameters<typeof GithubInfo>[0]) {
  return (
    <GithubInfo
      className={cn("rounded-lg bg-fd-card outline outline-fd-border", className)}
      token={token ?? process.env["GITHUB_TOKEN"] ?? ""}
      {...rest}
    />
  );
}
