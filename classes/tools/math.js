Math.ground = function(float)
{
	if (float < 0)
		return Math.ceil(float);
	else
		return Math.floor(float);
}

