import {
  alpha,
  Box,
  CircularProgress,
  Fade,
  Portal,
  styled,
  Theme,
} from '@mui/material'
import React, {
  useState,
  useEffect,
  useCallback,
  MutableRefObject,
} from 'react'
import { PhotoSwipe } from 'react-photoswipe'
import { LAZY_LOAD_VISIBILITY_THRESHOLD } from 'src/config/constants'
import VisibilitySensor from 'react-visibility-sensor'
import * as log from 'src/lib/logger'
import { SxProps } from '@mui/system'

interface ImageProps {
  src: string
  placeholderSrc?: string
  alt?: string
  disableZoom?: boolean
  sx?: SxProps<Theme>
  width?: number
  height?: number
}
interface ImageDimensions {
  width: number
  height: number
}

const Paper = styled(Box)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: theme.palette.background.paper,
  maxWidth: '100%',
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  overflow: 'hidden',
  '&.imgAlign-left': {
    float: 'left',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    maxWidth: '40% !important',
  },
  '&.imgAlign-right': {
    float: 'right',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    maxWidth: '40% !important',
  },
}))

const StyledImage = styled('img')(({ theme }) => ({
  height: 'auto',
  maxWidth: '100%',
  verticalAlign: 'middle',
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important',
  WebkitTapHighlightColor: alpha(
    theme.palette.background.default,
    theme.palette.action.hoverOpacity
  ),
  cursor: 'pointer',
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
  fontSize: 12,
}))

const Spinner = () => {
  return (
    <Fade in mountOnEnter timeout={500} style={{ transitionDelay: '250ms' }}>
      <CircularProgress
        variant="indeterminate"
        color="primary"
        size="1.25rem"
        thickness={5}
        sx={{ my: 1.5, mx: 2 }}
      />
    </Fade>
  )
}

const LazyImage: React.FC<ImageProps> = ({
  src,
  placeholderSrc,
  alt,
  disableZoom = false,
  width,
  height,
  ...props
}) => {
  const initialImageDimensions = { width, height }
  const shouldInitiallyShowSpinner = !placeholderSrc
  const [isPswpOpen, setPswpOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>(placeholderSrc)
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>(
    width && height ? initialImageDimensions : null
  )
  const [shouldShowSpinner, setShouldShowSpinner] = useState<boolean>(
    shouldInitiallyShowSpinner
  )
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isVisible, setVisible] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const items: MutableRefObject<PhotoSwipe.Item[]> = React.useRef([
    {
      src,
      w: 0,
      h: 0,
    },
  ])
  const loadImage = useCallback(
    (imgSrc: string) => {
      const image = new Image()
      image.onload = () => {
        setImageSrc(image.src)
        setImageDimensions({
          height: height || image.naturalHeight,
          width: width || image.naturalWidth,
        })
        setShouldShowSpinner(false)
        setLoading(false)
      }
      image.onerror = () => {
        setImageSrc(placeholderSrc || null)
        setImageDimensions(null)
        setHasError(true)
        setLoading(false)
        log.error('Error on loading image:', imgSrc)
      }

      // Start loading the image by setting the `src` prop
      image.src = imgSrc
    },
    [height, placeholderSrc, width]
  )
  const handleVisibilityChange = useCallback(
    (newIsVisible: boolean) => {
      setVisible(newIsVisible)

      // Load the image if it is visible and source changed
      if (shouldShowSpinner && newIsVisible && src !== imageSrc) {
        loadImage(src)
      }
    },
    [imageSrc, loadImage, shouldShowSpinner, src]
  )
  const handleImageClick = () => {
    if (disableZoom || !imageDimensions || hasError || shouldShowSpinner) return
    const windowWidth = window.innerWidth - 32
    const scaleFactor = windowWidth / imageDimensions.width
    items.current = [
      {
        src,
        w: windowWidth,
        h: imageDimensions.height * scaleFactor,
      },
    ]
    setPswpOpen(true)
  }
  const handlePswpClose = () => setPswpOpen(false)
  const loadingStyles = {
    filter: 'blur(8px)',
    transform: 'scale(1.05)',
  }
  const pswpOptions: PhotoSwipe.UIFramework = {
    showHideOpacity: true,
    bgOpacity: 0.8,
    fullscreenEl: false,
    zoomEl: false,
    shareEl: false,
    counterEl: false,
    arrowEl: false,
    captionEl: false,
    tapToClose: true,
    pinchToClose: false,
    maxSpreadZoom: 4,
    history: false,
  }

  useEffect(() => {
    if (src !== imageSrc && !shouldShowSpinner) {
      if (isVisible) {
        loadImage(src)
      } else {
        setImageSrc(placeholderSrc || null)
        setImageDimensions(null)
        setShouldShowSpinner(!placeholderSrc)
        setLoading(true)
      }
    }
  }, [src, isVisible, placeholderSrc, imageSrc, shouldShowSpinner, loadImage])

  return (
    <>
      <VisibilitySensor
        partialVisibility
        offset={{
          top: LAZY_LOAD_VISIBILITY_THRESHOLD,
          bottom: LAZY_LOAD_VISIBILITY_THRESHOLD,
        }}
        onChange={handleVisibilityChange}
      >
        <Paper
          {...props}
          sx={{
            ...props.sx,
            aspectRatio: `auto ${imageDimensions?.width || 0} / ${
              imageDimensions?.height || 0
            }`,
          }}
        >
          {!shouldShowSpinner && (
            <Fade in mountOnEnter timeout={250}>
              <StyledImage
                src={imageSrc}
                width={imageDimensions?.width || 'auto'}
                height={imageDimensions?.height || 'auto'}
                alt={alt || 'Изображение не загружено'}
                onClick={handleImageClick}
                sx={{
                  ...(isLoading && placeholderSrc && loadingStyles),
                }}
              />
            </Fade>
          )}
          {shouldShowSpinner && <Spinner />}
        </Paper>
      </VisibilitySensor>
      {isPswpOpen && !disableZoom && imageDimensions && (
        <Portal container={document.body}>
          <PhotoSwipe
            options={pswpOptions}
            isOpen={isPswpOpen}
            items={items.current}
            onClose={handlePswpClose}
          />
        </Portal>
      )}
    </>
  )
}

export default React.memo(LazyImage)
