import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const customerSignupFormSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(8)),
  preferred_name: zfd.text(z.string()),
  fullname: zfd.text(z.string()),
})

export const serviceProviderSignupFormSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(8)),
  preferred_name: zfd.text(z.string()),
  fullname: zfd.text(z.string()),
  company_name: zfd.text(z.string()),
  abn: zfd.text(z.string().length(11)),
  acn: zfd.text(z.string().length(9).optional()),
  industry: zfd.text(z.string()),
})
