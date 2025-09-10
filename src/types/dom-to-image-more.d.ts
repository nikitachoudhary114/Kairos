declare module "dom-to-image-more" {
  interface Options {
    width?: number;
    height?: number;
    style?: Record<string, string>;
    filter?: (node: Node) => boolean;
  }

  function toPng(node: Node, options?: Options): Promise<string>;
  function toJpeg(node: Node, options?: Options): Promise<string>;
  function toSvg(node: Node, options?: Options): Promise<string>;

  export { toPng, toJpeg, toSvg, Options };
  const domtoimage: {
    toPng: typeof toPng;
    toJpeg: typeof toJpeg;
    toSvg: typeof toSvg;
  };
  export default domtoimage;
}
