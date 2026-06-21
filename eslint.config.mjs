import next from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

// Flat config using @next/eslint-plugin-next directly (no FlatCompat / eslintrc —
// that combo hit a "Converting circular structure to JSON" crash on ESLint 9.39).
// Type-checking is handled by `next build` (tsc); this lints Next a11y/perf rules.
const eslintConfig = [
  {
    ignores: [
      ".next/",
      "design-ref/",
      "node_modules/",
      "src/payload-types.ts",
      "src/payload-generated-schema.ts",
      "src/app/(payload)/**",
    ],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "@next/next": next },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
      // design-ref intentionally uses raw <img> (CLS-safe per T051 audit; many
      // external hosts). Fidelity port — keep as-is.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
