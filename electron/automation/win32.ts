export function load() {
  return [];
}

export function send(key: string) {
  return [
    'powershell',
    '-command',
    `
    Add-Type -AssemblyName System.Windows.Forms;
    [System.Windows.Forms.SendKeys]::SendWait('${key}');
    `
  ];
}
