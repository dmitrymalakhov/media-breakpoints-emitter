/* eslint-disable no-console*/

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

const breakpointsBroadcast = getBreakpointsBroadcast(),
  breakpointsEmitter = getBreakpointsEmitter();

const handleResize = breakpoint => console.log(breakpoint);

breakpointsBroadcast.subscribe(handleResize);

breakpointsEmitter.subscribe('change', handleResize);
breakpointsEmitter.subscribe('small', handleResize);

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
