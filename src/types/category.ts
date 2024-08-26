interface CategoryImage {
  url: string;
  width: number;
  height: number;
}

interface CategoryBorderInfo {
  dominatingColor: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
  homogeneity: boolean;
}

interface Category {
  id: number;
  parentId?: number;
  orderBy: number;
  name: string;
  nameTranslated: Record<string, string>;
  url: string;
  productCount: number;
  description: string;
  descriptionTranslated: Record<string, string>;
  enabled: boolean;
  seoTitle: string;
  seoDescription: string;
  hdThumbnailUrl: string;
  thumbnailUrl: string;
  imageUrl: string;
  originalImageUrl: string;
  originalImage: CategoryImage;
  thumbnail: CategoryImage;
  borderInfo: CategoryBorderInfo;
  children?: Category[];
}

interface CategoriesResponse {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: Category[];
}