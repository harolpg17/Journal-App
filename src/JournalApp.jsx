import React from 'react'

import { AppRoutes } from './routes/AppRoutes'
import { AppTheme } from './theme'

export const JournalApp = () => {
  return (
    <AppTheme>
      <AppRoutes />
    </AppTheme>
  )
}
