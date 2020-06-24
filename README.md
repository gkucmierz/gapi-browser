# gapi-browser

Promise based package that is helping attaching actual google api script in browser

### Install
```bash
npm i gapi-browser
```

### Using
```js
import { getGapi } from 'gapi-browser';

getGapi.then(gapi => {
  console.log(gapi, gapi.load);
});
```

### How

Google script is added directly to HEAD or BODY tag

![header script](/readme/Zrzut%20ekranu%202020-06-24%20o%2016.11.22.png)

Promise is called ass soon as possible

![console](/readme/Zrzut%20ekranu%202020-06-24%20o%2016.11.44.png)
