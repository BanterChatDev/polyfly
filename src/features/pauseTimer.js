import { KEYS } from "../config/keys.js";

export const pauseTimer = {
  name: "pauseTimer",
  label: "Pause Timer",
  description: "Hold to freeze the run timer while driving",
  category: "Movement",
  toggleKey: KEYS.pauseTimer,
  toggleable: false,
  settings: {},
  workerPatches: [
    [
      "r.push(a(t,e))",
      "(()=>{try{const __pfBuf=a(t,e);const u=new Uint8Array(__pfBuf);const __pfWasm=u[4]|(u[5]<<8)|(u[6]<<16);const __pfPaused=!!(self.__pfKeys&&self.__pfKeys[self.__pfPauseKey]);let __pfDisplay;if(__pfPaused){__pfDisplay=(typeof t.__pfLastDisplay==='number')?t.__pfLastDisplay:__pfWasm;if(!t.__pfWasPaused)t.__pfPauseStartWasm=__pfWasm;}else{if(t.__pfWasPaused)t.__pfOffset=(t.__pfOffset||0)+(__pfWasm-t.__pfPauseStartWasm);__pfDisplay=__pfWasm-(t.__pfOffset||0);}t.__pfLastDisplay=__pfDisplay;t.__pfWasPaused=__pfPaused;u[4]=__pfDisplay&0xff;u[5]=(__pfDisplay>>8)&0xff;u[6]=(__pfDisplay>>16)&0xff;r.push(__pfBuf);}catch(_){}})()",
    ],
  ],
  mainPatches: [
    [
      'e<=(0,p.gn)(this,h,"f"))throw new Error("Frame number must be greater than the previous recorded frame.")',
      'e<=(0,p.gn)(this,h,"f"))return',
    ],
  ],
};