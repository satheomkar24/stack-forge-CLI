import path from "path";
import { validateProjectName } from "./validateProjectName.js";

interface ResolvedProject {
  projectName: string;
  targetDir: string;
}

export function resolveProject(inputName: string): ResolvedProject {
  let projectName: string;
  let targetDir: string;

  if (inputName === ".") {
    const cwd = process.cwd();
    projectName = path.basename(cwd);
    targetDir = ".";
  } else {
    projectName = inputName;
    targetDir = `./${inputName}`;
  }

  // Validate the name
  const valid = validateProjectName(projectName);
  if (valid !== true) throw new Error(`Invalid project name: ${valid}`);

  return { projectName, targetDir };
}
