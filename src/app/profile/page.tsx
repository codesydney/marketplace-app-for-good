'use client'

import { useState, useEffect } from 'react'
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
    const fetchUser = async () => {
      const supabase = createClient()
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

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const supabase = createClient()

    await supabase.from('service_providers').insert([
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
          Profile Image URL:
          <input
            type="text"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
          />
        </label>
        <label>
          Cover Image URL:
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
          />
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
