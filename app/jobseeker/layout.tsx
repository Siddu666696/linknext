import React from 'react'

const layout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
   <> <div>JobSeeker Navbar</div>
    {children}
    </>
  )
}

export default layout