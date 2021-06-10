import { forwardRef } from 'react';
import { useImage } from './use-image';

import placeholderLogo from './placeholder.svg';

/**
 * React components that renders and image with default loading placeholder
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

  // pending | loading | loaded | failed
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
