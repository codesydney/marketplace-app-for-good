import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const customerSignupFormSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(8)),
  preferred_name: zfd.text(z.string()),
  fullname: zfd.text(z.string()),
})

export type CustomerSignupFormSchema = z.infer<typeof customerSignupFormSchema>

export const serviceProviderSignupFormSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(8)),
  preferred_name: zfd.text(z.string()),
  fullname: zfd.text(z.string()),
  company_name: zfd.text(z.string().trim()), // Add .trim() to remove leading and trailing whitespace
  abn: zfd.text(
    z
      .string()
      .transform(s => s.replace(/\s/g, ''))
      .pipe(z.string().length(11).regex(/^\d+$/)),
  ),
  acn: zfd.text(
    z
      .string()
      .transform(s => s.replace(/\s/g, ''))
      .pipe(z.string().length(9).regex(/^\d+$/).optional()),
  ),
  industry: zfd.text(z.string()),
})

export type ServiceProviderSignupFormSchema = z.infer<
  typeof serviceProviderSignupFormSchema
>
