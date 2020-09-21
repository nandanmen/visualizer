import React from 'react'

import { map, indexOf } from '~lib/linked-list'

// Linked list styling configuration
const BoxSize = 72
const CornerRadius = 6
const MarginRight = 48
const FontSize = 24
const VerticalOffset = 0
const LineSpace = 5
const TriangleRadius = 6
const LineWidth = 4
const BoxRadius = BoxSize / 2
const ArrowOffset = BoxRadius

export function LinkedList({ list }) {
  return (
    <svg className="fill-current w-full flex text-blue-500">
      {map(list, (item, index) => {
        const boxX = (BoxSize + MarginRight) * index
        return (
          <g key={item.id}>
            {item.next && (
              <Arrow
                from={index}
                to={item.__isCycle ? indexOf(list, item.next) : index + 1}
              />
            )}
            <rect
              width={BoxSize}
              height={BoxSize}
              x={boxX}
              rx={CornerRadius}
              y={VerticalOffset}
            />
            <text
              x={boxX + BoxRadius}
              y={VerticalOffset + BoxRadius}
              className="text-white"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={FontSize}
            >
              {item.value}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Arrow({ from, to }) {
  const startBoxX = (BoxSize + MarginRight) * from
  const endBoxX = (BoxSize + MarginRight) * to

  if (to > from) {
    const startX = startBoxX + BoxSize + LineSpace
    const endX = endBoxX - LineSpace
    return (
      <g className="text-gray-600">
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
