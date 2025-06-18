export interface ImageUploadProps {
  onImageSelect?: (file: File | null) => void;
  onImageChange?: (file: File | null) => void;
  onPreviewChange?: (url: string | null) => void;
  previewUrl?: string | null;
  error?: string;
  optional?: boolean;
  disabled?: boolean;
} 