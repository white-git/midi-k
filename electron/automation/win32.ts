export function send(key: string) {
  const cmd = ['powershell', '-command'];
  cmd.push(`
    $wshell = New-Object -ComObject wscript.shell;
    $wshell.SendKeys("${key}");
    $wshell.SendKeys("{NUMLOCK}");
  `);
  return cmd;
}
