import { NextResponse } from 'next/server'
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

const uploadFileToS3 = async (buffer: Buffer, fileName: string) => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${Date.now()}-${fileName}`,
    Body: buffer,
  }

  try {
    const parallelUpload = new Upload({
      client: s3Client,
      params: uploadParams,
    })

    const uploadResult = await parallelUpload.done()
    return uploadResult.Location
  } catch (error) {
    console.error('Error uploading file to S3:', error)
    throw new Error('Failed to upload image to S3')
  }
}

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'File is required' },
        { status: 400 },
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileUrl = await uploadFileToS3(buffer, file.name)

    return NextResponse.json({ success: true, fileUrl }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Error uploading image' },
      { status: 500 },
    )
  }
}
