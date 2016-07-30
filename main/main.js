'use strict';
let _=require("lodash");
function getFormatItems(tags) {
  let formatItem=_.map(tags,(tag)=>
  {
     if(tag.includes("-"))
     {
       let [barcode,count]=tag.split("-");
       return {barcode:barcode,count:parseFloat(count)};
     }
     else {
       return  {barcode:tag,count:1};
     }
  });
  return formatItem;
}
module.exports = {
  getFormatItems
};
