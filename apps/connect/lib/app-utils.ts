import { customAlphabet } from "nanoid";

export const generateCustomId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 5);

type TextType = string | string[]; // Union type for text

export function calculateReadTime(text: TextType | undefined): string {
  if (!text) return "0 min read";

  const wordsPerMinute = 200; // Average reading speed

  const wordCount = typeof text === "string" ? text.split(/\s+/).length : text.join(" ").split(/\s+/).length;

  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return `${minutes} min read`;
}

export function formatDate(dateStr: string | null): string {
  let date: Date;

  if (dateStr === null) {
    date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    return `fetched at: ${formattedDate}`;
  } else {
    const match = dateStr.match(/^(.*?)\s\(updated:/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return dateStr;
  }
}
