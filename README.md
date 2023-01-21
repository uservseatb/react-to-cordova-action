# React to cordova action

This action patches a react app's files in order to be able to use them as is in a cordova app 

## Inputs

### `build-dir`
**Required** The name of the directory the build of react app is located `"dist" | "build""`.

## Example usage

```yaml
uses: uservseatb/react-to-cordova-action@v1.0
with:
  build-dir: 'dist'
```