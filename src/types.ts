export type InputMode = "args" | "interactive";

export type ParsedConfig = {
  stack: string;
  version: string;
  variant: string;
  projectName: string;
  targetDir: string;
  mode: InputMode;
  groupId?: string;
};
