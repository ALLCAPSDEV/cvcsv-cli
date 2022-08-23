import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    "path",
    "fs",
  ],
  plugins: [
    resolve({
      extensions: [".js", ".ts"],
    }),
    typescript({
      typescript: require("typescript"),
    }),
    terser(),
  ],
};
