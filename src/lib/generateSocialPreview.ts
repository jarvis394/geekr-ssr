import { createCanvas, registerFont, loadImage } from 'canvas'
import { wrapText } from 'src/utils/canvasHelpers'

registerFont('public/GoogleSans-Bold.ttf', {
  family: 'Google Sans',
  weight: 'bold',
})

const canvas = createCanvas(1200, 630)
const ctx = canvas.getContext('2d')
const fontFamily = 'Google Sans'
const fontSizes = {
  logo: 64,
  title: 56,
  hub: 40,
}
const theme = {
  fontStyles: {
    hub: `500 ${fontSizes.hub}px ${fontFamily}`,
    title: `700 ${fontSizes.title}px ${fontFamily}`,
    logo: `700 ${fontSizes.logo}px ${fontFamily}`,
  },
  fontSizes: {
    logo: 80,
    title: 72,
    hub: 56,
  },
  colors: {
    primary: '#82b1ff',
    text: 'white',
    background: '#080808',
  },
  spacing: 40,
}

const generateSocialPreview = async ({ title, hub }) => {
  // Load images
  const logo = await loadImage('public/habra_logo.svg')
  const background = await loadImage('public/background.svg')

  // Background
  ctx.fillStyle = theme.colors.background
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(background, 0, 0)

  // Logo
  logo.width = logo.width / 1.5
  logo.height = logo.height / 1.5
  ctx.drawImage(logo, canvas.width - 40 - logo.width, 40)

  // Header Title
  ctx.fillStyle = theme.colors.text
  ctx.font = theme.fontStyles.logo
  ctx.fillText(
    'geekr.',
    theme.spacing,
    theme.spacing + theme.fontSizes.title / 2
  )

  // Article Title
  ctx.font = theme.fontStyles.title
  wrapText({
    context: ctx,
    text: title,
    x: theme.spacing,
    y: canvas.height / 2,
    maxWidth: canvas.width - theme.spacing * 2,
    lineHeight: theme.fontSizes.title,
    backgroundColor: theme.colors.primary,
    textColor: theme.colors.background,
  })

  // Hub
  ctx.fillStyle = theme.colors.text
  ctx.font = theme.fontStyles.hub
  ctx.fillText(hub, theme.spacing, canvas.height - theme.spacing)

  // Return PNG Stream
  return canvas.createPNGStream()
}

export default generateSocialPreview
