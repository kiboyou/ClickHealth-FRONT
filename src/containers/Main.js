import React from 'react'

function Main({ children }) {
  return (
    <main className="h-full overflow-y-auto">
      <div className="container grid px-6 mx-auto w-full">{children}</div>
    </main>
  )
}

export default Main
