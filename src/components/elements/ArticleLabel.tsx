import { alpha, Link, styled } from '@mui/material'
import React from 'react'
import ArticleLabelVariant from 'src/types/ArticleLabel'

type ComponentProps =
  | { variant: 'score'; score: number }
  | { variant: ArticleLabelVariant['type']; score?: never }

type Props = ComponentProps & JSX.IntrinsicAttributes

const Label = styled('div')(({ theme }) => ({
  borderRadius: 8,
  fontFamily: 'Google Sans',
  fontWeight: 500,
  fontSize: 14,
  height: 24,
  padding: theme.spacing(0, 1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '24px',
}))

const TechnotextLabel: React.FC<{ label: string; link: string }> = ({
  link,
  label,
}) => {
  return (
    <Link
      href={link}
      underline="none"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Label
        sx={{
          background: '#7B61FF',
          color: '#FFFFFF',
        }}
      >
        {label}
      </Label>
    </Link>
  )
}

const Technotext2020Label = (
  <TechnotextLabel
    label="🔥 Технотекст 2020"
    link="https://contenting.io/challenge.html?utm_source=habr&utm_medium=label"
  />
)

const Technotext2021Label = (
  <TechnotextLabel
    label="🔥 Технотекст 2021"
    link="https://contenting.io/2021.html"
  />
)

const Technotext2022Label = (
  <TechnotextLabel
    label="✏️ Технотекст 2022"
    link="https://habr.com/ru/technotext/2022/"
  />
)

const RecoveryLabel = () => {
  return (
    <Label
      sx={{
        background: '#D8804F',
        color: '#FFFFFF',
      }}
    >
      Recovery
    </Label>
  )
}

const TutorialLabel = () => {
  return (
    <Label
      sx={{
        background: '#6171FF',
        color: '#FFFFFF',
      }}
    >
      Туториал
    </Label>
  )
}

const TranslationLabel = () => {
  return (
    <Label
      sx={{
        background: '#88B4FF',
        color: '#000000',
      }}
    >
      Из песочницы
    </Label>
  )
}

const SandboxLabel = () => {
  return (
    <Label
      sx={{
        background: '#f2f2f2',
        color: alpha('#000000', 0.75),
      }}
    >
      Из песочницы
    </Label>
  )
}

const ScoreLabel: React.FC<{ score: number }> = ({ score }) => {
  const positiveBackgroundColor = '#64ea58'
  const positiveColor = alpha('#000000', 0.8)
  const normalBackgroundColor = '#404040'
  const normalColor = '#ffffff'
  const negativeBackgroundColor = '#FA5D51'
  const negativeColor = '#ffffff'
  const scorePrefix = React.useMemo(() => (score > 0 ? '+' : ''), [score])

  return (
    <Label
      sx={{
        ...(score === 0 && {
          background: normalBackgroundColor,
          color: normalColor,
        }),
        ...(score > 0 && {
          background: positiveBackgroundColor,
          color: positiveColor,
        }),
        ...(score < 0 && {
          background: negativeBackgroundColor,
          color: negativeColor,
        }),
        fontWeight: 700,
      }}
    >
      {scorePrefix}
      {score}
    </Label>
  )
}

const ArticleLabel: React.FC<Props> = ({ variant, score, ...props }) => {
  switch (variant) {
    case 'recovery':
      return <RecoveryLabel {...props} />
    case 'sandbox':
      return <SandboxLabel {...props} />
    case 'translation':
      return <TranslationLabel {...props} />
    case 'tutorial':
      return <TutorialLabel {...props} />
    case 'technotext2020':
      return React.cloneElement(Technotext2020Label, props)
    case 'technotext2021':
      return React.cloneElement(Technotext2021Label, props)
    case 'technotext2022':
      return React.cloneElement(Technotext2022Label, props)
    case 'score':
      return <ScoreLabel score={score} {...props} />
    default:
      return null
  }
}

export default React.memo(ArticleLabel)
