import { useState, useEffect, useRef, useCallback, forwardRef } from 'react';

function useImage({
  src,
  srcSet,
  onLoad,
  onError,
  crossOrigin,
  ignorePlaceholder,
}) {
  // no source === pending
  // loading source === loading
  // loaded source === loaded
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    setStatus(src ? 'loading' : 'pending');
  }, [src]);

  const imageRef = useRef();

  const flush = () => {
    if (imageRef.current) {
      imageRef.current = null;
    }
  };

  const load = useCallback(() => {
    if (!src) return;

    flush();

    const img = new window.Image();

    img.src = src;

    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }

    if (srcSet) {
      img.srcset = srcSet;
    }

    img.onload = (event) => {
      flush();
      setStatus('loaded');
      onLoad?.();
    };

    img.onerror = (error) => {
      flush();
      setStatus('failed');
      onError?.();
    };

    imageRef.current = img;
  }, [src, crossOrigin, srcSet, onLoad, onError]);

  useEffect(() => {
    if (ignorePlaceholder) return;

    if (status === 'loading') {
      load();
    }

    return flush;
  }, [status, load, ignorePlaceholder]);

  return ignorePlaceholder ? 'loaded' : status;
}

/*
supported props
-----------------
src: main image
placeholder : element,
placeholderSrc : image
ignorePlaceholder : boolean to toggle placeholder support on and off
ref :)

-- normal image props--
onLoad,
onError,
crossOrigin
srcSet

*/
export const Image = forwardRef((props, ref) => {
  const { placeholderSrc, placeholder, src, ...rest } = props;
  const shared = { ref, ...rest };

  const status = useImage({ ...props });

  // currently works for both while loading and if main src fails
  if (status !== 'loaded') {
    // react element
    if (placeholder) return placeholder;

    return <img src={placeholderSrc} {...shared} />;
  }

  return <img src={src} {...shared} />;
});

export default Image;
