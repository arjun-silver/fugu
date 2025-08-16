// @ts-check

import { defineConfig } from "@ilyasemenov/eslint-config"

export default defineConfig({
  vue: true,
  vuePug: true,
  rules: {
    "antfu/no-top-level-await": "off",
  },
}).append({
  files: ["app/openapi/*/openapi.yaml"],
  rules: {
    "jsonc/object-curly-newline": ["error", { consistent: true, multiline: true, minProperties: 1 }],
  },
})
