export function toPackageName(projectName: string) {
  return projectName
    .trim() // remove leading/trailing spaces
    .replace(/\s+/g, " ") // collapse multiple spaces
    .replace(/ /g, "-") // space → dash
    .toLowerCase(); // npm standard
}
