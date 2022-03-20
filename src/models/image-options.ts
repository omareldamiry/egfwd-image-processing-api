// This interface describes the query parameters that will be used for processing.
interface ImageOptions {
  readonly filename?: string;
  readonly width?: number;
  readonly height?: number;
}

export default ImageOptions;
