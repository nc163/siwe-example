import { ReactElement } from 'react'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

const Layout = ({ children }: LayoutProps) => (
  <>
    <main>{children}</main>
    <footer>footer</footer>
  </>
)

export default Layout
