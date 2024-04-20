import { Text, Box } from '@radix-ui/themes'

interface HeaderInfoCardProps {
  data: {
    label: string
    task: number
  }
}

export default function HeaderInfoCard({ data }: HeaderInfoCardProps) {
  return (
    <Box className=" flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-6 text-white shadow dark:border-gray-700 dark:bg-gray-800">
      <Text className="capitalize">{data.label}</Text>
      <Text className=" text-2xl font-semibold">{data.task}</Text>
    </Box>
  )
}
