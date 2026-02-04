import path from "path";
import fs from "fs-extra";

import { parseTarget } from "../../utils/parseTarget.js";
import { copyBaseTemplate } from "./copyBaseTemplate.js";
import { mergeVariant } from "./mergeVariant.js";
import { generateRoutesIndex } from "./generateRoutesIndex.js";
import { resolveReactVersion } from "./resolveReactVersion.js";
import { updatePackageJson } from "./updatePackageJson.js";
import { resolveTemplatePath } from "../../utils/resolveTemplatePath.js";
import { log, logStep } from "../../utils/logger.js";
import { isDirEmpty } from "../../utils/directoryCheck.js";

function resolveVariants(input: string[]) {
  const set = new Set(["base"]);

  if (input.includes("auth")) set.add("auth");
  if (input.includes("admin")) {
    set.add("auth");
    set.add("admin");
  }

  return Array.from(set) as ("base" | "auth" | "admin")[];
}

export async function createReactProject({
  name,
  target,
  variants,
  targetDir,
}: {
  name: string;
  target: string;
  variants: string[];
  targetDir: string;
}) {
  logStep(2, "Creating project directory");

  const projectPath = path.resolve(targetDir);
  const isCurrentDir = projectPath === process.cwd();

  if (fs.existsSync(projectPath)) {
    if (!isCurrentDir) {
      throw new Error(
        "Folder already exists\n\n👉 Choose a different name or delete the folder.",
      );
    }

    if (!isDirEmpty(projectPath)) {
      throw new Error(
        "Current directory is not empty\n\n👉 Use an empty folder or choose a different project name.",
      );
    }
  } else {
    await fs.mkdir(projectPath, { recursive: true });
  }

  const { framework, major } = parseTarget(target);
  const finalVariants = resolveVariants(variants);

  const basePath = resolveTemplatePath(`${framework}/base`);

  logStep(3, "Copying template files");

  await copyBaseTemplate(basePath, projectPath);

  for (const v of finalVariants) {
    if (v !== "base") {
      const variantPath = resolveTemplatePath(`${framework}/${v}`);
      await mergeVariant(variantPath, projectPath);
    }
  }

  await generateRoutesIndex(projectPath, finalVariants);

  const reactVersion = await resolveReactVersion(major);

  if (major !== 18) {
    console.warn(`
⚠️  Warning:
This template is tested with React 18.
You selected React ${reactVersion}.

Some dependencies may not be compatible with this version.
If you face dependency issues, you can try:

  npm install --force

Otherwise, you may need to manually adjust dependency versions.
`);
  }

  logStep(4, "Updating package name");

  await updatePackageJson(projectPath, name, reactVersion);

  logStep(5, "Finalizing setup");

  const cdCommand = isCurrentDir ? "." : name;

  log.success(`
🎉 Project created successfully!

Next steps:

1️⃣  Move into your project:
   cd ${cdCommand}

2️⃣  Rename environment file:
   mv .template.env .env
   (Update values inside .env as needed)

3️⃣  Install dependencies:
   npm install

4️⃣  Start development server:
   npm run dev

Happy hacking 🚀
`);
}
