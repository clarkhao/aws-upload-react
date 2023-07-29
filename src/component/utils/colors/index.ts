export const getLuminance = (hexColor: string) => {
  const rgb = (hexColor.match(/\w\w/g) ?? []).map((x) => parseInt(x, 16));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
};

export function getFontColor(bgColor: string): "white" | "black" {
  return getLuminance(bgColor) > 145 ? "black" : "white";
}

// Color calculation function
export function calculateHoverColor(bgColor: string) {
  // Remove any leading #
  const c = bgColor.substring(1);

  // Convert to RGB array
  const rgb = [
    parseInt(c.substring(0, 2), 16),
    parseInt(c.substring(2, 4), 16),
    parseInt(c.substring(4, 6), 16),
  ];
  //choose to darken or lighten
  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  const isDarken = luminance > 100;
  //console.log(isDarken);
  // Darken RGB color by 50%
  const prevHls = hexToHSL(bgColor);
  const newHls = isDarken ? changeHSL(prevHls, -20) : changeHSL(prevHls, 20);
  const hoverHex = hslToHex(newHls);

  //console.log(hoverHex);
  return hoverHex;
}
function hexToHSL(hex: string): string {
  // Convert HEX to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  // Convert RGB to HSL
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Convert HSL to CSS string format "hsl(h, s%, l%)"
  const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(
    s * 100
  )}%, ${Math.round(l * 100)}%)`;
  return hsl;
}
function hslToHex(hsl: string): string {
  // Extract HSL values
  const values = hsl.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
  const h = parseInt((values ?? [])[1]) / 360;
  const s = parseInt((values ?? [])[2]) / 100;
  const l = parseInt((values ?? [])[3]) / 100;

  // Convert HSL to RGB
  let r = 0,
    g = 0,
    b = 0;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  // Convert RGB to hex
  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return hex;
}
function changeHSL(hsl: string, change: number): string {
  const values = hsl.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
  const h = parseInt((values ?? [])[1]) / 360;
  const s = parseInt((values ?? [])[2]) / 100;
  const l = parseInt((values ?? [])[3]) / 100;
  const newL = l + change/100;
  //console.log(h, s, l)
  const newHSL = `hsl(${Math.round(h * 360)}, ${Math.round(
    s * 100
  )}%, ${Math.round(newL * 100)}%)`;
  return newHSL;
}