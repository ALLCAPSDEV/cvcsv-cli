export interface Choice {
  title: string;
  value: ProductCategoryChoiceValue;
}

export enum ProductCategoryChoiceValue {
  HOMEGOODS = 'homegoods-v2',
  APPAREL = 'apparel-v2',
  TOYS = 'toys-v2',
  PACKAGEDGOODS = 'packagedgoods-v1'
}

export type ProductCategories =
  | 'apparel-v2'
  | 'homegoods-v2'
  | 'packagedgood-v1'
  | 'toys-v2';
