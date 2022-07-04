export default interface Keymap {
  getKey: (note: string) => string | undefined;
  getNote: (key: string) => string | undefined;
}
