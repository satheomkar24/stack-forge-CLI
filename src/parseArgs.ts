export interface PartialInput {
  stack?: string;
  version?: string;
  variant?: string;
  projectName?: string;
  groupId?: string;
  isComplete: boolean;
}

export function parseArgs(args: string[]): PartialInput {
  const [stackVersion, projectName, variant] = args;

  let stack: string | undefined;
  let version: string | undefined;

  if (stackVersion) {
    const [s, v] = stackVersion.split("@");

    if (!s) throw new Error("Invalid stack@version format");

    stack = s;
    if (v) version = v;
  }

  return {
    stack,
    version,
    projectName,
    variant: stack === "react" ? variant : undefined,
    groupId: stack === "java" ? variant : undefined,
    isComplete: Boolean(stack && projectName),
  };
}
