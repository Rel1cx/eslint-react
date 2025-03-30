import { GitHubRepo } from "#/components/GitHubRepo";

const repos = [
  { owner: "DimensionDev", repo: "Maskbook" },
  { owner: "electric-sql", repo: "electric" },
  { owner: "electric-sql", repo: "pglite" },
  { owner: "ensdomains", repo: "thorin" },
  { owner: "flirtual", repo: "flirtual" },
  { owner: "hashintel", repo: "hash" },
  { owner: "kriasoft", repo: "graphql-starter-kit" },
  { owner: "npmgraph", repo: "npmgraph" },
  { owner: "offlegacy", repo: "event-tracker" },
  { owner: "onejs", repo: "one" },
  { owner: "payloadcms", repo: "payload" },
  { owner: "prettier", repo: "prettier" },
  { owner: "react-navigation", repo: "react-navigation" },
  { owner: "refined-github", repo: "refined-github" },
  { owner: "RSSNext", repo: "Follow" },
  { owner: "TanStack", repo: "form" },
  { owner: "TanStack", repo: "query" },
  { owner: "TanStack", repo: "router" },
  { owner: "TanStack", repo: "store" },
  { owner: "toss", repo: "suspensive" },
  { owner: "upleveled", repo: "eslint-config-upleveled" },
  { owner: "XYOracleNetwork", repo: "sdk-xyo-react-js" },
];

const presets = [
  { owner: "AndreaPontrandolfo", repo: "sheriff" },
  { owner: "antfu", repo: "eslint-config" },
  { owner: "RebeccaStevens", repo: "eslint-config-rebeccastevens" },
  { owner: "SukkaW", repo: "eslint-config-sukka" },
];

export function CommunityShowcases() {
  return (
    <div className="not-prose grid grid-cols-1 gap-4 md:grid-cols-2">
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

export function CommunityPresets() {
  return (
    <div className="not-prose grid grid-cols-1 gap-4 md:grid-cols-2">
      {presets.map(({ owner, repo }) => (
        <GitHubRepo
          key={`${owner}/${repo}`}
          owner={owner}
          repo={repo}
        />
      ))}
    </div>
  );
}
