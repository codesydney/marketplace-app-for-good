import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { Address, Task } from './utility-types'

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

export type CreateTaskFormData = Omit<
  Task,
  | 'id'
  | 'address_id'
  | 'status'
  | 'suburb'
  | 'postcode'
  | 'updated_at'
  | 'created_at'
  | 'due_date'
> & {
  due_date: Date
  address: Omit<Address, 'id' | 'user_id'>
}

export const createTaskForm: z.ZodSchema<CreateTaskFormData> = z.object({
  id: z.string().uuid(),
  customer_id: z.string().uuid(),
  title: z.string(),
  budget: z.number(),
  description: z.string(),
  due_date: z.coerce.date(),
  due_date_type: z.enum(['ON_DATE', 'BEFORE_DATE']),
  address: z.object({
    address_line_1: z.string(),
    address_line_2: z.string().nullable(),
    suburb: z.string(),
    state: z.enum(['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT']),
    postcode: z.string(),
    country: z.string(),
  }),
  task_category_id: z.number(),
})
