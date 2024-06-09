type SPKeys = {
  [k: string]: string
};

const spkeys: SPKeys = {
  'return': 'keystroke Return',
  'enter': 'keystroke Return',
  'tab': 'keystroke Tab',
  'home': 'keystroke Home',
  'end': 'key code 119',
  'pageup': 'key code 116',
  'pagedwon': 'key code 121',
  'space': 'keystroke Space',
  'spc': 'keystroke Space',
  'delete': 'key code 51',
  'bs': 'key code 51',
  'esc': 'key code 53',
  'escape': 'key code 53',
  'up': 'key code 126',
  'right': 'key code 124',
  'down': 'key code 125',
  'left': 'key code 123',
  'f1': 'key code 122',
  'f2': 'key code 120',
  'f3': 'key code 99',
  'f4': 'key code 118',
  'f5': 'key code 96',
  'f6': 'key code 97',
  'f7': 'key code 98',
  'f8': 'key code 100',
  'f9': 'key code 101',
  'f10': 'key code 109',
  'f11': 'key code 103',
  'f12': 'key code 111',
  'f13': 'key code 105',
  'f14': 'key code 107',
  'f15': 'key code 113',
  'f16': 'key code 106',
  'f17': 'key code 64',
  'f18': 'key code 79',
  'f19': 'key code 80',
  'f20': 'key code 90',
  'fn': 'key code 63',
  '*': 'key code 67',
  '/': 'key code 75',
  '+': 'key code 69',
  '-': 'key code 78',
  '=': 'key code 81',
  '.': 'key code 65',
  'clear': 'key code 71'
};

export function load() {}

export function send(key: string) {
  const k = key.toLowerCase();
  let action = `keystroke "${k}"`;
  if (spkeys[k]) action = spkeys[k];
  return [
    'osascript',
    '-e',
    `tell application "System Events" to ${action}`
  ];
}
