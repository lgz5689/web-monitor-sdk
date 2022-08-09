import typescript from '@rollup/plugin-typescript'

const plugins = [typescript()]

export default [
  {
    plugins,
    input: 'src/index.ts',
    output: {
      file: 'dist/monitor.js',
      format: 'iife',
      name: '__monitor',
    },
  },
]
