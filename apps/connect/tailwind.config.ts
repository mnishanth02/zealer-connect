import type { Config } from "tailwindcss";

import sharedTailwindConfig from "@repo/ui/tailwind.config";

const config: Config = {
  ...sharedTailwindConfig,
  content: [
    ...sharedTailwindConfig.content,
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};
export default config;
