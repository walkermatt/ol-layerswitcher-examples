import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import Map from 'ol/Map';
import View from 'ol/View';
import { transform } from 'ol/proj';
import LayerGroup from 'ol/layer/Group';
import LayerImage from 'ol/layer/Image';
import LayerTile from 'ol/layer/Tile';
import SourceImageArcGISRest from 'ol/source/ImageArcGISRest';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';

import LayerSwitcher from 'ol-layerswitcher';

import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';

// Create our map instance with required groups & layers; note that the layer
// and group options are cast to extended option types `BaseLayerOptions` and
// `GroupLayerOptions` which are imported from the ol-layerswitcher package.
// These add properties such as `title`, `type`, `fold` etc. Without casting
// the options the TypeScript compiler `tsc` will emit errors stating that the
// properties such as `title` are invalid.

const map = new Map({
    target: 'map',
    layers: [
        new LayerGroup(<GroupLayerOptions>{
            'title': 'Base maps',
            layers: [
                new LayerGroup(<GroupLayerOptions>{
                    title: 'Water color with labels',
                    type: 'base',
                    combine: true,
                    visible: false,
                    layers: [
                        new LayerTile(<BaseLayerOptions>{
                            source: new SourceStamen({
                                layer: 'watercolor'
                            })
                        }),
                        new LayerTile(<BaseLayerOptions>{
                            source: new SourceStamen({
                                layer: 'terrain-labels'
                            })
                        })
                    ]
                }),
                new LayerTile(<BaseLayerOptions>{
                    title: 'Water color',
                    type: 'base',
                    visible: false,
                    source: new SourceStamen({
                        layer: 'watercolor'
                    })
                }),
                new LayerTile(<BaseLayerOptions>{
                    title: 'OSM',
                    type: 'base',
                    visible: true,
                    source: new SourceOSM()
                })
            ]
        }),
        new LayerGroup(<GroupLayerOptions>{
            title: 'Overlays',
            layers: [
                new LayerImage(<BaseLayerOptions>{
                    title: 'Countries',
                    source: new SourceImageArcGISRest({
                        ratio: 1,
                        params: {'LAYERS': 'show:0'},
                        url: "https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Countries_December_2016_Boundaries/MapServer"
                    })
                })
            ]
        })
    ],
    view: new View({
        center: transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6
    })
});

const layerSwitcher = new LayerSwitcher();
map.addControl(layerSwitcher);
