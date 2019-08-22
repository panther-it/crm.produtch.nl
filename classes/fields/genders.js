// Constructor
fields.genders = function()
{
	return new fields.DropDownList({datasource: new DataSources.Generic({data:[{id:2	,name:"Dhr"}
										  ,{id:3	,name:"Mevr"}
										  ,{id:1	,name:"onbekend"}
										  ]
									    }) 
					,label	: "Aanhef"
					});
}
