export default {
  files: ['tests/**/*.test.(j|t)s'],
  extensions: {
    ts: 'module',
  },
  nodeArguments: ['--loader=ts-node/esm'],
};
