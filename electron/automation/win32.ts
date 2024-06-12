export function load() {
  return [];
}

export function send(key: string) {
  return [
    'powershell',
    '-command',
    // `[string]$s = Get-Content -Path "KeyPress.cs"`,
    `Add-Type -TypeDefinition @"
    using System;using System.Runtime.InteropServices;using System.Threading; public class Program{    [StructLayout(LayoutKind.Sequential)]    public struct KeyboardInput    {        public ushort wVk;        public ushort wScan;        public uint dwFlags;        public uint time;        public IntPtr dwExtraInfo;    }        [StructLayout(LayoutKind.Sequential)]    public struct HardwareInput    {        public uint uMsg;        public ushort wParamL;        public ushort wParamH;    }    [StructLayout(LayoutKind.Sequential)]    public struct MouseInput    {        public int dx;        public int dy;        public uint mouseData;        public uint dwFlags;        public uint time;        public IntPtr dwExtraInfo;    }    [StructLayout(LayoutKind.Explicit)]    public struct InputUnion    {        [FieldOffset(0)]        internal MouseInput mi;        [FieldOffset(0)]        internal KeyboardInput ki;        [FieldOffset(0)]        internal HardwareInput hi;    }    public struct INPUT    {        public int type;        public InputUnion un;    }        [Flags]    public enum KeyEventF    {        KeyDown = 0x0000,        ExtendedKey = 0x0001,        KeyUp = 0x0002,        Unicode = 0x0004,        Scancode = 0x0008    }    [Flags]    public enum InputType    {        Keyboard = 1,        Hardware = 2,        Mouse = 0    }    [DllImport("user32.dll", SetLastError = true)]    private static extern uint SendInput(uint nInputs, INPUT[] pInputs, int cbSize);        [DllImport("user32.dll")]    private static extern IntPtr GetMessageExtraInfo();    [DllImport("user32.dll")]    public static extern uint MapVirtualKey(uint uCode, uint uMapType);    [DllImport("user32.dll")]    static extern short VkKeyScan(char ch);    public static void Dispatch(ushort key, KeyEventF keyEvent)    {        INPUT input = new INPUT        {            type = (int)InputType.Keyboard,            un = new InputUnion            {                ki = new KeyboardInput                {                    wVk = key,                    wScan = (ushort)(MapVirtualKey((uint)key, 0) & 0xFFU),                    time = 0,                    dwFlags = (uint)(keyEvent),                    dwExtraInfo = IntPtr.Zero,                }            }        };        Thread.Sleep(1);        SendInput(1, new INPUT[] { input }, Marshal.SizeOf<INPUT>());    }    public static void KeyPress(char c)    {        ushort vk = (ushort)VkKeyScan(c);        Dispatch(vk, KeyEventF.KeyDown);        Dispatch(vk, KeyEventF.KeyUp);    }}
    "@`,
    `[Program]::KeyPress('${key}')`
  ];
}
