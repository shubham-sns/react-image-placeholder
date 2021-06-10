import { forwardRef } from 'react';
import { useImage } from './use-image';

import placeholderLogo from './placeholder.svg';

/*
supported props
-----------------
src: main image
placeholder : element,
placeholderSrc : image
ignorePlaceholder : boolean to toggle placeholder support on and off
ref :)

-- normal image attributes--
onLoad,
onError,
crossOrigin
srcSet
loading
sizes
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

  const shouldIgnore = ignorePlaceholder;

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
