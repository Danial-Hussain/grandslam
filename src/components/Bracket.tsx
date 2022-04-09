// @ts-nocheck

import * as d3 from "d3";
import { useRef, useEffect } from "react";

interface BracketProps {
  nodeData: any;
  league: string;
  wincolor: string;
  hovercolor: string;
}

export const Bracket = ({
  nodeData,
  league,
  wincolor,
  hovercolor,
}: BracketProps) => {
  const bracketRef = useRef();
  const tooltipRef = useRef();

  const width = 1050;
  const height = 1050;

  useEffect(() => {
    const radius = Math.min(width, height) / 2 - 10;

    const g = d3
      .select(bracketRef.current)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const layout = d3.partition().size([2 * Math.PI, radius]);

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1);

    const root = d3.hierarchy(nodeData).sum((d) => d.size);
    const nodes = root.descendants();

    layout(root);

    const handleMouseOver = (d, i) => {
      const xPos = parseFloat(d.screenX);
      const yPos = parseFloat(d.screenY);

      highlightPlayer(i.data.name);

      d3.select(tooltipRef.current)
        .style("left", xPos + "px")
        .style("top", yPos + "px")
        .select("#value")
        .text(i.data.name);

      d3.select(tooltipRef.current).classed("hidden", false);
    };

    const handleMouseOut = (d, i) => {
      d3.select(tooltipRef.current).classed("hidden", true);
      unhighlightPlayer(i.data.name);
    };

    const slices = g
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .on("mouseover", (d, i) => handleMouseOver(d, i))
      .on("mouseout", (d, i) => handleMouseOut(d, i));

    const computeAngle = (d) => {
      return ((d.x0 + d.x1) / Math.PI) * 90;
    };

    const computeTextRotation = (d) => {
      let angle = computeAngle(d);
      angle = angle < 90 || angle > 270 ? angle : angle + 180;
      return angle;
    };

    const color = (d, wins) => {
      if (d.data.name === d.parent.data.name) {
        return d.parent.data.w_score >= wins;
      } else {
        return d.parent.data.l_score >= wins;
      }
    };

    const formatName = (d) => {
      return league == "atp"
        ? d.data.name.split(" ")[1].substring(0, 3).toUpperCase()
        : d.data.name.substring(0, 3).toUpperCase();
    };

    const fillColor = (d) =>
      d.parent && d.parent.data.name == d.data.name ? wincolor : "white";

    const center = (d) =>
      d.depth !== 0
        ? "translate(" +
          arc.centroid(d) +
          ") rotate(" +
          computeTextRotation(d) +
          ")"
        : null;

    slices
      .append("path")
      .filter((d) => d.parent)
      .attr("d", arc)
      .style("stroke", "#222f3e")
      .style("stroke-width", (d) => d.depth * 2)
      .style("fill", (d) => fillColor(d))
      .attr("class", "player");

    slices
      .append("text")
      .attr("transform", (d) => center(d))
      .attr("dx", "-27")
      .attr("dy", (d) => {
        let ang = computeAngle(d);
        return ang < 90 || ang > 270 ? "0.1em" : "0.4em";
      })
      .attr("font-size", (d) => (d.depth > 4 ? "1.2em" : "1.4em"))
      .text((d) => (d.depth > 5 ? null : formatName(d)));

    const addCircles = (slices, cx, wins) => {
      slices
        .filter((d) => d.depth < 6 && d.depth !== 0)
        .append("circle")
        .attr("transform", (d) => center(d))
        .attr("cx", cx)
        .attr("cy", (d) => {
          let ang = computeAngle(d);
          return ang < 90 || ang > 270 ? 20 : -20;
        })
        .attr("r", 5)
        .attr("fill", "#222f3e")
        .attr("fill-opacity", (d) => {
          return color(d, wins) ? "1" : "0.4";
        });
    };

    const highlightPlayer = (player) => {
      slices
        .filter((d) => d.data.name === player)
        .selectAll("path")
        .style("fill", hovercolor);
    };

    const unhighlightPlayer = (player) => {
      slices
        .filter((d) => d.data.name === player)
        .selectAll("path")
        .style("fill", (d) => fillColor(d));
    };

    if (league == "atp") {
      addCircles(slices, -15, 1);
      addCircles(slices, 0, 2);
      addCircles(slices, 15, 3);
    } else {
      addCircles(slices, -7, 1);
      addCircles(slices, 7, 2);
    }
  }, []);

  return (
    <div className="flex flex-row items-center justify-center w-full relative">
      <div
        id="tooltip"
        className="fixed pointer-events-none bg-white p-4 border-[6px] border-black hidden"
        ref={tooltipRef}
      >
        <span id="value"></span>
      </div>
      <svg
        ref={bracketRef}
        height="100%"
        width="100%"
        viewBox={`0 0 ${height} ${width}`}
        preserveAspectRatio="none"
      ></svg>
    </div>
  );
};
