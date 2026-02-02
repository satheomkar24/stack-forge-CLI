export interface PartialInput {
  stack?: string;
  version?: string;
  variant?: string;
  projectName?: string;
  isComplete: boolean;
}

export function parseArgs(args: string[]): PartialInput {
  const [stackVersion, variant, projectName] = args;

  let stack: string | undefined;
  let version = "latest";

  if (stackVersion) {
    const [s, v] = stackVersion.split("@");

    if (!s) throw new Error("Invalid stack@version format");

    stack = s;
    if (v) version = v;
  }

  return {
    stack,
    version,
    variant: variant ?? "base",
    projectName,
    isComplete: Boolean(stack && projectName),
  };
}
