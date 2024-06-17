import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from './utils';
import { toast } from 'react-toastify';

export const useFetchTasks = () => {
    const {isPending, data, error, isError} = useQuery({
        queryKey: ['tasks'],
        queryFn: async() => {
          const {data} = await customFetch.get('/tasks')
          return data
        }
      });
    
    return {isPending, data, error, isError}
}

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    const {mutate:createTask, isPending} = useMutation({
      mutationFn: (taskTitle) => customFetch.post('/tasks', { title: taskTitle }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        toast.success('task added');
      },
      onError: (error) => {
        toast.error(error.response.data.msg);
      },
    });
    return {createTask, isPending}
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    const { mutate: updateTask } = useMutation({
        mutationFn: ({taskId, isDone}) => {
          return customFetch.patch(`/tasks/${taskId}`, {isDone})
        },
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['tasks']});
          toast.success('task updated')
        },
        onError: (error) => {
          toast.error(error.response.data.msg)
        }
      })
    return {updateTask}
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    const {mutate: deleteTask, isPending} = useMutation({
        mutationFn: ({taskId}) => {
          return customFetch.delete(`/tasks/${taskId}`)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['tasks']})
          toast.success('task deleted')
        },
        onError: (error) => {
          toast.error(error.response.data.msg)
        }
      })
    return {deleteTask, isPending}    
}