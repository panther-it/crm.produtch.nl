// Constructor
fields.cableTypes = function()
{
	return new fields.DropDownList({datasource: new DataSources.Generic({data:[{id:"power"	,name:"power"	}
										  ,{id:"utp"	,name:"utp"	}
										  ,{id:"fiber"	,name:"fiber"	}
										  ,{id:"serial"	,name:"serial"	}
										  ]
									    }) 
				       ,label	: "Soort Kabel"
				       });
}
