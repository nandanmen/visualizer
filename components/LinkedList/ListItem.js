import React, { useContext } from 'react'
import { motion } from 'framer-motion'

import * as config from './config'
import { ListItemContext } from './List'

const variants = {
  active: {
    opacity: 1,
    y: 0,
  },
  inactive: {
    opacity: 0.2,
    y: 10,
  },
}

const getX = (index) => (config.BoxSize + config.MarginRight) * index

export function ListItem({ children, active, ...props }) {
  return (
    <motion.g
      variants={variants}
      initial="inactive"
      animate={active ? 'active' : 'inactive'}
      {...props}
    >
      {children}
    </motion.g>
  )
}

export function ListItemContent({ className, children }) {
  const { item, index } = useContext(ListItemContext)
  return (
    <g transform={`translate(${getX(index)}, ${config.VerticalOffset})`}>
      <rect
        width={config.BoxSize}
        height={config.BoxSize}
        x="0"
        rx={config.CornerRadius}
        className={className}
      />
      <text
        x={config.BoxRadius}
        y={config.BoxRadius}
        className="text-white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={config.FontSize}
      >
        {children || item.value}
      </text>
    </g>
  )
}
