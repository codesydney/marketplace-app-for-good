'use client'

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Skeleton,
  Text,
} from '@radix-ui/themes'
import { CalendarIcon, SewingPinFilledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useState } from 'react'

import { formatDate, toCurrencyString } from '@/utils/utils'
import { Database } from '@/types/supabase'
import { useTaskListingsQuery } from '@/hooks/use-task-queries'

export type DatabaseRecord<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

type Task = DatabaseRecord<'tasks'>

export default function TasksPage() {
  const { data: tasks } = useTaskListingsQuery()
  const [activeTask, setActiveTask] = useState<Task | undefined>(
    tasks && tasks.length > 0 ? tasks[0] : undefined,
  )

  return (
    <Flex
      direction={{ initial: 'column', md: 'row' }}
      gap="6"
      p={{ initial: '4', md: '8' }}
      width="100%"
      className="max-w-6xl"
    >
      <Flex direction="column" gap="4" width="100%" maxWidth={{ md: '320px' }}>
        {tasks?.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            setActiveTask={() => setActiveTask(task)}
          />
        ))}
      </Flex>
      <Flex gap="1" width="100%">
        <TaskInformation task={activeTask} />
      </Flex>
    </Flex>
  )
}

function TaskCard({
  task,
  setActiveTask,
}: {
  task: Task
  setActiveTask: () => void
}) {
  return (
    <Card
      className="flex w-full justify-between bg-white p-4"
      onClick={setActiveTask}
    >
      <div className="flex flex-col gap-1">
        <p className="m-0 font-semibold">{task.title}</p>
        <Box>
          <Badge color="blue" className="">
            {task.status}
          </Badge>
        </Box>
        <p className="m-0 text-sm">
          <CalendarIcon className="pr-1" />
          {task.due_date_type === 'ON_DATE' ? 'On' : 'Before'}{' '}
          {formatDate(task.due_date)}
        </p>
        <p className="m-0 text-sm">
          <SewingPinFilledIcon className="pr-1" />
          {task.suburb} {task.postcode}
        </p>
      </div>
      <Flex direction="column" justify="between">
        <p className="m-0 text-xl font-extrabold">
          {toCurrencyString(task.budget)}
        </p>
      </Flex>
    </Card>
  )
}

function TaskInformation({ task }: { task?: Task }) {
  const isLoading = !task

  return (
    <Box width="100%">
      <Card className="ml-auto bg-white p-6">
        <Flex gap="8" direction="column" className="w-full">
          {isLoading && (
            <>
              <Flex gap="4" direction="column">
                <Box>
                  <Skeleton loading={true}>
                    <Badge color="blue"></Badge>
                  </Skeleton>
                  <Skeleton loading={true}>
                    <Heading size="7" className="mt-2"></Heading>
                  </Skeleton>
                  <Skeleton loading={true}>
                    <Flex gap="2">
                      <Text>Sydney NSW, Australia</Text>
                      <Text></Text>
                    </Flex>
                  </Skeleton>
                </Box>
                <Box>
                  <Skeleton loading={true}>
                    <Text size="6" weight="bold"></Text>
                  </Skeleton>
                </Box>
                <Box>
                  <Skeleton loading={true}>
                    <Button size="2" variant="solid" color="blue">
                      Make an Offer
                    </Button>
                  </Skeleton>
                </Box>
              </Flex>
              <Box>
                <Heading as="h2" size="4" className="mb-2">
                  Details
                </Heading>
                <Skeleton loading={true}>
                  <Text></Text>
                </Skeleton>
              </Box>
            </>
          )}

          {task && (
            <>
              <Flex gap="4" direction="column">
                <Box>
                  <Badge color="blue">{task.status}</Badge>
                  <Heading size="7" className="mt-2">
                    {task.title}
                  </Heading>
                  <Flex gap="2">
                    <Text>Sydney NSW, Australia</Text>
                    <Text>{formatDate(task.created_at)}</Text>
                  </Flex>
                </Box>
                <Box>
                  <Text size="6" weight="bold">
                    {toCurrencyString(task.budget)}
                  </Text>
                </Box>
                <Box>
                  <Button size="2" variant="solid" color="blue">
                    Make an Offer
                  </Button>
                </Box>
              </Flex>
              <Box>
                <Heading as="h2" size="4" className="mb-2">
                  Details
                </Heading>
                <Text>{task.description}</Text>
              </Box>
              <Box>
                <Heading as="h2" size="4" className="mb-2">
                  Offers
                </Heading>
                <Offer />
                <Offer />
              </Box>
            </>
          )}
        </Flex>
      </Card>
    </Box>
  )
}

function Offer() {
  return (
    <Flex
      gap="2"
      p="4"
      direction="column"
      align="center"
      className="mb-4 items-start rounded-lg bg-white shadow-md"
    >
      <Flex gap="2" className="items-center">
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
        <Flex direction="column">
          <p className="m-0 text-lg font-semibold">Davo T.</p>
          <span className="text-gray-600">Today</span>
        </Flex>
      </Flex>
      <p className="mt-2 text-gray-700">TODO howdily doodily!</p>
    </Flex>
  )
}
