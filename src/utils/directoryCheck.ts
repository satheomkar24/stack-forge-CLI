import fs from "fs-extra";

export function isDirEmpty(dir: string) {
  return fs.readdirSync(dir).length === 0;
}
