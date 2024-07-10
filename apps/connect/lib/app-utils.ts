import { customAlphabet } from "nanoid";

export const generateCustomId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 5);
