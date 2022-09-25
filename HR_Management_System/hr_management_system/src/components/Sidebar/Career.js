/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Training', href: '#', icon: UsersIcon, current: false },
  { name: 'Career Progression', href: '#', icon: FolderIcon, current: false },
  { name: 'Performance', href: '#', icon: CalendarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          <item.icon
            className={classNames(
              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
              'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
            )}
            aria-hidden="true"
          />
          <span className="truncate">{item.name}</span>
        </a>
      ))}
    </nav>
  )
}
