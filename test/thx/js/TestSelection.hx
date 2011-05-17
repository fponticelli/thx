package thx.js;

import utest.Assert;
import thx.js.Dom;

class TestSelection
{
	var sel : Selection;
	
	public function testAppendRemove()
	{
		Assert.isTrue(sel.select("div").empty());
		sel.append("div");
		Assert.isFalse(sel.select("div").empty());
		sel.select("div").remove();
		Assert.isTrue(sel.select("div").empty());
	}
	
	public function testSelectAll()
	{
		for (i in 0...3)
			sel.append("div").text().float(i);
		
		var counter = 0;
		sel.selectAll("div").eachNode(function(n, i) {
			Assert.equals(counter, i);
			Assert.equals("" + counter, n.innerHTML);
			counter++;
		});
	}
	
	public function testUpdate()
	{
		for (i in 0...3)
			sel.append("div").text().float(i);
		
		var data = ['a', 'b', 'c', 'e'];
		var update = sel.selectAll("div").data(data)
			.update()
				.text().data();

		sel.selectAll("div").eachNode(function(n, i) {
			Assert.equals(data[i], Access.getData(n));
			Assert.equals(data[i], n.innerHTML);
		});

		update.each(function(d, i) Assert.equals(data[i], d));
		
		update.text().stringf(function(d, i) return d.toUpperCase());
		update.eachNode(function(n, i) Assert.equals(data[i].toUpperCase(), n.innerHTML));
	}
	
	public function testExit()
	{
		for (i in 0...5)
			sel.append("div").text().float(i);
		
		var data = ['a', 'b', 'c'];
		sel.selectAll("div").data(data)
			.exit()
				.text().string("X");

		sel.selectAll("div").eachNode(function(n, i) {
			if(i < data.length)
				Assert.equals("" + i, n.innerHTML);
			else
				Assert.equals("X", n.innerHTML);
		});
	}
	
	public function testUpdateExit()
	{
		for (i in 0...5)
			sel.append("div").text().float(i);
		
		var data = ['a', 'b', 'c'];
		sel.selectAll("div").data(data)
			.update()
				.text().data()
			.exit()
				.text().string("X");

		sel.selectAll("div").eachNode(function(n, i) {
			if(i < data.length)
				Assert.equals(data[i], n.innerHTML);
			else
				Assert.equals("X", n.innerHTML);
		});
	}
	
	public function testEnter()
	{
		for (i in 0...3)
			sel.append("div").text().float(i);
		
		var data = ['a', 'b', 'c', 'd', 'e'];
		sel.selectAll("div").data(data)
			.update()
				.text().stringf(function(d,i) return d.toUpperCase())
			.enter()
				.append("div")
					.text().data();
		sel.selectAll("div").eachNode(function(n, i) {
			if(i < 3)
				Assert.equals(data[i].toUpperCase(), n.innerHTML);
			else
				Assert.equals(data[i], n.innerHTML);
		});
	}
	
	public function testEnterUpdateExit()
	{
		sel.append("div").text().string("X");
		
		var data = ['a', 'b', 'c'];
		sel.selectAll("div").data(data)
			.enter()
				.append("div")
					.text().data();
		sel.selectAll("div").eachNode(function(n, i) {
			if(i > 0)
				Assert.equals(data[i], n.innerHTML);
			else
				Assert.equals("X", n.innerHTML);
		});
	}
	
	public function testDataAttributeAccess()
	{
		var classes = ["first", "second"];
		sel.selectAll("div")
			.data(classes)
				.enter()
					.append("div")
						.attr("class").stringf(function(d, i) return d);
		Assert.equals("first", sel.select("div").attr("class").get());
	}
	
	public function setup()
	{
		sel = Dom.doc.select("body").append("div");
	}
	
	public function teardown()
	{
		sel.remove();
	}
	
	public function new(){}
}