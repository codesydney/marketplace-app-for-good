import React from 'react'
import { Table } from '@radix-ui/themes'

interface DashboardTableProps {
  headers: string[]
  children: React.ReactNode
}

export default function DashboardTable({
  headers,
  children,
}: DashboardTableProps) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {headers.map((header, index) => {
            return (
              <Table.ColumnHeaderCell key={index} className="capitalize">
                {header}
              </Table.ColumnHeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>{children}</Table.Body>
    </Table.Root>
  )
}
