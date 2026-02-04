export function validateProjectName(name: string): string | true {
  const trimmed = name?.trim();

  if (!trimmed) return "Project name cannot be empty";

  if (trimmed.includes(".") || trimmed.includes(".."))
    return "Project name cannot contain '.' or '..'";

  // block path-breaking characters (safe for all OS)
  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/;
  if (invalidChars.test(trimmed))
    return "Project name contains invalid characters";

  const reserved = ["node_modules", "favicon.ico"];
  if (reserved.includes(trimmed.toLowerCase()))
    return `"${trimmed}" is a reserved name`;

  return true;
}
