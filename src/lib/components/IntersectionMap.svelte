<script lang="ts">
  import * as d3 from "d3";
  import type { Feature, FeatureCollection, Point } from "geojson";

  let {
    geojson,
    activeFeatureId = null,
  }: {
    geojson: FeatureCollection;
    activeFeatureId?: number | null;
  } = $props();

  let svg = $state<SVGSVGElement | undefined>();

  const width = 560;
  const height = 560;
  const padding = 48;

  type MapFeature = Feature<Point> & { name?: string };

  function coords(feature: MapFeature): [number, number] {
    const [lng, lat] = feature.geometry.coordinates;
    return [lng, lat];
  }

  function featureName(feature: MapFeature): string {
    return feature.name ?? String(feature.id ?? "Location");
  }

  function renderMap() {
    if (!svg || !geojson?.features?.length) return;

    const svgSel = d3.select(svg);
    svgSel.selectAll("*").remove();

    const features = geojson.features as MapFeature[];
    const projection = d3.geoMercator();
    const collection: FeatureCollection = {
      type: "FeatureCollection",
      features,
    };

    projection.fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      collection
    );

    const g = svgSel.append("g");

    g.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f6f3ee")
      .attr("rx", 4);

    const bounds = d3.geoBounds(collection);
    const outline: Feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [bounds[0][0], bounds[0][1]],
            [bounds[1][0], bounds[0][1]],
            [bounds[1][0], bounds[1][1]],
            [bounds[0][0], bounds[1][1]],
            [bounds[0][0], bounds[0][1]],
          ],
        ],
      },
    };

    g.append("path")
      .datum(outline)
      .attr("d", d3.geoPath().projection(projection))
      .attr("fill", "#ebe7e0")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);

    const links = g.append("g").attr("class", "links");

    if (activeFeatureId === null) {
      const home = features.find((f) => f.id === 3);
      if (home) {
        const homeCoords = projection(coords(home))!;
        features.forEach((feature) => {
          if (feature.id === home.id) return;
          const point = projection(coords(feature))!;
          links
            .append("line")
            .attr("x1", homeCoords[0])
            .attr("y1", homeCoords[1])
            .attr("x2", point[0])
            .attr("y2", point[1])
            .attr("stroke", "#bbb")
            .attr("stroke-width", 0.75)
            .attr("stroke-dasharray", "4 4")
            .attr("opacity", 0.6);
        });
      }
    }

    g.selectAll<SVGCircleElement, MapFeature>("circle.location")
      .data(features, (d) => String(d.id))
      .join("circle")
      .attr("class", "location")
      .attr("cx", (d) => projection(coords(d))![0])
      .attr("cy", (d) => projection(coords(d))![1])
      .attr("r", (d) => {
        if (activeFeatureId === null) return 6;
        return d.id === activeFeatureId ? 11 : 4;
      })
      .attr("fill", (d) => {
        if (activeFeatureId === null) return "#333";
        return d.id === activeFeatureId ? "#111" : "#aaa";
      })
      .attr("stroke", "#f6f3ee")
      .attr("stroke-width", 2)
      .attr("opacity", (d) => {
        if (activeFeatureId === null) return 0.85;
        return d.id === activeFeatureId ? 1 : 0.3;
      })
      .attr("transform", (d) => {
        const isActive = d.id === activeFeatureId;
        if (!isActive) return "";
        const [x, y] = projection(coords(d))!;
        return `translate(${x},${y}) scale(1.15) translate(${-x},${-y})`;
      });

    g.selectAll<SVGTextElement, MapFeature>("text.map-label")
      .data(
        activeFeatureId === null
          ? []
          : features.filter((f) => f.id === activeFeatureId),
        (d) => String(d.id)
      )
      .join("text")
      .attr("class", "map-label")
      .attr("x", (d) => projection(coords(d))![0])
      .attr("y", (d) => projection(coords(d))![1] - 18)
      .attr("text-anchor", "middle")
      .attr("font-family", "IBM Plex Mono, monospace")
      .attr("font-size", 11)
      .attr("fill", "#111")
      .text(featureName);
  }

  $effect(() => {
    geojson;
    activeFeatureId;
    renderMap();
  });
</script>

<div class="map-container">
  <svg
    bind:this={svg}
    viewBox="0 0 {width} {height}"
    role="img"
    aria-label="Map of Minneapolis locations referenced in the audio composition"
  ></svg>
</div>

<style>
  .map-container {
    width: 100%;
    max-width: 560px;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }
</style>
