'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { toast } from 'sonner'
import {
  getUser,
  getServiceProviderData,
  upsertServiceProviderData,
  uploadImage,
} from '@/actions/service-providers'

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
    const fetchUser = async () => {
      const user = await getUser()

      if (user) {
        setUserId(user.id as any)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return
      const data = await getServiceProviderData(userId as string)
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
    if (userId) {
      fetchData()
    }
  }, [userId])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const fieldName = event.target.name as keyof typeof formData

    if (file) {
      const fileUrl = await uploadImage(file)
      if (fileUrl) {
        setFormData(prevState => ({
          ...prevState,
          [fieldName]: fileUrl,
        }))
      }
    }
  }

  const handleSubmit = async (event: ChangeEvent<HTMLInputElement> | any) => {
    event.preventDefault()
    const success = await upsertServiceProviderData({ ...formData, userId })

    if (success) {
      toast.success('Profile updated successfully')
    } else {
      console.error('Failed to update profile')
    }
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
