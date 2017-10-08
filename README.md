## Getting Started

```bash
$ make
```

## Testing

```bash
$ make test        # run all tests once
$ make test.watch  # re-run all tests if any file changes
```

## Developing

```bash
$ make serve # run a local browser-based client with everything you need to start writing code
```

## Installing Fonts

* Step 1: Download font file and CSS

```
./scripts/download_fonts.sh <font_url>
./scripts/download_fonts.sh https://fonts.googleapis.com/icon?family=Material+Icons
```

* Step 2: Import CSS on `index.scss`

```
@import "fonts/Material_Icons/Material_Icons";
```
