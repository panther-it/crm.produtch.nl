// Constructor
fields.customerStates = function()
{
	return new fields.DropDownList({datasource: new DataSources.Generic({data:[{id:1	,name:"Onbekend"	}
										  ,{id:2	,name:"Actief"		}
										  ,{id:3	,name:"Blocked"		}
										  ,{id:4	,name:"Geannuleerd"	}
										  ,{id:5	,name:"Nieuw"		}
										  ]
									    }) 
				       ,label	: "Status"
				       });
}
