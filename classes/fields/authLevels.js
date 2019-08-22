// Constructor
fields.authLevels = function()
{
	return new fields.DropDownList({datasource: new DataSources.Generic({data:[{id:99	,name:"Admin"		}
										  ,{id:100	,name:"No Access"	}
										  ,{id:0	,name:"Anonymous"	}
										  ,{id:1	,name:"1"		}
										  ,{id:2	,name:"2"		}
										  ,{id:3	,name:"3"		}
										  ,{id:4	,name:"4"		}
										  ,{id:5	,name:"5"		}
										  ,{id:6	,name:"6"		}
										  ,{id:7	,name:"7"		}
										  ,{id:8	,name:"8"		}
										  ,{id:9	,name:"9"		}
										  ]
									    }) 
				       ,label	: "Level"
				       });
}
