import React, { createContext } from 'react'

import { map } from '~lib/linked-list'
import { ListItem, ListItemContent } from './ListItem'

export const ListContext = createContext()
export const ListItemContext = createContext()

const defaultChildren = () => {
  return (
    <ListItem active>
      <ListItemContent />
    </ListItem>
  )
}

export function List({ list, children = defaultChildren }) {
  return (
    <svg className="fill-current w-full flex text-blue-500 svg">
      <ListContext.Provider value={{ list }}>
        {map(list, (item, index) => {
          const props = { item, index }
          return (
            <ListItemContext.Provider key={item.id} value={props}>
              {children(props)}
            </ListItemContext.Provider>
          )
        })}
      </ListContext.Provider>
    </svg>
  )
}
