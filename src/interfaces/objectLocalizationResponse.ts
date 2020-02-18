export interface ObjectLocalizationResponse {
  faceAnnotations: any[];
  landmarkAnnotations: any[];
  logoAnnotations: any[];
  labelAnnotations: any[];
  textAnnotations: any[];
  localizedObjectAnnotations: LocalizedObjectAnnotation[];
  safeSearchAnnotation?: any;
  imagePropertiesAnnotation?: any;
  error?: any;
  cropHintsAnnotation?: any;
  fullTextAnnotation?: any;
  webDetection?: any;
  productSearchResults?: any;
  context?: any;
}

export interface LocalizedObjectAnnotation {
  mid: string;
  languageCode: string;
  name: string;
  score: number;
  boundingPoly: BoundingPoly;
}

export interface BoundingPoly {
  vertices: any[];
  normalizedVertices: NormalizedVertex[];
}

export interface NormalizedVertex {
  x: number;
  y: number;
}
