# media-breakpoints-watcher

Library for easy use of media breakpoints in js

## Install

```bash
yarn add media-breakpoints-watcher
```

or

```bash
npm install media-breakpoints-watcher
```

## Usage

```javascript
import {
  initBreakpoints,
  getBreakpointsBroadcast,
  getBreakpointsEmitter,
  getCurrentBreakpoint,
} from 'media-breakpoints-watcher';

initBreakpoints({
  large: '(min-width: 1200px)',
  medium: '(min-width: 992px)',
  small: '(min-width: 768px)',
});

const breakpointsBroadcast = getBreakpointsBroadcast();
const breakpointsEmitter = getBreakpointsEmitter();

// don't forget to add throttle to handler of resize 
const handleResize = breakpoint => console.log(breakpoint);

breakpointsBroadcast.subscribe(handleResize);

breakpointsEmitter.subscribe('change', handleResize);
breakpointsEmitter.subscribe('small', handleResize);

console.log(
  'Current breakpoint according to init breakpoints',
  getCurrentBreakpoint()
);

console.log(
  'Current breakpoint according to custom breakpoints',
  getCurrentBreakpoint({
    medium: '(min-width: 992px)',
    small: '(min-width: 768px)',
  })
);
```

For unsubscribe

```javascript
const unsubscribe = breakpointsBroadcast.subscribe(handleResize);
unsubscribe();

/../

breakpointsEmitter.subscribe('change', handleResize);
breakpointsEmitter.unsubscribe('change', handleResize);
```