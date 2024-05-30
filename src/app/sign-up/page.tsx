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
import { createClient } from '../../utils/supabase/client'

export default function SignUpForm() {
  const [userType, setUserType] = useState<'customers' | 'service-providers'>(
    'customers',
  )

  return (
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
              <Heading as="h3">Create an Account</Heading>
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
                // eslint-disable-next-line react/jsx-no-comment-textnodes
                <Text>//TODO: to be implemented</Text>
              )}
            </Box>

            {/* {searchParams?.message && (
              <p className="bg-foreground/10 text-foreground m-0 text-center">
                {searchParams.message}
              </p>
            )} */}
          </Flex>
        </Card>
      </Box>
    </Flex>
  )
}

function CustomerSignupForm() {
  const signUp = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          role: 'Customer',
        },
      },
    })

    if (error) {
      return redirect('/sign-up?message=Could not authenticate user')
    }

    return redirect('/sign-up?message=Check email to continue sign in process')
  }

  return (
    <form method="post">
      <Flex direction="column" justify="center" align="center" gap="5">
        <Box width="100%">
          <Text as="label" align="left">
            Preferred Name
          </Text>
          <TextField.Root
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
            type="text"
            name="full-name"
            placeholder="John Smith"
            mt="2"
          />
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            Email
          </Text>
          <TextField.Root
            type="email"
            name="email"
            placeholder="john.smith@email.com"
            mt="2"
          />
        </Box>

        <Box width="100%">
          <Text as="label" align="left">
            Password
          </Text>
          <TextField.Root
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
          <Button color="indigo" variant="solid" formAction={signUp}>
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}
