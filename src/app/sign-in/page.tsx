import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes'

import { createClient } from '@/utils/supabase/server'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/sign-in?message=Could not authenticate user')
    }

    return redirect('/protected')
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
          md: '400px',
        }}
      >
        <Card size="4">
          <form method="post">
            <Flex direction="column" justify="center" align="center" gap="5">
              <Box width="100%">
                <Heading as="h3">Sign In</Heading>
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
                <Link href="/service-providers/sign-up">
                  <Button type="button" color="indigo" variant="soft">
                    Create an account
                  </Button>
                </Link>
                <Button color="indigo" variant="solid" formAction={signIn}>
                  Sign In
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
