# Image preview frontend

A React/Vite learning interface for choosing an image and previewing it locally. The original image is shown using a browser object URL.

Enhancement is unavailable in this frontend-only repository. The previous implementation sent a provider key from the browser; that unsafe request path has been removed. Selecting a file now keeps the local preview and displays a clear message instead of sending an upload or polling an external service.

A working enhancement feature requires a separately implemented server proxy that owns provider credentials, validates uploads and controls requests. There is no such server in this repository. Putting a key in a `VITE_*` variable would expose it in the browser bundle and does not supply that boundary.

## Run locally

```powershell
npm ci
npm run dev
```

Open the local Vite URL printed in the terminal and choose an image. The preview remains available; no enhancement result is simulated.

## Offline checks

```powershell
npm test
npm run lint
npm run build
```

The regression tests replace potential network functions with offline guards and verify zero provider requests and an explicit unavailable error. They do not call a paid image service or establish that enhancement works. The production build can be served with `npm run preview`.

The source credential was removed from the current tip. Historical public copies require revocation or rotation by the account owner; this source change does not establish that revocation has occurred.
