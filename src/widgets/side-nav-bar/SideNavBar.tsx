'use client'

import { Dialog, Sidebar, SidebarItem, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/authSelectors'
import { logout } from '@/features/auth/model/slices/authSlice'
import { getSidebarOptions } from '@/widgets/side-nav-bar/options/getSidebarOptions'

import s from './SideNavBar.module.scss'

export const SideNavBar = () => {
  const [isModalActive, setIsModalActive] = useState(false)
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuthenticated)
  const router = useRouter()

  if (!isAuth) return null

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'users':
        router.push('/users')
        break
      case 'statistics':
        router.push('/statistics')
        break
      case 'payments':
        router.push('/payments')
        break
      case 'posts':
        router.push('/posts')
        break
      default:
        router.push('/')
    }
  }

  const sidebarOptions = getSidebarOptions(handleActionClick)
  const handleLogout = () => {
    dispatch(logout())
    setIsModalActive(false)
    router.push('/auth/login')
  }

  return (
    <>
      <aside className={s.wrapper}>
        <nav>
          <Sidebar style={{ backgroundColor: '#000000FF' }}>
            {sidebarOptions.map((option, index) => (
              <SidebarItem
                key={index}
                {...option}
                LinkComponent={({ href, className, children }) => (
                  <Link
                    href={href || '#'}
                    className={className}
                    onClick={e => {
                      if (index === 4) {
                        e.preventDefault()
                        setIsModalActive(true)
                      } else if (option.onClick) {
                        e.preventDefault()
                        option.onClick()
                      }
                    }}
                  >
                    {children}
                  </Link>
                )}
              />
            ))}
          </Sidebar>
        </nav>
      </aside>

      {isModalActive && (
        <Dialog
          aria-describedby={'logoutDescription'}
          title={'Log out'}
          onClose={() => setIsModalActive(false)}
          confirmButtonText={'Yes'}
          cancelButtonText={'No'}
          onConfirmButtonClick={handleLogout}
          onCancelButtonClick={() => setIsModalActive(false)}
          open={isModalActive}
          size={'sm'}
        >
          <Typography id={'logoutDescription'} variant={'regular-text-16'}>
            Are you really want to log out?
          </Typography>
        </Dialog>
      )}
    </>
  )
}
