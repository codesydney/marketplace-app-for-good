import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  RadioCards,
  Text,
  TextField,
} from '@radix-ui/themes'

import { createClient } from '@/utils/supabase/server'

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
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
          <form method="post">
            <Flex direction="column" justify="center" align="center" gap="5">
              <Box width="100%">
                <Heading as="h3">Create an Account</Heading>
              </Box>
              <Box width="100%">
                <Flex
                  direction={{ initial: 'column', md: 'row' }}
                  justify="between"
                >
                  <RadioCards.Root
                    defaultValue="1"
                    columns="2"
                    className="w-full"
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
                <Text as="label" align="left">
                  Email
                </Text>
                <TextField.Root
                  type="email"
                  name="email"
                  placeholder="Email"
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
                  placeholder="Password"
                  mt="2"
                />
              </Box>

              <Flex direction="row" width="100%" justify="end" gap="4">
                <Link href="sign-in">
                  <Button type="button" color="indigo" variant="soft">
                    Sign In
                  </Button>
                </Link>
                <Button color="indigo" variant="solid" formAction={signUp}>
                  Sign Up
                </Button>
              </Flex>

              {searchParams?.message && (
                <p className="bg-foreground/10 text-foreground m-0 text-center">
                  {searchParams.message}
                </p>
              )}
            </Flex>
          </form>
        </Card>
      </Box>
    </Flex>
  )
}
