import React from 'react'

function Chart({ children, title }) {
  return (
    <div className="min-w-0 p-4 rounded-lg shadow-xs bg-cadre1">
      <p className="mb-4 font-semibold text-gray-200">{title}</p>
      {children}
    </div>
  )
}

export default Chart
