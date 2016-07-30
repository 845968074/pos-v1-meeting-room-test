'use strict';
let _=require("lodash");
let Items=require("../spec/fixtures");
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
function getCompare(array,barcode) {
  return _.find(array,(arry)=>
  {
    return arry.barcode===barcode;
  })
}
//let allItems=
function getCount(formateItems,allItems) {
  let countItems=[];
   _.map(formateItems,({barcode,count})=>
  {
    let temp=getCompare(countItems,barcode);
    if(temp===undefined)
    {
      countItems.push({barcode:barcode,count:count});
    }
    else {
      temp.count+=count;
    }
  });
  return countItems;
}
module.exports = {
  getFormatItems,getCount
};
