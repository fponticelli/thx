/**
 * ...
 * @author Franco Ponticelli
 */

package thx.html;

import thx.collections.Set;

class Element
{
	// Empty Elements - HTML 4.01
	public static inline function isEmpty(el : String) return _empty.exists(el)
	static var _empty = Set.ofArray("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed".split(","));

	// Block Elements - HTML 4.01
	public static inline function isBlock(el : String) return _block.exists(el)
	static var _block = Set.ofArray("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul".split(","));

	// Inline Elements - HTML 4.01
	public static inline function isInline(el : String) return _inline.exists(el)
	static var _inline = Set.ofArray("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var".split(","));

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	public static inline function isCloseSelf(el : String) return _closeSelf.exists(el)
	static var _closeSelf = Set.ofArray("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr".split(","));

	// Special Elements (can contain anything)
	public static inline function isSpecial(el : String) return _special.exists(el)
	static var _special = Set.ofArray("script,style".split(","));
}