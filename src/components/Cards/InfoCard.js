import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'

function InfoCard({ title, value, children: icon }) {
  return (
    <Card className='bg-cadre1'>
      <CardBody className="flex items-center bg-cadre1">
        {icon}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-200">{title}</p>
          <p className="text-lg font-semibold text-gray-200">{value}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard
