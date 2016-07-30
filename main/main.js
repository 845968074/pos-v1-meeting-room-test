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
function getCounstomItems(countItems) {
  return _.map(countItems,({barcode,count}) =>
  {
    let temp=getCompare(Items.loadAllItems(),barcode);
    return {barcode,name:temp.name,unit:temp.unit,price:temp.price,count:count};
  })
}
function getCoustomPrices(customItems) {
  let promotions=_.find(Items.loadPromotions(),(promotionsItems)=> promotionsItems.type==='BUY_TWO_GET_ONE_FREE');
  //console.log(customItems);
  return _.map(customItems,(({barcode,name,unit,price,count})=>
  {
    let hasPromotions=promotions.barcodes.includes(barcode)&&count>2;
    let totalPrice=count*price;
    let save=0;
    if(hasPromotions)
    {
      save=parseFloat(count*price/3);
    }
   return {barcode,name,unit,price,count,totalPrice,save};
  }));

}
module.exports = {
  getFormatItems,getCount,getCounstomItems,getCoustomPrices
};
