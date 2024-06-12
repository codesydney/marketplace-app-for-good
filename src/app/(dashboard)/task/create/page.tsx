import React from 'react'
import {
  Card,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'

export default function Task() {
  return (
    <div className="flex flex-col gap-2 px-4">
      <Card size="3">
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
              id="title"
              variant="surface"
              placeholder="End of Lease Clean"
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text asChild size="2" weight="bold">
              <label htmlFor="description">Description</label>
            </Text>
            <TextArea
              id="description"
              variant="surface"
              placeholder="I am moving out of my 2 bedroom unit and will a cleaner to clean the unit before I hand the keys back."
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text asChild size="2" weight="bold">
              <label htmlFor="category">Category</label>
            </Text>
            <TextField.Root
              id="category"
              variant="surface"
              placeholder="Cleaning"
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text asChild size="2" weight="bold">
              <label htmlFor="budget">Budget</label>
            </Text>
            <TextField.Root
              id="budget"
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
                <label htmlFor="address_line_1">Address Line 1</label>
              </Text>
              <TextField.Root
                id="address_line_1"
                variant="surface"
                placeholder="123 George St"
              />
            </Flex>

            <Flex direction="column" gap="2">
              <Text asChild size="2" weight="bold">
                <label htmlFor="address_line_2">Address Line 2</label>
              </Text>
              <TextField.Root
                id="address_line_2"
                variant="surface"
                placeholder=""
              />
            </Flex>

            <Flex direction="column" gap="2">
              <Text asChild size="2" weight="bold">
                <label htmlFor="suburb">Suburb</label>
              </Text>
              <TextField.Root
                id="suburb"
                variant="surface"
                placeholder="Sydney"
              />
            </Flex>

            <Flex direction="column" gap="2">
              <Text asChild size="2" weight="bold">
                <label htmlFor="state">State</label>
              </Text>
              <TextField.Root id="state" variant="surface" placeholder="NSW" />
            </Flex>

            <Flex direction="column" gap="2">
              <Text asChild size="2" weight="bold">
                <label htmlFor="postcode">Postcode</label>
              </Text>
              <TextField.Root
                id="postcode"
                variant="surface"
                placeholder="2000"
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
                <label htmlFor="address_line_1">Preferred Date</label>
              </Text>
              <TextField.Root
                type="date"
                id="date"
                variant="surface"
                placeholder="123 George St"
              />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </div>
  )
}
