package thx.svg;

/**
 * ...
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