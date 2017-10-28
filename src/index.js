import throttle from 'lodash.throttle';
import createBroadcast from './createBroadcast';
import createEmitter from './createEmitter';

let breakpoints = {},
  prevBreakpoint = null,
  breakpointsBroadcast = {},
  breakpointsEmitter = {},
  initResizeListener = false;

export function getBreakpointsBroadcast() {
  return breakpointsBroadcast;
}

export function getBreakpointsEmitter() {
  return breakpointsEmitter;
}

const getBreakpoints = externalBreakpoints => {
  if (externalBreakpoints)
    return externalBreakpoints;
    
  return breakpoints;
};

export function getCurrentBreakpoint(externalBreakpoints) {
  const breakpoints = getBreakpoints(externalBreakpoints),
    breakpointKeys = Object.keys(breakpoints);

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
  const nextBreakpoint = getCurrentBreakpoint();

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

  const currentBreakpoint = getCurrentBreakpoint();

  breakpointsBroadcast = createBroadcast(currentBreakpoint);
  breakpointsEmitter = createEmitter();

  prevBreakpoint = currentBreakpoint;

  if (!initResizeListener) {
    initResizeListener = true;
    window.addEventListener('resize', handleResize);
  }
}
