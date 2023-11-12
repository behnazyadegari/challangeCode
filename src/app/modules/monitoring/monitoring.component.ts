import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
    selector: 'monitoring',
    templateUrl: './monitoring.component.html',
    styleUrls: ['./monitoring.component.scss'],

    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MnitoringComponent implements AfterViewInit {
    private map;
    createIcon(iconUrl) {
        let markerIcon = {
            icon: L.icon({
                iconSize: [25, 41],
                iconAnchor: [10, 15],
                // specify the path here
                iconUrl: iconUrl,
            }),
        };
        return markerIcon.icon;
    }
    units = [
        {
            name: 'unit 01',
            position: [32.6396379, 51.6121602],
            icon: 'assets/assets/uniticon/2.0x/ic_unit1.png',
        },
        {
            name: 'unit 02',
            position: [32.6482383, 51.65584],
            icon: 'assets/assets/uniticon/2.0x/ic_unit2.png',
        },
        {
            name: 'unit 03',
            position: [32.6377761, 51.6911138],
            icon: 'assets/assets/uniticon/2.0x/ic_unit3.png',
        },
        {
            name: 'unit 04',
            position: [32.6492675, 51.6960491],
            icon: 'assets/assets/uniticon/2.0x/ic_unit4.png',
        },
        {
            name: 'unit 05',
            position: [32.6807241, 51.6649156],
            icon: 'assets/assets/uniticon/2.0x/ic_unit5.png',
        },
    ];

    private initMap(): void {
        this.map = L.map('map', {
            center: [32.6396379, 51.6121602],
            zoom: 10,
        });
        const tiles = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                minZoom: 3,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
        );

        tiles.addTo(this.map);
    }

    constructor() {}

    ngAfterViewInit(): void {
        this.initMap();
    }

    generateMarker(data: any) {
        var marker = L.marker(data.position, {
            icon: this.createIcon(data.icon),
        });
        var circle = L.circle(data.position, {
            color: '#0076ff9c',
            radius: 20,
        });
        var layerGroup = L.layerGroup([circle, marker]);
        layerGroup.addTo(this.map);
        this.map.setView(data.position, 20);
    }
}
