import sharp from "sharp"
import { z } from "zod"

export type ImageConstraints = {
  maxBytes?: number
  minWidth?: number
  minHeight?: number
  aspectRatio?: number // width / height
}

export const imageUploadSchema = z.object({
  filename: z.string().min(1),
  mimeType: z.string().regex(/^image\//),
  bytes: z.instanceof(Buffer),
})

export async function validateImage(buffer: Buffer, constraints: ImageConstraints) {
  const info = await sharp(buffer).metadata()
  const width = info.width || 0
  const height = info.height || 0
  const sizeBytes = buffer.byteLength

  if (constraints.maxBytes && sizeBytes > constraints.maxBytes) {
    throw new Error(`Image exceeds max size of ${constraints.maxBytes} bytes`)
  }
  if (constraints.minWidth && width < constraints.minWidth) {
    throw new Error(`Image width ${width} is below minimum ${constraints.minWidth}`)
  }
  if (constraints.minHeight && height < constraints.minHeight) {
    throw new Error(`Image height ${height} is below minimum ${constraints.minHeight}`)
  }
  if (constraints.aspectRatio) {
    const ratio = width / Math.max(height, 1)
    if (Math.abs(ratio - constraints.aspectRatio) > 0.05) {
      throw new Error(`Image aspect ratio ~${ratio.toFixed(2)} must be ~${constraints.aspectRatio}`)
    }
  }

  return { width, height, sizeBytes }
}

export async function generateVariants(buffer: Buffer) {
  const webp = await sharp(buffer).webp({ quality: 85 }).toBuffer()
  const avif = await sharp(buffer).avif({ quality: 50 }).toBuffer()
  return { webp, avif }
}


