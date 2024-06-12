import React from 'react'
import {
  Badge,
  Button,
  Flex,
  Heading,
  Table,
  TextField,
} from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { formatDate } from '@/utils/utils'
import HeaderInfoCard from '@/components/header-info-card/HeaderInfoCard'
import FilterSelector from '@/components/filter-selector/FilterSelector'
import DashboardTable from '@/components/dashboard-table/DashboardTable'
import TableActionMenu from '@/components/table-action-menu/TableActionMenu'

// TODO: move the type definitions to it's own folders/files
type TaskHeaderCard = {
  label: string
  task: number
}
type FilterOption = {
  label: string
  options: { key: string; value: string }[]
}

// TODO: Temporary mock data
const tasksHeader: TaskHeaderCard[] = [
  { label: 'total tasks', task: 10 },
  { label: 'open tasks', task: 4 },
  { label: 'completed tasks', task: 2 },
  { label: 'cancelled tasks', task: 2 },
]

const category: FilterOption = {
  label: 'category',
  options: [
    { key: 'category 1', value: 'category 1' },
    { key: 'category 2', value: 'category 2' },
    { key: 'category 3', value: 'category 3' },
  ],
}

const status: FilterOption = {
  label: 'status',
  options: [
    { key: 'open', value: 'open' },
    { key: 'completed', value: 'completed' },
    { key: 'cancelled', value: 'cancelled' },
  ],
}

const newDate = new Date().toISOString()
const tableData = [
  {
    id: 123456,
    title: 'task name 1',
    status: 'open',
    date: newDate,
    location: 'sydney st 100',
  },
  {
    id: 654321,
    title: 'task name 2',
    status: 'completed',
    date: newDate,
    location: 'sydney st 200',
  },
]

export default function Task() {
  return (
    <div className="flex flex-col gap-2 px-4">
      <Heading className="my-2">Tasks</Heading>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        {tasksHeader.map((item, index) => {
          return <HeaderInfoCard key={index} data={item} />
        })}
      </div>
      <Flex justify="between">
        <div className="mt-4 flex gap-2">
          <TextField.Root placeholder="Search task…">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>

          <FilterSelector label={category.label} options={category.options} />
          <FilterSelector label={status.label} options={status.options} />
        </div>

        <Link href="/task/create">
          <Button mt="4" color="green">
            Create a Task
          </Button>
        </Link>
      </Flex>

      <div>
        <DashboardTable
          headers={[
            'task id',
            'title',
            'status',
            'date',
            'location',
            'actions',
          ]}
        >
          {tableData.map((cell, index) => {
            return (
              <Table.Row key={index}>
                <Table.RowHeaderCell>{cell.id}</Table.RowHeaderCell>
                <Table.Cell>{cell.title}</Table.Cell>
                <Table.Cell>
                  <Badge
                    variant="solid"
                    radius="full"
                    color="indigo"
                    className=" p-2"
                  >
                    {cell.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{formatDate(cell.date.toString())}</Table.Cell>
                <Table.Cell>{cell.location}</Table.Cell>
                <Table.Cell>
                  <TableActionMenu label="options" />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </DashboardTable>
      </div>
    </div>
  )
}
