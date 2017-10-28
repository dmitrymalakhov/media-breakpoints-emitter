import {
  initBreakpoints,
  getBreakpointsBroadcast,
  getBreakpointsEmitter,
  getCurrentBreakpoint,
} from '../src/index';

initBreakpoints({
  large: '(min-width: 1200px)',
  medium: '(min-width: 992px)',
  small: '(min-width: 768px)',
});

const breakpointsBroadcast = getBreakpointsBroadcast();
const breakpointsEmitter = getBreakpointsEmitter();

/* eslint-disable no-console*/

breakpointsBroadcast.subscribe(breakpoint => {
  console.log('BreakpointsBroadcast:', breakpoint);
});

breakpointsEmitter.subscribe('change', breakpoint => {
  console.log('BreakpointsEmitter: event change: ', breakpoint);
});

breakpointsEmitter.subscribe('small', breakpoint => {
  console.log('BreakpointsEmitter: event small:', breakpoint);
});

console.log(
  'Current breakpoint by init breakpoints',
  getCurrentBreakpoint()
);

console.log(
  'Current breakpoint by custom breakpoints',
  getCurrentBreakpoint({
    medium: '(min-width: 992px)',
    small: '(min-width: 768px)',
  })
);
