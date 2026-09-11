export function formatMinutes(total: number): string {
  if (total < 60) return `${total} min`;
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const UNICODE_FRACTIONS: Record<string, number> = {
  "¼": 0.25,
  "½": 0.5,
  "¾": 0.75,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "⅛": 0.125,
};

function parseLeadingQuantity(text: string): { value: number; matchLength: number } | null {
  const unicodeMatch = text.match(/^(\d+\s*)?([¼½¾⅓⅔⅛])/);
  if (unicodeMatch) {
    const whole = unicodeMatch[1] ? parseFloat(unicodeMatch[1]) : 0;
    return { value: whole + UNICODE_FRACTIONS[unicodeMatch[2]], matchLength: unicodeMatch[0].length };
  }
  const mixedMatch = text.match(/^(\d+)\s+(\d+)\/(\d+)/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1], 10);
    const num = parseInt(mixedMatch[2], 10);
    const den = parseInt(mixedMatch[3], 10);
    return { value: whole + num / den, matchLength: mixedMatch[0].length };
  }
  const fractionMatch = text.match(/^(\d+)\/(\d+)/);
  if (fractionMatch) {
    const num = parseInt(fractionMatch[1], 10);
    const den = parseInt(fractionMatch[2], 10);
    return { value: num / den, matchLength: fractionMatch[0].length };
  }
  const decimalMatch = text.match(/^(\d+(\.\d+)?)/);
  if (decimalMatch) {
    return { value: parseFloat(decimalMatch[1]), matchLength: decimalMatch[0].length };
  }
  return null;
}

function formatQuantity(value: number): string {
  const rounded = Math.round(value * 4) / 4;
  if (Number.isInteger(rounded)) return String(rounded);
  const whole = Math.floor(rounded);
  const fraction = rounded - whole;
  const fractionLabel = fraction === 0.25 ? "¼" : fraction === 0.5 ? "½" : fraction === 0.75 ? "¾" : null;
  if (fractionLabel) return whole > 0 ? `${whole}${fractionLabel}` : fractionLabel;
  return String(Math.round(rounded * 100) / 100);
}

export function scaleIngredient(ingredient: string, ratio: number): string {
  if (ratio === 1) return ingredient;
  const parsed = parseLeadingQuantity(ingredient);
  if (!parsed || parsed.value <= 0) return ingredient;
  const scaled = formatQuantity(parsed.value * ratio);
  return scaled + ingredient.slice(parsed.matchLength);
}
