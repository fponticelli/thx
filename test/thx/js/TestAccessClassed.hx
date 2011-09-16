/**
 * ...
 * @author Franco Ponticelli
 */

package thx.js;

import utest.Assert;

class TestAccessClassed extends TestBaseDom
{
	public function testAddRemove() 
	{
		sel.classed().add("something");
		Assert.isFalse(sel.classed().exists("item-0"));
		sel.classed().add("item-0");
		Assert.isTrue(sel.classed().exists("item-0"));
		
		
		Assert.isFalse(sel.classed().exists("item-1"));
		sel.classed().add("item-1");
		Assert.isTrue(sel.classed().exists("item-1"));
		
		Assert.equals("something item-0 item-1", sel.attr("class").get());

		sel.classed().remove("item-0");
		Assert.isFalse(sel.classed().exists("item-0"));
		
		Assert.equals("something item-1", sel.attr("class").get());
		
		sel.classed().remove("item-1");
		Assert.isFalse(sel.classed().exists("item-1"));
		
		Assert.equals("something", sel.attr("class").get());

	}
}