export function checkNodeVersion() {
  const major = Number(process.versions.node.split(".")[0]);

  if (major < 18) {
    console.warn(`
⚠️  Node.js ${process.versions.node} detected
    Stack Boot CLI works best with Node 18 or newer
`);
  }
}
