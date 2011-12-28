/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

package thx.geom.layout;

class Force 
{
	var _size : Array<Int>;
	var _nodes : Array<Node>;
	var _links : Array<Link>;
	var _linkDistance : Node -> Int -> Float;
	var _linkStrength : Node -> Int -> Float;
	var _friction : Float;
	var _charge : Node -> Int -> Float;
	public function new()
	{
		_size = [1, 1];
		_nodes = [];
		_links = [];
		_linkDistance = forceLinkDistance;
		_linkStrength = forceLinkStrength;
		_friction = .99;
		_charge = function(_, _) return -30;
	}

	function repulse(node)
	{
		return function(quad, x1, y1, x2, y2)
		{
			if(quad.point != node)
			{
				var dx = quad.cx - node.x2,
					dy = quad.cy - node.y2,
					dn = 1 / Math.sqrt(dx * dx + dy * dy);

				// Barnes-Hut criterion
				if((x2 - x1) * dn < theta)
				{
					var k = quad.charge * dn * dn;
					node.px -= dx * k;
					node.py -= dy * k;
				}
			}
		}
		return !quad.charge;
	}

	function tick()
	{
		var n = _nodes.length,
			m = _links.length,
			q,
			i, // current index
			o, // current object
			s, // current source
			t, // current target
			l, // current distance
			k, // current force
			x, // x-distance
			y; // y-distance

		// gauss-seidel relaxation for _links
		for (i in 0...m)
		{
			o = _links[i];
			s = o.source;
			t = o.target;
			x = t.x - s.x;
			y = t.y - s.y;
			if (l = (x * x + y * y))
			{
				l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
				x *= l;
				y *= l;
				t.x -= x * (k = s.weight / (t.weight + s.weight));
				t.y -= y * k;
				s.x += x * (k = 1 - k);
				s.y += y * k;
			}
		}

		// apply gravity forces
		if (k = alpha * gravity)
		{
			x = _size[0] / 2;
			y = _size[1] / 2;
			i = -1; if (k) while (++i < n)
			{
				o = _nodes[i];
				o.x += (x - o.x) * k;
				o.y += (y - o.y) * k;
			}
		}

		// compute quadtree center of mass and apply charge forces
		if (charge)
		{
			forceAccumulate(q = d3.geom.quadtree(_nodes), alpha, charges);
			i = -1; while (++i < n)
			{
				if (!(o = _nodes[i]).fixed)
				{
					q.visit(repulse(o));
				}
			}
		}

		// position verlet integration
		i = -1; while (++i < n)
		{
			o = _nodes[i];
			if (o.fixed)
			{
				o.x = o.px;
				o.y = o.py;
			} else {
				o.x -= (o.px - (o.px = o.x)) * friction;
				o.y -= (o.py - (o.py = o.y)) * friction;
			}
		}

//		event.tick({type: "tick", alpha: alpha});

		// simulated annealing, basically
		return (alpha *= .99) < .005;
	}

	public function nodes(x)
	{
		_nodes = x;
		return this;
	}
	public function getNodes() return _nodes

	public function links(x)
	{
		_links = x;
		return this;
	}
	public function getLinks() return _links

	public function size(x)
	{
		_size = x;
		return this;
	}
	public function getSize() return _size

	public function friction(x)
	{
		_friction = x;
		return this;
	}
	public function getFriction() return _friction

	public function gravity(x)
	{
		_gravity = x;
		return this;
	}
	public function getGravity() return _gravity

	public function theta(x)
	{
		_theta = x;
		return this;
	}
	public function getTheta() return _theta






	public function linkDistance(x : Node -> Int -> Float)
	{
		_linkDistance = x;
		return this;
	}
	public function getLinkDistance() return _linkDistance

	public function linkStrength(x : Node -> Int -> Float)
	{
		_linkStrength = x;
		return this;
	}
	public function getLinkStrength() return _linkStrength

	public function charge(x : Node -> Int -> Float)
	{
		_charge = x;
		return this;
	}
	public function getCharge() return _charge





	public function start()
	{
		var n = nodes.length,
			m = links.length,
			w = size[0],
			h = size[1],
			neighbors = null,
			o;

		function neighbor(i)
		{
			if(null == neighbors)
			{
				neighbors = [];
				for(j in 0...n)
				{
					neighbors[j] = [];
				}
				for(j in 0...m)
				{
					var o = links[j];
					neighbors[o.source.index].push(o.target);
					neighbors[o.target.index].push(o.source);
				}
			}
			return neighbors[i];
		}

		function position(dimension, size, i)
		{
			var neighbors = neighbor(i),
				m = neighbors.length,
				x;
			for(j in 0...m)
			{
				if(!Math.isNaN(x = neighbors[j][dimension]))
					return x;
			}
			return Math.random() * size;
		}


		for(i in 0...n)
		{
			(o = nodes[i]).index = i;
			o.weight = 0;
		}

		distances = [];
		strenghts = [];

		for(i in 0...m)
		{
			o = links[i];
			if(Std.is(o.source, Int)) o.source = nodes[o.source];
			if(Std.is(o.target, Int)) o.target = nodes[o.target];

			distances[i] = _linkDistance(o, i);
			strenghts[i] = _linkStrength(o, i);
			++o.source.weight;
			++o.target.weight;
		}

		for(i in 0...n)
		{
			o = nodes[i];
			if(Math.isNaN(o.x)) o.x = position("x", w);
			if(Math.isNaN(o.y)) o.y = position("y", h);
			if(Math.isNaN(o.px)) o.px = o.x;
			if(Math.isNaN(o.py)) o.py = o.y;
		}

		charges = [];

		for(i in 0...n)
		{
			charges[i] = _charge(nodes[i], i);
		}

		return resume();
	}

	public function resume()
	{
		alpha = .1;
		thx.js.Timer.timer(tick);
		return this;
	}

	public function stop()
	{
		alpha = 0;
		return this;
	}

// TODO add drag

	static function forceAccumulate(quad : Quad, alpha, charges)
	{
		var cx = 0,
			cy = 0;
		quad.charge = 0;
		if(!quad.leaf)
		{
			var nodes = quad.nodes,
				n = nodes.length,
				c;
			for(i in 0...n)
			{
				c = nodes[i];
				if(null == c) continue;
				forceAccumulate(c, alpha, charges);
				quad.charge += c.charge;
				cx += c.charge * c.cx;
				cy += c.charge * c.cy;
			}
		}
		if(quad.point)
		{
			if(!quad.leaf)
			{
				quad.point.x += Math.random() - .5;
				quad.point.y += Math.random() - .5;
			}
			var k = alpha * charges[quad.point.index];
			quad.charge += quad.pointCharge = k;
			cx += k * quad.point.x;
			cy += k * quad.point.y;
		}
		quad.cx = cx / quad.charge;
		quad.cy = cy / quad.charge;
	}

	static function forceLinkDistance(link : Node, _)
	{
		return 20;
	}

	static function forceLinkStrength(link : Node, _)
	{
		return 1;
	}
}

typedef Node = {
}

typedef Quad = {
	charge : Float,
	leaf : Bool,
	nodes : Array<Node>
}

typedef Link = {
	
}