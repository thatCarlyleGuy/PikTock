import { useState } from 'react'
import { Tab } from '@headlessui/react'
import PropTypes from 'prop-types'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const TabsPanel = ({ panels }) => {
  const [panelState] = useState(panels)
  const panelNames = Object.keys(panelState)
  const panelValues = Object.values(panelState)

  return (
    <Tab.Group>
      <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
        {panelNames.map((name) => (
          <Tab
            key={name}
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm leading-5 font-medium  rounded-lg',
                'focus:outline-none ',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            {name}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="mt-2">
        {panelValues.map((panel) => (
          <Tab.Panel
            key={panel.id}
            className={classNames(
              'focus:outline-none ring-offset-transparent ring-transparent'
            )}
          >
            {panel.children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

TabsPanel.propTypes = {
  panels: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      children: PropTypes.node,
    })
  ).isRequired,
}

export default TabsPanel
