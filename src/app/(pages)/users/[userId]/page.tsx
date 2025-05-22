import UserProfilePage from '@/features/user-profile-page/ui/UserProfilePage'

export default function Page({ params }: { params: { userId: string } }) {
  return <UserProfilePage userId={params.userId} />
}
