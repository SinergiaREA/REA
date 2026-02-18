#!/bin/bash

# Script para convertir imágenes JPEG a WebP
# Requiere: cwebp (instalado con libwebp)
# Ubuntu/Debian: sudo apt-get install webp
# macOS: brew install webp
# Windows: Descargar de https://developers.google.com/speed/webp/download

echo "🖼️  Convertir imágenes JPEG a WebP..."
echo "======================================"

# Verificar si cwebp está instalado
if ! command -v cwebp &> /dev/null; then
    echo "❌ Error: cwebp no está instalado"
    echo ""
    echo "Instálalo con:"
    echo "  Ubuntu/Debian: sudo apt-get install webp"
    echo "  macOS: brew install webp"
    echo "  Windows: https://developers.google.com/speed/webp/download"
    exit 1
fi

# Crear directorio de respaldo
mkdir -p img/backup

# Contador
count=0

# Convertir cada imagen
for img in img/*.jpeg img/*.jpg img/*.png 2>/dev/null; do
    if [ -f "$img" ]; then
        # Obtener nombre sin extensión
        filename="${img%.*}"
        basename=$(basename "$filename")
        
        # Convertir a WebP con calidad 85
        cwebp -q 85 "$img" -o "${filename}.webp"
        
        if [ $? -eq 0 ]; then
            echo "✅ Convertido: $basename.webp"
            
            # Copiar original a backup
            cp "$img" "img/backup/"
            
            ((count++))
        else
            echo "❌ Error convirtiendo: $img"
        fi
    fi
done

echo ""
echo "======================================"
echo "✨ Conversión completada: $count imágenes"
echo "📦 Originales respaldados en: img/backup/"
echo ""
echo "📊 Comparación de tamaños:"
du -sh img/*.jpeg img/*.jpg img/*.png 2>/dev/null | head -5
echo "vs"
du -sh img/*.webp 2>/dev/null | head -5
