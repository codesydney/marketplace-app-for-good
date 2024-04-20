import { Badge, Box, Button, Card, Flex, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import { tasks } from '../../../data/tasks.json'
import { formatDate, toCurrencyString } from '@/utils/utils'

type Task = (typeof tasks)[number]

export default async function TasksPage() {
  const activeTask = tasks[0]

  return (
    <Flex
      direction={{ initial: 'column', md: 'row' }}
      gap="6"
      p={{ initial: '4', md: '8' }}
      width="100%"
      className="max-w-6xl"
    >
      <Flex direction="column" gap="4" width="100%" maxWidth={{ md: '400px' }}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Flex>
      <Flex gap="1" width="100%">
        <TaskInformation task={activeTask} />
      </Flex>
    </Flex>
  )
}

function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="flex w-full justify-between bg-white p-4">
      <div className="flex flex-col gap-1">
        <p className="m-0 mb-2 font-semibold">{task.name}</p>
        <p className="m-0 text-sm">Location ID: {task.location_ids}</p>
        <p className="m-0 text-sm">Created At: {formatDate(task.created_at)}</p>
        <p className="m-0 text-sm">Deadline: {task.semantic_due_date}</p>
        {/* Status */}
        <p className="text-md m-0 mt-2">Status: {task.state}</p>
      </div>
      <div className="flex flex-col justify-between">
        <p className="m-0 font-extrabold">{toCurrencyString(task.price)}</p>
        <div></div>
      </div>
    </Card>
  )
}

function TaskInformation({ task }: { task: Task }) {
  return (
    <Flex gap="8" direction="column" className="w-full bg-white">
      <Flex direction="row" gap="4">
        <Flex gap="4" direction="column">
          <Box>
            <Badge color="blue">{task.state}</Badge>
            <Heading size="7">{task.name}</Heading>
            <Flex gap="2">
              <Text>Sydney NSW, Australia</Text>
              <Text>{formatDate(task.created_at)}</Text>
            </Flex>
          </Box>
          {/* <Box>
            <Text size="6" weight="bold">
              {toCurrencyString(task.price)}
            </Text>
          </Box> */}
          <Box>
            <Flex gap="4" className="items-center">
              <Box
                maxHeight="48px"
                maxWidth="48px"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="https://randomuser.me/api/portraits/men/93.jpg"
                  alt="Provider"
                  className="rounded-full"
                  width={48}
                  height={48}
                />
              </Box>
              <Box>
                <Text className="text-lg font-semibold">Davo T.</Text>
              </Box>
            </Flex>
          </Box>
          {/* <Box>
            <Button size="2" variant="solid" color="blue">
              Make an Offer
            </Button>
          </Box> */}
        </Flex>
        <Flex
          gap="4"
          direction="column"
          className="items-start justify-between rounded-lg bg-slate-200 p-2 shadow-md"
        >
          <Box>
            <Box>
              <Text size="4" weight="bold">
                Task Budget
              </Text>
            </Box>
            <Box>
              <Text size="6" weight="bold">
                {toCurrencyString(task.price)}
              </Text>
            </Box>
          </Box>

          <Box className=" min-w-[120px]">
            <Button size="2" variant="solid" color="blue">
              Make an Offer
            </Button>
          </Box>
        </Flex>
      </Flex>
      <Box>
        <Heading as="h2" size="4" className="mb-2">
          Details
        </Heading>
        <Text>
          Steam cleaning for carpets (only bedrooms and small hallways is
          carpeted) and general clean of ceilings and walls We just completed
          bathroom renovation and builder is organizing a cleaner already for
          bathrooms and hallwaysType of clean: General clean + steam cleaning of
          carpets Number of bedrooms: 3 bedroom + studyNumber of bathrooms:
          NoneEquipment and supplies: Tasker must provide
        </Text>
      </Box>
      <Box>
        <Heading as="h2" size="4" className="mb-2">
          Offers
        </Heading>
        <Offer />
        <Offer />
      </Box>
    </Flex>
  )
}

function Offer() {
  return (
    <Flex
      gap="4"
      p="4"
      direction="column"
      align="center"
      className="mb-4 items-start rounded-lg bg-white shadow-md"
    >
      <Flex gap="4" className="items-center">
        <Box
          maxHeight="48px"
          maxWidth="48px"
          className="overflow-hidden rounded-full"
        >
          <Image
            src="https://randomuser.me/api/portraits/men/93.jpg"
            alt="Provider"
            className="rounded-full"
            width={48}
            height={48}
          />
        </Box>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Davo T.</p>
          <span className="text-gray-600">Today</span>
        </div>
      </Flex>
      <p className="mt-2 text-gray-700">howdily doodily!</p>
    </Flex>
  )
}
