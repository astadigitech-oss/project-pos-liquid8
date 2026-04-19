declare module "@point-of-sale/receipt-printer-encoder" {
  export interface EncoderOptions {
    width?: number;
    characterSet?: string;
    language?: string;
    imageMode?: "column" | "raster";
  }

  export default class ReceiptPrinterEncoder {
    constructor(options?: EncoderOptions);
    initialize(): this;
    codepage(value: string): this;
    align(value: "left" | "center" | "right"): this;
    bold(value: boolean): this;
    italic(value: boolean): this;
    underline(value: boolean | number): this;
    line(value: string): this;
    newline(): this;
    table(columns: { width: number; align?: string }[], data: string[][]): this;
    qrcode(
      value: string,
      model?: number,
      size?: number,
      errorLevel?: string,
    ): this;
    barcode(value: string, type: string, height?: number): this;
    image(
      data: any,
      width: number,
      height: number,
      algorithm?: string,
      threshold?: number,
    ): this;
    cut(value?: "full" | "partial"): this;
    feed(value: number): this;
    encode(): Uint8Array;
  }
}
