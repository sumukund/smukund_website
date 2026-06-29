<script lang="ts">
  import * as d3 from "d3";
  import { tile as d3Tile } from "d3-tile";
  import type { Feature, FeatureCollection, Point } from "geojson";

  let {
    geojson,
    activeFeatureId = null,
    hoverPreview = null,
  }: {
    geojson: FeatureCollection;
    activeFeatureId?: number | null;
    hoverPreview?: {
      featureId: number;
      image: string;
      imageAlt: string;
      caption?: string;
      title: string;
    } | null;
  } = $props();

  let svg = $state<SVGSVGElement | undefined>();
  let previewPosition = $state<{ x: number; y: number } | null>(null);

  const width = 560;
  const height = 560;
  const padding = 26;
  const tileSize = 256;
  const tileUrl = (x: number, y: number, z: number) =>
    `https://a.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png`;

  type MapFeature = Feature<Point> & { name?: string };

  function coords(feature: MapFeature): [number, number] {
    const [lng, lat] = feature.geometry.coordinates;
    return [lng, lat];
  }

  function featureName(feature: MapFeature): string {
    return feature.name ?? String(feature.id ?? "Location");
  }

  // Initializes static elements and tiles once when the geojson loads
  function initMap(svgSel: d3.Selection<SVGSVGElement, unknown, null, undefined>, features: MapFeature[], projection: d3.GeoProjection) {
    // 1. Setup Clip Path
    if (svgSel.select("#map-clip").empty()) {
      svgSel
        .append("defs")
        .append("clipPath")
        .attr("id", "map-clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("rx", 4);
    }

    // 2. Setup Base Group
    let g = svgSel.select<SVGGElement>("g.map-base");
    if (g.empty()) {
      g = svgSel.append("g").attr("class", "map-base").attr("clip-path", "url(#map-clip)");
      g.append("rect").attr("width", width).attr("height", height).attr("fill", "#e8e4dc");
    }

    // 3. Render Tiles
    const tileFn = d3Tile()
      .size([width, height])
      .scale(projection.scale() * 2 * Math.PI)
      .translate([projection.translate()[0], projection.translate()[1]]);

    const tiles = tileFn();

    g.selectAll<SVGImageElement, [number, number, number]>("image.tile")
      .data(tiles, (d) => d.join("/"))
      .join("image")
      .attr("class", "tile")
      .attr("href", (d) => tileUrl(d[0], d[1], d[2]))
      .attr("x", (d) => (d[0] + tiles.translate[0]) * tileSize)
      .attr("y", (d) => (d[1] + tiles.translate[1]) * tileSize)
      .attr("width", tileSize)
      .attr("height", tileSize)
      .attr("opacity", 0.95);

    if (svgSel.select("g.overlay-points").empty()) {
      svgSel.append("g").attr("class", "overlay-points").attr("clip-path", "url(#map-clip)");
    }
    if (svgSel.select("text.attribution").empty()) {
      svgSel
        .append("text")
        .attr("class", "attribution")
        .attr("x", width - 8)
        .attr("y", height - 8)
        .attr("text-anchor", "end")
        .attr("font-family", "IBM Plex Mono, monospace")
        .attr("font-size", 8)
        .attr("fill", "#666")
        .text("© OpenStreetMap © CARTO");
    }
  }

  
  function updateOverlay(
    svgSel: d3.Selection<SVGSVGElement, unknown, null, undefined>, 
    features: MapFeature[], 
    projection: d3.GeoProjection
  ) {
    const pointsGroup = svgSel.select("g.overlay-points");

    // --- 2. Circles (Location Pins) ---
    pointsGroup
      .selectAll<SVGCircleElement, MapFeature>("circle.location")
      .data(features, (d) => String(d.id))
      .join("circle")
      .attr("class", "location")
      .attr("cx", (d) => projection(coords(d))![0])
      .attr("cy", (d) => projection(coords(d))![1])
      .attr("stroke", "#ccc")
      .attr("stroke-width", 3)
      // Dynamic updates without resetting layout:
      .transition()
      .duration(200)
      .attr("r", (d) => {
        if (activeFeatureId === null) return 5.5;
        return d.id === activeFeatureId ? 9 : 4;
      })
      .attr("fill", (d) => {
        if (activeFeatureId === null) return "#111";
        return d.id === activeFeatureId ? "#111" : "#666";
      })
      .attr("opacity", (d) => {
        if (activeFeatureId === null) return 0.9;
        return d.id === activeFeatureId ? 1 : 0.45;
      });

    // --- 3. Labels ---
    const labelData = activeFeatureId === null 
      ? [] 
      : features.filter((f) => f.id === activeFeatureId);

    pointsGroup
      .selectAll<SVGTextElement, MapFeature>("text.map-label")
      .data(labelData, (d) => String(d.id))
      .join(
        (enter) => enter.append("text")
          .attr("class", "map-label")
          .attr("x", (d) => projection(coords(d))![0])
          .attr("y", (d) => projection(coords(d))![1] - 14)
          .attr("text-anchor", "middle")
          .attr("font-family", "IBM Plex Mono, monospace")
          .attr("font-size", 11)
          .attr("font-weight", 600)
          .attr("fill", "#111")
          .attr("stroke", "#fff")
          .attr("stroke-width", 3)
          .attr("paint-order", "stroke")
          .text(featureName),
        (update) => update,
        (exit) => exit.remove()
      );

   // Inside your updateOverlay function:

if (hoverPreview) {
  const previewFeature = features.find(
    (feature) => feature.id === hoverPreview.featureId
  );
  const projected = previewFeature ? projection(coords(previewFeature)) : null;

  if (projected) {
    const rawX = projected[0];
    const rawY = projected[1];

    // Estimated box dimensions for boundary checking
    const previewWidth = 200; 
    const previewHeight = 150; 
    const offset = 15;

    // Default target placements
    let targetLeft = rawX + offset;
    let targetTop = rawY - (previewHeight / 2);

    // Right Edge Boundary Collision
    if (targetLeft + previewWidth > width) {
      targetLeft = rawX - previewWidth - offset;
    }
    // Left Edge Boundary Collision
    if (targetLeft < 0) {
      targetLeft = offset;
    }

    // Bottom Edge Boundary Collision
    if (targetTop + previewHeight > height) {
      targetTop = height - previewHeight - offset;
    }
    // Top Edge Boundary Collision
    if (targetTop < 0) {
      targetTop = offset;
    }

    previewPosition = { x: targetLeft, y: targetTop };
  } else {
    previewPosition = null;
  }
} else {
  previewPosition = null;
}
  }

  // Svelte 5 reactive effects split to prevent map rebuilding on activeFeatureId changes
  $effect(() => {
    if (!svg || !geojson?.features?.length) return;

    const svgSel = d3.select(svg);
    const features = geojson.features as MapFeature[];
    
    // Always fit projection to the whole dataset
    const projection = d3.geoMercator().fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      geojson
    );

    // Re-run base map setup only if geojson itself changes
    initMap(svgSel, features, projection);

    // Inner effect tracks activeFeatureId independently
    return () => {
      updateOverlay(svgSel, features, projection);
    };
  });

  // Track activeFeatureId to trigger updates without touching tiles
  $effect(() => {
    if (!svg || !geojson?.features?.length) return;
    activeFeatureId; // register dependency
    hoverPreview; // register dependency
    
    const svgSel = d3.select(svg);
    const features = geojson.features as MapFeature[];
    const projection = d3.geoMercator().fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      geojson
    );
    
    updateOverlay(svgSel, features, projection);
  });
</script>

<div class="map-container">
  {#if hoverPreview && previewPosition}
  <div
    class="preview-tile"
    style:left="{(previewPosition.x / width) * 100}%"
    style:top="{(previewPosition.y / height) * 100}%"
  >
    <img src={hoverPreview.image} alt={hoverPreview.imageAlt} />
    <div class="preview-meta">
    </div>
  </div>
{/if}
  <svg
    bind:this={svg}
    viewBox="0 0 {width} {height}"
    role="img"
    aria-label="Minneapolis street map with project locations marked"
    filter="url(#glow)" 
  >
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  </svg>
</div>

<style>
  .map-container {
    width: 100%;
    max-width: 560px;
    position: relative;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
.preview-tile {
    position: absolute;
    z-index: 12;
    width: 200px; /* Explicit width corresponding to the math above */
    border: 1px solid #d8d0c3;
    border-radius: 4px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
    overflow: hidden;
    pointer-events: none;
    transition: left 0.1s ease, top 0.1s ease; /* Optional smooth trail */
  }

  .preview-tile img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    display: block;
  }

  .preview-meta span {
    display: block;
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 0.2rem;
  }

  .preview-meta small {
    display: block;
    font-size: 0.66rem;
    color: #555;
    line-height: 1.35;
  }
</style>
