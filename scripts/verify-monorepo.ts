import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

interface PackageJson {
  name: string;
  version?: string;
  author?: string;
  license?: string;
  private?: boolean;
  engines?: {
    node?: string;
  };
  peerDependencies?: {
    eslint?: string;
    typescript?: string;
  };
  repository?: {
    type?: string;
    url?: string;
    directory?: string;
  };
}

// Expected values for consistency checks
const EXPECTED_AUTHOR = "Rel1cx<rel1cx@proton.me>";
const EXPECTED_LICENSE = "MIT";
const EXPECTED_NODE_ENGINE = ">=20.19.0";
const EXPECTED_ESLINT_PEER = "^8.57.0 || ^9.0.0";
const EXPECTED_TYPESCRIPT_PEER = ">=4.8.4 <6.0.0";
const EXPECTED_REPOSITORY_TYPE = "git";
const EXPECTED_REPOSITORY_URL = "git+https://github.com/Rel1cx/eslint-react.git";

// Recursively find all package.json files in packages/ directory
function findPackageJsonFiles(dir: string, files: string[] = []): string[] {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    
    // Skip node_modules
    if (entry === "node_modules" || entry === ".git") {
      continue;
    }

    try {
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        findPackageJsonFiles(fullPath, files);
      } else if (entry === "package.json") {
        files.push(fullPath);
      }
    } catch (error) {
      // Skip files we can't read
    }
  }

  return files;
}

function red(text: string): string {
  return `\x1b[31m${text}\x1b[0m`;
}

function green(text: string): string {
  return `\x1b[32m${text}\x1b[0m`;
}

function yellow(text: string): string {
  return `\x1b[33m${text}\x1b[0m`;
}

function blue(text: string): string {
  return `\x1b[34m${text}\x1b[0m`;
}

async function main() {
  const expectedVersion = readFileSync("VERSION", "utf8").trim().replace(/^v/, "");

  console.log(blue("Verifying monorepo consistency..."));
  console.log(blue(`Expected version: ${expectedVersion}`));
  console.log(blue("Checking published packages in packages/ directory..."));
  console.log("");

  const rootDir = process.cwd();
  const packagesDir = join(rootDir, "packages");
  const files = findPackageJsonFiles(packagesDir);

  let hasErrors = false;

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const pkg: PackageJson = JSON.parse(content);
    const relativePath = file.replace(rootDir + "/", "");

    // Skip private packages
    if (pkg.private) {
      continue;
    }

    // Check version consistency
    if (pkg.version != null && pkg.version !== expectedVersion) {
      console.error(red(`❌ Version mismatch in ${relativePath}`));
      console.error(`   Expected: ${green(expectedVersion)}, Found: ${yellow(pkg.version)}`);
      hasErrors = true;
    }

    // Check author consistency
    if (pkg.author != null && pkg.author !== EXPECTED_AUTHOR) {
      console.error(red(`❌ Author mismatch in ${relativePath}`));
      console.error(`   Expected: ${green(EXPECTED_AUTHOR)}, Found: ${yellow(pkg.author)}`);
      hasErrors = true;
    }

    // Check license consistency
    if (pkg.license != null && pkg.license !== EXPECTED_LICENSE) {
      console.error(red(`❌ License mismatch in ${relativePath}`));
      console.error(`   Expected: ${green(EXPECTED_LICENSE)}, Found: ${yellow(pkg.license)}`);
      hasErrors = true;
    }

    // Check node engine consistency
    if (pkg.engines?.node != null && pkg.engines.node !== EXPECTED_NODE_ENGINE) {
      console.error(red(`❌ Node engine mismatch in ${relativePath}`));
      console.error(`   Expected: ${green(EXPECTED_NODE_ENGINE)}, Found: ${yellow(pkg.engines.node)}`);
      hasErrors = true;
    }

    // Check ESLint peer dependency consistency (if it exists)
    if (
      pkg.peerDependencies?.eslint != null
      && pkg.peerDependencies.eslint !== EXPECTED_ESLINT_PEER
    ) {
      console.error(red(`❌ ESLint peer dependency mismatch in ${relativePath}`));
      console.error(
        `   Expected: ${green(EXPECTED_ESLINT_PEER)}, Found: ${yellow(pkg.peerDependencies.eslint)}`,
      );
      hasErrors = true;
    }

    // Check TypeScript peer dependency consistency (if it exists)
    if (
      pkg.peerDependencies?.typescript != null
      && pkg.peerDependencies.typescript !== EXPECTED_TYPESCRIPT_PEER
    ) {
      console.error(red(`❌ TypeScript peer dependency mismatch in ${relativePath}`));
      console.error(
        `   Expected: ${green(EXPECTED_TYPESCRIPT_PEER)}, Found: ${yellow(pkg.peerDependencies.typescript)}`,
      );
      hasErrors = true;
    }

    // Check repository consistency
    if (pkg.repository != null) {
      if (pkg.repository.type !== EXPECTED_REPOSITORY_TYPE) {
        console.error(red(`❌ Repository type mismatch in ${relativePath}`));
        console.error(
          `   Expected: ${green(EXPECTED_REPOSITORY_TYPE)}, Found: ${yellow(pkg.repository.type ?? "undefined")}`,
        );
        hasErrors = true;
      }

      if (pkg.repository.url !== EXPECTED_REPOSITORY_URL) {
        console.error(red(`❌ Repository URL mismatch in ${relativePath}`));
        console.error(
          `   Expected: ${green(EXPECTED_REPOSITORY_URL)}, Found: ${yellow(pkg.repository.url ?? "undefined")}`,
        );
        hasErrors = true;
      }

      // Verify directory matches the actual path
      const expectedDirectory = dirname(relativePath);
      if (pkg.repository.directory !== expectedDirectory) {
        console.error(red(`❌ Repository directory mismatch in ${relativePath}`));
        console.error(
          `   Expected: ${green(expectedDirectory)}, Found: ${yellow(pkg.repository.directory ?? "undefined")}`,
        );
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    console.log("");
    console.error(red("❌ Monorepo consistency check failed! Please fix the mismatches above."));
    process.exit(1);
  } else {
    console.log(green("✅ All packages are consistent!"));
  }
}

main().catch((error) => {
  console.error(red("Error:"), error);
  process.exit(1);
});



