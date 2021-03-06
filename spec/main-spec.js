'use strict';
let main=require("../main/main");
describe('pos', () => {
  it("1:getFormateCart",() =>
  {
    let tags=['ITEM000003-2.5', 'ITEM000005', 'ITEM000005-2',];
    let expectText=[{barcode:'ITEM000003',count:2.5},{barcode:'ITEM000005',count:1},{barcode: 'ITEM000005',count:2}]
    let formatItems=main.getFormatItems(tags);
    expect(formatItems).toEqual(expectText);
  });
  it("2:getCountItems",() =>
  {
    let formatItems=[{barcode:'ITEM000003',count:2.5},{barcode:'ITEM000005',count:1},{barcode: 'ITEM000005',count:2}];
    let expectText=[{barcode:'ITEM000003',count:2.5},{barcode:'ITEM000005',count:3}];
    let countItems=main.getCount(formatItems);
    expect(countItems).toEqual(expectText);
  });
  it("3:getCounstomItems",() =>
  {
    let countItems=[{barcode:'ITEM000003',count:2.5},{barcode:'ITEM000005',count:3}];
    let expectText=[  {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00,
      count:2.5
    },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        count:3
      }];
    let CounstomItems=main.getCounstomItems(countItems);
    expect(CounstomItems).toEqual(expectText);
  });
  it("4:getItemsPrice",() =>
  {
    let customItems=[  {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00,
      count:2.5
    },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        count:3
      }];
    let expectText=
      [  {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00,
      count:2.5,
        totalPrice:37.5,
        save:0
    },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        count:3,
        totalPrice:9,
        save:4.5
      }];
    let coustonPrice=main.getCoustomPrices(customItems);
    expect(coustonPrice).toEqual(expectText);
  });
  it("5:getCustomAllPrice",() =>
  {
    let customPrice= [  {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00,
      count:2.5,
      totalPrice:37.5,
      save:0
    },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        count:3,
        totalPrice:9,
        save:4.5
      }];
    let expectText={pay:46.5,save:4.5};
    let allPrice=main.getAllPrice(customPrice);
    expect(allPrice).toEqual(expectText);
  });
  it("6:getCustomRececipt",() =>
  {
    let customPrice= [  {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00,
      count:2.5,
      totalPrice:37.5,
       save:0
    },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        count:3,
        totalPrice:9,
        save:4.5
      }];
    let allPrice={pay:46.5,save:4.5};
    let promotionItems= [  {
      name: '荔枝',
      unit: '斤',
      price: 15.00,
      count:2.5,
      totalPrice:37.5
    },
      {
        name: '方便面',
        unit: '袋',
        price: 4.50,
        count:3,
        totalPrice:9
      }];
    let reccipt=main.getRerecipt(customPrice,allPrice);
    let expectText={
      promotionItems,
      allPrice
    };
    expect(reccipt).toEqual(expectText);
  });
  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

   spyOn(console, 'log');

    main.printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***

名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;
   // expect(list).toEqual(expectText);
    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
