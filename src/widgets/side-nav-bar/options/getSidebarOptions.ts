import {
  FavoritesIcon,
  LogOutActiveIcon,
  LogOutIcon,
  MessengerActiveIcon,
  MessengerIcon,
  MyProfileActiveIcon,
  MyProfileIcon,
  StatisticsActiveIcon,
  StatisticsIcon,
} from '@vibe-samurai/visual-ui-kit'

export const getSidebarOptions = (onActionClick: (action: string) => void) => [
  {
    icon: MyProfileIcon,
    iconActive: MyProfileActiveIcon,
    title: 'Users list',
    url: '',
    onClick: () => onActionClick('users'),
    isDisabled: false,
  },
  {
    icon: StatisticsIcon,
    iconActive: StatisticsActiveIcon,
    title: 'Statistics',
    url: '',
    onClick: () => onActionClick('statistics'),
    isDisabled: false,
  },
  {
    icon: FavoritesIcon,
    iconActive: FavoritesIcon,
    title: 'Payments list',
    url: '',
    onClick: () => onActionClick('payments'),
    isDisabled: false,
  },
  {
    icon: MessengerIcon,
    iconActive: MessengerActiveIcon,
    title: 'Posts list',
    url: '',
    onClick: () => onActionClick('posts'),
    isDisabled: false,
  },
  {
    icon: LogOutIcon,
    iconActive: LogOutActiveIcon,
    title: 'Log Out',
    url: '',
    isDisabled: false,
    onClick: () => console.log('Logout clicked'),
  },
]
