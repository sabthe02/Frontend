import React from 'react'
import {
  Link,
  useMatch,
  useResolvedPath
} from 'react-router-dom'

function NavLink({ children, to, ...props }) {
    const resolved = useResolvedPath(to)
    const match = useMatch({ path: resolved.pathname, end: true })
    const linkClass = `nav-link ${match ? 'active': ''}`

    return (
        <Link
            className={linkClass}
            to={to}
            {...props}
        >
            {children}
        </Link>
    )
}

export default NavLink
