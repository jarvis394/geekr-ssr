import { Box, styled, SxProps, Theme, Tooltip } from '@mui/material'
import React from 'react'
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  Text
} from 'html-react-parser'
import LazyImage from '../blocks/LazyImage'

type Props = { children: string; sx?: SxProps<Theme> } & JSX.IntrinsicAttributes

const Root = styled(Box)(({ theme }) => ({}))

const FormattedText: React.FC<Props> = ({ children: text, ...props }) => {
  const options: HTMLReactParserOptions = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    replace: (node: Element) => {
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
          // const imgClasses = attribs.class ? attribs.class.split(' ') : []
          // if (attribs['data-tex']) {
          //   const formula = attribs['alt'].slice(1, attribs['alt'].length - 1)
          //   return (
          //     <MathJaxNode inline={attribs['data-tex'] === 'inline'}>
          //       {formula}
          //     </MathJaxNode>
          //   )
          // } else if (imgClasses.some((e) => e === 'formula')) {
          //   const formula = attribs.source
          //   return (
          //     <MathJaxNode inline={imgClasses.some((e) => e === 'inline')}>
          //       {formula}
          //     </MathJaxNode>
          //   )
          // }

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
