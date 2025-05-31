import { Box, Button, Typography } from "@mui/material";
import CloudUpload from "@mui/icons-material/CloudUpload";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useRef } from "react";
import type { ImageUploadProps } from "./types";

export function ImageUpload({
  onImageChange,
  onPreviewChange,
  error,
  optional = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        onPreviewChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Por ahora, simplemente abrimos el selector de archivos
      fileInputRef.current?.click();
      // Limpiamos el stream
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error accessing camera:", error);
      fileInputRef.current?.click();
    }
  };

  return (
    <Box sx={{ mt: 3, textAlign: "center" }}>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {optional
          ? "¿Tienes una foto del objeto? (Opcional)"
          : "Sube una foto del objeto"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<CloudUpload />}
          onClick={() => fileInputRef.current?.click()}
        >
          Subir Foto
        </Button>
        <Button
          variant="outlined"
          startIcon={<PhotoCamera />}
          onClick={handleCameraCapture}
        >
          Tomar Foto
        </Button>
      </Box>

      {error && (
        <Typography
          color="error"
          variant="caption"
          display="block"
          sx={{ mt: 1 }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
