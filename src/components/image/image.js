import { forwardRef } from 'react';
import { useImage } from './use-image';

import placeholderLogo from './placeholder.svg';

/**
 * React Component for images which shows
 * placeholder while image is loading
 */
const Image = forwardRef((props, ref) => {
  const {
    placeholderSrc = placeholderLogo,
    placeholder,
    src,
    loading,
    ignorePlaceholder,
    ...rest
  } = props;
  const shared = { ref, ...rest };

  const shouldIgnore = loading || ignorePlaceholder;

  const status = useImage({ ...props, ignorePlaceholder: shouldIgnore });

  // if there is not source provided image will not render
  if (!src) return null;

  if (status !== 'loaded') {
    // currently works for both while loading and if main src fails
    // react element
    if (placeholder) return placeholder;

    return <img src={placeholderSrc} {...shared} />;
  }

  return <img src={src} {...shared} />;
});

export { Image };
