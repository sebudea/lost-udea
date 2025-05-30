export interface ItemType {
  value: string;
  label: string;
}

export const ITEM_TYPES: ItemType[] = [
  { value: 'carnet', label: 'Carné Estudiantil' },
  { value: 'documento', label: 'Documento de Identidad' },
  { value: 'celular', label: 'Celular' },
  { value: 'portatil', label: 'Computador Portátil' },
  { value: 'audifonos', label: 'Audífonos' },
  { value: 'cable', label: 'Cable o Cargador' },
  { value: 'mochila', label: 'Mochila o Bolso' },
  { value: 'billetera', label: 'Billetera' },
  { value: 'llaves', label: 'Llaves' },
  { value: 'libro', label: 'Libro' },
  { value: 'cuaderno', label: 'Cuaderno o Carpeta' },
  { value: 'ropa', label: 'Ropa o Chaqueta' },
  { value: 'termo', label: 'Termo o Botella' },
  { value: 'gafas', label: 'Gafas' },
  { value: 'sombrilla', label: 'Sombrilla o Paraguas' },
  { value: 'otro', label: 'Otro' }
]; 