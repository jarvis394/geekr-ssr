import { alpha, Box, styled, SxProps, Theme, Tooltip } from '@mui/material'
import React from 'react'
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from 'html-react-parser'
import LazyImage from 'src/components/blocks/LazyImage'
import { Node as MathJaxNode } from '@nteract/mathjax'

type Props = { children: string; sx?: SxProps<Theme> } & JSX.IntrinsicAttributes

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& img': {
    maxWidth: '100%',
    verticalAlign: 'middle',
    height: 'auto',
    borderRadius: 4,
  },
  '& blockquote': {
    margin: 0,
  },
  '& figure': {
    margin: 0,
    marginTop: theme.spacing(4),
    textAlign: 'center',
    '& figcaption': {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.body2.fontSize,
      textAlign: 'center',
      marginTop: theme.spacing(1),
      lineHeight: '18px',
    },
  },
  '& p': {
    margin: 0,
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    WebkitTapHighlightColor: 'transparent !important',
  },
  '& a:hover': {
    color: alpha(theme.palette.primary.main, 0.8),
    textDecoration: 'underline',
  },
  '& h1+p, h2+p, h3+p, h4+p': {
    marginTop: theme.spacing(1.75),
  },
  '& p+p, pre+p': {
    marginTop: theme.spacing(3),
  },
  '& div.table, div.scrollable-table': {
    overflow: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    wordBreak: 'normal',
  },
  '& sub, sup': {
    fontSize: '75%',
    lineHeight: 0,
    position: 'relative',
    verticalAlign: 'initial',
  },
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
  },
  '& table td': {
    padding: '6px 12px 9px',
    border: '1px solid ' + theme.palette.text.hint,
    verticalAlign: 'top',
    lineHeight: '1.5',
    minWidth: 100,
  },
  '& table th': {
    padding: '6px 12px 9px',
    border: '1px solid ' + theme.palette.text.hint,
    verticalAlign: 'top',
    lineHeight: '1.5',
    minWidth: 100,
  },
  '& h1, h2, h3': {
    fontSize: 24,
    lineHeight: '30px',
  },
  '& h4, h5, h6': {
    fontSize: 20,
    lineHeight: '26px',
  },
  '& h1, h2, h3, h4, h5, h6': {
    margin: `${theme.spacing(4)} 0 0 0`,
    fontFamily: 'Google Sans',
    fontWeight: 800,
  },
  '& hr': {
    border: 'none',
    borderBottom: '1px solid ' + theme.palette.divider,
    margin: theme.spacing(1, 2),
  },
  '& figure.float': {
    float: 'left',
    maxWidth: '50%',
    marginRight: theme.spacing(4),
  },
  '& figure+p': {
    marginTop: theme.spacing(4),
  },
  '& figure.float+p:after': {
    content: '""',
    display: 'block',
    clear: 'both',
  },
  // '& sup': {
  //   color: blend(
  //     rgbToHex(theme.palette.primary.light),
  //     rgbToHex(theme.palette.text.primary),
  //     0.9
  //   ),
  //   top: '-.5em',
  // },
}))

/**
 * Checks if argument is Element class
 * TODO: needs to be done through `instanceof`
 */
const isElement = (e: DOMNode): e is Element => {
  return e.constructor.name === 'Element'
}

const FormattedText: React.FC<Props> = ({ children: text, ...props }) => {
  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (!isElement(node)) return node
      if (node.attribs.xmlns === 'http://www.w3.org/1999/xhtml') {
        return <>{domToReact(node.children, options)}</>
      }

      switch (node.name) {
        case '&nbsp;':
          return <> </>
        case 'abbr':
          return (
            <Tooltip title={node.attribs.title} placement="bottom">
              <span>{domToReact(node.children, options)}</span>
            </Tooltip>
          )
        case 'img': {
          const imgClasses = node.attribs.class
            ? node.attribs.class.split(' ')
            : []
          if (node.attribs['data-tex']) {
            const formula = node.attribs.alt.slice(
              1,
              node.attribs.alt.length - 1
            )
            return (
              <MathJaxNode inline={node.attribs['data-tex'] === 'inline'}>
                {formula}
              </MathJaxNode>
            )
          } else if (imgClasses.some((e) => e === 'formula')) {
            const formula = node.attribs.source
            return (
              <MathJaxNode inline={imgClasses.some((e) => e === 'inline')}>
                {formula}
              </MathJaxNode>
            )
          }

          return (
            <LazyImage
              placeholderSrc={node.attribs.src}
              // First try to load src from 'data-src' attribute
              // If not found, then use default 'src' attribute
              src={node.attribs['data-src'] || node.attribs.src}
              alt={node.attribs.alt || 'Изображение не загружено'}
              align={node.attribs.align as AlignSetting}
              width={Number(node.attribs['data-width'] || node.attribs.width)}
              height={Number(
                node.attribs['data-height'] || node.attribs.height
              )}
            />
          )
        }
      }
    },
  }

  return <Root {...props}>{parse(text, options)}</Root>
}

export default FormattedText
