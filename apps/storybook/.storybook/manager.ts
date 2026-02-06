import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: 'Onesaz UI',
  brandUrl: 'https://onesaz.com',
  colorPrimary: '#8b5cf6',
  colorSecondary: '#8b5cf6',
})

addons.setConfig({
  theme,
})
