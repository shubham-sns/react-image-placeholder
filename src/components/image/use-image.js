import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';

/**
 *  React hook that loads image and let us
 * know the status sow we can show placeholders/fallback
 *
 * @returns current status of image loading process
 */
function useImage({
  src,
  srcSet,
  sizes,
  onLoad,
  onError,
  crossOrigin,
  ignorePlaceholder,
}) {
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
      img.srcSet = srcSet;
    }

    if (sizes) {
      img.sizes = sizes;
    }

    img.onload = (event) => {
      flush();
      setStatus('loaded');
      onLoad?.(event);
    };

    img.onerror = (error) => {
      flush();
      setStatus('failed');
      onError?.(error);
    };

    imageRef.current = img;
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError]);

  // we want this effect to run synchronously before UI gets painted as we are working with dom api
  useLayoutEffect(() => {
    // if user is does not want to use placeholder : return early
    if (ignorePlaceholder) return;

    if (status === 'loading') {
      load();
    }

    return flush;
  }, [status, load, ignorePlaceholder]);

  return ignorePlaceholder ? 'loaded' : status;
}

export { useImage };
