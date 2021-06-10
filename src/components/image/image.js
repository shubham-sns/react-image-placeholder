import { forwardRef } from 'react';
import { useImage } from './use-image';

import placeholderLogo from './placeholder.svg';

/**
 * React Component for images which shows
 * placeholder while iamge is loading
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

  // currently works for both while loading and if main src fails
  if (status !== 'loaded') {
    // react element
    if (placeholder) return placeholder;

    return <img src={placeholderSrc} {...shared} />;
  }

  return <img src={src} {...shared} />;
});

export { Image };
