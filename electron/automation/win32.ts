export function send(key: string) {
  const cmd = ['powershell', '-command'];
  cmd.push(`
    $wshell = NewObject -ComObject wscript.shell;
    $wshell.SendKeys("${key}");
  `);
  return cmd;
}
