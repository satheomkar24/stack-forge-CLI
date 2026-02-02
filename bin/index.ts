#!/usr/bin/env node
import { program } from "commander";

import { normalizeConfig } from "../src/normalizeConfig.js";
import { parseArgs } from "../src/parseArgs.js";
import { runPrompts } from "../src/promptFlow.js";

program
  .name("stack-forge-create-app")
  .description("CLI to create projects from predefined templates")
  .version("1.0.0", "-v, --version", "Show CLI version")
  .argument("[stackVersion]", "Stack and version (e.g., react:18 or node:20)")
  .argument("[variant]", "Variant/overlay (e.g., redux, express)")
  .argument("[projectName]", "Name of the new project")
  .helpOption("-h, --help", "Display help for command");

async function main() {
  program.parse(process.argv);
  const parsed = parseArgs(program.args);

  let config;
  if (parsed.isComplete) {
    // ✅ Validate required fields before calling normalizeConfig
    if (!parsed.stack || !parsed.projectName) {
      throw new Error("Required arguments missing: stack or project name");
    }

    config = normalizeConfig(
      {
        stack: parsed.stack,
        version: parsed.version,
        variant: parsed.variant,
        projectName: parsed.projectName,
      },
      "args",
    );
  } else {
    const prompted = await runPrompts(parsed);
    config = normalizeConfig(prompted, "interactive");
  }

  console.log("✅ Parsed Config:", config);
}

// Run the main function and handle uncaught errors
main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
