# Mobile Template

## Requirements

* **NodeJS**
* We suggest you use a [Node Vervion Management](https://github.com/tj/n) tool.

## Getting Started

```bash
$ make
```

## Testing

```bash
$ make test        # run all tests once
$ make test.watch  # re-run all tests if any file changes
$ make integration # run integration tests against the preprod server
$ make lint        # pick up any incorrect or unusual usages
```

## Developing

```bash
$ make serve # run a local browser-based client with everything you need to start writing code
```

## Emulating

```bash
$ make run.emulate.ios     # build and deploy to iOS Simulator
$ make run.emulate.android # build and deploy to any attached device (genymotion is considered a device)
```

## Distributing

```bash
$ make deploy.mobile \               # package the app with PhoneGap Build for Android and iOS
  PHONEGAP_API_TOKEN=xxx \           # get it at https://build.phonegap.com/people/edit under the `Client Applications` tab
  PHONEGAP_APP_ID=123 \              # get it at https://build.phonegap.com/apps
  API_HOST=https://example.com \     # the server your client will be talking to
  BUILD_NUMBER=999                   # current build number (defaults to `dev`)
```

Once done, you'll get two links that you can use to distribute the applications.

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

[PhoneGap Build](https://build.phonegap.com/)
