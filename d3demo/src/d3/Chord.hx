package d3;
import thx.svg.Arc;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.js.Selection;
import thx.color.Colors;
import thx.geom.layout.Chord;
using Arrays;

class Chord extends Example
{
	var update : UpdateSelection<ChordType>;
	function fade(opacity : Float)
	{
		var me = this;
		return function(d : ItemType, i : Int)
		{
			me.update
				.filter(function(d, _) {
					return d.source.index != i && d.target.index != i;
				})
				.transition( )
					.attr("opacity").float(opacity);
		}
	}
	
	function groupTicks(d, i)
	{
		var k = (d.endAngle - d.startAngle) / d.value;
		return Floats.range(0, d.value, 1000).map(function(v, i) {
			return {
				angle : v * k + d.startAngle,
				label : 0 != i % 5 ? null : v / 1000 + "k"
			};
		});
	}
	
	override function runExample()
	{
		var chord = new thx.geom.layout.Chord()
			.padding(0.05)
			.sortSubgroups(Floats.descending)
			.matrix([
				[11975,  5871, 8916, 2868],
				[ 1951, 10048, 2060, 6171],
				[ 8010, 16145, 8090, 8045],
				[ 1013,   990,  940, 6907]
			]);
		
		var w = 600,
			h = 600,
			r0 = Math.min(w, h) * .41,
			r1 = r0 * 1.1;
			
		var fill = new thx.math.scale.Ordinal()
			.domain(Ints.range(4))
			.range(["#000000", "#FFDD89", "#957244", "#F26223"]);
			
		var data = chord.groups();
		
		var svg = container
			.append("svg:svg")
				.attr("width").float(w)
				.attr("height").float(h)
			.append("svg:g")
				.attr("transform").string("translate(" + w / 2 + "," + h / 2 + ")");
		
		
		var choice = svg.append("svg:g")
			.selectAll("path")
				.data(data);
		choice
			.enter().append("svg:path")
				.attr("fill").stringf(function(d, i) return Colors.parse(fill.scale(d.index)).toRgbString())
				.attr("stroke").stringf(function(d, i) return Colors.parse(fill.scale(d.index)).toRgbString())
				.attr("d").stringf(Arc.fromAngleObject().innerRadius(r0).outerRadius(r1).shape)
				.on("mouseover", fade(.1))
				.on("mouseout", fade(1))
		;

		var ticks = svg.append("svg:g")
			.selectAll("g")
				.data(chord.groups())
			.enter().append("svg:g")
			.selectAll("g")
				.dataf(groupTicks)
			.enter().append("svg:g")
				.attr("transform").stringf(function(d, i) {
					return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + r1 + ",0)";
				});
		
		ticks.append("svg:line")
			.attr("x1").float(1)
			.attr("y1").float(0)
			.attr("x2").float(5)
			.attr("y2").float(0)
			.attr("stroke").string("#000");

		ticks.append("svg:text")
			.attr("x").float(8)
			.attr("dy").string(".35em")
			.attr("text-anchor").stringf(function(d, i) {
				return d.angle > Math.PI ? "end" : null;
			})
			.attr("transform").stringf(function(d, i) {
				return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
			})
			.text().stringf(function(d, i) return d.label);
		
		var chords = chord.chords();
		
		svg.append("svg:g")
			.attr("class").string("chord")
			.selectAll("path")
				.data(chords)
				.enter().append("svg:path")
					.attr("fill").stringf(function(d, i) return fill.scale(d.target.index))
					.attr("d").stringf(cast thx.svg.Chord.pathObject().radius(r0).shape)
					.attr("opacity").float(1);
					
		update = svg.selectAll("g.chord path").data(chords).update();
	}
	
	override function description() return "Chord Diagram from fixed values. Move the mouse over the circle permiter."
}