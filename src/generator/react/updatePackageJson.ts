import fs from "fs-extra";
import path from "path";
import { toPackageName } from "../../utils/toPackageName.js";

export async function updatePackageJson(
  projectPath: string,
  projectName: string,
  version: string,
) {
  const pkgPath = path.join(projectPath, "package.json");
  const pkg = await fs.readJson(pkgPath);

  pkg.name = toPackageName(projectName);
  pkg.dependencies = pkg.dependencies || {};
  pkg.dependencies.react = `^${version}`;
  pkg.dependencies["react-dom"] = `^${version}`;

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}
