# Dependencies

There are no external dependencies, aside for a version of react and react-dom which support hooks

# Documentation

you can use the `Image` component or create your own with `useImage()`

## useImage() :

The useImage hook allows users to get `react-image-placeholder` logic in any image component. this hooks returns loading status for source which is passed.

### useImage api:

takes object as argument with

- src (required): source of image for which you want loading states, if src is not passed it would return
- ignorePlaceholder (optional): `Boolean`. if true ignores placeholder logic and always returs 'loaded'.

### returns:

- status : `pending` | `loading` | `loaded` | `failed`

Example usage:

```js
function CustomImage() {
  const status = useImage({ src: 'https://via.placeholder.com/600/92c952' });

  if (status === 'failed') return <p>Image not found</p>;

  if (status !== 'loaded') return <Loader />;

  return <img src="https://via.placeholder.com/600/92c952" />;
}
```

<br><br>

## Image Component

> ### if `src` is not provided then **it wouldn't render anything.**

### Default Placeholder Support

- Every image would show a default placeholder when you use `Image` component
- current default placeholder is react logo

Example usage

```js
function LoadImage() {
  return <Image src="big-size-image.jpg" alt="big size" />;
}
```

# Props

## placeholder

---

Takes a React Element which you want to show when image is loading

- type: `React.ReactElement`

```js
function LoadImage() {
  return (
    <Image
      src="big-size-image.jpg"
      alt="big size"
      height="500"
      width="500"
      placeholder={
        <div
          style={{ height: '500px', width: '500px', backgroundColor: 'gray' }}
        ></div>
      }
    />
  );
}
```

<br><br>

## placeholderSrc

---

Placeholder image to show when main src image is loading or it fails

> Note : use local images if possible

- type: `string`

```js
import logo from './logo.svg';

function LoadImage() {
  return <Image src="/big-size-image.jpg" placeholderSrc={logo} />;
}
```

<br><br>

## ignorePlaceholder

---

if true ignore placeholder logic and shows `img`

- default: `false`
- type: Boolean

```js
import logo from './logo.svg';

function LoadImage() {
  return (
    <Image
      src="/big-size-image.jpg"
      placeholderSrc={logo} // <- this will be ignored
      ignorePlaceholder={true}
    />
  );
}
```

<br><br>

## onLoad

---

A callback for when the image src has been loaded

- type: `Function`

<br><br>

## onError

---

A callback for when there was an error loading the image src

- type: `Function`

<br><br>
