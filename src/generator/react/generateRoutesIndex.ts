import fs from "fs-extra";
import path from "path";

type Variant = "base" | "auth" | "admin";

const routeImportMap: Record<Variant, string> = {
  base: "baseRoutes",
  auth: "authRoutes",
  admin: "adminRoutes",
};

export async function generateRoutesIndex(
  projectPath: string,
  variants: Variant[],
) {
  const imports = [`import { createBrowserRouter } from "react-router-dom"`];

  const spreads: string[] = [];

  for (const v of variants) {
    imports.push(`import { ${routeImportMap[v]} } from "./${v}.routes"`);
    spreads.push(`...${routeImportMap[v]}`);
  }

  const content = `
${imports.join("\n")}

const routes = [
  ${spreads.join(",\n  ")}
]

const router = createBrowserRouter(routes)

export default router;
`;

  await fs.outputFile(
    path.join(projectPath, "src/routes/index.ts"),
    content.trim(),
  );
}
