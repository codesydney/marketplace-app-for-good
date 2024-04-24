'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    profileImage: '',
    coverImage: '',
    abn: '',
    acn: '',
  })
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const supabase = createClient()
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
        return
      }
      if (data.user) {
        setUserId(data.user.id as any)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (!userId) return
    const supabase = createClient()
    const fetchServiceProviderData = async () => {
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .eq('user_id', userId)
        .single()
      if (error) {
        console.error('Error fetching service provider data:', error)
        return
      }
      if (data) {
        setFormData({
          name: data.name || '',
          slug: data.slug || '',
          profileImage: data.profile_image_url || '',
          coverImage: data.cover_image_url || '',
          abn: data.abn || '',
          acn: data.acn || '',
        })
      }
    }
    fetchServiceProviderData()
  }, [userId])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleImageUpload = async (
    file: File,
    fieldName: keyof typeof formData,
  ) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch('/api/v1/image-upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setFormData(prevState => ({
          ...prevState,
          [fieldName]: data.fileUrl,
        }))
      } else {
        console.error('Failed to upload image:', data.message)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file, event.target.name as keyof FormData)
    }
  }

  const handleSubmit = async (event: ChangeEvent<HTMLInputElement> | any) => {
    event.preventDefault()
    const supabase = createClient()
    await supabase.from('service_providers').upsert([
      {
        user_id: userId,
        name: formData.name,
        slug: formData.slug,
        profile_image_url: formData.profileImage,
        cover_image_url: formData.coverImage,
        abn: formData.abn,
        acn: formData.acn,
      },
    ])
  }

  if (!userId) return <div>Loading...</div>

  return (
    <div>
      <h1>Users Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Slug:
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />
        </label>
        <label>
          Profile Image:
          <input
            type="file"
            name="profileImage"
            onChange={handleImageChange}
            accept="image/*"
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile"
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </label>
        <label>
          Cover Image:
          <input
            type="file"
            name="coverImage"
            onChange={handleImageChange}
            accept="image/*"
          />
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Cover"
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </label>
        <label>
          ABN:
          <input
            type="text"
            name="abn"
            value={formData.abn}
            onChange={handleChange}
          />
        </label>
        <label>
          ACN (optional):
          <input
            type="text"
            name="acn"
            value={formData.acn}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  )
}
