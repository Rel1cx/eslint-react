import { GitHubRepo } from "#/components/GitHubRepo";
import { cn } from "#/lib/cn";

interface GitHubRepoGridProps {
  className?: string;
  repos: { owner: string; repo: string }[];
}

export function GitHubRepoGrid({ className, repos }: GitHubRepoGridProps) {
  return (
    <div className={cn("not-prose grid grid-cols-1 gap-4 md:grid-cols-2", className)}>
      {repos.map(({ owner, repo }) => (
        <GitHubRepo
          key={`${owner}/${repo}`}
          owner={owner}
          repo={repo}
        />
      ))}
    </div>
  );
}
