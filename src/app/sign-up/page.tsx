'use client'

import {
  Flex,
  Box,
  Card,
  Heading,
  RadioCards,
  Text,
  TextField,
  Button,
} from '@radix-ui/themes'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Form, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '../../utils/supabase/client'
import {
  CustomerSignupFormSchema,
  customerSignupFormSchema,
} from '@/types/forms'

export default function SignUpForm() {
  const [userType, setUserType] = useState<'customers' | 'service-providers'>(
    'customers',
  )

  return (
    <Box p={{ initial: '4', md: '8' }}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        width="100%"
        height="100%"
      >
        <Box
          width={{
            initial: '100%',
            md: '600px',
          }}
        >
          <Card size="4">
            <Flex direction="column" justify="center" align="center" gap="4">
              <Box width="100%">
                <Heading as="h1">Create an Account</Heading>
              </Box>
              <Box width="100%">
                <Flex
                  direction={{ initial: 'column', md: 'row' }}
                  justify="between"
                >
                  <RadioCards.Root
                    defaultValue="customers"
                    columns="2"
                    className="w-full"
                    onValueChange={value =>
                      setUserType(value as 'customers' | 'service-providers')
                    }
                  >
                    <RadioCards.Item value="customers">
                      <Flex direction="column" width="100%">
                        <Text weight="bold">Customer</Text>
                        <Text>Need help with a task?</Text>
                      </Flex>
                    </RadioCards.Item>
                    <RadioCards.Item value="service-providers">
                      <Flex direction="column" width="100%">
                        <Text weight="bold">Service Provider</Text>
                        <Text>Earn money as a provider.</Text>
                      </Flex>
                    </RadioCards.Item>
                  </RadioCards.Root>
                </Flex>
              </Box>

              <Box width="100%">
                {userType === 'customers' && <CustomerSignupForm />}
                {userType === 'service-providers' && (
                  <ServiceProviderSignupForm />
                )}
              </Box>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Box>
  )
}

function CustomerSignupForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<CustomerSignupFormSchema>({
    resolver: zodResolver(customerSignupFormSchema),
  })

  const onSuccess = async () => {
    toast.success(
      'Successfully created new customer account. Redirecting to sign in...',
    )

    setTimeout(() => {
      redirect('/sign-in')
    }, 5000)
  }

  const onError = async ({
    response,
  }: {
    response?: Response
    error?: unknown
  }) => {
    const responseBody = await response?.json()
    toast.error(responseBody.message)
  }

  return (
    <Form
      action="/api/v1/customers/sign-up"
      method="post"
      control={control}
      onSuccess={onSuccess}
      onError={onError}
    >
      <Flex direction="column" justify="center" align="center" gap="4">
        <Box width="100%">
          <Text as="label" align="left">
            Preferred Name
          </Text>
          <TextField.Root
            required
            placeholder="John"
            mt="2"
            mb="1"
            {...register('preferred_name')}
          />
          <Text as="label" color="red" align="left">
            {errors.preferred_name?.message ?? ''}
          </Text>
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            Full Name
          </Text>
          <TextField.Root
            required
            type="text"
            placeholder="John Smith"
            mt="2"
            mb="1"
            {...register('fullname')}
          />
          <Text as="label" color="red" align="left">
            {errors.fullname?.message ?? ''}
          </Text>
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            Email
          </Text>
          <TextField.Root
            required
            type="email"
            placeholder="john.smith@email.com"
            mt="2"
            mb="1"
            {...register('email')}
          />
          <Text as="label" color="red" align="left">
            {errors.email?.message ?? ''}
          </Text>
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            Password
          </Text>
          <TextField.Root
            required
            type="password"
            placeholder="********"
            mt="2"
            mb="1"
            {...register('password')}
          />
          <Text as="label" color="red" align="left">
            {errors.password?.message ?? ''}
          </Text>
        </Box>

        <Flex direction="row" width="100%" justify="end" gap="4">
          <Link href="sign-in">
            <Button type="button" color="indigo" variant="soft">
              Already have an account?
            </Button>
          </Link>
          <Button color="indigo" variant="solid">
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Form>
  )
}

function ServiceProviderSignupForm() {
  const signUp = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const preferredName = formData.get('preferred-name') as string
    const fullname = formData.get('fullname') as string
    const companyName = formData.get('company-name') as string
    const abn = formData.get('abn') as string
    const acn = formData.get('acn') as string
    const industry = formData.get('industry') as string

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'service-provider',
          onboarded: false,
          // TODO migrate this to the backend since we don't this to be set on the frontend
          preferredName,
          fullname,
          companyDetails: {
            companyName,
            abn,
            acn,
            industry,
          },
        },
      },
    })

    if (error) {
      return redirect('/sign-up?message=Could not authenticate user')
    }

    return redirect('/sign-up?message=Check email to continue sign in process')
  }

  return (
    <form method="post" action={signUp}>
      <Flex direction="column" justify="center" align="center" gap="5">
        <Box width="100%">
          <Heading as="h2" size="5">
            Company Details
          </Heading>
        </Box>
        <Box width="100%">
          <Text as="label" align="left">
            Company Name
          </Text>
          <TextField.Root
            required
            type="text"
            name="company-name"
            placeholder="Jim's Mowing"
            mt="2"
          />
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            ABN
          </Text>
          <TextField.Root
            required
            type="text"
            name="abn"
            placeholder="12 345 678 901"
            mt="2"
          />
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            ACN (Optional)
          </Text>
          <TextField.Root
            type="text"
            name="acn"
            placeholder="123 456 789"
            mt="2"
          />
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            Industry
          </Text>
          <TextField.Root
            required
            type="text"
            name="acn"
            placeholder="Lawnmowing"
            mt="2"
          />
        </Box>

        <Box width="100%">
          <Heading as="h2" size="5">
            Contact Information
          </Heading>
        </Box>
        <Box width="100%">
          <Text as="label" align="left">
            Preferred Name
          </Text>
          <TextField.Root
            required
            type="text"
            name="preferred-name"
            placeholder="John"
            mt="2"
          />
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            Full Name
          </Text>
          <TextField.Root
            required
            type="text"
            name="fullname"
            placeholder="Jim Smith"
            mt="2"
          />
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            Email
          </Text>
          <TextField.Root
            required
            type="email"
            name="email"
            placeholder="jim.smith@email.com"
            mt="2"
          />
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            Password
          </Text>
          <TextField.Root
            required
            type="password"
            name="password"
            placeholder="********"
            mt="2"
          />
        </Box>

        <Flex direction="row" width="100%" justify="end" gap="4">
          <Link href="sign-in">
            <Button type="button" color="indigo" variant="soft">
              Already have an account?
            </Button>
          </Link>
          <Button color="indigo" variant="solid">
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}
