# ol & ol-layerswitcher with TypeScript & Parcel

This example demonstrates how the `ol` package and ol-layerswitcher with TypeScript & Parcel.

TypeScript types are shipped with ol-layerswticher along with the JavaScript source. The TypeScript compiler checks types at compile time and reports errors. Parcel is used to bundle the application including it's dependencies.

Of particular note is the use of the `BaseLayerOptions` and `GroupLayerOptions` types when passing Object literals to specify OpenLayers layer and group options. These types are exported by ol-layerswitcher and extend the OpenLayers layer and group option types adding ol-layerswitcher specific properties such as `title`, `type`, `fold` etc.

## Setup

Install the project dependencies including TypeScript type definitions for `ol` (`@types/ol`).

    npm install

Create a build (output to the `dist` directory)

    npm run build

Open `dist/index.html` in a browser to view the application.

See [www.typescriptlang.org](https://www.typescriptlang.org/) for more details of TypeScript and [parceljs.org](https://parceljs.org/) for details of using Parcel.
