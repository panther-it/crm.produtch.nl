// Constructor
fields.deviceTypes = function()
{
	return new fields.DropDownList({datasource: new DataSources.Generic({data:[{id:"server",name:"server"}
											,{id:"router",name:"router"}
											,{id:"switch",name:"switch"}
											,{id:"powerswitch",name:"powerswitch"}
											,{id:"firewall",name:"firewall"}
											,{id:"nas",name:"nas"}
											,{id:"serial switch",name:"serial switch"}
											,{id:"san switch",name:"san switch"}
											]
										  }) 
					     ,label	: "Soort Apparaat"
					     });
}
