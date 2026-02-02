export type InputMode = "args" | "interactive";

export interface ParsedConfig {
  stack: string;
  version: string;
  variant: string;
  projectName: string;
  targetDir: string;
  mode: InputMode;
}
