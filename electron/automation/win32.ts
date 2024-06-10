export function load() {
  return [
    'powershell',
    '-command',
    `
    $wsh = New-Object -ComObject wscript.shell;
    if(-not [console]::NumberLock) $wsh.SendKeys("{NUMLOCK}")
    `
  ];
}

export function send(key: string) {
  return [
    'powershell',
    '-command',
    `
    $wsh = New-Object -ComObject wscript.shell;
    $wsh.SendKeys({${key}});
    `
  ];
}
