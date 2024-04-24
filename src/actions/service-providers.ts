import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

const getUser = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error fetching user:', error)
    return
  }

  return data.user
}

const getServiceProviderData = async (userId: string) => {
  if (!userId) return null
  const { data, error } = await supabase
    .from('service_providers')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching service provider data:', error)
    return null
  }
  return data
}

const upsertServiceProviderData = async (formData: any): Promise<Boolean> => {
  const { userId, name, slug, profileImage, coverImage, abn, acn } = formData
  const { error } = await supabase.from('service_providers').upsert({
    user_id: userId,
    name,
    slug,
    profile_image_url: profileImage,
    cover_image_url: coverImage,
    abn,
    acn,
  })

  if (error) {
    console.error('Error upserting service provider data:', error)
    return false
  }

  return true
}

const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch('/api/v1/image-upload', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()

    if (data.success) {
      return data.fileUrl
    } else {
      console.error('Failed to upload image:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}

export {
  getUser,
  getServiceProviderData,
  upsertServiceProviderData,
  uploadImage,
}
