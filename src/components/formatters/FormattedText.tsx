import { Box, styled, SxProps, Theme, Tooltip } from '@mui/material'
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
  '& blockquote': {
    margin: 0,
  },
  '& figure': {
    margin: 0,
  },
  '& p': {
    margin: 0,
  },
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
