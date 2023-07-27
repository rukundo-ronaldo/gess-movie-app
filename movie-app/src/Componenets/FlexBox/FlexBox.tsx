import React from 'react'
import './FlexBox.scss'

export const FlexBox = ({children, justifyContent}: {children: any, justifyContent?: string }) => {
  return (
    <div className='flexbox' style={{justifyContent: justifyContent}}>{children}</div>
  )
}
