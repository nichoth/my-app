Trying `electron-forge` and `electron-builder`

This is from https://www.electronjs.org/docs/tutorial/quick-start

Installed `electron-builder`:
```
npm i -D electron-builer
```

Use electron-builder:
* This one works
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

