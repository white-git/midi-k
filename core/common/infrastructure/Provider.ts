export type Provider<P> = {
  use: { (): P }
};
