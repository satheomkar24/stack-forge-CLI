export function validateProjectName(name: string): string | true {
  const trimmed = name.trim();

  if (!trimmed) return "Project name cannot be empty";

  if (trimmed === "." || trimmed === "..")
    return "Project name cannot be '.' or '..'";

  // npm-safe regex: lowercase letters, numbers, hyphens, underscores
  const npmSafe = /^[a-z0-9-_]+$/i;
  if (!npmSafe.test(trimmed))
    return "Project name must contain only letters, numbers, '-' or '_'";

  const reserved = ["node_modules", "favicon.ico"];
  if (reserved.includes(trimmed.toLowerCase()))
    return `"${trimmed}" is a reserved name`;

  return true;
}
