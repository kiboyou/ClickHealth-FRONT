import React from 'react'

function ChartLegend({ legends }) {
  return (
    <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-200">
      {legends.map((legend) => (
        <div className="flex items-center text-white" key={legend.title}>
          <span className='text-gray-200' className={`inline-block w-3 h-3 mr-1 ${legend.color} rounded-full`}></span>
          <span className='text-gray-200'>{legend.title}</span>
        </div>
      ))}
    </div>
  )
}

export default ChartLegend
