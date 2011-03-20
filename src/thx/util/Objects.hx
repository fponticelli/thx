package thx.util;

class Objects
{
	public static inline function with<T>(ob : T, f : T -> Void)
	{
		f(ob);
		return ob;
	}
}