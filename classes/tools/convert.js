var Convert = 
{
	field: function(dbField)
	       {
			switch(dbField.type)
			{
				case "string": return new fields.Textbox(dbField);
				case "int"   : return new fields.Number(dbField);
				default      : return new fields.Textbox(dbField);
			}
	       }
}
