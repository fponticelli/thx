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
	BasisOpen;
	BasisClosed;
	Cardinal(?tension : Float);
	CardinalOpen(?tension : Float);
	CardinalClosed(?tension : Float);
	Monotone;
}