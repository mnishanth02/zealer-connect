import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import twConfig from "@repo/ui/tailwind.config";

const config: Config = {
  ...twConfig,
  theme: {
    ...twConfig.theme,
    extend: {
      ...twConfig.theme.extend,
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
    },
  },
};
export default config;
