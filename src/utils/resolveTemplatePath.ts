import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, "../../..");

export function resolveTemplatePath(subPath: string) {
  return path.join(packageRoot, "templates", subPath);
}
