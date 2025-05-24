import { useAppSelector } from '@/app/store/store'
import { selectUserId } from '@/entities/user/model/slices/userSlice'

export function useRequiredUserId(): number {
  const userId = useAppSelector(selectUserId)

  if (userId === null) {
    throw new Error('userId is not set in Redux store.')
  }

  return userId
}
