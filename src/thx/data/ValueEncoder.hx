package thx.data;
import thx.error.Error;

/**
 * ...
 * @author Franco Ponticelli
 */

class ValueEncoder
{
	var handler : IDataHandler;
	public function new(handler : IDataHandler)
	{
		this.handler = handler;
	}
	
	public function encode(o : Dynamic)
	{
		handler.start();
		encodeValue(o);
		handler.end();
	}
	
	function encodeValue(o : Dynamic)
	{
		switch(Type.typeof(o))
		{
			case TNull:
				handler.null();
			case TInt:
				handler.int(o);
			case TFloat:
				handler.float(o);
			case TBool:
				handler.bool(o);
			case TObject:
				encodeObject(o);
			case TFunction:
				throw new Error("unable to encode TFunction type");
			case TClass(c):
				if (Std.is(o, String))
					handler.string(o);
				else if (Std.is(o, Array))
					encodeArray(o);
				else if (Std.is(o, Date))
					handler.date(o);
				else if (Std.is(o, Hash))
					encodeHash(o);
				else if (Std.is(o, List))
					encodeList(o);
				else
					// Custom Classes
					throw new Error("unable to encode class '{0}'", Type.getClassName(c));
			case TEnum(e):
				throw new Error("unable to encode TEnum type '{0}'", Type.getEnumName(e));
			case TUnknown:
				throw new Error("unable to encode TUnknown type");
		}
	}
	
	function encodeObject(o : { } )
	{
		handler.startObject();
		for (key in Reflect.fields(o))
		{
			handler.startField(key);
			encodeValue(Reflect.field(o, key));
			handler.endField();
		}
		handler.endObject();
	}
	
	function encodeHash(o : Hash<Dynamic>)
	{
		handler.startObject();
		for (key in o.keys())
		{
			handler.startField(key);
			encodeValue(o.get(key));
			handler.endField();
		}
		handler.endObject();
	}
	
	function encodeList(list : List<Dynamic>)
	{
		handler.startArray();
		for (item in list)
		{
			handler.startItem();
			encodeValue(item);
			handler.endItem();
		}
		handler.endArray();
	}
	
	function encodeArray(a : Array<Dynamic>)
	{
		handler.startArray();
		for (item in a)
		{
			handler.startItem();
			encodeValue(item);
			handler.endItem();
		}
		handler.endArray();
	}
}