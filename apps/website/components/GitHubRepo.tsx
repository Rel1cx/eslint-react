import { cn } from "@/lib/cn";
import { GithubInfo, type GithubInfoProps } from "fumadocs-ui/components/github-info";

export type GitHubRepoProps = GithubInfoProps;

export function GitHubRepo({ className, token, ...rest }: GitHubRepoProps) {
  return (
    <GithubInfo
      className={cn("rounded-lg bg-fd-card outline outline-fd-border", className)}
      token={token ?? process.env["GITHUB_TOKEN"] ?? ""}
      {...rest}
    />
  );
}
