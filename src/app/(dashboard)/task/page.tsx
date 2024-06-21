'use client'

import React from 'react'
import { TextField, Heading, Table, Badge } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'

import { formatDate } from '@/utils/utils'
import HeaderInfoCard from '@/components/header-info-card/HeaderInfoCard'
import FilterSelector from '@/components/filter-selector/FilterSelector'
import DashboardTable from '@/components/dashboard-table/DashboardTable'
import TableActionMenu from '@/components/table-action-menu/TableActionMenu'

import { createClient } from '@/utils/supabase/client'

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

async function getCustomerTasks() {
  const supabase = createClient()
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  const userId = session?.user?.id

  if (sessionError || !userId) {
    return null
  }

  const { data } = await supabase
    .from('tasks')
    .select('*')
    .eq('customer_id', userId)

  return data
}

function useCustomerTasksQuery() {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: getCustomerTasks,
  })

  return query
}

export default function TasksPage() {
  const { data: tasks } = useCustomerTasksQuery()

  return (
    <div className="flex flex-col gap-2 px-4">
      <Heading className="my-2">Tasks</Heading>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        {tasksHeader.map((item, index) => {
          return <HeaderInfoCard key={index} data={item} />
        })}
      </div>
      <div className="mt-4 flex gap-2">
        <TextField.Root placeholder="Search task…">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <FilterSelector label={category.label} options={category.options} />
        <FilterSelector label={status.label} options={status.options} />
      </div>

      <div>
        <DashboardTable
          headers={['task', 'title', 'location', 'date', 'status', 'actions']}
        >
          {tasks?.map((cell, index) => {
            return (
              <Table.Row key={index}>
                <Table.RowHeaderCell>{cell.id}</Table.RowHeaderCell>
                <Table.Cell>{cell.title}</Table.Cell>
                <Table.Cell>
                  {cell.suburb}&nbsp;{cell.postcode}
                </Table.Cell>
                <Table.Cell>{formatDate(cell.due_date.toString())}</Table.Cell>
                <Table.Cell>
                  <Badge
                    variant="solid"
                    radius="full"
                    color="indigo"
                    className="p-2 lowercase"
                  >
                    {cell.status}
                  </Badge>
                </Table.Cell>
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
