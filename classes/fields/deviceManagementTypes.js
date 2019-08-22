// Constructor
fields.deviceManagementTypes = function()
{
	return new fields.DropDownList({datasource: new DataSources.Generic({data:[{id:"snmp"		,name:"SNMP"		}
										  ,{id:"ssh"		,name:"SSH"		}
										  ,{id:"telnet"		,name:"Telnet"		}
										  ,{id:"http"		,name:"HTTP"		}
										  ,{id:"ipmi1.5"	,name:"IPMI v1.5"	}
										  ,{id:"ipmi2.0"	,name:"IPMI v.20"	}
										  ,{id:"drac"		,name:"Dell DRAC"	}
										  ,{id:"sim"		,name:"SuperMicro SIM"	}
										  ]
									    }) 
				       ,label	: "Protocol"
				       });
}
