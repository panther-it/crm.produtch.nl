<? require_once(__DIR__ . "/webparts/header.php") ?>
<div id="logo"></div>
  <p>
        <a href=""                 target="mainFrame"
           onClick="parent.frames[1].location.reload(); return false;">Reload</a>     
      | <a href="login.php?logout" target="_top"     >Logout</a>
      | <?= $auth->contact->firstname . " " . $auth->contact->lastname . " - " . $auth->customer->name ?><br/>
  </p>

<div id="result" class="Logging"></div>
<div id="navigate" class="Panel">
  
  <select id="workspace">
    <option value="administration">Administration</option>
    <option value="hosting">Hosting</option>
    <option value="datacenter">DataCenter</option>
    <option value="office">Office</option>
    <option value="shop">Shop</option>
    <option value="misc">Misc</option>
  </select>

  <form id="frmSearch" class="TreeSearch" method="get">
    <input type="text"   id="search_txt" name="keyword" value="Search"   />
  </form>

  <ul id="tree_administration" class="Tree">
    <li><a class="Leaflabel customers"     >Customers          </a><ul id="value" class="Tree customers"         ></ul></li>
    <li><a class="Leaflabel orders"        >Orders             </a><ul id="value" class="Tree orders"            ></ul></li>
    <li><a class="Leaflabel invoices"      >Invoices           </a><ul id="value" class="Tree invoices"          ></ul></li>
    <li><a class="Leaflabel authorizations">Authorizations     </a><ul id="value" class="Tree authorizations"    ></ul></li>
  </ul>
  
  <ul id="tree_hosting"        class="Tree">
    <li><a class="Leaflabel domains"       >Domains            </a><ul id="value" class="Tree domains"           ></ul></li>
    <li><a class="Leaflabel websites"      >Websites           </a><ul id="value" class="Tree websites"          ></ul></li>
    <li><a class="Leaflabel nameservers"   >Nameservers        </a><ul id="value" class="Tree nameservers"       ></ul></li>
    <li><a class="Leaflabel emails"        >Email              </a><ul id="value" class="Tree emails"            ></ul></li>
  </ul>
  
  <ul id="tree_datacenter"     class="Tree">
    <li><a class="Leaflabel datacenters"   >DataCenters        </a><ul id="value" class="Tree datacenters"       ></ul></li>
    <li><a class="Leaflabel devices"       >Devices            </a><ul id="value" class="Tree devices"           ></ul></li>
    <li><a class="Leaflabel coloaccesses"  >Colo Access        </a><ul id="value" class="Tree coloaccesses"      ></ul></li>
    <li><a class="Leaflabel accessdevices" >Access Cards       </a><ul id="value" class="Tree accessdevices"     ></ul></li>
    <li><a class="Leaflabel coloaccess"    >Request Colo Access</a><ul id="value" class="Tree coloaccess"        ></ul></li>
  </ul>
  
  <ul id="tree_office"         class="Tree">
    <li><a class="Leaflabel tasks"         >Tasks              </a><ul id="value" class="Tree tasks"             ></ul></li>
  </ul>
  
  <ul id="tree_shop"           class="Tree">
    <li id="GROUP"  ><a class="Leaflabel productgroups" >Groups             </a><ul id="type" class="Tree productgroups"     ></ul></li>  
    <li id="PRODUCT"><a class="Leaflabel products"      >Products           </a><ul id="type" class="Tree products"          ></ul></li>  
    <li id="FEATURE"><a class="Leaflabel products"      >Feature            </a><ul id="type" class="Tree products"          ></ul></li>  
    <li id="VALUE"  ><a class="Leaflabel products"      >Value              </a><ul id="type" class="Tree products"          ></ul></li>  
  </ul>
  
  <ul id="tree_misc"           class="Tree">
  </ul>

</div>
