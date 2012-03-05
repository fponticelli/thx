import thx.geom.layout.Tree;
import js.Lib;
import thx.js.Dom;
import js.Dom.Event;
import thx.geom.layout.Hierarchy;
import thx.svg.Diagonal;
using Arrays;

class TreeTest {
	public static function main(){
		Lib.window.onload = init;
	}

	public static function init(e:Event){
		var r = 960/2;
		var t = new thx.geom.layout.Tree()
			.size([360, r-120])
			.sort(null)
			.children(split)
			.separation(function(a:TreeNode<Int>, b:TreeNode<Int> ){
					return (a.parent == b.parent ? 1 : 2) / a.depth;
			});
		var nodes = t.tree(48);


		var vis = Dom.select("#chart").append("svg:svg")
			.attr("width").float(960)
			.attr("height").float(400)
			.append("svg:g")
				.attr("transform").string("translate(40, 0)");

		var node = vis.selectAll("g.node")
			.data(nodes).enter().append("svg:g")
				.attr("class").string("node")
				.attr("transform").stringf(function(d,_){
					return "translate(" + d.x + ',' + d.y + ")";
				});

		var diagonal = Tree.treeLinkDiagonal(); //thx.svg.Diagonal.forObject()
//			.sourcef(Diagonal.diagonalSource)
//			.targetf(Diagonal.diagonalTarget)
//			.projection(function(x,_){
//				return [x.x, x.y];
//			})
//			;


		var link = vis.selectAll("path.link")
				.data(Tree.treeLinks(nodes))
				.enter().append("svg:path")
					.attr("class").string("link")
					.attr("d").stringf(function(x,_){
				//		var y = {
				//			source:{x:x.source.x, y:x.source.y},
				//			target:{x:x.target.x, y:x.target.y}
				//		}
						return diagonal.diagonal(x);
						});


		node.append("svg:circle")
			.attr('r').float(4.5);

		node.append("svg:text")
			.text().stringf( function(d,_){
				return Std.string(d.data);
			});


	}



	public static function split(x:Int,_) {
		var diff = x;
		var res = new Array<Int>();

		for (i in 2...x){
			if (x % i == 0){
				var j = Std.int(x/i);
				var tdiff = Std.int(Math.abs(i - j));
				if (diff > tdiff){
					res = [i,j];
					diff = tdiff;
				}
			}
		}

		if (x <= 3) res = null;
		return res;
	}
}