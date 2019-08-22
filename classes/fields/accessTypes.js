// Constructor
fields.accessTypes = function()
{
	return new fields.DropDownList({datasource: new DataSources.Generic({data:[{id:"outerkey"	,name:"outerkey"}
										  ,{id:"rackkey"	,name:"rackkey"	}
										  ,{id:"card"		,name:"card"	}
										  ]
									    }) 
				       ,label	: "Soort Toegang"
				       });
}
