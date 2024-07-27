import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskService } from '@/services/task.service'

export function useDeleteTask() {
	const QueryClient = useQueryClient()

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete task'],
		mutationFn: (id: string) => taskService.deleteTask(id),
		onSuccess: () => {
			QueryClient.invalidateQueries({ queryKey: ['tasks'] })
		}
	})

	return { deleteTask, isDeletePending }
}
