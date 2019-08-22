// Constructor
fields.recurring = function()
{
	return new fields.DropDownList({datasource: new DataSources.Generic({data:[{id:"M"	,name:"Maandelijks"	}
										  ,{id:"K"	,name:"per Kwartaal"	}
										  ,{id:"H"	,name:"Half Jaarlijks"	}
										  ,{id:"J"	,name:"Jaarlijks"	}
										  ,{id:"E"	,name:"Eenmalig"	}
										  ]
									    }) 
				       ,label	: "Abonnement"
				       });
}
