import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useLayoutEffect,
} from 'react';

function useImage({
  src,
  srcSet,
  loading,
  sizes,
  onLoad,
  onError,
  crossOrigin,
  ignorePlaceholder,
}) {
  const [status, setStatus] = useState('pending'); // pending | loading | loaded | failed

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

    if (loading) {
      img.loading = loading;
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
  }, [src, crossOrigin, srcSet, loading, sizes, onLoad, onError]);

  // we want this effect to run synchronously before UI gets painted as we are working with dom api
  useLayoutEffect(() => {
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

-- normal image attributes--
onLoad,
onError,
crossOrigin
srcSet
loading
sizes
*/
export const Image = forwardRef((props, ref) => {
  const {
    placeholderSrc,
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

export default Image;
