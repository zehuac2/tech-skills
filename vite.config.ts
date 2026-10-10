import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    overrides: [
      {
        files: ["**/*.md"],
        options: {
          printWidth: 80,
          proseWrap: "always",
        },
      },
    ],
  },
  lint: {
    ignorePatterns: ["node_modules/**"],
  },
  staged: {
    "*": "vp check --fix",
  },
});
