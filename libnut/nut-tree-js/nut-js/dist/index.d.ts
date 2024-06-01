import { AssertClass } from "./lib/assert.class";
import { ClipboardClass } from "./lib/clipboard.class";
import { KeyboardClass, KeyboardConfig } from "./lib/keyboard.class";
import { MouseClass, MouseConfig } from "./lib/mouse.class";
import { ScreenClass, ScreenConfig } from "./lib/screen.class";
import providerRegistry from "./lib/provider/provider-registry.class";
import { ColorQuery, LineQuery, WindowQuery, WordQuery } from "./lib/query.class";
import { RGBA } from "./lib/rgba.class";
export { AssertClass, ClipboardClass, KeyboardClass, KeyboardConfig, MouseClass, MouseConfig, ScreenClass, ScreenConfig, providerRegistry, };
export { MatchRequest } from "./lib/match-request.class";
export { MatchResult } from "./lib/match-result.class";
export * from "./lib/provider";
export { jestMatchers } from "./lib/expect/jest.matcher.function";
export { sleep } from "./lib/sleep.function";
export { Image } from "./lib/image.class";
export { RGBA } from "./lib/rgba.class";
export { Key } from "./lib/key.enum";
export { Button } from "./lib/button.enum";
export { centerOf, randomPointIn } from "./lib/location.function";
export { OptionalSearchParameters } from "./lib/optionalsearchparameters.class";
export { EasingFunction, linear } from "./lib/mouse-movement.function";
export { Point } from "./lib/point.class";
export { Region } from "./lib/region.class";
export { Window } from "./lib/window.class";
export { FileType } from "./lib/file-type.enum";
export { ColorMode } from "./lib/colormode.enum";
export { useLogger, useConsoleLogger, ConsoleLogLevel, } from "./lib/logging.function";
export * from "./lib/query.class";
declare const clipboard: ClipboardClass;
declare const keyboard: KeyboardClass;
declare const mouse: MouseClass;
declare const screen: ScreenClass;
declare const assert: AssertClass;
declare const straightTo: (target: import("./lib/point.class").Point | Promise<import("./lib/point.class").Point>) => Promise<import("./lib/point.class").Point[]>, up: (px: number) => Promise<import("./lib/point.class").Point[]>, down: (px: number) => Promise<import("./lib/point.class").Point[]>, left: (px: number) => Promise<import("./lib/point.class").Point[]>, right: (px: number) => Promise<import("./lib/point.class").Point[]>;
declare const getWindows: () => Promise<import("./lib/window.class").Window[]>, getActiveWindow: () => Promise<import("./lib/window.class").Window>;
declare const loadImage: (parameters: string) => Promise<import("./lib/image.class").Image>;
declare const saveImage: (parameters: import("./lib/provider").ImageWriterParameters) => Promise<void>;
declare const imageResource: (fileName: string) => Promise<import("./lib/image.class").Image>;
declare const singleWord: (word: string) => WordQuery;
declare const textLine: (line: string) => LineQuery;
declare const windowWithTitle: (title: string | RegExp) => WindowQuery;
declare const pixelWithColor: (color: RGBA) => ColorQuery;
export { fetchFromUrl } from "./lib/imageResources.function";
export { clipboard, keyboard, mouse, screen, assert, straightTo, up, down, left, right, getWindows, getActiveWindow, loadImage, saveImage, imageResource, singleWord, textLine, windowWithTitle, pixelWithColor, };
//# sourceMappingURL=index.d.ts.map