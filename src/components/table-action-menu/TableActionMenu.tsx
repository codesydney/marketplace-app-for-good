import { Button, DropdownMenu } from '@radix-ui/themes'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'

interface TableActionMenuProps {
  label: string
  viewAction?: () => void
  editAction?: () => void
  deleteAction?: () => void
}

export default function TableActionMenu({
  label,
  viewAction,
  editAction,
  deleteAction,
}: TableActionMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          {label}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft" align="end">
        <DropdownMenu.Item onClick={viewAction}>
          <EyeOpenIcon></EyeOpenIcon>
          View
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={editAction}>
          <Pencil2Icon />
          Edit
        </DropdownMenu.Item>
        <DropdownMenu.Item color="red" onClick={deleteAction}>
          <TrashIcon />
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
