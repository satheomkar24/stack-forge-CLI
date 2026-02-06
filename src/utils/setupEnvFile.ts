import fs from "fs-extra";
import path from "path";

export async function setupEnvFile(projectPath: string) {
  try {
    fs.move(
      path.join(projectPath, ".template.env"),
      path.join(projectPath, ".env"),
    );
  } catch (error: any) {
    console.log(error.message);
  }
}
