export interface Category {
    id: string;
    has_name: string;
    sigle: string;
    path: string;
    description: string;
  }
  
  export interface Meal {
    id: string;
    nom: string;
    path: string;
    created_at: string;
    description: string;
    has_img_size: string;
    label: string;
    classe: {
      id: string;
      has_name: string;
      sigle: string;
      path: string;
      description: string;
    };
    couleurs: Array<{
      id: string;
      label: string;
      description: string;
      has_hue_mean: number;
      has_hue_std: number;
      has_saturation_mean: number;
      has_saturation_std: number;
      has_value_mean: number;
      has_value_std: number;
    }>;
    contours: Array<{
      id: string;
      label: string;
      description: string;
      has_area: number;
      has_perimeter: number;
      has_width: number;
      has_height: number;
      has_normalized_area: number;
      has_normalized_perimeter: number;
      has_aspect_ratio: number;
    }>;
    textures: Array<{
      id: string;
      label: string;
      description: string;
      has_contrast: number;
      has_dissimilarity: number;
      has_energy: number;
      has_homogeneity: number;
      has_correlation: number;
    }>;
  }
  
  