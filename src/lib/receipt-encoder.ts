export interface EncoderOptions {
  width?: number;
  characterSet?: string;
}

export interface TableColumn {
  width: number;
  align?: "left" | "right";
  marginRight?: number;
}

export interface RuleOptions {
  style?: "single" | "double";
  width?: number;
}

export interface BoxOptions {
  style?: "none" | "single" | "double";
  width?: number;
  marginLeft?: number;
  marginRight?: number;
  align?: "left" | "right";
}

export interface BarcodeOptions {
  height?: number;
  width?: number;
  text?: boolean;
}

export interface QrcodeOptions {
  model?: 1 | 2;
  size?: number;
  errorlevel?: "l" | "m" | "q" | "h";
}

export default class ReceiptPrinterEncoder {
  private buffer: number[] = [];
  private options: EncoderOptions;
  private _font: "A" | "B" = "A";

  constructor(options: EncoderOptions = { width: 32 }) {
    this.options = options;
  }

  // Helper untuk mengubah teks ke bytes
  private textToBytes(text: string): number[] {
    return Array.from(new TextEncoder().encode(text));
  }

  initialize(): this {
    this.buffer = [];
    this.buffer.push(0x1b, 0x40);
    return this;
  }

  codepage(value: string): this {
    // Sederhananya kita asumsikan pemetaan standar
    // Implementasi asli membutuhkan tabel lookup pemetaan byte
    console.log(`Setting codepage to ${value}`);
    return this;
  }

  text(value: string): this {
    this.buffer.push(...this.textToBytes(value));
    return this;
  }

  newline(count: number = 1): this {
    for (let i = 0; i < count; i++) {
      this.buffer.push(0x0a);
    }
    return this;
  }

  line(value: string): this {
    this.text(value);
    this.newline();
    return this;
  }

  underline(state: boolean = true): this {
    this.buffer.push(0x1b, 0x2d, state ? 1 : 0);
    return this;
  }

  bold(state: boolean = true): this {
    this.buffer.push(0x1b, 0x45, state ? 1 : 0);
    return this;
  }

  italic(state: boolean = true): this {
    this.buffer.push(0x1b, 0x34, state ? 1 : 0);
    return this;
  }

  invert(state: boolean = true): this {
    this.buffer.push(0x1d, 0x42, state ? 1 : 0);
    return this;
  }

  align(value: "left" | "center" | "right"): this {
    const modes = { left: 0, center: 1, right: 2 };
    this.buffer.push(0x1b, 0x61, modes[value]);
    return this;
  }

  font(value: "A" | "B" | string): this {
    const n = value === "B" || value === "9x17" ? 1 : 0;
    this.buffer.push(0x1b, 0x4d, n);
    return this;
  }

  size(width: number = 1, height: number = 1): this {
    const n = ((width - 1) << 4) | (height - 1);
    this.buffer.push(0x1d, 0x21, n);
    return this;
  }

  table(columns: TableColumn[], data: any[][]): this {
    data.forEach((row) => {
      // 1. Pecah setiap cell menjadi array baris (Word Wrap)
      const wrappedRow = row.map((cell, i) => {
        const text = String(cell);
        const width = columns[i].width;
        const lines: string[] = [];

        // Logika memotong teks per lebar kolom
        for (let j = 0; j < text.length; j += width) {
          lines.push(text.substring(j, j + width));
        }
        return lines;
      });

      // 2. Hitung berapa total baris maksimal dalam satu row ini
      const maxLines = Math.max(...wrappedRow.map((lines) => lines.length));

      // 3. Cetak baris demi baris agar sejajar
      for (let lineIdx = 0; lineIdx < maxLines; lineIdx++) {
        let fullLine = "";

        wrappedRow.forEach((cellLines, colIdx) => {
          const col = columns[colIdx];
          const text = cellLines[lineIdx] || ""; // Ambil teks baris ke-n atau kosong
          const padding = col.width - text.length;

          if (col.align === "right") {
            fullLine += " ".repeat(Math.max(0, padding)) + text;
          } else {
            fullLine += text + " ".repeat(Math.max(0, padding));
          }

          // Tambahkan margin antar kolom
          fullLine += " ".repeat(col.marginRight || 0);
        });

        this.line(fullLine);
      }
    });
    return this;
  }

  rule(options: RuleOptions = {}): this {
    const char = options.style === "double" ? "=" : "-";
    const width = options.width || this.options.width || 32;
    this.line(char.repeat(width));
    return this;
  }

  pulse(device: number = 0, t1: number = 100, t2: number = 500): this {
    const pin = device === 0 ? 0 : 1;
    this.buffer.push(0x1b, 0x70, pin, Math.floor(t1 / 2), Math.floor(t2 / 2));
    return this;
  }

  cut(value: "partial" | "full" = "full"): this {
    const mode = value === "partial" ? 1 : 0;
    this.buffer.push(0x1d, 0x56, mode);
    return this;
  }

  raw(data: number[]): this {
    this.buffer.push(...data);
    return this;
  }

  encode(): Uint8Array {
    return new Uint8Array(this.buffer);
  }
}
