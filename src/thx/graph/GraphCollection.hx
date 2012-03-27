package thx.graph;

import hxevents.Dispatcher;
using IntHashes;

class GraphCollection<TNodeData, TEdgeData, TData, TListItem : GraphElement<TData, TNodeData, TEdgeData>>
{
	public var onRemove(default, null) : Dispatcher<TListItem>;
	public var onCreate(default, null) : Dispatcher<TListItem>;

	var graph : Graph<TNodeData, TEdgeData>;
	var collection : IntHash<TListItem>;
	var nextid : Int;
	var idf : TData -> String;
	var _map : Hash<TListItem>;

	public var length(get_length, null) : Int;
	function new(graph : Graph<TNodeData, TEdgeData>, ?idf : TData -> String)
	{
		nextid = 0;
		this.graph = graph;
		this.idf = idf;
		collection = new IntHash();
		_map = new Hash();
		if(null != idf)
		{
			var add = collectionCreate;
			collectionCreate = function(item : TListItem)
			{
				_map.set(idf(item.data), item);
				add(item);
			}
			var rem = collectionRemove;
			collectionRemove = function(item : TListItem)
			{
				_map.remove(idf(item.data));
				rem(item);
			}
		}
		onRemove = new Dispatcher();
		onCreate = new Dispatcher();
	}

	public function getById(id : String) : TListItem
	{
		return _map.get(id);
	}

	public function get(id : Int) : TListItem return collection.get(id)

	public function has(item : TListItem) return item.graph == graph && collection.exists(item.id)

	inline function get_length() : Int return collection.count()

	dynamic function collectionCreate(item : TListItem)
	{
		onCreate.dispatch(item);
		collection.set(item.id, item);
	}

	dynamic function collectionRemove(item : TListItem)
	{
		collection.remove(item.id);
		onRemove.dispatch(item);
	}

	inline public function iterator() return collection.iterator()

	public function toString() return Iterables.map(collection, function(item : TListItem, _) : String return Std.string(item)).join(", ")
}