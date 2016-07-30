'use strict';
let _=require("lodash");
let Items=require("../spec/fixtures");
function printReceipt(tags){
  let formatItem=getFormatItems(tags);
  let countItem=getCounstomItems(formatItem);
  let CounstomItems=getCounstomItems(countItem);
  let coustomPrices=getCoustomPrices(CounstomItems);
  let allPrice=getAllPrice(coustomPrices);
  let recepit=getRerecipt(coustomPrices,allPrice);
  let list=list(recepit);
  console.log(list);
  return list;

}
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
   return {barcode,name,unit,price,count,totalPrice:totalPrice-save,save};
  }));

}
function getAllPrice(customPrices) {
  let pay=_.sumBy((customPrices),({totalPrice})=> {return totalPrice;});
  let save=_.sumBy(customPrices,({save}) =>{ return save});
  return{
    pay,
    save
  }
}
function getRerecipt(customPrices,allPrice) {
  let promotionItems=_.map(customPrices,({name,unit,price,count,totalPrice}) => {
    return {name,unit,price,count,totalPrice} });

  return{
    promotionItems,
    allPrice
  }

}
function list(reccipt) {
let list=`***<没钱赚商店>收据***`;
let allItems="";
  _.map(reccipt.promotionItems,({name,unit,price,count,totalPrice}) =>
{
  allItems+=`名称：${name}，数量：${count}${unit}，单价：${price}(元)，小计：${totalPrice}(元)`;

}) ;
const expectText = `***<没钱赚商店>收据***
${allItems}
----------------------
总计：${reccipt.allPrice.pay}(元)
节省：${reccipt.allPrice.save}(元)
**********************`;
  return expectText;
}
module.exports = {
  getFormatItems,getCount,getCounstomItems,getCoustomPrices,getAllPrice,getRerecipt
};
