import chalk from "chalk";

export const log = {
  info: (msg: string) => console.log(chalk.blue("ℹ"), msg, "\n"),
  success: (msg: string) => console.log(chalk.green("✔"), msg, "\n"),
  warn: (msg: string) => console.log(chalk.yellow("⚠"), msg, "\n"),
  error: (msg: string) => console.log(chalk.red("✖"), msg, "\n"),
};

export const logStep = (num: number, msg: string) =>
  log.info(`${num}️⃣  ${msg}`);
