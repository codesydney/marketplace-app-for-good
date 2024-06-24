import React from 'react'
import {
  Card,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { Form, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTaskForm, CreateTaskFormData } from '@/types/forms'

export default function Task() {
  const {
    register,
    // formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskForm),
  })

  return (
    <div className="flex flex-col gap-2 px-4">
      <Card size="3">
        <Form>
          <Flex align="center" justify="between" my="4">
            <Heading as="h2" size="6" trim="both">
              Create new task
            </Heading>
          </Flex>

          <Flex align="center" justify="between" my="4">
            <Heading as="h3" size="4" trim="both">
              Tell us more about your task
            </Heading>
          </Flex>

          <Flex direction="column" gap="4">
            <Flex direction="column" gap="2">
              <Text asChild size="2" weight="bold">
                <label htmlFor="title">Title</label>
              </Text>
              <TextField.Root
                {...register('title')}
                variant="surface"
                placeholder="End of Lease Clean"
              />
            </Flex>

            <Flex direction="column" gap="2">
              <Text asChild size="2" weight="bold">
                <label htmlFor="description">Description</label>
              </Text>
              <TextArea
                {...register('description')}
                variant="surface"
                placeholder="I am moving out of my 2 bedroom unit and will a cleaner to clean the unit before I hand the keys back."
              />
            </Flex>

            <Flex direction="column" gap="2">
              <Text asChild size="2" weight="bold">
                <label htmlFor="category">Category</label>
              </Text>
              <TextField.Root
                {...register('task_category_id')}
                variant="surface"
                placeholder="Cleaning"
              />
            </Flex>

            <Flex direction="column" gap="2">
              <Text asChild size="2" weight="bold">
                <label htmlFor="budget">Budget</label>
              </Text>
              <TextField.Root
                {...register('budget')}
                type="number"
                variant="surface"
                placeholder="200"
              >
                <TextField.Slot>$</TextField.Slot>
              </TextField.Root>
            </Flex>

            <Flex direction="column" gap="2">
              <Flex align="center" justify="between" my="4">
                <Heading as="h3" size="4" trim="both">
                  Where does the task need to be done?
                </Heading>
              </Flex>

              <Flex direction="column" gap="2">
                <Text asChild size="2" weight="bold">
                  <label htmlFor="address.address_line_1">Address Line 1</label>
                </Text>
                <TextField.Root
                  variant="surface"
                  placeholder="123 George St"
                  {...register('address.address_line_1')}
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text asChild size="2" weight="bold">
                  <label htmlFor="address.address_line_2">Address Line 2</label>
                </Text>
                <TextField.Root
                  variant="surface"
                  placeholder=""
                  {...register('address.address_line_2')}
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text asChild size="2" weight="bold">
                  <label htmlFor="address.suburb">Suburb</label>
                </Text>
                <TextField.Root
                  variant="surface"
                  placeholder="Sydney"
                  {...register('address.suburb')}
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text asChild size="2" weight="bold">
                  <label htmlFor="address.state">State</label>
                </Text>
                <TextField.Root
                  variant="surface"
                  placeholder="NSW"
                  {...register('address.state')}
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text asChild size="2" weight="bold">
                  <label htmlFor="address.postcode">Postcode</label>
                </Text>
                <TextField.Root
                  variant="surface"
                  placeholder="2000"
                  {...register('address.postcode')}
                />
              </Flex>
            </Flex>

            <Flex direction="column" gap="2">
              <Flex align="center" justify="between" my="4">
                <Heading as="h3" size="4" trim="both">
                  When would you like your task done?
                </Heading>
              </Flex>

              <Flex direction="column" gap="2">
                <Text asChild size="2" weight="bold">
                  <label htmlFor="due_date">Date</label>
                </Text>
                <TextField.Root
                  type="date"
                  variant="surface"
                  placeholder="123 George St"
                  {...register('due_date')}
                />
              </Flex>
            </Flex>
          </Flex>
        </Form>
      </Card>
    </div>
  )
}
