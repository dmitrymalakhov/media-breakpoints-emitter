export default () => {
  const _events = {};

  return {
    dispatch: (event, data) => {
      if (!_events[event])
        return;

      for (let i = 0; i < _events[event].length; i++)
        _events[event][i](data);
    },
    subscribe: (event, callback) => {
      if (!_events[event])
        _events[event] = [];

      _events[event].push(callback);
    },
    unsubscribe: event => {
      _events[event] = [];
    },
  };
};
