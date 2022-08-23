import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const plugins = [typescript(), terser()]

export default [
  {
    plugins,
    input: 'src/index.ts',
    output: {
      file: 'dist/monitor.js',
      format: 'iife',
      name: '_monitor',
      sourcemap: true,
    },
  },
  {
    plugins,
    input: 'src/index.ts',
    output: {
      file: 'dist/monitor.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  },
  {
    plugins,
    input: 'src/index.ts',
    output: {
      file: 'dist/monitor.cjs.js',
      format: 'cjs',
      name: '_monitor',
      sourcemap: true,
    },
  },
]
