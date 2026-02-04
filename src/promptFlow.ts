import prompts from "prompts";
import { PartialInput } from "./parseArgs.js";
import { validateProjectName } from "./validateProjectName.js";

interface PromptAnswers {
  stack: string;
  version?: string;
  variant?: string;
  projectName: string;
  groupId?: string;
  isComplete: true;
}

export async function runPrompts(
  partial: PartialInput,
): Promise<PromptAnswers> {
  // 1️⃣ Resolve stack FIRST (mandatory)
  if (!partial.stack) {
    const { stack } = await prompts({
      type: "select",
      name: "stack",
      message: "Select a stack",
      choices: [
        { title: "React", value: "react" },
        { title: "Node.js", value: "node" },
        { title: "Python (FastAPI)", value: "fastapi" },
        { title: "Java (Spring Boot)", value: "java" },
      ],
    });

    partial.stack = stack;
  }

  const questions: prompts.PromptObject[] = [];

  // helper for project name
  const addProjectNamePrompt = () => {
    questions.push({
      type: "text",
      name: "projectName",
      message: "Project name",
      initial: ".",
      validate: (v: string) => {
        const resolved = v === "." ? (process.cwd().split("/").pop() ?? "") : v;
        return validateProjectName(resolved);
      },
    });
  };

  // 2️⃣ Stack-specific prompts
  switch (partial.stack) {
    case "react": {
      if (!partial.projectName) addProjectNamePrompt();

      if (!partial.version) {
        questions.push({
          type: "select",
          name: "version",
          message: "Select React version",
          choices: [
            { title: "latest", value: "latest" },
            { title: "18", value: "18" },
            { title: "17", value: "17" },
          ],
          initial: 1,
        });
      }

      if (!partial.variant) {
        questions.push({
          type: "select",
          name: "variant",
          message: "Select variant",
          choices: [
            { title: "base", value: "base" },
            { title: "auth", value: "auth" },
            { title: "admin", value: "admin" },
          ],
        });
      }
      break;
    }

    case "node":
    case "fastapi": {
      if (!partial.projectName) addProjectNamePrompt();
      break;
    }

    case "java": {
      if (!partial.groupId) {
        questions.push({
          type: "text",
          name: "groupId",
          message: "Group ID",
          initial: "com.example",
          validate: (v: string) =>
            /^[a-zA-Z_][a-zA-Z0-9_.]*$/.test(v) ? true : "Invalid Java groupId",
        });
      }

      if (!partial.projectName) addProjectNamePrompt();
      break;
    }
  }

  // 3️⃣ Ask remaining questions
  const response = questions.length ? await prompts(questions) : {};

  // 4️⃣ Merge args + prompts
  return {
    stack: partial.stack!,
    version: partial.version ?? response.version,
    variant: partial.variant ?? response.variant,
    projectName: partial.projectName ?? response.projectName,
    groupId: partial.groupId ?? response.groupId,
    isComplete: true,
  };
}
