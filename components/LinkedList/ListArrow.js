import React, { useContext } from 'react'

import { indexOf } from '~lib/linked-list'
import {
  BoxSize,
  MarginRight,
  LineSpace,
  VerticalOffset,
  TriangleRadius,
  BoxRadius,
  LineWidth,
  ArrowOffset,
} from './config'
import { ListContext } from './List'

export function ListArrow({ item, index }) {
  const { list } = useContext(ListContext)

  return item.next ? (
    <Arrow
      from={index}
      to={item.__isCycle ? indexOf(list, item.next) : index + 1}
    />
  ) : null
}

function Arrow({ from, to }) {
  const startBoxX = (BoxSize + MarginRight) * from
  const endBoxX = (BoxSize + MarginRight) * to

  if (to > from) {
    const startX = startBoxX + BoxSize + LineSpace
    const endX = endBoxX - LineSpace
    return (
      <g
        className="text-gray-600"
        transform={`translate(0, ${VerticalOffset})`}
      >
        <line
          x1={startX}
          x2={endX - TriangleRadius * 2}
          y1={BoxRadius}
          y2={BoxRadius}
          stroke="currentColor"
          strokeWidth={LineWidth}
        />
        <ArrowPointer x={endX} y={BoxRadius} rotation="0" />
      </g>
    )
  }

  if (to < from) {
    // Need a curved arrow
    const arrowStart = {
      x: startBoxX + BoxRadius,
      y: VerticalOffset + BoxSize + LineSpace,
    }

    const horizontalDistance = startBoxX - endBoxX

    const path = `M ${arrowStart.x} ${
      arrowStart.y
    } l 0 ${ArrowOffset} l ${-horizontalDistance} 0 l 0 ${
      -ArrowOffset + TriangleRadius * 2
    }`

    return (
      <g className="text-gray-600">
        <path
          d={path}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={LineWidth}
        />
        <ArrowPointer x={endBoxX + BoxRadius} y={arrowStart.y} rotation="-90" />
      </g>
    )
  }

  return null
}

function ArrowPointer({ x, y, rotation }) {
  const points = [
    [x, y],
    [x - TriangleRadius * 2, y + TriangleRadius],
    [x - TriangleRadius * 2, y - TriangleRadius],
  ]
  return (
    <g transform={`rotate(${rotation}, ${x}, ${y})`}>
      <polygon
        points={points.map((point) => point.join(',')).join(' ')}
        fill="currentColor"
      ></polygon>
    </g>
  )
}
