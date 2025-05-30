export interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  onPreviewChange: (url: string | null) => void;
  error?: string;
} 