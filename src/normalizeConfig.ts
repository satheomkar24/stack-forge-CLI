import { resolveProject } from "./resolveProject.js";
import type { InputMode, ParsedConfig } from "./types.js";

interface NormalizeInput {
  stack: string;
  version?: string;
  variant?: string;
  projectName: string;
}

export function normalizeConfig(
  input: NormalizeInput,
  mode: InputMode,
): ParsedConfig {
  const { projectName, targetDir } = resolveProject(input.projectName);

  return {
    stack: input.stack,
    version: input.version ?? "latest",
    variant: input.variant ?? "base",
    projectName,
    targetDir,
    mode,
  };
}
