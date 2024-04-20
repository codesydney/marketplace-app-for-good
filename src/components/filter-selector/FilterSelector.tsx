import { Select } from '@radix-ui/themes'

interface FilterSelectorProps {
  label: string
  options: { key: string; value: string }[]
}

export default function FilterSelector({
  label,
  options,
}: FilterSelectorProps) {
  return (
    <Select.Root>
      <Select.Trigger placeholder={label} />
      <Select.Content>
        <Select.Group>
          <Select.Label>{label}</Select.Label>
          {options.map((item, index) => {
            return (
              <Select.Item key={index} value={item.value}>
                {item.key}
              </Select.Item>
            )
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
