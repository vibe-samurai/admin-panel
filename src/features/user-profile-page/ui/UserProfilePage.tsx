// users/1072 | 1038
'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@vibe-samurai/visual-ui-kit'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import UserFollowing from '@/features/user-profile-page/ui/user-following/UserFollowing'
import UserPayments from '@/features/user-profile-page/ui/user-payments/UserPayments'
import UserPhotos from '@/features/user-profile-page/ui/user-photos/UserPhotos'

import UserFollowers from './user-followers/UserFollowers'

type Props = {
  userId: string
}

const TAB_MAP = {
  photos: 'uploaded-photos',
  payments: 'payments',
  followers: 'followers',
  following: 'following',
} as const

const tabs = [
  { title: 'Uploaded photos', value: 'uploaded-photos' },
  { title: 'Payments', value: 'payments' },
  { title: 'Followers', value: 'followers' },
  { title: 'Following', value: 'following' },
]

type TabPart = keyof typeof TAB_MAP

export default function UserProfilePage({ userId }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleActiveTabChange = useCallback(
    (value: string) => {
      const newTab = Object.entries(TAB_MAP).find(([, v]) => v === value)?.[0] as TabPart
      const newSearchParams = new URLSearchParams(searchParams.toString())

      newSearchParams.set('tab', newTab)
      router.replace(`?${newSearchParams.toString()}`)
    },
    [router, searchParams]
  )

  const tab = searchParams.get('tab') as TabPart | null
  const activeTab = tab ? TAB_MAP[tab] : TAB_MAP.photos

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'payments':
        return <UserPayments userId={userId} />
      case 'followers':
        return <UserFollowers userId={userId} />
      case 'following':
        return <UserFollowing userId={userId} />
      case 'uploaded-photos':
      default:
        return <UserPhotos userId={userId} />
    }
  }

  return (
    <>
      <Tabs tabs={tabs} value={activeTab} onValueChange={handleActiveTabChange}>
        <TabsList style={{ marginBottom: '24px' }}>
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {renderActiveSection()}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
