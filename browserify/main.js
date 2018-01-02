import Map from 'ol/map';
import View from 'ol/view';
import Proj from 'ol/proj';
import LayerGroup from 'ol/layer/group';
import LayerImage from 'ol/layer/image';
import LayerTile from 'ol/layer/tile';
import SourceImageArcGISRest from 'ol/source/imagearcgisrest';
import SourceOSM from 'ol/source/osm';
import SourceStamen from 'ol/source/stamen';

import LayerSwitcher from 'ol3-layerswitcher';

var map = new Map({
    target: 'map',
    layers: [
        new LayerGroup({
            'title': 'Base maps',
            layers: [
                new LayerGroup({
                    title: 'Water color with labels',
                    type: 'base',
                    combine: true,
                    visible: false,
                    layers: [
                        new LayerTile({
                            source: new SourceStamen({
                                layer: 'watercolor'
                            })
                        }),
                        new LayerTile({
                            source: new SourceStamen({
                                layer: 'terrain-labels'
                            })
                        })
                    ]
                }),
                new LayerTile({
                    title: 'Water color',
                    type: 'base',
                    visible: false,
                    source: new SourceStamen({
                        layer: 'watercolor'
                    })
                }),
                new LayerTile({
                    title: 'OSM',
                    type: 'base',
                    visible: true,
                    source: new SourceOSM()
                })
            ]
        }),
        new LayerGroup({
            title: 'Overlays',
            layers: [
                new LayerImage({
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
        center: Proj.transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6
    })
});

var layerSwitcher = new LayerSwitcher();
map.addControl(layerSwitcher);
