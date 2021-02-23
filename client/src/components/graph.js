import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

function Graph() {
    const svgRef = useRef();
    useEffect(() => {
        var svg = d3.select(svgRef.current);
        svg.selectChildren().remove();
        svg = svg.attr("width", 200)
            .attr("height", 200)
            .style("padding", 2)
            .style("margin", 2)
            .append("g")
            .attr("transform", "translate(35,25)");
        if (this.props.data.length == 0) {
            return;
        }
        var h = 150;
        var w = 150;
        if (this.props.title !== undefined) {
            svg.append("text")
                .attr("x", w / 2)
                .attr("y", 0)
                .attr("text-anchor", "middle")
                .text(this.props.title);
        }

        var [l, m] = d3.extent(this.props.data)
        l = Math.min(l, 0)
        m = Math.max(m, 0)
        if (this.props.data2 !== undefined) {
            var [l2, m2] = d3.extent(this.props.data2)
            l = Math.min(l, l2)
            m = Math.max(m, m2)
        }

        var yScale = d3.scaleLinear()
            .domain([l, m])
            .rangeRound([h, 0]);
        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft()
                .ticks(4)
                .scale(yScale));

        var xScale = d3.scaleLinear()
            .domain([0, this.props.data.length - 1])
            .rangeRound([0, w]);
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + yScale(0) + ")")
            .call(d3.axisBottom()
                .ticks(4)
                .scale(xScale));

        svg.append("path")
            .datum(this.props.data)
            .attr("fill", "none")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line().x((d, i) => xScale(i)).y((d, i) => yScale(d)))
            .attr("stroke", "blue");

        if (this.props.data2 !== undefined) {
            svg.append("path")
                .datum(this.props.data2)
                .attr("fill", "none")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line().x((d, i) => xScale(i)).y((d, i) => yScale(d)))
                .attr("stroke", "red");
        }
    }, [this.props.data, this.props.data2]);
    return (
        <React.Fragment>
            <svg ref={svgRef}></svg>
        </React.Fragment>
    );
}

export default Graph;