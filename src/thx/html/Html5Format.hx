/**
 * ...
 * @author Franco Ponticelli
 */

package thx.html;

class Html5Format extends HtmlFormat
{
	public function new()
	{
		super();
		useCloseSelf = true;
		quotesRemoval = true;
	}
}