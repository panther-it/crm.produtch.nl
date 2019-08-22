// Constructor
fields.countries = function()
{				
	return new fields.DropDownList({datasource: new DataSources.Generic({data:[{id:"AF", name:"AFGHANISTAN"}
										,{id:"AX", name:"ALAND ISLANDS"}
										,{id:"AL", name:"ALBANIA"}
										,{id:"DZ", name:"ALGERIA"}
										,{id:"AS", name:"AMERICAN SAMOA"}
										,{id:"AD", name:"ANDORRA"}
										,{id:"AO", name:"ANGOLA"}
										,{id:"AI", name:"ANGUILLA"}
										,{id:"AQ", name:"ANTARCTICA"}
										,{id:"AG", name:"ANTIGUA AND BARBUDA"}
										,{id:"AR", name:"ARGENTINA"}
										,{id:"AM", name:"ARMENIA"}
										,{id:"AW", name:"ARUBA"}
										,{id:"AU", name:"AUSTRALIA"}
										,{id:"AT", name:"AUSTRIA"}
										,{id:"AZ", name:"AZERBAIJAN"}
										,{id:"BS", name:"BAHAMAS"}
										,{id:"BH", name:"BAHRAIN"}
										,{id:"BD", name:"BANGLADESH"}
										,{id:"BB", name:"BARBADOS"}
										,{id:"BY", name:"BELARUS"}
										,{id:"BE", name:"BELGIUM"}
										,{id:"BZ", name:"BELIZE"}
										,{id:"BJ", name:"BENIN"}
										,{id:"BM", name:"BERMUDA"}
										,{id:"BT", name:"BHUTAN"}
										,{id:"BO", name:"BOLIVIA  PLURINATIONAL STATE OF"}
										,{id:"BA", name:"BOSNIA AND HERZEGOVINA"}
										,{id:"BW", name:"BOTSWANA"}
										,{id:"BV", name:"BOUVET ISLAND"}
										,{id:"BR", name:"BRAZIL"}
										,{id:"IO", name:"BRITISH INDIAN OCEAN TERRITORY"}
										,{id:"BN", name:"BRUNEI DARUSSALAM"}
										,{id:"BG", name:"BULGARIA"}
										,{id:"BF", name:"BURKINA FASO"}
										,{id:"BI", name:"BURUNDI"}
										,{id:"KH", name:"CAMBODIA"}
										,{id:"CM", name:"CAMEROON"}
										,{id:"CA", name:"CANADA"}
										,{id:"CV", name:"CAPE VERDE"}
										,{id:"KY", name:"CAYMAN ISLANDS"}
										,{id:"CF", name:"CENTRAL AFRICAN REPUBLIC"}
										,{id:"TD", name:"CHAD"}
										,{id:"CL", name:"CHILE"}
										,{id:"CN", name:"CHINA"}
										,{id:"CX", name:"CHRISTMAS ISLAND"}
										,{id:"CC", name:"COCOS (KEELING) ISLANDS"}
										,{id:"CO", name:"COLOMBIA"}
										,{id:"KM", name:"COMOROS"}
										,{id:"CG", name:"CONGO"}
										,{id:"CD", name:"CONGO  THE DEMOCRATIC REPUBLIC OF THE"}
										,{id:"CK", name:"COOK ISLANDS"}
										,{id:"CR", name:"COSTA RICA"}
										,{id:"CI", name:"COTE D'IVOIRE"}
										,{id:"HR", name:"CROATIA"}
										,{id:"CU", name:"CUBA"}
										,{id:"CY", name:"CYPRUS"}
										,{id:"CZ", name:"CZECH REPUBLIC"}
										,{id:"DK", name:"DENMARK"}
										,{id:"DJ", name:"DJIBOUTI"}
										,{id:"DM", name:"DOMINICA"}
										,{id:"DO", name:"DOMINICAN REPUBLIC"}
										,{id:"EC", name:"ECUADOR"}
										,{id:"EG", name:"EGYPT"}
										,{id:"SV", name:"EL SALVADOR"}
										,{id:"GQ", name:"EQUATORIAL GUINEA"}
										,{id:"ER", name:"ERITREA"}
										,{id:"EE", name:"ESTONIA"}
										,{id:"ET", name:"ETHIOPIA"}
										,{id:"FK", name:"FALKLAND ISLANDS (MALVINAS)"}
										,{id:"FO", name:"FAROE ISLANDS"}
										,{id:"FJ", name:"FIJI"}
										,{id:"FI", name:"FINLAND"}
										,{id:"FR", name:"FRANCE"}
										,{id:"GF", name:"FRENCH GUIANA"}
										,{id:"PF", name:"FRENCH POLYNESIA"}
										,{id:"TF", name:"FRENCH SOUTHERN TERRITORIES"}
										,{id:"GA", name:"GABON"}
										,{id:"GM", name:"GAMBIA"}
										,{id:"GE", name:"GEORGIA"}
										,{id:"DE", name:"GERMANY"}
										,{id:"GH", name:"GHANA"}
										,{id:"GI", name:"GIBRALTAR"}
										,{id:"GR", name:"GREECE"}
										,{id:"GL", name:"GREENLAND"}
										,{id:"GD", name:"GRENADA"}
										,{id:"GP", name:"GUADELOUPE"}
										,{id:"GU", name:"GUAM"}
										,{id:"GT", name:"GUATEMALA"}
										,{id:"GG", name:"GUERNSEY"}
										,{id:"GN", name:"GUINEA"}
										,{id:"GW", name:"GUINEA-BISSAU"}
										,{id:"GY", name:"GUYANA"}
										,{id:"HT", name:"HAITI"}
										,{id:"HM", name:"HEARD ISLAND AND MCDONALD ISLANDS"}
										,{id:"VA", name:"HOLY SEE (VATICAN CITY STATE)"}
										,{id:"HN", name:"HONDURAS"}
										,{id:"HK", name:"HONG KONG"}
										,{id:"HU", name:"HUNGARY"}
										,{id:"IS", name:"ICELAND"}
										,{id:"IN", name:"INDIA"}
										,{id:"ID", name:"INDONESIA"}
										,{id:"IR", name:"IRAN  ISLAMIC REPUBLIC OF"}
										,{id:"IQ", name:"IRAQ"}
										,{id:"IE", name:"IRELAND"}
										,{id:"IM", name:"ISLE OF MAN"}
										,{id:"IL", name:"ISRAEL"}
										,{id:"IT", name:"ITALY"}
										,{id:"JM", name:"JAMAICA"}
										,{id:"JP", name:"JAPAN"}
										,{id:"JE", name:"JERSEY"}
										,{id:"JO", name:"JORDAN"}
										,{id:"KZ", name:"KAZAKHSTAN"}
										,{id:"KE", name:"KENYA"}
										,{id:"KI", name:"KIRIBATI"}
										,{id:"KP", name:"KOREA  DEMOCRATIC PEOPLE'S REPUBLIC OF"}
										,{id:"KR", name:"KOREA  REPUBLIC OF"}
										,{id:"KW", name:"KUWAIT"}
										,{id:"KG", name:"KYRGYZSTAN"}
										,{id:"LA", name:"LAO PEOPLE'S DEMOCRATIC REPUBLIC"}
										,{id:"LV", name:"LATVIA"}
										,{id:"LB", name:"LEBANON"}
										,{id:"LS", name:"LESOTHO"}
										,{id:"LR", name:"LIBERIA"}
										,{id:"LY", name:"LIBYAN ARAB JAMAHIRIYA"}
										,{id:"LI", name:"LIECHTENSTEIN"}
										,{id:"LT", name:"LITHUANIA"}
										,{id:"LU", name:"LUXEMBOURG"}
										,{id:"MO", name:"MACAO"}
										,{id:"MK", name:"MACEDONIA  THE FORMER YUGOSLAV REPUBLIC OF"}
										,{id:"MG", name:"MADAGASCAR"}
										,{id:"MW", name:"MALAWI"}
										,{id:"MY", name:"MALAYSIA"}
										,{id:"MV", name:"MALDIVES"}
										,{id:"ML", name:"MALI"}
										,{id:"MT", name:"MALTA"}
										,{id:"MH", name:"MARSHALL ISLANDS"}
										,{id:"MQ", name:"MARTINIQUE"}
										,{id:"MR", name:"MAURITANIA"}
										,{id:"MU", name:"MAURITIUS"}
										,{id:"YT", name:"MAYOTTE"}
										,{id:"MX", name:"MEXICO"}
										,{id:"FM", name:"MICRONESIA  FEDERATED STATES OF"}
										,{id:"MD", name:"MOLDOVA  REPUBLIC OF"}
										,{id:"MC", name:"MONACO"}
										,{id:"MN", name:"MONGOLIA"}
										,{id:"ME", name:"MONTENEGRO"}
										,{id:"MS", name:"MONTSERRAT"}
										,{id:"MA", name:"MOROCCO"}
										,{id:"MZ", name:"MOZAMBIQUE"}
										,{id:"MM", name:"MYANMAR"}
										,{id:"NA", name:"NAMIBIA"}
										,{id:"NR", name:"NAURU"}
										,{id:"NP", name:"NEPAL"}
										,{id:"NL", name:"NETHERLANDS"}
										,{id:"AN", name:"NETHERLANDS ANTILLES"}
										,{id:"NC", name:"NEW CALEDONIA"}
										,{id:"NZ", name:"NEW ZEALAND"}
										,{id:"NI", name:"NICARAGUA"}
										,{id:"NE", name:"NIGER"}
										,{id:"NG", name:"NIGERIA"}
										,{id:"NU", name:"NIUE"}
										,{id:"NF", name:"NORFOLK ISLAND"}
										,{id:"MP", name:"NORTHERN MARIANA ISLANDS"}
										,{id:"NO", name:"NORWAY"}
										,{id:"OM", name:"OMAN"}
										,{id:"PK", name:"PAKISTAN"}
										,{id:"PW", name:"PALAU"}
										,{id:"PS", name:"PALESTINIAN TERRITORY  OCCUPIED"}
										,{id:"PA", name:"PANAMA"}
										,{id:"PG", name:"PAPUA NEW GUINEA"}
										,{id:"PY", name:"PARAGUAY"}
										,{id:"PE", name:"PERU"}
										,{id:"PH", name:"PHILIPPINES"}
										,{id:"PN", name:"PITCAIRN"}
										,{id:"PL", name:"POLAND"}
										,{id:"PT", name:"PORTUGAL"}
										,{id:"PR", name:"PUERTO RICO"}
										,{id:"QA", name:"QATAR"}
										,{id:"R", name:""}
										,{id:"RE", name:"REUNION"}
										,{id:"RO", name:"ROMANIA"}
										,{id:"RU", name:"RUSSIAN FEDERATION"}
										,{id:"RW", name:"RWANDA"}
										,{id:"BL", name:"SAINT BARTHELEMY"}
										,{id:"SH", name:"SAINT HELENA"}
										,{id:"KN", name:"SAINT KITTS AND NEVIS"}
										,{id:"LC", name:"SAINT LUCIA"}
										,{id:"MF", name:"SAINT MARTIN"}
										,{id:"PM", name:"SAINT PIERRE AND MIQUELON"}
										,{id:"VC", name:"SAINT VINCENT AND THE GRENADINES"}
										,{id:"WS", name:"SAMOA"}
										,{id:"SM", name:"SAN MARINO"}
										,{id:"ST", name:"SAO TOME AND PRINCIPE"}
										,{id:"SA", name:"SAUDI ARABIA"}
										,{id:"SN", name:"SENEGAL"}
										,{id:"RS", name:"SERBIA"}
										,{id:"SC", name:"SEYCHELLES"}
										,{id:"SL", name:"SIERRA LEONE"}
										,{id:"SG", name:"SINGAPORE"}
										,{id:"SK", name:"SLOVAKIA"}
										,{id:"SI", name:"SLOVENIA"}
										,{id:"SB", name:"SOLOMON ISLANDS"}
										,{id:"SO", name:"SOMALIA"}
										,{id:"ZA", name:"SOUTH AFRICA"}
										,{id:"GS", name:"SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS"}
										,{id:"ES", name:"SPAIN"}
										,{id:"LK", name:"SRI LANKA"}
										,{id:"SD", name:"SUDAN"}
										,{id:"SR", name:"SURINAME"}
										,{id:"SJ", name:"SVALBARD AND JAN MAYEN"}
										,{id:"SZ", name:"SWAZILAND"}
										,{id:"SE", name:"SWEDEN"}
										,{id:"CH", name:"SWITZERLAND"}
										,{id:"SY", name:"SYRIAN ARAB REPUBLIC"}
										,{id:"TW", name:"TAIWAN  PROVINCE OF CHINA"}
										,{id:"TJ", name:"TAJIKISTAN"}
										,{id:"TZ", name:"TANZANIA  UNITED REPUBLIC OF"}
										,{id:"TH", name:"THAILAND"}
										,{id:"TL", name:"TIMOR-LESTE"}
										,{id:"TG", name:"TOGO"}
										,{id:"TK", name:"TOKELAU"}
										,{id:"TO", name:"TONGA"}
										,{id:"TT", name:"TRINIDAD AND TOBAGO"}
										,{id:"TN", name:"TUNISIA"}
										,{id:"TR", name:"TURKEY"}
										,{id:"TM", name:"TURKMENISTAN"}
										,{id:"TC", name:"TURKS AND CAICOS ISLANDS"}
										,{id:"TV", name:"TUVALU"}
										,{id:"UG", name:"UGANDA"}
										,{id:"UA", name:"UKRAINE"}
										,{id:"AE", name:"UNITED ARAB EMIRATES"}
										,{id:"GB", name:"UNITED KINGDOM"}
										,{id:"US", name:"UNITED STATES"}
										,{id:"UM", name:"UNITED STATES MINOR OUTLYING ISLANDS"}
										,{id:"UY", name:"URUGUAY"}
										,{id:"UZ", name:"UZBEKISTAN"}
										,{id:"VU", name:"VANUATU"}
										,{id:"se", name:"VATICAN CITY STATEe HOLY SEE"}
										,{id:"VE", name:"VENEZUELA  BOLIVARIAN REPUBLIC OF"}
										,{id:"VN", name:"VIET NAM"}
										,{id:"VG", name:"VIRGIN ISLANDS  BRITISH"}
										,{id:"VI", name:"VIRGIN ISLANDS  U.S."}
										,{id:"WF", name:"WALLIS AND FUTUNA"}
										,{id:"EH", name:"WESTERN SAHARA"}
										,{id:"YE", name:"YEMEN"}
										,{id:"ZM", name:"ZAMBIA"}
										,{id:"ZW", name:"ZIMBABWE"}
									] //data
								}) //datasource
						     ,label	: "Land"
						     }); //dropdownlist
}	
