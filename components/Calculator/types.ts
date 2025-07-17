export interface CalculatorMapProps {
    officeCoords: [number, number];
    destinationCoords?: [number, number];
}

export interface LocationItem {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: Address;
    boundingbox: string[];
}

export interface Address {
    town: string;
    county: string;
    state: string;
    'ISO3166-2-lvl4': string;
    region: string;
    country: string;
    country_code: string;
}

export interface OfficeObject {
    id: number;
    city: string;
    address: string;
    phone: string;
    coords: [number, number];
}

export interface RoutingNavigation {
    code: string
    routes: Route[]
    waypoints: Waypoint[]
}

export interface Route {
    legs: Leg[]
    weight_name: string
    geometry: Geometry
    weight: number
    duration: number
    distance: number
}

export interface Leg {
    steps: unknown[]
    weight: number
    summary: string
    duration: number
    distance: number
}

export interface Geometry {
    coordinates: number[][]
    type: string
}

export interface Waypoint {
    hint: string
    location: number[]
    name: string
    distance: number
}

export interface NavigationObject {
    office: OfficeObject,
    destination: LocationItem[],
    distance: number,
}
