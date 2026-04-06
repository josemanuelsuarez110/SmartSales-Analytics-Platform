"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  
  const links = [
    { name: 'Sales Overview', href: '/' },
    { name: 'HR Analytics', href: '/hr' },
    { name: 'Sales Forecast', href: '/predict' },
    { name: 'Reports', href: '/reports' }
  ]

  return (
    <aside className="sidebar">
      <div className="mb-8 px-4">
        <h1 className="text-xl font-bold gradient-text">SmartSales AI</h1>
        <p className="text-xs text-gray-400">Enterprise Analytics</p>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`px-4 py-2 rounded-lg transition-colors ${pathname === link.href ? 'bg-emerald-600/20 text-emerald-400' : 'text-gray-400 hover:bg-white/5'}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
