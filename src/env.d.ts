interface ImportMetaEnv {
  readonly API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.png' {
  const src: string;
  export default src;
}