# Hostinger static deployment

Build command:

```bash
npm run build
```

Upload package:

```text
inatural-sa-hostinger.zip
```

On Hostinger:

1. Open File Manager.
2. Go to `public_html`.
3. Delete old site files if this is a fresh replacement.
4. Upload `inatural-sa-hostinger.zip`.
5. Extract it inside `public_html`.
6. Make sure `index.html`, `_next`, `products`, `dashboard`, and `.htaccess` are directly inside `public_html`.
7. Point the domain to `public_html`.

The site is a static export for `https://inatural.sa/`. Dashboard changes are saved in the browser local storage.
