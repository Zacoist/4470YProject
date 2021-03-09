import { feature } from "topojson-client";

import districts from "../assets/data/london.topo.json";

export const DISTRICTS = feature(
  districts,
  districts.objects.Planning_Districts
).features;
