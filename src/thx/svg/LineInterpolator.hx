package thx.svg;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

enum LineInterpolator
{
	Linear;
	StepBefore;
	StepAfter;
	Basis;
	BasisClosed;
	Cardinal(?tension : Float);
	CardinalClosed(?tension : Float);
}