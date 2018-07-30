//<!--
// \include\js\frame_buster.js 
<!--
ebayBustFrames();

// \include\lib\_global\_biz\_base\base.js 

function EbayBizObject(pName)
{if(!this.objType)
this.objType="EbayBizObject";this.name=pName;this.createError=ebObjectCreateErrorWrapper;this.throwDebug=ebObjectThrowDebugWrapper;this.throwWarning=ebObjectThrowWarningWrapper;this.throwError=ebObjectThrowErrorWrapper;}

// \include\lib\_global\_biz\_ex\client_server.js 

function EbayClientServer()
{if(!this.objType)
this.objType="EbayClientServer";this.base=EbayBizObject;this.base("client_server");this.callDynamicScriptObject=ebClientServerCallDynamicScriptObject;this.callIframe=ebClientServerCallIframe;}
function ebClientServerCallDynamicScriptObject(pUrl)
{var oDoc=ebay.oDocument;if(!oDoc.createElement||!pUrl)
return;var oScript=oDoc.createElement("script");oScript.type='text/javascript';oScript.src=pUrl;var oFrag=document.getElementsByTagName("head")||document.getElementsByTagName("body");oFrag[0].appendChild(oScript);}
function ebClientServerCallIframe(pUrl)
{var oFrm=null,doc;var oDoc=ebay.oDocument;if(!oDoc.createElement||!pUrl)
return;var scriptstr='<scr'+'ipt src="'+pUrl+'" type="text/javascript"></scr'+'ipt>';oFrm=oDoc.createElement('iframe');oFrm.height=1;oFrm.width=1;oFrm.style.display='none';document.body.appendChild(oFrm);doc=oFrm.document||oFrm.contentDocument;doc.open();doc.write('<html><head></head><body>'+scriptstr+'</body></html>');doc.close();}
if(typeof(ebay)!="undefined")
ebay.oClientServer=new EbayClientServer();

// \include\lib\_global\_ui\_base\anchor.js 

function EbayHTMLAnchor(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLAnchor";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.getElem=ebHTMLAnchorGetElem;this.enableBase=this.enable;this.enable=ebHTMLAnchorEnable;this.subscribeEvents("onclick");}
function ebHTMLAnchorGetElem(pName)
{var d=this.oDocument.doc,l=null,len=null;l=d.links[pName];if(l)return l;if(d.getElementById)
l=d.getElementById(pName);if(l)return l;if(d.all)
l=d.all[pName];if(l)return l;if(d.layers)
{var lyrs=d.layers;len=lyrs.length;for(var i=0;i<len;i++)
{l=this.getElem(lyrs[i].document,pName);if(l)
return l;}}
len=d.links.length;for(var j=0;j<len;j++)
{l=d.links[j];if(typeof(l.name)=="undefined")
{if(l.onclick)
{var oc=l.onclick.toString();if(oc.indexOf("{#"+pName+"#}")!=-1)
return l;}}
else
{if(l.name==pName)
return l;}
l=null;}
return l;}
function ebHTMLAnchorEnable(pEnable)
{var cur=(pEnable)?"hand":"default";var el=this.eElem;if(el&&el.style)
{el.style.cursor=cur;el.style.color=pEnable?"":"gray";}
this.enableBase(pEnable);}
function setEbayLink(pS)
{return true;}

// \include\lib\_global\_ui\_base\layer.js 

function EbayHTMLLayer(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLLayer";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.aBindEvents=new Array;this.getElem=ebHTMLLayerGetElem;this.getValue=ebHTMLLayerGetValue;this.setValue=ebHTMLLayerSetValue;}
function ebHTMLLayerGetElem(pName)
{var s=pName,d=this.oDocument.doc;if(d.getElementById)
return d.getElementById(s);else if(d.all)
return d.all(s);this.throwWarning("Not supported","getElem");}
function ebHTMLLayerGetValue(pIsText)
{if(this.eElem)
{if(pIsText)
{if(this.oDocument.oGlobals.oClient.bFirefox)
return this.eElem.textContent;else
return this.eElem.innerText;}
else
return this.eElem.innerHTML;}
else
return"";}
function ebHTMLLayerSetValue(pVal,pIsText)
{if(this.eElem)
{if(pIsText)
{if(this.oDocument.oGlobals.oClient.bFirefox)
this.eElem.textContent=pVal;else
this.eElem.innerText=pVal;}
else
this.eElem.innerHTML=pVal;}}

// \include\lib\_global\_ui\_base\form.js 

function EbayHTMLForm(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHTMLForm";this.base=EbayHTML;this.base(pParent,pName,pName,false,pCfg);this.getElem=function(){return this.getDocElem(arguments[0],'forms');};this.enable=function(){};this.getElementValue=ebHTMLFormGetElementValue;this.setElementValue=ebHTMLFormSetElementValue;this.getElements=ebHTMLFormGetElements;this.getElement=ebHTMLFormGetElement;this.setAction=ebHTMLFormSetAction;this.getAction=ebHTMLFormGetAction;this.setTarget=ebHTMLFormSetTarget;this.getTarget=ebHTMLFormGetTarget;this.submit=ebHTMLFormSubmit;this.clear=ebHTMLFormClear;this.subscribeEvents("onsubmit");this.onBeforeSubmit=null;this.onAfterSubmit=null;}
function ebHTMLFormGetElements()
{var e=this.eElem;return e?e.elements:new Array;}
function ebHTMLFormGetElement(pName)
{var elems=this.getElements();return elems[pName]?elems[pName]:null;}
function ebHTMLFormGetElementValue(pName)
{var elems=this.getElements();if(elems[pName]&&elems[pName].value)
return elems[pName].value;return"";}
function ebHTMLFormSetElementValue(pName,pValue)
{var elems=this.getElements(),elem=elems[pName];if(elem)
{if(elem.length)
{for(var i=0,len=elem.length;i<len;i++)
elem[i].value=pValue;}
else
elem.value=pValue;}}
function ebHTMLFormSetAction(pAction)
{var e=this.eElem;if(e)
e.action=pAction;}
function ebHTMLFormGetAction()
{var e=this.eElem;if(e)
return e.action;}
function ebHTMLFormSetTarget(pTarget)
{var e=this.eElem;if(e)
e.target=pTarget;}
function ebHTMLFormGetTarget()
{var e=this.eElem;if(e)
return e.target;}
function ebHTMLFormSubmit()
{if(this.onBeforeSubmit)
this.onBeforeSubmit();var e=this.eElem;if(e)
{e.submit();if(this.onAfterSubmit)
this.onAfterSubmit();}
else
this.throwError("Element '"+this.sElemName+"' does not exist on the page","submit");}
function ebHTMLFormClear()
{var elems=this.getElements(),len=elems.length;for(i=0;i<len;i++)
{var elem=elems[i];var type=elem.type;switch(type)
{case"text":case"textarea":elem.value="";break;case"checkbox":elem.checked=false;break;case"select-one":elem.selectedIndex=0;}}}

// \include\lib\_global\_ui\_base\text.js 

function EbayHTMLText(pParent,pName,pDisabled,pCfg,bHidden)
{if(!this.objType)
this.objType="EbayHTMLText";this.base=EbayHTMLFormElem;this.base(pParent,pName,pDisabled,pCfg);this.value=ebHTMLTextValue;this.getValue=ebHTMLTextGetValue;this.setValue=ebHTMLTextSetValue;this.select=ebHTMLTextSelect;this.enableBase=this.enable;this.enable=ebHTMLTextEnable;if(bHidden!=true)
this.subscribeEvents("onchange","onblur","onfocus","onkeydown","onkeyup");}
function ebHTMLTextValue(pVal)
{var e=this.eElem;if(e)
{if(typeof(pVal)=="undefined")
return e.value;else
e.value=pVal;}}
function ebHTMLTextGetValue()
{return this.value();}
function ebHTMLTextSetValue(pVal)
{return this.value(pVal);}
function ebHTMLTextSelect()
{var e=this.eElem;if(e)
e.select();}
function ebHTMLTextEnable(pEnable)
{this.enableBase(pEnable);this.setStyle('backgroundColor',!pEnable?'#ccc':'#fff');}

// \include\lib\_global\_ui\_base\button.js 

function EbayHTMLButton(pParent,pElemName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLButton";this.base=EbayHTMLFormElem;this.base(pParent,pElemName,pDisabled,pCfg);this.getValue=ebHTMLButtonGetValue;this.setValue=ebHTMLButtonSetValue;this.enableBase=this.enable
this.enable=ebHTMLButtonEnable;this.subscribeEvents("onclick");}
function ebHTMLButtonGetValue()
{return this.eElem.value;}
function ebHTMLButtonSetValue(pValue)
{var e=this.eElem;if(e)
e.value=pValue;}
function ebHTMLButtonEnable(pEnable,pYukonize)
{if(typeof(pYukonize)!=='undefined'&&pYukonize)
{var e=this.eElem;e.style.opacity=!pEnable?".5":"";e.style.filter=!pEnable?"alpha(opacity=50)":"";this.bBtnDisabled=!pEnable;}
else
this.enableBase(pEnable);}

// \include\lib\_global\_ui\_ex\menu_popup.js 

function EbayMenuPopup(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayMenuPopup";if(typeof pCfg=='undefined')
pCfg=new EBayMenuPopupConfig('default_menupopup_cfg');this.base=EbayHTML;this.base(pParent,pName,pCfg.sPopupMenuDivId,pDisabled,pCfg);this.BOTTOM_RIGHT='bottom_right';this.BOTTOM_LEFT='bottom_left';this.TOP_RIGHT='top_right';this.TOP_LEFT='top_left';this.menuItems=new Array;this.xMousePos=0;this.yMousePos=0;this.xMousePosMax=0;this.yMousePosMax=0;this.getElem=function()
{var doc=this.oDocument.doc;if(doc.all)
return doc.all(this.sElemName);else if(doc.getElementById)
return doc.getElementById(this.sElemName);else
return false;}
this.display=function()
{var c=this.oConfig;var sItemStyle='font-size: '+c.sItemFontSize+'; background-color: '+c.sItemBgColor+'; width: '+c.iWidth+'px';var sHtml='<table border="0" cellpadding="0" cellspacing="0" style="background-color: '+c.sBgColor+';">'+'<tr><td align="center" valign="middle"><table>';for(var i=0,len=this.menuItems.length;i<len;i++)
{sHtml+='<tr><td style="'+sItemStyle+';"';if(i>0)
sHtml+=' colspan="2">';else
sHtml+='>';sHtml+=this.menuItems[i];sHtml+='</td>';if(i==0)
sHtml+='<td><img src="'+this.oConfig.sCloseBtnUrl+'" align="absmiddle" border="0" onclick="ebay.oDocument._getControl(\''+this.name+'\')._exec(\'hide\');"/></td>';sHtml+='</tr>';}
sHtml+='</table></td></tr></table>';if(document.all){var left=event.clientX+document.body.scrollLeft+10;var top=event.clientY+document.body.scrollTop-10;}
else if(document.getElementById){var oParentElem=document.getElementById(this.parent.name);var left=oParentElem.offsetLeft+oParentElem.offsetWidth;var top=oParentElem.offsetTop;while(oParentElem.offsetParent){oParentElem=oParentElem.offsetParent;left+=oParentElem.offsetLeft;top+=oParentElem.offsetTop;}}
var sDisplay=c.sDisplayPosition;if(sDisplay==this.BOTTOM_RIGHT)
this.displayBottomRight(sHtml,left,top);else if(sDisplay==this.TOP_RIGHT)
this.displayTopRight(sHtml,left,top);else if(sDisplay==this.TOP_LEFT)
this.displayTopLeft(sHtml,left,top);else
this.displayBottomLeft(sHtml,left,top);this.timeoutMenuPopup();}
this.hide=function()
{var elem=this.getElem();if(elem)
elem.style.display='none';}
this.addItem=function(strItemValue)
{this.menuItems[this.menuItems.length]=strItemValue;}
this.timeoutMenuPopup=function()
{var elem=this.getElem();var boxX=parseFloat(elem.offsetLeft);var boxY=parseFloat(elem.offsetTop);var boxW=parseFloat(elem.offsetWidth);var boxH=parseFloat(elem.offsetHeight);if(xMousePos>boxX&&xMousePos<(boxX+boxW)&&yMousePos>boxY&&yMousePos<(boxY+boxH))
setTimeout('ebay.oDocument._getControl("'+this.name+'")._exec("timeoutMenuPopup");',1000);else
this.hide();}
this.displayBottomLeft=function(sHtml,left,top)
{var oElem=this.getElem();oElem.innerHTML=sHtml;oElem.style.left=(left-this.oConfig.iWidth)+'px';oElem.style.top=top+'px';oElem.style.display="block";}
this.displayBottomRight=function(sHtml,left,top)
{var oElem=this.getElem();oElem.innerHTML=sHtml;oElem.style.display="block";}
this.displayTopRight=function(sHtml,left,top)
{}
this.displayTopLeft=function(sHtml,left,top)
{}
this.initMenuDiv=function()
{var oElem=this.getElem();var c=this.oConfig;oElem.style.backgroundcolor=c.sBgColor;oElem.style.width=c.iWidth+'px';oElem.style.border=c.iBorderWidth+'px '+c.sBorderStyle+' '+c.sBorderColor;oElem.style.display=c.sDisplay;oElem.style.position=c.sPosition;}
this.initMenuDiv();var tmpOnMouseMoveEvt=document.onmousemove;function onAfterMouseMove(event)
{var e=event||window.event;if(document.layers){xMousePos=e.pageX;yMousePos=e.pageY;xMousePosMax=window.innerWidth+window.pageXOffset;yMousePosMax=window.innerHeight+window.pageYOffset;}else if(document.all){xMousePos=window.event.clientX+document.body.scrollLeft;yMousePos=window.event.clientY+document.body.scrollTop;xMousePosMax=document.body.clientWidth+document.body.scrollLeft;yMousePosMax=document.body.clientHeight+document.body.scrollTop;}else if(document.getElementById){xMousePos=e.pageX;yMousePos=e.pageY;xMousePosMax=window.innerWidth+window.pageXOffset;yMousePosMax=window.innerHeight+window.pageYOffset;}
if(tmpOnMouseMoveEvt)
tmpOnMouseMoveEvt();}
if(document.all)
document.onmousemove=onAfterMouseMove;else
{window.captureEvents(Event.MOUSEMOVE);window.onmousemove=onAfterMouseMove}}
function EBayMenuPopupConfig(name)
{if(!this.objType)
this.objType="EBayMenuPopupConfig";this.base=EbayConfig;this.base(name);this.sCloseBtnUrl='https://securepics.ebaystatic.com/aw/pics/myebay/btnMnuCls_13x12.gif';this.sBgColor='#ffffff';this.iWidth=150;this.iBorderWidth='1';this.sBorderStyle='solid';this.sBorderColor='#cccccc';this.sDisplay='none';this.sPosition='absolute';this.aPopupMenus=new Array;this.sPopupMenuDivId='';this.sDisplayPosition='bottom_left';this.sItemFontSize='x-small';this.sItemBgColor='#e2e7fe';}

// \include\lib\_global\_v2\utils\_base\positioning.js 

function EbayUtilsPositioning(pParent,pName)
{if(!this.objType)
this.objType="EbayUtilsPositioning";this.base=EbayObject;this.base(pParent,pName);this.getScrollLeftTop=function()
{var d=this.oDocument.doc,rv=[0,0],db=d.body,de=d.documentElement;if(db)
{rv[0]+=db.scrollLeft;rv[1]+=db.scrollTop;}
if(de)
{rv[0]+=de.scrollLeft;rv[1]+=de.scrollTop;}
return rv;}
this.getClientWidthHeight=function()
{var d=this.oDocument.doc,de=d.documentElement?d.documentElement:d.body;return[de.clientWidth,de.clientHeight];}
this.getOffsetLeftTop=function(pElem)
{var e=pElem,rv=[0,0];while(e)
{rv[0]+=e.offsetLeft;rv[1]+=e.offsetTop;e=e.offsetParent;}
return rv;}
this.getEventLeftTop=function(pEvent)
{var evt=this.parent.parent.oDocument.win.event||pEvent,xOff=(typeof(screenLeft)!="undefined")?screenLeft:screenX,yOff=(typeof(screenTop)!="undefined")?screenTop:(screenY+(outerHeight-innerHeight)-25);return[evt.screenX-xOff,evt.screenY-yOff];}
this.getPageSize=function()
{var x,y,oD=this.parent.parent.oDocument,win=oD.win,doc=oD.doc,bd=doc.body;if(win.innerHeight&&win.scrollMaxY)
{x=bd.scrollWidth;y=win.innerHeight+win.scrollMaxY;}
else if(doc.documentElement)
{x=doc.documentElement.scrollWidth;y=doc.documentElement.scrollHeight;}
else if(bd.scrollHeight>bd.offsetHeight)
{x=bd.scrollWidth;y=bd.scrollHeight;}
else
{x=bd.offsetWidth;y=bd.offsetHeight;}
return[x,y];}}
ebay.oUtils.oPositioning=new EbayUtilsPositioning(ebay.oUtils,"Positioning Functions");

// \include\lib\_global\_v2\utils\_base\browser_window_size.js 

ebay.oGlobals.oClient.getBrowserWindowHeight=function()
{var s=self,d=ebay.oDocument.doc,de=d.documentElement;if(s.innerHeight)
{return s.innerHeight;}
else if(de&&de.clientHeight)
{return de.clientHeight;}
return d.body.clientHeight;}
ebay.oGlobals.oClient.getBrowserWindowWidth=function()
{var s=self,d=ebay.oDocument.doc,de=d.documentElement;if(s.innerWidth)
{return s.innerWidth;}
else if(de&&de.clientWidth)
{return de.clientWidth;}
return d.body.clientWidth;}
ebay.oGlobals.oClient.getScrollWidth=function()
{var d=ebay.oDocument.doc,de=d.documentElement;if(de&&de.scrollWidth)return de.scrollWidth;return d.body.scrollWidth;}
ebay.oGlobals.oClient.getScrollHeight=function()
{var d=ebay.oDocument.doc,de=d.documentElement;if(de&&de.scrollHeight)return de.scrollHeight;return d.body.scrollHeight;}
ebay.oGlobals.oClient.getScrollLeft=function()
{var s=self,d=ebay.oDocument.doc,de=d.documentElement;if(s.layers)return s.pageXOffset;if(de&&de.scrollLeft)return de.scrollLeft;return d.body.scrollLeft;}
ebay.oGlobals.oClient.getScrollTop=function()
{var s=self,d=ebay.oDocument.doc,de=d.documentElement;if(s.layers)return s.pageYOffset;if(de&&de.scrollTop)return de.scrollTop;return d.body.scrollTop;}

// \include\lib\_global\_ui\_base\frame.js 

function EbayHTMLFrame(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHTMLFrame";this.base=EbayHTML;this.base(pParent,pName,pName,false,pCfg);this.eFrameElem=null;this.getElem=ebHTMLFrameGetElem;this.bindHTML=ebHTMLFrameBindHTML;this.bindEvents=this.enable=function(){};this.setSource=ebHTMLFrameSetSource;this.cleanupMemoryBase=this.cleanupMemory;this.cleanupMemory=ebHTMLFrameCleanupMemory;this.resize=ebHTMLFrameResize;this.onBeforeResize=this.onAfterResize=null;}
function ebHTMLFrameGetElem(pName)
{with(this)
{var f=null,oD=oDocument;var d=oD.doc,w=oD.win;if(w.frames)
f=eFrameElem=w.frames[pName];if(d.getElementById)
f=d.getElementById(pName);return f;}}
function ebHTMLFrameBindHTML()
{with(this)
{eElem=getElem(sElemName);if(eElem)
assignJSObject(eElem);}}
function ebHTMLFrameCleanupMemory()
{this.cleanupMemoryBase();this.eFrameElem=null;}
function ebHTMLFrameSetSource(pURL)
{if(pURL==null||pURL.trim()==''){return;}
with(this)
{oDocument.setGlobalParent(this);if(pURL.has("ej2child=true"))
pURL+="&ej2parent="+name;if(eFrameElem&&eFrameElem.location)
eFrameElem.location.replace(pURL);else if(eElem)
eElem.src=pURL;}}
function ebHTMLFrameResize(pMaxWidth)
{with(this)
{if(onBeforeResize)
onBeforeResize();var f=eFrameElem;if(!f||!(f.document||f.contentDocument))
f=getElem(sElemName);if(f&&typeof(f.document)!="unknown")
{var oDoc=f.document?f.document:f.contentDocument,db=oDoc.body,es=eElem.style,c=this.parent.oGlobals.oClient,w="100%",h=db.offsetHeight,oh;if(c.bSafari)
{oh=db.offsetHeight;w=oDoc.width;h=ebay.oDocument.doc.doctype!=null?oDoc.height+15:oDoc.height+1;}
else if(c.bFirefox)
{w=oDoc.width;h=oDoc.height}
else if(c.bWin||c.bOpera)
{w=db.scrollWidth;h=c.bNav&&ebay.oDocument.doc.doctype!=null?db.scrollHeight+30:db.scrollHeight;}
if(pMaxWidth&&c.bFirefox)
w="100%";if(this.oConfig)
{w=this.oConfig.iWidth||w;h=this.oConfig.iHeight||h;}
es.width=(w=="100%")?w:w+"px";es.height=h+"px";if(onAfterResize)
onAfterResize();}}}

// \include\lib\_global\_ui\_ex\overlay\base.js 

function EbayHTMLOverlay(pParent,pName,pCfg,pDisabled)
{if(!this.objType)
this.objType="EbayHTMLOverlay";this.base=EbayHTMLLayer;this.base(pParent,pName,pDisabled,pCfg);this.isSupported=ebIsBrowserSupported;if(!this.isSupported())
return;this.sPosStyle=pCfg.posStyle||'absolute';this.sTop=pCfg.top;this.iTopPadding=0;this.iLeftPadding=0;this.sLeft=pCfg.left;this.sWidth=pCfg.width?parseInt(pCfg.width):0;this.sHeight=pCfg.height?parseInt(pCfg.height):0;this.sLayerHTML=pCfg.layerHTML||"";this.sContentDiv=pCfg.contentDiv||"";this.bForceReposition=pCfg.bForceReposition||false;this.bNoSetContent=pCfg.bNoSetContent;this.bClearValueOnClose=typeof(pCfg.bClearValueOnClose)!='undefined'?pCfg.bClearValueOnClose:true;this.bCustomHTML=pCfg.customHTML||false;this.bTransparent=pCfg.transparent||false;this.setPosition=ebHTMLOverlaySetPosition;this.centerTop=ebHTMLOverlayCenterTop;this.centerLeft=ebHTMLOverlayCenterLeft;this.setContent=ebHTMLOverlaySetContent;this.closeOverlay=this.close=ebHTMLOverlayCloseOverlay;this.display=ebHTMLOverlayDisplay;}
function ebHTMLOverlayDisplay(pContent)
{with(this)
{if(!eElem)
bind();if(!bNoSetContent)
setContent(pContent);setPosition();show(true);if(this.oConfig.bOnFocus&&(!(oGlobals.oClient.bIE&&oGlobals.oClient.iVer<7)))
{var sFirstInsElem="sFirstInsElem";var oFirstEle=this.eElem.firstChild;if(oFirstEle.id!=sFirstInsElem)
{var anchorTag=document.createElement('a');anchorTag.href="javascript:void(0);";anchorTag.id=sFirstInsElem;anchorTag.style.outline="0px solid #FFFFFF";anchorTag.style.position="absolute";anchorTag.style.left="-10000em";anchorTag.style.opacity=0;anchorTag.style.width="1px";anchorTag.style.height="1px";var sLyrName=this.oConfig.sStartLyrName;if(sLyrName)
anchorTag.innerHTML="<b class='g-hdn'>"+sLyrName+"</b>";try{this.eElem.setAttribute('role','dialog');anchorTag.setAttribute('aria-ignore','true');}catch(e){}
this.eElem.insertBefore(anchorTag,oFirstEle);anchorTag.focus();}
else
oFirstEle.focus(true);}}}
function ebHTMLOverlaySetPosition()
{with(this)
{if(sPosStyle.is('absolute'))
{if(!sTop||bForceReposition)
centerTop();if(!sLeft||bForceReposition)
centerLeft();top(sTop);left(sLeft);}}}
function ebHTMLOverlayCenterTop()
{with(this)
{var oD=oDocument,winHeight=oD.doc.body.clientHeight,cL=oGlobals.oClient;if(!cL.bIE)
winHeight=oD.win.innerHeight;else if(typeof(winHeight)=='undefined'&&cL.iVer>=6)
winHeight=oD.doc.documentElement.clientHeight;var s=(winHeight-sHeight)/2;if(document.documentElement)
s+=document.documentElement.scrollTop;sTop=(parseInt(s)+iTopPadding)+'px';return s;}}
function ebHTMLOverlayCenterLeft()
{with(this)
{var winWidth=document.body.clientWidth,cL=oGlobals.oClient;if(!cL.bIE)
winWidth=window.innerWidth;var s=winWidth/2-sWidth/2;sLeft=(parseInt(s)+iLeftPadding)+'px';return s;}}
function ebHTMLOverlaySetContent(pContent)
{with(this)
{if(sContentDiv!='')
{var oL=new EbayHTMLLayer(this,sContentDiv);oL.bind();oL.setValue(pContent);}
else
setValue(pContent);}}
function ebHTMLOverlayCloseOverlay()
{with(this)
{if(bClearValueOnClose)
{var cts=this.controls;if(sContentDiv!=''&&cts[sContentDiv])
{cts[sContentDiv].setValue('&nbsp;');}
else
{setValue('&nbsp;');if(this.oConfig.bOnFocus&&this.oSelectedElem)
{ele=this.controls[this.oSelectedElem.name];if(ele)
ele.focus(true);}}}
show();if(!this.oGlobals.oClient.bFirefox)
cleanupMemory();}}
function ebIsBrowserSupported()
{return true;}

// \include\lib\_global\_ui\_ex\overlay\url.js 

function EbayHTMLOverlayUrl(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHTMLOverlayUrl";this.base=EbayHTMLOverlay;this.base(pParent,pName,pCfg);if(!this.isSupported())
return null;this.sUrl=pCfg.url||null;this.sIframeName='if_'+pName;this.sIframeTitle=pCfg.sIframeTitle||null;this.sLayerUI=pCfg.layerHTML;this.bAutoResize=pCfg.autoResize;this.bCloseLink=pCfg.defCloseLink;this.bDowngradeDomain=true;this.bTransparent=pCfg.bTransparent;this.displayBase=this.display;this.display=ebHTMLOverlayUrlDisplay;this.hide=this.closeOverlay;this.closeOverlayBase=this.closeOverlay;this.closeOverlay=ebHTMLOverlayUrlCloseOverlay;this.closeLayerUI=ebHTMLOverlayUrlCloseLayer;this.setCloseLayer=ebHTMLOverlayUrlSetCloseLayer;this.getIFUrl=ebHTMLOverlayUrlGetIFUrl;this.setDowngrade=ebHTMLOverlayUrlSetDowngradeDomain;this.onAfterFrameLoad=ebHTMLOverlayUrlAfterFrameLoad;}
function ebHTMLOverlayUrlDisplay()
{with(this)
{if(!sUrl)
return;var s=getIFUrl();if(oGlobals.oEnvironment.sThisPageRaw==sUrl)
return;if(bCloseLink)
s+=setCloseLayer();displayBase(s);new EbayHTMLFrame(this,sIframeName);}}
function ebHTMLOverlayUrlSetCloseLayer()
{with(this)
{sLayerHTML=closeLayerUI()+sLayerUI;var a=new EbayHTMLAnchor(this,'close');a._registerEvent("onclick","this.parent.hide();return false;");}}
function ebHTMLOverlayUrlCloseLayer()
{var s='';var stl='border-collapse:collapse; border-width:2px 2px 0px 2px; background-color:#EEEEEE;border-style:outset;';with(this)
{var pd=oGlobals.oEnvironment.sPicsDir,img=pd+'icon/iconClose_20x20.gif',w=parseInt(sWidth)+4;s+='<table id="tblClose" width="'+w+'" cellspacing="0" cellpadding="4"';s+='style="'+stl+'">';s+='<tr><td align="right"><a href="#" name="close"><img src="'+img+'" border="0"></a>';s+='</td></tr></table>';}
return s;}
function ebHTMLOverlayUrlGetIFUrl()
{var s='';with(this)
{sUrl=setDowngrade(sUrl);if(sUrl.has("ej2child=true"))
{sUrl+="&ej2parent="+this.name;oDocument.setGlobalParent(this);}
s+='<iframe frameborder="no" border="0" marginwidth="0" marginheight="0"';s+=oConfig.bScrolling?' scrolling="auto"':' scrolling="no"';s+=' id="'+sIframeName+'" title="'+sIframeTitle+'" name="'+sIframeName+'"';s+=' src="'+sUrl+'"';s+=' width="'+sWidth+'" height="'+sHeight+'"';if(oConfig.sIframeClass)
s+=' class="'+oConfig.sIframeClass+'"';if(bTransparent)
s+=' allowtransparency="true"';s+='></iframe>';}
return s;}
function ebHTMLOverlayUrlSetDowngradeDomain(pUrl)
{if(!pUrl.has('downgradeDomain=true')&&this.bDowngradeDomain==true)
{pUrl+=!pUrl.has('?')?'?':'&';pUrl+='downgradeDomain=true';}
return pUrl;}
function ebHTMLOverlayUrlAfterFrameLoad()
{with(this)
{var ifObj=controls[sIframeName];if(!ifObj.eElem)ifObj.bind();if(bAutoResize)
ifObj.resize();if(bCloseLink)
{var e=oDocument.doc.getElementById('tblClose');ifObj.width(parseInt(e.style.width)+4);}}}
function ebHTMLOverlayUrlCloseOverlay()
{with(this)
{var ifObj=controls[sIframeName],cl=oGlobals.oClient;ifObj.bind();if(!cl.bFirefox)
ifObj.setSource(oGlobals.oEnvironment.sPicsDir+'tbx/s.gif');ifObj.cleanupMemory();setTimeout(oUtils.controlPath(this)+'.closeOverlayBase()',100);}}

// \include\lib\_global\_ui\_base\image.js 

function EbayHTMLImage(pParent,pName,pDisabled,pSource,pDisabledSource,pCfg)
{if(!this.objType)
this.objType="EbayHTMLImage";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.sEnabledSource=this.sDisabledSource=pSource;if(pDisabledSource)
this.sDisabledSource=pDisabledSource;this.getElem=ebHTMLImageGetElem;this.source=ebHTMLImageSource;this.enableBase=this.enable;this.enable=ebHTMLImageEnable;this.subscribeEvents("onclick","onmouseover","onmouseout");}
function ebHTMLImageGetElem(pName)
{return this.getDocElem(pName,'images');}
function ebHTMLImageSource(pSrc,pText)
{var im=this.eElem;if(typeof(im)=='undefined')
return;if(typeof(pSrc)=="undefined")
return(im)?im.src:"";else
{im.src=pSrc;if(pText!=null)
im.alt=pText;}}
function ebHTMLImageEnable(pEnable)
{with(this)
{enableBase(pEnable);if(sDisabledSource&&eElem)
eElem.src=(pEnable)?sEnabledSource:sDisabledSource;}}

// \include\lib\_global\_ui\_ex\image_scalable.js 

function EbayHTMLImageScalable(pParent,pName,pDisabled,pSource,pDisabledSource,pCfg)
{if(!this.objType)
this.objType="EbayHTMLImageScalable";this.base=EbayHTMLImage;this.base(pParent,pName,pDisabled,pSource,pDisabledSource,pCfg);this.sSrc='';this.sText='';this.iWidth=null;this.iHeight=null;this.bDisableUpscale=false;if(pCfg)
{this.iWidth=pCfg.iWidth;this.iHeight=pCfg.iHeight;if(pCfg.bNoUpscale)
this.bDisableUpscale=true;}
this.oImage=null;this.iOriginalWidth=this.iOriginalHeight=0;if(this.oGlobals.oClient.bMac&&this.oGlobals.oClient.bIE)
this.oMacIECompatibilityImage=new EbayHTMLImage(this,pCfg.sMacIEImage);this.init=ebHTMLImageScalableInit;this.sourceBase=this.source;this.source=ebHTMLImageScalableSource;this.onSetSource=ebHTMLImageScalableOnSetSource;this.absTop=ebHTMLImageScalableAbsTop;this.absLeft=ebHTMLImageScalableAbsLeft;this.getPosition=ebHTMLImageScalableGetPosition;this.onAfterImageLoad=ebHTMLImageScalableOnAfterImageLoad;this.setOriginalDimensions=ebHTMLImageScalableSetOriginalDimensions;this.baseBind=this.bind;this.onBeforeUnload=ebHTMLImageScalableOnBeforeUnload;this.onImageLoadError=ebHTMLImageScalableOnImageLoadError;this.getScaleDimensions=ebHTMLImageScalableGetScaleDimensions;this._registerEvent("setSource","onSetSource");this._registerEvent("imageLoaded","onAfterImageLoad");this._registerEvent("imageLoadError","onImageLoadError");this._registerEvent("bind","ebHTMLImageScalableBind");this._registerEvent("scale","ebHTMLImageScalableScale");this._registerListener(this._getEvent("bind"),this.EVENT_AFTER,"init");this._registerListener(this.oDocument._getEvent("unload"),this.EVENT_BEFORE,"onBeforeUnload");}
function ebHTMLImageScalableInit()
{with(this)
{if(!iWidth&&this.eElem.width)
iWidth=this.eElem.width;if(!iHeight&&this.eElem.height)
iHeight=this.eElem.height;}}
function ebHTMLImageScalableSource(pSrc,pText)
{this._exec("setSource",pSrc,pText);}
function ebHTMLImageScalableOnSetSource(pEvent,pSrc,pText)
{with(this)
{sSrc=pSrc;sText=pText;oImage=new Image();oImage.parent=this;eval('oImage.onload = function(){ebay.oDocument.oPage._getControl("'+this.name+'")._exec("imageLoaded")};');eval('oImage.onerror = function(){ebay.oDocument.oPage._getControl("'+this.name+'")._exec("imageLoadError")};');oImage.src=sSrc;}}
function ebHTMLImageScalableScale(pEvent,pWidth,pHeight)
{with(this)
{var a=getScaleDimensions(pWidth,pHeight);eElem.width=a[0];eElem.height=a[1];}}
function ebHTMLImageScalableGetScaleDimensions(pWidth,pHeight)
{with(this)
{var a=[];if(!pWidth)
pWidth=iWidth;if(!pHeight)
pHeight=iHeight;var imgW=iOriginalWidth,imgH=iOriginalHeight;var rw=pWidth/imgW,rh=pHeight/imgH,ratio=(rw>rh)?rh:rw;if(bDisableUpscale&&ratio>1)
ratio=1;a[0]=imgW*ratio;a[1]=imgH*ratio;return a;}}
function ebHTMLImageScalableSetOriginalDimensions()
{with(this)
{var w,h;if(oImage)
{var oClient=oGlobals.oClient;if(oClient.bIE&&oClient.bMac)
{oMacIECompatibilityImage.source(sSrc);w=oMacIECompatibilityImage.eElem.width;h=oMacIECompatibilityImage.eElem.height;}
else
{w=oImage.width;h=oImage.height;}
iOriginalWidth=w;iOriginalHeight=h;}}}
function ebHTMLImageScalableOnAfterImageLoad()
{with(this)
{setOriginalDimensions();_exec("scale");sourceBase(sSrc,sText);}}
function ebHTMLImageScalableGetPosition(pName)
{var e=this.eElem;if(e)
{var offset=0,o=e;while(o.offsetParent)
{offset+=eval('o.offset'+pName);o=o.offsetParent;}
return offset;}}
function ebHTMLImageScalableAbsTop()
{return this.getPosition('Top');}
function ebHTMLImageScalableAbsLeft()
{return this.getPosition('Left');}
function ebHTMLImageScalableBind()
{this.baseBind();if(this.oGlobals.oClient.bMac&&this.oGlobals.oClient.bIE)
this.oMacIECompatibilityImage.bind();}
function ebHTMLImageScalableOnBeforeUnload()
{this.oImage=null;}
function ebHTMLImageScalableOnImageLoadError()
{with(this)
sourceBase(oImage.src,sText);}

// \include\lib\_global\_ui\_ex\overlay\content.js 

function EbayHTMLOverlayContent(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHTMLOverlayContent";this.base=EbayHTMLOverlay;this.base(pParent,pName,pCfg);if(!this.isSupported())
return null;this.bUseIfShim=pCfg.useIfShim||false;this.sContent=pCfg.contentHTML;this.sLayerUI=pCfg.layerHTML;this.iBorderWidth=pCfg.iBorderWidth||0;this.hide=this.closeOverlay;this.setIframeShim=ebHTMLOverlayContentSetIframeShim;this.displayBase=this.display;this.display=ebHTMLOverlayContentDisplay;this.closeBase=this.close;this.closeOverlay=this.close=ebHTMLOverlayContentClose;var cl=this.oGlobals.oClient;this.bUseIfShim=(pCfg.useIfShim&&(cl.bIE&&!cl.bMac));this.eIframeShim=null;this.setContentBase=this.setContent;this.setContent=ebHTMLOverlayContentSetContent;}
function ebHTMLOverlayContentDisplay(pContent)
{with(this)
{displayBase(sContent||pContent);if(bUseIfShim)
setIframeShim();}}
function ebHTMLOverlayContentSetIframeShim()
{with(this)
{if(eElem)
{var d=oDocument,isRel=sPosStyle=='relative',e=isRel?e.firstChild:eElem;var w=width(),h=height(),f=eIframeShim=d.createElement('IFRAME'),bw=iBorderWidth;with(f.style)
{position='absolute';top=isRel?'20px':(0-bw)+'px';left=isRel?'20px':(0-bw)+'px';zIndex='-1';width=(w+bw)+'px';height=(h+bw)+'px';}
f.frameBorder='0';f.title=' ';f.src=oGlobals.oEnvironment.sPicsDir+'s.gif';e.appendChild(f);}}}
function ebHTMLOverlayContentSetContent(pContent)
{this.sContent=pContent;this.setContentBase(pContent);}
function ebHTMLOverlayContentClose()
{with(this)
{if(bUseIfShim&&eIframeShim&&eElem)
eElem.removeChild(eIframeShim);closeBase();}}

// \include\lib\_global\features\help\bubble_help_onclick.js 

function EbayBubbleHelpOnClick(pParent,pName,pCfg,pInitialize)
{if(!this.objType)
this.objType="EbayBubbleHelpOnClick";this.base=EbayHTMLOverlayContent;this.base(pParent,pCfg.sLayerHTMLName,pCfg);this.oConfig=pCfg;this.aText=[];this.oSelectedElem=false;this.oTimer=null;this.sDefaultOverlayHTML="";this.iEventX=this.iEventY=null;this.iLocX=this.iLocY=null;this.bUseElemOffsetForPosition=true;this.bHasFocus=false;this.bLeft=pCfg.bLeft;this.sCloseBubbleLink=pCfg.sCloseBubbleLink;with(this)
_registerListener(oDocument._getEvent("load"),EVENT_AFTER,"onAfterLoad");this.init=function()
{with(this)
{var c=oConfig,en=c.aElemNames,len=en.length,e,i;for(i=0;i<len;i++)
{e=new EbayHTML(this,en[i],en[i]);subscribeElemEvents(e,c.aBubbleText[i]);}}}
this.onAfterLoad=function()
{with(this)
{var s=getValue();s=s.replace(/&lt;/g,"<");s=s.replace(/&gt;/g,">");sDefaultOverlayHTML=s;}}
this.subscribeElemEvents=function(pElem,pText)
{var e=pElem;e.subscribeEvents("onclick");e._registerEvent("onclick","parent.elemOnClick");var n=e.name||e.id;if(n)
this.aText[n]=pText;}
this.createHTMLObject=function(pElem,pEvent)
{with(this)
{var n=pElem.name||pElem.id,e=new EbayHTML(this,n,n);subscribeElemEvents(e,oConfig.aBubbleText[n]);e.bind();mouseOverElem(e,pEvent);}}
this.elemOnClick=function(pEvent,pThis,pWindowEvent)
{this.parent.onClick(this,pWindowEvent);return false;}
this.onClick=function(pElem,pEvent)
{with(this)
{var e=oSelectedElem=pElem,n=e.name;mouseMoveElem(e,pEvent);oTimer=setTimeout(oUtils.controlPath(this)+"._exec('displayContent');",oConfig.iDisplayWait);}}
this.mouseMoveElem=function(pElem,pEvent)
{with(this)
{var oPos=oUtils.oPositioning,evts=oPos.getEventLeftTop(pEvent),offLoc,e;iEventX=evts[0];iEventY=evts[1];if(bUseElemOffsetForPosition)
{e=oDocument.getUIElem(pElem.name);offLoc=oPos.getOffsetLeftTop(e);iLocX=offLoc[0];iLocY=offLoc[1];}}}
this.positionOverlay=function(pLeft,pTop,pNoOffsetHeight)
{with(this)
{var oD=oSelectedElem.oDocument,l,t,t2=pTop||iEventY;if(bUseElemOffsetForPosition)
{l=pLeft||iLocX;t=pTop||iLocY;}
else
{l=pLeft||iEventX;t=t2;}
var sl=oSelectedElem,c=oConfig;var lh=sl.height(),oh=pNoOffsetHeight?0:height(),hb=c.iHeightBuffer,wb=c.iWidthBuffer;if(typeof(c.iFFWidthBuffer)!="undefined"&&this.oGlobals.oClient.bFirefox)
wb=c.iFFWidthBuffer;if(typeof(c.iIEWidthBuffer)!="undefined"&&this.oGlobals.oClient.bIE)
wb=c.iIEWidthBuffer;if((t2+hb-oh)>0)
{if(bLeft)
setClass(c.sTopRightClass);else
setClass(c.sTopLeftClass);sTop=t+hb-oh;}
else
{if(bLeft)
setClass(c.sBottomRightClass);else
setClass(c.sBottomLeftClass);sTop=t-hb;}
if(typeof(bLeft)!="undefined"&&bLeft)
{var w=l-width();l=(w<0)?l:w;}
sLeft=l+wb;if((t2+hb-oh)>0){sLeft-=10;sTop+=15;}
sLeft+="px";sTop+="px";setPosition();}}
this.displayContent=function()
{with(this)
{if(pCfg.bDualBubble)
{var l=(name=='hlpBubR')?'hlpBubL':'hlpBubR';var cl=parent.parent._getControl(l);cl.show(false);}
var sl=oSelectedElem,c=oConfig,txt;if(sl)
{txt=aText[sl.name];if(c.bPreUnescape)
{txt=txt.replace(new RegExp("&lt;","g"),"<");txt=txt.replace(new RegExp("&gt;","g"),">");}
sContent=txt?sDefaultOverlayHTML.replaceTokens(txt):null;display();positionOverlay();bindLinks();}}}
this.bindLinks=function()
{with(this)
{var e,c=oConfig;e=new EbayHTMLAnchor(this,sCloseBubbleLink);e.onclick=function()
{this.parent.closeBubble();return false;}
for(var i in controls)
controls[i].bind();}}
this.enable=function(pEnable)
{var en=this.oConfig.aElemNames,len=en.length,i;for(i=0;i<len;i++)
{this._getControl(en[i]).enable(pEnable);}}
this.closeBubble=function()
{this.hide();}
if(pInitialize)
this.init();}

// \include\lib\_global\features\syi3\_base\grayout.js 

function EbaySYI3Grayout(pParent,pName)
{if(!this.objType)
this.objType="EbaySYI3Grayout";this.base=EbayBaseControl;this.base(pParent,pName);this.oLayer=new EbayHTMLLayer(this,'lyrGrayout_sec');this.aSelElems=this.oDocument.doc.getElementsByTagName('SELECT');this.aExcludeSelElems=[];this.bDisableSelElems=true;this.display=function(pWidth,pHeight,pPosArray)
{var oL=this.oLayer,pos=pPosArray;if(!oL.eElem)
oL.bind();oL.width(pWidth+'px');oL.height(pHeight+'px');oL.show(true);oL.left((pos?pos[0]:0)+'px');oL.top((pos?pos[1]:0)+'px');oL.setValue("");if(this.bDisableSelElems)
this.disableSelElems(true);}
this.hide=function()
{var oL=this.oLayer;oL.show(false);if(this.bDisableSelElems)
this.disableSelElems(false);}
this.disableSelElems=function(pDisable)
{if(pDisable)
this.aExcludeSelElems=[];var aS=this.aSelElems,l=aS.length;for(var i=0;i<l;i++)
{if(pDisable&&aS[i].disabled)
this.aExcludeSelElems[this.aExcludeSelElems.length]=aS[i].name;if(!pDisable&&this.oUtils.isInArray(this.aExcludeSelElems,aS[i].name))
continue;aS[i].disabled=pDisable;}}}

// \include\lib\_global\features\shippingcost\shipping_calc_display.js 

function EbayBidHistory(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayBidHistory";this.base=EbayHTML;this.base(pParent,pName,pName,false,pCfg);this.init=function()
{p=ebay.oDocument.oPage;p.count=1;p.sInsDiveElem=pCfg.sShippingInsCost;p.sInsOptionDivElem=pCfg.sInsOptionId;p.sShippingInsRowElem=pCfg.sShippingInsRowDisplay;p.oCalcmsgdiv=new EbayHTMLLayer(this,pCfg.sCalcSpanId);if(!p.oCalcmsgdiv.eElem)
{p.oCalcmsgdiv.bind();}
if(pCfg.sCalcDelvEst)
{p.oDelvEstDiv=new EbayHTMLLayer(this,pCfg.sCalcDelvEst);if(!p.oDelvEstDiv.eElem)
p.oDelvEstDiv.bind();}
for(var k=0,len=pCfg.aCalcdivId.length;k<len;k++)
{oCalcDiv=new EbayHTMLLayer(this,pCfg.aCalcdivId[k]);if(!oCalcDiv.eElem)
oCalcDiv.bind();oCalcDiv.show(true);}
for(var k=0,len2=pCfg.aCalcdivId.length;k<len2;k++)
{oCalcDiv=new EbayHTMLLayer(this,pCfg.aCalcdivId[k]);if(!oCalcDiv.eElem)
oCalcDiv.bind();oCalcDiv.show(true);}
for(var l=0,len3=pCfg.aUrl.length;l<len3;l++)
{var e=ebay.oDocument.createElement("script");e.src=pCfg.aUrl[l];e.type="text/javascript";this.formLoc=ebay.oDocument.doc.getElementsByTagName("form")[0];this.formLoc.appendChild(e);}
ebay.oDocument.oPage.startTimer();}
this.init();}
ebay.oDocument.oPage.startTimer=function()
{oCg=this.controls.BidHistoryRedesign.oConfig;var t=oCg.iTimeout;this.iTimer=setTimeout("ebay.oDocument.oPage.dispDiv()",t);}
ebay.oDocument.oPage.dispDiv=function()
{for(var k=0,len=oCg.aCalcdivId.length;k<len;k++)
{oCalcDiv=new EbayHTMLLayer(this,oCg.aCalcdivId[k]);if(!oCalcDiv.eElem)
oCalcDiv.bind();oCalcDiv.show();oMsgDiv=new EbayHTMLLayer(this,oCg.aMsgdivId[k]);if(!oMsgDiv.eElem)
oMsgDiv.bind();oMsgDiv.show(true);}}
ebay.oDocument.oPage.setContent=function(response)
{clearTimeout(this.iTimer);oCg=this.controls.BidHistoryRedesign.oConfig;for(var i=0,len=oCg.aMsgdivId.length;i<len;i++)
{oMsgDiv=new EbayHTMLLayer(this,oCg.aMsgdivId[i]);if(!oMsgDiv.eElem)
oMsgDiv.bind();oMsgDiv.show();if(oCg.aFlatratedivId!=""&&oCg.aFlatratedivId!=undefined)
{oFlatmsgdiv=new EbayHTMLLayer(this,oCg.aFlatratedivId[i]);if(!oFlatmsgdiv.eElem)
{oFlatmsgdiv.bind();}
oFlatmsgdiv.show(true);}}
p=ebay.oDocument.oPage;p.objSet(response);}
ebay.oDocument.oPage.objSet=function(response)
{sRespDiv=response.divId+p.count;if(p.count>(oCg.aUrl.length+1))
return false;p.count++;oRespDiv=new EbayHTMLLayer(this,sRespDiv);if(!oRespDiv.eElem)
oRespDiv.bind();if(response.shipInsCost&&response.shipInsCost!=''){sShipInsCostRespDiv=response.divId+p.sInsDiveElem;oShipInsCostRespDiv=new EbayHTMLLayer(this,sShipInsCostRespDiv);if(oShipInsCostRespDiv){if(!oShipInsCostRespDiv.eElem)
oShipInsCostRespDiv.bind();oShipInsCostRespDiv.setValue(response.shipInsCost);oShipInsCostRespDiv.show(true);}}
if(response.deliveryEstimates&&response.deliveryEstimates!=''&&p.oDelvEstDiv){p.oDelvEstDiv.setValue(response.deliveryEstimates);}
if(response.shipInsOptEnum&&response.shipInsOptEnum!=''){sShipInsOptEnumRespDiv=response.divId+p.sInsOptionDivElem;oShipInsOptEnumRespDiv=new EbayHTMLLayer(this,sShipInsOptEnumRespDiv);if(oShipInsOptEnumRespDiv){if(!oShipInsOptEnumRespDiv.eElem)
oShipInsOptEnumRespDiv.bind();oShipInsOptEnumRespDiv.setValue(response.shipInsOptEnum);oShipInsOptEnumRespDiv.show(true);}}
if(response.shipInsOptEnum&&response.shipInsOptEnum!=''){sShipInsRowRespDiv=response.divId+p.sShippingInsRowElem;oShipInsRowRespDiv=new EbayHTMLLayer(this,sShipInsRowRespDiv);if(oShipInsRowRespDiv){if(!oShipInsRowRespDiv.eElem)
oShipInsRowRespDiv.bind();oShipInsRowRespDiv.show(true);}}
if(oRespDiv.eElem)
{if(response.content!='')
{if(response.shippingService&&response.shippingService!=''){p.oCalcmsgdiv.setValue(response.shippingService);}
oRespDiv.setValue(response.content);oRespDiv.show(true);}
else
{oCalcDiv=new EbayHTMLLayer(this,(response.divId+(p.count-1)));if(!oCalcDiv.eElem)
oCalcDiv.bind();oCalcDiv.show();oMsgDiv=new EbayHTMLLayer(this,(response.divId+"m"+(p.count-1)));if(!oMsgDiv.eElem)
oMsgDiv.bind();oMsgDiv.show(true);}}
else
{ebay.oDocument.oPage.objSet(response);}}

// \include\lib\_global\features\shippingcost\bidtrack_pages.js 

function EbayPlacebidTrack(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayPlacebidTrack";this.base=EbayHTML;this.base(pParent,pName,pName,false,pCfg);this.c=pCfg;var owdth=pCfg.pIsDS3Enabled;if(owdth)
{var s1=document.getElementsByTagName('div').length;var i=0;while(i<s1)
{var clsnam=document.getElementsByTagName('div')[i];i++;if(clsnam.className=="pagewidth")
{if(document.body.clientWidth>=1200)
{clsnam.style.width="1200px";}
else{clsnam.style.width="980px";}
break;}}}
this.init=function()
{for(var i=0,len=pCfg.aButtonId.length;i<len;i++)
{oHideobj=new EbayHTMLText(this,pCfg.aHiddenvarId[i]);if(!oHideobj.eElem)
oHideobj.bind();oTxtobj=new EbayHTMLText(oHideobj,pCfg.aTxtboxId[i]);if(!oTxtobj.eElem)
oTxtobj.bind();oButnobj=new EbayHTMLButton(oTxtobj,pCfg.aButtonId[i]);if(!oButnobj.eElem)
oButnobj.bind();oButnobj.onclick=function()
{var sVal=this.parent.getValue();if(sVal)
{if(parseFloat(sVal)==sVal)
{this.parent.parent.setValue(pCfg.sModeValue);}}}}}
this.init();}

// \include\lib\_global\features\offer\bidhistory.js 

ebay.oDocument.oPage.onBeforeLoad=function()
{var oC=this.oDocument.getConfig("View.placebidtrack");if(oC)
new EbayPlacebidTrack(ebay.oDocument.oPage,"View.placebidtrack",oC);var oCnfig=this.oDocument.getConfig("BidHistoryRedesign");if(oCnfig)
new EbayBidHistory(ebay.oDocument.oPage,"BidHistoryRedesign",oCnfig);var c=ebay.oDocument.getConfig('ActionMenuConfig');var cfg=ebay.oDocument.getConfig('ActionMenuRoundConfig');if(typeof cfg!='undefined'){c=cfg;}
if(typeof c!='undefined'||typeof cfg!='undefined'){for(var i=0,len=c.aPopupMenus.length;i<len;i++)
{var objMenuValues=c.aPopupMenus[i];var objLink=new EbayHTMLAnchor(ebay.oDocument,objMenuValues[0],false,null);if(typeof cfg!='undefined'){var objMenu=new EbayMenuPopupRound(objLink,objMenuValues[0],false,c,i);}else{var objMenu=new EbayMenuPopup(objLink,objMenuValues[0]+'_menu',false,c);}
for(var j=1,len2=objMenuValues.length;j<len2;j++){objMenu.addItem(objMenuValues[j]);}
objLink.PopupMenu=objMenu;objLink.onclick=function()
{this.PopupMenu.display();return false;}}}
this.oCfg=ebay.oDocument.getConfig("BidHistory.ItmSumButton");if(this.oCfg)
{for(var i=0,len3=this.oCfg.sSpnIds.length;i<len3;i++){this.oStatuslayer=new EbayHTMLLayer(this,this.oCfg.sSpnIds[i]);this.oStatuslayer.bind();this.oStatuslayer.subscribeEvents("onmouseover","onmouseout");this.oStatuslayer._registerEvent("onmouseover","parent.onMouseOverButton");this.oStatuslayer._registerEvent("onmouseout","parent.onMouseOutButton");}}
this.onMouseOverButton=function()
{with(this){this.eElem.className=this.parent.oCfg.sClsNames[0];}}
this.onMouseOutButton=function()
{with(this){this.eElem.className=this.parent.oCfg.sClsNames[1];}}
var oD=this.parent,oC=oD.getConfig("Bid.History.BubbleHelp"),oB,e,aE,l,i;if(oC)
{aE=oC.aElemNames,l=aE.length;oC.sCloseBubbleLink=oC.sCloseLink;oB=new EbayBubbleHelpOnClick(this,oC.name,oC,false);for(i=0;i<l;i++)
{e=new EbayHTML(oB,aE[i],aE[i]);oB.subscribeElemEvents(e,oC.sBubbleText);}}
var oCfg=ebay.oDocument.getConfig("ViewItem.BidHistory.Overlay");if(oCfg)
{this.iTimeoutID=0;this.oStatuslayer=new EbayHTMLLayer(this,oCfg.sStatusDiv);this.oStatuslayer.bind();this.oStatuslayer.subscribeEvents("onmouseover","onmouseout");this.oStatuslayer._registerEvent("onmouseover","parent.MouseIn");this.oStatuslayer._registerEvent("onmouseout","parent.MouseOut");this.oContentDiv=new EbayHTMLLayer(this,oCfg.sLayerName);var sInnerHTML=this.oStatuslayer.eElem.innerHTML;this.oFrame=new EbayHTMLFrame(this,oCfg.sFrame);this.position=function(oObj)
{with(this)
{var c=oCfg,oL=oStatuslayer,pos=oUtils.oPositioning,offs=pos.getOffsetLeftTop(oObj.eElem),slt=pos.getScrollLeftTop(),offx=c.iOffsetX?c.iOffsetX:0,offy=c.iOffsetY?c.iOffsetY:0,l=offs[0]-(c.iWidth-offx),t=(offs[1]-offy),wh=oGlobals.oClient.getBrowserWindowHeight();oL.top(t+'px');oL.left(l+'px');}}
this.getURLconfig=function(i)
{oCfg.url=oCfg.sUrl;oCfg.url=oCfg.aUrlParamaid[i-1]?(oCfg.url+"&aid="+oCfg.aUrlParamaid[i-1]):oCfg.url;oCfg.url=oCfg.aUrlParameu[i-1]?(oCfg.url+"&eu="+oCfg.aUrlParameu[i-1]):oCfg.url;oCfg.url=oCfg.url+'&downgradeDomain=true'}
var anchorCount=oCfg.iLength;for(i=1;i<=anchorCount;i++)
{oAnch=new EbayHTMLAnchor(this,oCfg.aAnch+i);oAnch.bind();this.getURLconfig(i);oAnch.sUrl=oCfg.url;oAnch.subscribeEvents("onmouseover","onmouseout");oAnch._registerEvent("onmouseout","parent.MouseOut");oAnch._registerEvent("onmouseover","parent.openGallery(this)");oAnch._registerEvent("onmouseover","parent.MouseIn");}
this.openGallery=function(oObj)
{this.oStatuslayer.eElem.innerHTML=sInnerHTML;this.oStatuslayer.show(true);this.position(oObj);this.oFrame.setSource(oObj.sUrl);}
this.MouseOut=function()
{this.parent.oDocument.win.clearTimeout(this.parent.iTimeoutID);this.parent.iTimeoutID=this.parent.oDocument.win.setTimeout(this.parent.oUtils.controlPath(this.parent)+".oStatuslayer.show(false);",oCfg.iTimeout);}
this.MouseIn=function()
{this.parent.oDocument.win.clearTimeout(this.parent.iTimeoutID);}}
var oConfig=ebay.oDocument.getConfig("RelatedSellerSearch");if(oConfig)
new EbayAnonymousBidHistory(this,"AnonymousBidHistory",oConfig);var cfgI=oD.getConfig("BidHistory.Image");if(cfgI&&cfgI.bSelfHosted&&cfgI.sImage!="")
{var img=new EbayHTMLImageScalable(this,cfgI.sImageName,null,null,null,cfgI);img.bind();img.source(cfgI.sImage);}
var cfgR=oD.getConfig("BidHistory.Refresh");if(cfgR)
{if(cfgR.iDaysLeft==0&&cfgR.iHoursLeft==0&&cfgR.iMinutesLeft<cfgR.iRefreshStart)
{var rLyr=new EbayHTMLLayer(this,cfgR.sRefreshDiv);rLyr.bind();rLyr.show(true);var oAnchRefresh=new EbayHTMLAnchor(this,cfgR.sRefreshLinkId);oAnchRefresh._registerEvent("onclick","onclick");oAnchRefresh.onclick=function()
{var sUrl=cfgR.sRefreshUrl+"ebay.oDocument.oPage.bidHistoryRefresh";ebay.oClientServer.callDynamicScriptObject(sUrl);return false;}}}
var cfgBP=oD.getConfig("BidHistory.BidPanel");if(cfgBP)
{var frm=new EbayHTMLForm(this,cfgBP.sBidPanelFormName);frm._registerEvent("onsubmit","onsubmit");frm.onsubmit=function()
{var maxBid=new EbayHTMLText(this,cfgBP.sMaxBidText);maxBid.bind();var sUrl=cfgBP.sBidPanelUrl;sUrl=sUrl.replaceTokensEx("##1##",maxBid.getValue());cfgBP.url=sUrl;var bpLyr=new EbayHTMLOverlayUrl(this,cfgBP.sBidPanelDiv,cfgBP);var goLyr=new EbaySYI3Grayout(this,'grayout_lyr');var wh=ebay.oDocument.oPage.getWidthHeight();goLyr.display(wh[0],wh[1]);bpLyr.bDowngradeDomain=false;bpLyr.display();return false;}}
var el=document.getElementById("pccenew");if(el){window.iTimer=null;if(window.addEventListener){el.addEventListener("mouseover",mOvr,false);el.addEventListener("mouseout",mOut,false);}else if(window.attachEvent){el.attachEvent("onmouseover",mOvr);el.attachEvent("onmouseout",mOut);}}}
mOvr=function(){clearTimeout(window.iTimer);}
mOut=function(){window.iTimer=setTimeout(closePulldown,1000);}
closePulldown=function(){var overlayDiv=new EbayHTMLLayer(this,"pccenew");overlayDiv.bind();overlayDiv.eElem.style.display="none";}
ebay.oDocument.oPage._registerListener(ebay.oDocument._getEvent("resize"),ebay.oDocument.EVENT_AFTER,"goResize");ebay.oDocument.oPage.goResize=function()
{var oD=this.parent;var c=oD.getConfig("BidHistory.BidPanel");var lyr=oD._getControl("lyrGrayout_sec");if(!lyr)return false;var wh=ebay.oDocument.oPage.getWidthHeight();lyr.setStyle("width",wh[0]);lyr.setStyle("height",wh[1]);}
ebay.oDocument.oPage.onAfterLoad=function()
{var c=this.parent.getConfig("BidHistory.BidPanel");if(c)
{if(c.bShowOCB)
this.parent._getControl(c.sBidPanelFormName).onsubmit();}}
ebay.oDocument.oPage.bidHistoryRefresh=function(vilResponse)
{var oD=this.parent;var c=oD.getConfig("BidHistory.Refresh");var lmd,min,sec,bEnded,responseCount=vilResponse.length;for(i=0;i<responseCount;i++)
{bEnded=vilResponse[i].ViewItemLiteResponse.Item[i].IsEnded;lmd=vilResponse[i].ViewItemLiteResponse.Item[i].LastModifiedDate;if(!bEnded)
{min=vilResponse[i].ViewItemLiteResponse.Item[i].TimeLeft.MinutesLeft;sec=vilResponse[i].ViewItemLiteResponse.Item[i].TimeLeft.SecondsLeft;}}
if(lmd>c.iLastModifiedDate||bEnded)
oD.win.location.reload(true);var tl,m,s;m=(min==1)?c.sMinute:c.sMinutes;s=(sec==1)?c.sSecond:c.sSeconds;if(min>0)
{tl=min+' '+m+' '+sec+' '+s;}else{tl=sec+' '+s;}
var time=new EbayHTMLLayer(this,c.sTimeLeftDiv);time.bind();time.setValue(tl);}
ebay.oDocument.oPage.getWidthHeight=function()
{var w,h;var x=document.body.scrollWidth;var y=document.body.scrollHeight;var winW=ebay.oGlobals.oClient.getBrowserWindowWidth();var winH=ebay.oGlobals.oClient.getBrowserWindowHeight();w=Math.max(x,winW);h=Math.max(y,winH);return[w,h];}
function ebAddActionMenuItemCfg()
{var c=ebay.oDocument.getConfig('ActionMenuConfig');var a=arguments;c.aPopupMenus[c.aPopupMenus.length]=a;}
function ebAddActionMenuItemRoundCfg()
{var c=ebay.oDocument.getConfig('ActionMenuRoundConfig');var a=arguments;c.aPopupMenus[c.aPopupMenus.length]=a;}
function EbayMenuPopupRound(pParent,pName,pDisabled,pCfg,aPos)
{if(!this.objType)
this.objType="EbayMenuPopupRound";if(typeof pCfg=='undefined')
pCfg=new EBayMenuPopupConfig('default_menupopup_cfg');this.base=EbayMenuPopup;this.base(pParent,pName,pDisabled,pCfg);this.menuItems=new Array;this.xMousePos=0;this.yMousePos=0;this.xMousePosMax=0;this.yMousePosMax=0;this.row=aPos+1;this.display=function()
{var c=this.oConfig;var sHtml=c.sTopCurBdr;for(var i=0,len=this.menuItems.length;i<len;i++)
{if(this.menuItems[i]!=''){sHtml+=c.sLnkMouHov;sHtml+=this.menuItems[i];sHtml+='</div>';}}
sHtml+=c.sBtmCurBdr;var oParentElem=document.getElementById(this.parent.name);var iLeft=oParentElem.offsetLeft+oParentElem.offsetWidth;var iTop=oParentElem.offsetTop;while(oParentElem.offsetParent){oParentElem=oParentElem.offsetParent;iLeft+=oParentElem.offsetLeft;iTop+=oParentElem.offsetTop;}
this.displayBottomLeft(sHtml,iLeft,iTop);var aFocus=new EbayHTMLAnchor(this,c.aFocusId+this.row);aFocus.bind();if(aFocus.eElem)
aFocus.eElem.focus();var oBgDiv=new EbayHTMLLayer(this,c.sBckImgDivId);if(!oBgDiv.eElem)
oBgDiv.bind();oBgDiv.eElem.style.height=this.eElem.clientHeight-10;}
this.displayBottomLeft=function(sHtml,left,top)
{var oElem=this.getElem();oElem.innerHTML=sHtml;oElem.style.left=(left-this.oConfig.iWidth)+'px';var sTop=document.body.scrollTop,cHgt=document.body.clientHeight;oElem.style.display="block";var eHgt=oElem.offsetHeight;if(cHgt-(top-sTop)>eHgt){top=top;}else{top=(top-eHgt)-25;;}
oElem.style.top=top+'px';}}
setFocus=function(aId,divId){var overlayDiv=new EbayHTMLLayer(this,divId);overlayDiv.bind();overlayDiv.eElem.style.display="none";var aFocus=new EbayHTMLAnchor(this,aId);aFocus.bind();aFocus.eElem.focus();}
hideOverlay=function(aId){var overlayDiv=new EbayHTMLLayer(this,aId);overlayDiv.bind();overlayDiv.eElem.style.display="none";}
focusOnError=function(aId){var aError=new EbayHTMLAnchor(this,aId);aError.bind();if(aError.eElem)
aError.eElem.focus();}

// \include\lib\_global\features\offer\_base\anonymous_bid_history.js 

function EbayAnonymousBidHistory(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayAnonymousBidHistory";this.base=EbayHTML;this.base(pParent,pName,pName,false,pCfg);this.cfg=pCfg;this.init=function()
{with(this)
{this.oLink=new EbayHTMLAnchor(this,cfg.sLink);this.oDivName=new EbayHTMLLayer(this,cfg.sDivName);this.oFrame=new EbayHTMLFrame(this,cfg.sFrameId);this.oFrameName=oFrame;this.sUrl=cfg.sUrl;this.oLink._registerEvent("onclick","onClick");this.oDivName._registerListener(this.oDocument._getEvent("load"),this.parent.EVENT_AFTER,"showDiv");this.oDivName.showDiv=function()
{if(this.eElem)
oDivName.show(true);}
oFrame.onAfterResize=function()
{var oCl=this.oGlobals.oClient;if(oCl.bFirefox||oCl.bNav)
this.eElem.style.height=(this.height()+18)+"px";this.eElem.style.width="100%";}
this.oLink.onClick=function()
{with(this.parent)
{oDivName.show(false);oFrame.setSource(sUrl);}}}}
this.init();}

// \include\js\downgradedomain.js 

function ebDowngradeDomainTo()
{var dd=document.domain,i=dd.indexOf(".ebay."),qs;if(i!=-1)
{dd=dd.substr(i+1);qs=decodeURI(document.location.search);if((i=qs.indexOf("downgradeDomainTo="))>-1)
dd=qs.substring(i+18,qs.indexOf(dd)+dd.length);if(document.domain!=dd||!document.all)
document.domain=new String(dd);}}
ebDowngradeDomainTo();
// b=18750134 -->