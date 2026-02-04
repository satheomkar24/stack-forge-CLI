import { resolveProject } from "./resolveProject.js";
import type { InputMode, ParsedConfig } from "./types.js";

interface NormalizeInput {
  stack: string;
  version?: string;
  variant?: string;
  projectName: string;
  groupId?: string;
}

export function normalizeConfig(
  input: NormalizeInput,
  mode: InputMode,
): ParsedConfig {
  const { projectName, targetDir } = resolveProject(input.projectName);

  return {
    stack: input.stack,
    version: input.version ?? "18",
    variant: input.variant ?? "base",
    groupId: input.groupId ?? "com.example",
    projectName,
    targetDir,
    mode,
  };
}
