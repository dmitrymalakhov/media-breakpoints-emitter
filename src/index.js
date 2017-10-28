import throttle from 'lodash.throttle';
import createBroadcast from './createBroadcast';
import createEmitter from './createEmitter';

let breakpoints = {},
  prevBreakpoint = null,
  breakpointsBroadcast = {},
  breakpointsEmitter = {};

export function getBreakpointsBroadcast() {
  return breakpointsBroadcast;
}

export function getBreakpointsEmitter() {
  return breakpointsEmitter;
}

export function getCurrentBreakpoint(breakpoints) {
  const breakpointKeys = Object.keys(breakpoints);

  let nextBreakpoint = null,
    keyNum = 0;

  while (keyNum < breakpointKeys.length) {
    const key = breakpointKeys[keyNum],
      { matches } = window.matchMedia(breakpoints[key]);
    
    if (matches) {
      nextBreakpoint = key;
      break;
    }

    keyNum++;
  }

  return nextBreakpoint;
}

const handleResize = throttle(() => {
  const nextBreakpoint = getCurrentBreakpoint(breakpoints);

  if (nextBreakpoint && nextBreakpoint !== prevBreakpoint) {
    prevBreakpoint = nextBreakpoint;
    breakpointsBroadcast.publish(nextBreakpoint);
    breakpointsEmitter.dispatch(nextBreakpoint, nextBreakpoint);
    breakpointsEmitter.dispatch('change', nextBreakpoint);
  }
}, 200);

export function initBreakpoints(newBreakpoints) {
  if (newBreakpoints)
    breakpoints = newBreakpoints;
  
  const currentBreakpoint = getCurrentBreakpoint(breakpoints);

  breakpointsBroadcast = createBroadcast(currentBreakpoint);
  breakpointsEmitter = createEmitter();

  prevBreakpoint = currentBreakpoint;

  window.addEventListener('resize', handleResize);
}
