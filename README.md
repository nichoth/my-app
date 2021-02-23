Trying `electron-forge` and `electron-builder`

This is from https://www.electronjs.org/docs/tutorial/quick-start

Installed `electron-builder`:
```
npm i -D electron-builer
```

**Use electron-builder:**
* **This one works**
* puts the output in `/dist/`
```
npm run dist
```

Use electron-forge:
* Doesn't create a `dmg` file
* puts the output in `/out/`
```
npm run make
```

------------------------------------------

## Package things
```
$ npm run dist
```

## develop locally
```
$ npm run tron
```

--------------------------------------

Electron doesn't really have routes, but the routes work in here because we
listen for 'click' events and get the href from the link address
