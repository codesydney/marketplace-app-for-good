import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

export const POST = (req: Request) => {
  console.info(PutObjectCommand)
  console.info(req)
  console.info(s3Client)

  return NextResponse.json(
    { success: true, message: 'Hello, World!' },
    { status: 200 },
  )
}
