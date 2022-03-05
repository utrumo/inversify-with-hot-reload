declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      readonly DEBUG?: boolean;
      readonly PRODUCTION?: boolean;
    }
  }
}

export {};
