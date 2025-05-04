declare module 'react-server-dom-webpack/server' {
  export function renderToPipeableStream(...any): any;
}

declare module 'react-server-dom-webpack/node-register' {
  function reactServerRegister(): void; 

  export default reactServerRegister;
}

declare module 'react-server-dom-webpack/client' {
  export function createFromFetch(any): any;
  export function createFromReadableStream(any): any;
}
