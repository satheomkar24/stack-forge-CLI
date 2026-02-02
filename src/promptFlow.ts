import prompts from "prompts";
import { PartialInput } from "./parseArgs.js";
import { validateProjectName } from "./validateProjectName.js";

interface PromptAnswers {
  stack: string;
  version: string;
  variant: string;
  projectName: string;
  isComplete: true;
}

export async function runPrompts(
  partial: PartialInput,
): Promise<PromptAnswers> {
  // Build the prompt array dynamically
  const questions: prompts.PromptObject<keyof PromptAnswers>[] = [];

  if (!partial.stack) {
    questions.push({
      type: "select",
      name: "stack",
      message: "Select a stack",
      choices: [
        { title: "React", value: "react" },
        { title: "Next.js", value: "next" },
        { title: "Node.js", value: "node" },
      ],
    });
  }

  questions.push(
    {
      type: "select",
      name: "version",
      message: "Select version",
      choices: [
        { title: "latest", value: "latest" },
        { title: "18", value: "18" },
        { title: "17", value: "17" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "variant",
      message: "Select variant",
      choices: [
        { title: "base", value: "base" },
        { title: "jwt", value: "jwt" },
        { title: "admin", value: "admin" },
      ],
    },
    {
      type: "text",
      name: "projectName",
      message: "Project name",
      initial: ".",
      validate: (v: string) => {
        const resolvedName =
          v === "." ? (process.cwd().split("/").pop() ?? "") : v;
        return validateProjectName(resolvedName);
      },
    },
  );

  const response = await prompts(questions);

  return {
    stack: partial.stack ?? response.stack,
    version: response.version,
    variant: response.variant,
    projectName: response.projectName,
    isComplete: true, // ✅ ensures PartialInput contract
  };
}
