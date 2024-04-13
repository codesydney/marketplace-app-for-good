import {
  Badge,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Heading,
  Link,
  Table,
  TabNav,
} from '@radix-ui/themes'

import { formatDate } from '@/utils/utils'

export default function MyTasksPage() {
  return (
    <Container size="4" p="8">
      <Flex gap="2" direction="column">
        <Box width="100%">
          <Heading as="h1" size="7" mb="4" align="left">
            My Tasks
          </Heading>
        </Box>

        <TabNav.Root color="blue">
          <TabNav.Link href="#" active>
            All
          </TabNav.Link>
          <TabNav.Link href="#">Assigned</TabNav.Link>
          <TabNav.Link href="#">Completed</TabNav.Link>
        </TabNav.Root>

        <Table.Root>
          <Table.Header>
            <Table.Row className="bg-gray-800 font-bold text-white">
              <Table.ColumnHeaderCell>Task Number</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Task Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="right">
                Agreed Price
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Payment Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="right">
                Actions
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row className="bg-gray-200/50" align="center">
              <Table.RowHeaderCell>
                <Link href="#">12345678</Link>
              </Table.RowHeaderCell>
              <Table.Cell>{formatDate(Date())}</Table.Cell>
              <Table.Cell>
                <Badge>Open</Badge>
              </Table.Cell>
              <Table.Cell>
                <Link href="#">Move King Size BedHead up 1 Level</Link>
              </Table.Cell>
              <Table.Cell align="right">$100</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell align="right">
                <TasksTableDropdown />
              </Table.Cell>
            </Table.Row>
            <Table.Row align="center">
              <Table.RowHeaderCell>
                <Link href="#">12345679</Link>
              </Table.RowHeaderCell>
              <Table.Cell>{formatDate(Date())}</Table.Cell>
              <Table.Cell>
                <Badge color="yellow">Assigned</Badge>
              </Table.Cell>
              <Table.Cell>
                <Link href="#">Fix garage door</Link>
              </Table.Cell>
              <Table.Cell align="right">$100</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell align="right">
                <TasksTableDropdown />
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-gray-200/50" align="center">
              <Table.RowHeaderCell>
                <Link href="#">12345680</Link>
              </Table.RowHeaderCell>
              <Table.Cell>{formatDate(Date())}</Table.Cell>
              <Table.Cell>
                <Badge color="green">Completed</Badge>
              </Table.Cell>
              <Table.Cell>
                <Link href="#">Need a Nanny for a 5+ month old baby</Link>
              </Table.Cell>
              <Table.Cell align="right">$120</Table.Cell>
              <Table.Cell>
                <Badge color="green">Paid</Badge>
              </Table.Cell>
              <Table.Cell align="right">
                <TasksTableDropdown />
              </Table.Cell>
            </Table.Row>
            <Table.Row align="center">
              <Table.RowHeaderCell>
                <Link href="#">12345680</Link>
              </Table.RowHeaderCell>
              <Table.Cell>{formatDate(Date())}</Table.Cell>
              <Table.Cell>
                <Badge color="green">Completed</Badge>
              </Table.Cell>
              <Table.Cell>
                <Link href="#">Need a Day Labourer</Link>
              </Table.Cell>
              <Table.Cell align="right">$100</Table.Cell>
              <Table.Cell>
                <Badge color="red">Due</Badge>
              </Table.Cell>
              <Table.Cell align="right">
                <TasksTableDropdown />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Flex>
    </Container>
  )
}

function TasksTableDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          ...
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft" align="end">
        <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
