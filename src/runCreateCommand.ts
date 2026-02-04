import { createReactProject } from "./generator/react/createProject.js";
import { ParsedConfig } from "./types.js";

export async function runCreateCommand(config: ParsedConfig) {
  const { stack, version, variant, projectName, groupId, targetDir } = config;

  switch (stack) {
    case "react":
      await createReactProject({
        name: projectName,
        target: `react@${version ?? 18}`,
        variants: [variant],
        targetDir,
      });
      return;

    default:
      break;
  }

  // future
  throw new Error(`Framework "${stack}" is not supported yet.`);
}
