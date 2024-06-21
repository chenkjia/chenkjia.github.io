const fs = require('fs');

const filePath = process.argv[2];

const stringToAdd = `// clearTransactionId
// autoPlaying(Wt,Zt,Bt.user.rawToken);
// listed:{on:{CONTINUE:"playing"}}
// listed:{on:{CONTINUE:"playing"},invoke:{src:()=>(cb)=>cb('CONTINUE')}}
// BoundaryError
// ClockIssue
// Zt.send("REFRESH");
// const{gameService:Bt}=reactExports.useContext(Context),{t:Wt}=useAppTranslation();function Zt(){acknowledgeGameRules(),Bt.send("ACKNOWLEDGE")};Zt();

// 种菜的优先顺序
const cropConfig = ['Soybean','Corn','Kale','Radish','Eggplant','Parsnip','Cauliflower','Beetroot','Cabbage','Carrot','Pumpkin','Potato','Sunflower','Wheat']
const cropCate = {
  'Basic Scarecrow': ['Sunflower','Potato','Pumpkin'],
  'Scary Mike': ['Soybean','Carrot','Cabbage','Beetroot','Cauliflower','Parsnip'],
  'Laurie the Chuckle Crow': ['Wheat','Eggplant','Corn','Radish','Kale'],
  'null': ['Soybean','Wheat','Eggplant','Corn','Radish','Kale'],
  'all': ['Sunflower','Potato','Pumpkin','Soybean','Carrot','Cabbage','Beetroot','Cauliflower','Parsnip','Wheat','Eggplant','Corn','Radish','Kale']
}
const fruitSeeds = ['Blueberry Seed', 'Orange Seed', 'Apple Seed', 'Banana Plant']
// 是否自动购买种子
// 是否自动砍树
// 是否自动挖石
// 是否自动挖铁
// 是否自动挖金
// 是否自动喂鸡
// 是否自动种水果
// 是否自动采集水果
// 是否自动种花
// 是否自动采菇
// 是否自动采蜜，采蜜的百分比
// 做饭、做蛋糕、做饮料的优先顺序
const compostBuildings = ['Compost Bin','Turbo Composter','Premium Composter']
const foodBuildings = {
  "Fire Pit": {
    "Reindeer Carrot": 5,
    "Mashed Potato": 20,
    "Bumpkin Broth": 10,
    // "Mushroom Soup": 3,
    // "Cabbers n Mash": 2,
    "Pumpkin Soup": 8,
    "Boiled Eggs": 5,
    "Kale Omelette": 1,
    "Kale Stew": 1,
    "Gumbo": 2
  },
  "Kitchen": {
    "Mushroom Jacket Potatoes": 20,
    "Bumpkin Roast": 3,
    "Roast Veggies": 5,
    "Bumpkin Salad": 3,
    "Bumpkin ganoush": 1
  },
  "Bakery": {
    // "Honey Cake": 1,
    "Kale & Mushroom Pie": 1
  },
  "Smoothie Shack": {
    "Power Smoothie": 3,
    "Banana Blast": 2,
    "Bumpkin Detox": 3,
    "Apple Juice": 3,
    "Orange Juice": 3
  },
  "Deli": {
    "Fermented Fish": 3,
    "Blueberry Jam": 1,
    "Fermented Carrots": 1,
    "Sauerkraut": 10,
  }
}
// 自动化卖货
const goods = {
  "Sunflower": {
    cost: 0.01,
    per: 100,
  },
  "Potato": {
    cost: 0.1,
    per: 50,
  },
  "Pumpkin": {
    cost: 0.2,
    per: 40,
  },
  "Carrot": {
    cost: 0.5,
    per: 25,
  },
  "Cabbage": {
    cost: 1,
    per: 24,
  },
  "Soybean": {
    cost: 1.5,
    per: 24,
  },
  "Beetroot": {
    cost: 2,
    per: 22,
  },
  "Cauliflower": {
    cost: 3,
    per: 20,
  },
  "Parsnip": {
    cost: 5,
    per: 15,
    mix: true
  },
  "Eggplant": {
    cost: 6,
    per: 12,
    mix: true
  },
  "Corn": {
    cost: 7,
    per: 12,
    mix: true
  },
  "Radish": {
    cost: 7,
    per: 10,
    mix: true
  },
  "Wheat": {
    cost: 5,
    per: 10,
    mix: true
  },
  "Kale": {
    cost: 7,
    per: 8,
    mix: true
  },
  "Blueberry": {
    cost: 6,
    per: 4,
  },
  "Orange": {
    cost: 1,
    per: 3,
  },
  "Apple": {
    cost: 14,
    per: 2,
  },
  "Banana": {
    cost: 14,
    per: 2,
  },
  "Egg": {
    cost: 5,
    per: 5,
  },
  "Honey": {
    cost: 1,
    per: 1,
    keep: 1
  },
  "Wood": {
    cost: 1,
    per: 20,
    keep: 200
  },
  "Stone": {
    cost: 1,
    per: 5,
    keep: 100
  },
  "Iron": {
    cost: 1,
    per: 2,
    keep: 50
  },
  "Gold": {
    cost: 1,
    per: 1,
    keep: 20
  },
  "Crimstone": {
    cost: 1,
    per: 1,
    keep: 5
  }
}
const goodsKey = Object.keys(goods)
goodsKey.forEach(good => {
  goods[good].costSFL = goods[good].cost / 320
  goods[good].keep =  goods[good].keep || goods[good].per * 20
  goods[good].stokeLimit = goods[good].stokeLimit || goods[good].per * 10

})
console.log(goods)
// 自动化任务
// 通过任务与厨房、地、鸡、水果的状态、仓库与商店，计算出需求列表

const ScarecrowList = ["Basic Scarecrow", "Scary Mike", "Laurie the Chuckle Crow"]
const DeliveryMan = {
  betty: {
    // friendship: true
  },
  blacksmith: {
    // friendship: true
  },
  "pumpkin' pete": {
  //   friendship: true
  },
  grimbly: {
    friendship: true
  },
  gordo: {
    friendship: true
  },
  tango:{},
  grimtooth: {
    friendship: true
  }
}
// 是否自动钓鱼
// 是否自动做金币任务
// 是否自动做奖券任务
// 自动化开始
let times = 0
const autoPlaying = async (status, cb, token) => {
  times++;
  const {state, farmId, transactionId} = status;
  await ACTIONS.doAirdropClaimed(state, cb);
  console.log(status)
  if(getNumber(state.inventory["Clash of Factions Banner"])>=1){
    const isClaimTradeRound = await ACTIONS.doClaimTrade(state, cb);
    if(isClaimTradeRound) {
      console.log('isClaimTradeRound');
      return false;
    }
    const isListingTradeRound = await ACTIONS.doListingTrade(state, cb, farmId, token, transactionId);
    if(isListingTradeRound) {
      console.log('isListingTradeRound');
      return false;
    }
    console.log('notTradeRound')

  }
  const crops = computeCrop(state);
  const fruits = computeFruit(state);
  if(crops.length || fruits.length) {
    await ACTIONS.doCrop(state, cb, crops);
    await ACTIONS.doFruit(state, cb, fruits);
    return false;
  }
  const isCompost = await ACTIONS.doCompost(state, cb)
  if(isCompost) {
    return false;
  }
  await ACTIONS.doCook(state, cb)
  // 买种子
  await ACTIONS.doBuySeeds(state, cb);
  // 收蜂蜜
  await ACTIONS.doBeehive(state, cb);
  // 种花
  await ACTIONS.doPlantFlower(state, cb);
  // 收花
  await ACTIONS.doHarvestFlower(state, cb);
  // 收蛋
  await ACTIONS.doChickenCollectEgg(state, cb);
  // 喂鸡
  await ACTIONS.doChickenFed(state, cb);
  // 买斧头
  await ACTIONS.doBuyAxe(state, cb);
  // 砍树
  await ACTIONS.doTimberChopped(state, cb);


  // 判断是否无事可做，如果是，则完成任务、钓鱼
  await ACTIONS.doMushroomPicked(state, cb);
  // 做任务
  await ACTIONS.doOrders(state, cb);
  // 做任务
  await ACTIONS.doChores(state, cb);
};
// computeCrop
const computeCrop = (state) => {
  const now = Date.now()
  const {collectibles, crops} = state;
  const CROPSDETAIL = CROPS()
  // 循环所有的地，判断是否在120秒内可收获，
  const waitForCrop = Object.keys(crops).reduce((result, key) => {
    let harvestTime = null
    if(crops[key].crop){
      const seconds = CROPSDETAIL[crops[key].crop.name].harvestSeconds
      harvestTime = crops[key].crop.plantedAt + seconds * 1000
      if(harvestTime > now + 120000) {
        return result
      }
      if(harvestTime < now) {
        harvestTime = null
      }
    }
    return [...result, {
      id: key,
      ...crops[key],
      harvestTime
    }]
  }, [])
  // 查看是否有稻草人，通过稻草人及定位，把是否有稻草人加持给到地，是否当前可收获
  const hasScarecrowList = ScarecrowList.filter(i => collectibles[i]).map(i => {
    const {x,y} = collectibles[i][0].coordinates
    return {
      name: i,
      topLeft:{x: x - 1,y: y - 1},
      bottomRight:{ x: x + 1, y: y - 3}
    }
  })
  waitForCrop.forEach((crop) => {
    crop.ScarecrowType = 'null'
    hasScarecrowList.forEach((scarecrow) => {
      if(
        crop.x >= scarecrow.topLeft.x &&
        crop.x <= scarecrow.bottomRight.x &&
        crop.y <= scarecrow.topLeft.y &&
        crop.y >= scarecrow.bottomRight.y
      ){
        crop.ScarecrowType=scarecrow.name
      }
    })
  })
  const sortedCrops = waitForCrop.sort((a, b) => {
    if (a.harvestTime < b.harvestTime) {return -1;}
    if (a.harvestTime > b.harvestTime) {return 1;}
    if (a.ScarecrowType < b.ScarecrowType) {return -1;}
    if (a.ScarecrowType > b.ScarecrowType) {return 1;}
    return 0;
  });
  return sortedCrops
  // 将所有的地按到期时间排序，确认哪种稻草人地优先收获
  // 把地以稻草人类型分成多份
  // 每份排序，如果当前都可收获，乱序，如果，120秒内可收获，按时间排序

  // 判断接下来种在哪一秒种什么菜

// 配置列表与需求列表合并，需求列表优先于配置列表，形成待种列表

// 循环计算
// 计算出每个地需要在什么时间种什么植物

// 找到待种列表里第一个与地属性匹配的植物

// 如果此种待种植植物是有任务数量的，则减数量或者删除出列表

// 进入待执行任务列表里
}
const computeFruit = (state) => {
  const now = Date.now()
  const {fruitPatches} = state;
  const FRUITSEEDDETAIL = FRUIT_SEEDS()
  const FRUITDETAIL = FRUIT()
  // 循环所有的地，判断是否在120秒内可收获，
  const waitForFruit = Object.keys(fruitPatches).reduce((result, key) => {
    let harvestTime = null
    if(fruitPatches[key].fruit){
      if(fruitPatches[key].fruit.harvestsLeft){
        const item = fruitPatches[key].fruit
        const seconds = FRUITSEEDDETAIL[FRUITDETAIL[item.name].seed].plantSeconds
        const tmpTime = item.harvestedAt || item.plantedAt
        harvestTime = tmpTime + seconds * 1000
        if(harvestTime > now + 120000) {
          return result
        }
        if(harvestTime < now) {
          harvestTime = null
        }
      } else {
        harvestTime = null
      }
    }
    return [...result, {
      id: key,
      ...fruitPatches[key],
      harvestTime
    }]
  }, [])
  const sortedFruit = waitForFruit.sort((a, b) => {
    return a.harvestTime - b.harvestTime
  });
  return sortedFruit
}
// waitToDo
// 计算不同的列表里的第一个是哪个可以最先做，排序
// 获取当前时间
// 按不同的类别执行不同的任务

const ACTIONS = {
  doCrop: async (state, cb, crops) => {
    const cropCateKey = Object.keys(cropCate)
    cropCateKey.forEach(key => {
      cropCate[key] = cropCate[key].filter(item => {
        return getNumber(state.inventory[item+' Seed']) || getNumber(state.stock[item+' Seed'])
      }).sort((a,b) => {
        return (getNumber(state.inventory[b+' Seed']) + getNumber(state.stock[b+' Seed'])- goods[b].stokeLimit) - (getNumber(state.inventory[a+' Seed']) + getNumber(state.stock[a+' Seed'])- goods[a].stokeLimit)
      })
    })
    const resultCropCate = {}
    cropCateKey.forEach(key => {
      resultCropCate[key] = cropCate[key].concat(cropCate['all'])
    })
    // 计算目前仓库哪些物资最少
    for (let i = 0; i < crops.length; i++) {
      const crop = crops[i]
      if(crop.crop){
        await ACTIONS.doHarvested(cb, crop)
      }
      // find出现在仓库有的种子(列表后面需要考虑优先需求列表)
      const vegetable = resultCropCate[crop.ScarecrowType].find(item => {
        return getNumber(state.inventory[item+' Seed']) || getNumber(state.stock[item+' Seed'])
      })
      const seed = vegetable +' Seed'
      if (!getNumber(state.inventory[seed])) {
        await ACTIONS.doBuySeed(state, cb, seed)
      }
      await ACTIONS.doPlanted(state, cb, crop, seed, vegetable)
    }
  },
  doBuySeeds: async (state, cb) => {
    // const cropKey = Object.keys(cropCate.all)
    const waitBuySeeds = cropCate.all.filter(item => {
      return getNumber(state.stock[item+' Seed']) && getNumber(state.inventory[item+' Seed']) < 
      goods[item].stokeLimit - 10
    })
    console.log(waitBuySeeds)
    for (let i = 0; i < waitBuySeeds.length; i++) {
      const item = waitBuySeeds[i]
      const stockNum = getNumber(state.stock[item+' Seed'])
      const emptyNum = goods[item].stokeLimit - getNumber(state.inventory[item+' Seed'])
      const resultNum = emptyNum > stockNum ? stockNum : emptyNum
      await ACTIONS.doBuySeed(state,cb,item+' Seed', resultNum)
    }
  },
  doBuySeed: async (state, cb, seed, resultNum) => {
    await delayL(3)
    const stockNum = getNumber(state.stock[seed])
    const num = resultNum || 10
    cb({
      type: "seed.bought",
      item: seed,
      amount: stockNum >= num ? num : stockNum,
    });
  },
  doHarvested: async (cb, crop) => {
    if (crop.harvestTime) {
      await delayF(crop.harvestTime - Date.now())
    }
    if(crop.crop.reward){
      await delayL(3)
      cb({
        type: "cropReward.collected",
        plotIndex: crop.id,
      })
    }
    await delayL(1)
    cb({
      type: "crop.harvested",
      index: crop.id,
    })
  },
  doPlanted: async (state, cb, crop, seed, vegetable) => {
    await delayL(1)
    cb({
      type: "seed.planted",
      index: crop.id,
      item: seed,
      cropId: generateRandomString(),
    })
    if (goods[vegetable].mix) {
      await ACTIONS.doFertilised(state, cb, crop)
    }
  },
  doFertilised: async (state, cb, crop) => {
    if(getNumber(state.inventory['Rapid Root']) && cropCate['Laurie the Chuckle Crow'].includes(crop.crop.name)) {
      await delayL(1)
      cb({
        type: "plot.fertilised",
        plotID: crop.id,
        fertiliser: "Rapid Root",
      })
    } else if(getNumber(state.inventory['Sprout Mix'])) {
      await delayL(1)
      cb({
        type: "plot.fertilised",
        plotID: crop.id,
        fertiliser: "Sprout Mix",
      })
    }
  },
  doFruit: async (state, cb, fruits) => {
    for (let i = 0; i < fruits.length; i++) {
      const fruit = fruits[i]
      // 以库存最少的来种
      const tmpFruitSeeds =  fruitSeeds.sort((a,b) => {
        return (state.inventory[FRUIT_SEEDS()[a].yield]||0) - (state.inventory[FRUIT_SEEDS()[b].yield]||0)
      })
      if(fruit.fruit){
        if(fruit.fruit.harvestsLeft) {
          await ACTIONS.doHarvestedFruit(cb, fruit)
        } else {
          await ACTIONS.doRemovedTree(state, cb, fruit)
          await ACTIONS.doPlantedFruit(state, cb, fruit, tmpFruitSeeds)
        }
      } else {
        await ACTIONS.doPlantedFruit(state, cb, fruit, tmpFruitSeeds)
      }
    }
  },
  doHarvestedFruit: async (cb, fruit) => {
    if (fruit.harvestTime) {
      await delayF(fruit.harvestTime - Date.now())
    }
    await delayL(1)
    cb({
      type: "fruit.harvested",
      index: fruit.id,
    })
  },
  doRemovedTree: async (state, cb, fruit) => {
    if(getNumber(state.inventory["Axe"]) <= 0) {
      await ACTIONS.doAxeCrafted(state, cb)
    }
    await delayL(3)
    cb({
      type: "fruitTree.removed",
      index: fruit.id,
      selectedItem: "Axe",
    })
  },
  doAxeCrafted: async (state, cb, num) => {
    await delayL(3)
    cb({
      type: "tool.crafted",
      amount: num || 10,
      tool: "Axe",
    })
  },
  doPlantedFruit: async (state, cb, fruit, tmpFruitSeeds) => {
    // find出现在仓库有的种子(列表后面需要考虑优先需求列表)
    const seed = tmpFruitSeeds.find(item => {
      return getNumber(state.inventory[item]) > 0
    })
    await delayL(1)
    cb({
      type: "fruit.planted",
      index: fruit.id,
      seed,
    })
    await ACTIONS.doFruitPatchFertilised(state, cb, fruit)
  },
  doFruitPatchFertilised: async (state, cb, fruit) => {
    if(getNumber(state.inventory['Fruitful Blend'])) {
      await delayL(1)
      cb({
        type: "fruitPatch.fertilised",
        patchID: fruit.id,
        fertiliser: 'Fruitful Blend'
      })
    }
  },
  doCompost: async(state, cb) => {
    const now = Date.now()
    compostBuildings.forEach(async(building) => {
      if(state.buildings[building] && state.buildings[building].length) {
        const buildingObj = state.buildings[building][0]
        if (!buildingObj.producing) {
          await ACTIONS.doComposterStarted(state, cb, building, buildingObj);
          return false
        }
        if (buildingObj.producing.readyAt - now < 0) {
          await ACTIONS.doCompostCollected(state, cb, building, buildingObj)
          cb({
            type: "SAVE",
          })
          return true
        }
      }
    })
    return false
  },
  doComposterStarted: async(state, cb, building, buildingObj) => {
    const cropskey = Object.keys(buildingObj.requires)
    const startAble = cropskey.every(crop => {
      return getNumber(state.inventory[crop]) >= buildingObj.requires[crop]
    })
    if(startAble) {
      cb({
        type: "composter.started",
        buildingId: buildingObj.id,
        building: building
      });
    }
  },
  doCompostCollected: async(state, cb, building, buildingObj) => {
    cb({       
      type: "compost.collected",
      building,
      buildingId: buildingObj.id,
    });
  },
  doMushroomPicked: async(state, cb) => {
    const { mushrooms } = state
    if(mushrooms && mushrooms.mushrooms){
      const mushroomList = Object.keys(mushrooms.mushrooms)
      if(mushroomList.length){
        cb({type: "mushroom.picked",id: mushroomList[0]});
      }
    }
  },
  doCook: async(state, cb) => {
    const buildings = Object.keys(foodBuildings)
    for (let i = 0; i < buildings.length; i++) {
      // // 收食物的逻辑
      const building = buildings[i]
      if(state.buildings[building]) {
        const cookingState = await ACTIONS.doRecipeCollected(state, cb, building)
        if (cookingState==='notCooking') {
          const foodList = Object.keys(foodBuildings[building])
          const waitToCook = foodList.find(food => {
            return isEnoughInventoryForCook(food,state) && getNumber(state.inventory[food]) <= foodBuildings[building][food]
          })
          if(waitToCook) {
            await ACTIONS.doRecipeCooked(state, cb, building, waitToCook)
          }
        }
      }
    }
  },
  doRecipeCollected: async(state, cb, building) => {
    // 如果在做饭中，没法收获，返回true，否则返回false
    const crafting = state.buildings[building][0].crafting
    if (crafting) {
      if(crafting.readyAt > Date.now()){
        return 'isCooking'
      }
      await delayL(3)
      cb({
        type: "recipe.collected",
        building,
        buildingId: state.buildings[building][0].id
      });
    } 
    return 'notCooking'
  },
  doRecipeCooked: async (state, cb, building, food)  => {
    await delayL(3)
    cb({
      type: "recipe.cooked",
      item: food,
      buildingId: state.buildings[building][0].id
    })
  },
  // 卖货自动收钱
  doClaimTrade: async ({trades}, cb)  => {
    const ks = Object.keys(trades.listings)
    const a = ks.find(k => trades.listings[k].boughtAt)
    if(!a) {
      return false
    }
    cb({
      type: "trade.received",
      tradeId: a,
    })
    cb({
      type: "SAVE",
    })
    return true
  },
  // 自动卖货
  doListingTrade: async (state, cb, farmId, token, transactionId)  => {
    const ks = Object.keys(state.trades.listings)
    if(ks.length>=3) {
      return false
    }
    const sells = ks.map(k => Object.keys(state.trades.listings[k].items)[0])

    const tmpGoods = goodsKey.filter((good) => {
      return sells.every((s) => s !== good) && getNumber(state.inventory[good]) > goods[good].keep
    })
    if(!tmpGoods.length) {
      return false
    }
    const floorPrices = await getListingsFloorPrices(token)
    const {currentPrices} = await getMarketPrices(farmId,transactionId,token)
    tmpGoods.forEach(i => {
      const good = goods[i]
      good.floorPrice = floorPrices[i]
      good.currentPrice = currentPrices[i]
      good.profit = (good.floorPrice - good.costSFL) / good.costSFL
      good.premium = (good.floorPrice - good.currentPrice) / good.currentPrice
      good.inventory = getNumber(state.inventory[i])
      good.rate = (good.inventory - good.keep) / good.keep
    })
    const resultGoods = tmpGoods.filter((good) => {
      return goods[good].profit > 0 && goods[good].premium > 0
    }).sort((a, b) => {
      return goods[b].rate - goods[a].rate
    });
    if(!resultGoods.length) {
      return false
    }
    const resource = goods[resultGoods[0]]
    const listings = await getTradeListings(
      resultGoods[0].toLowerCase(),
      token
    );
    const targetPrice = listings[3].sfl / listings[3].items[resultGoods[0]]
    const sfl = Number((targetPrice * resource.per - 0.0001).toFixed(4))
    cb({
      type: "LIST_TRADE",
      sellerId: farmId,
      items: {
        [resultGoods[0]]: resource.per
      },
      sfl
    });
    return true
    // return false
  },
  doOrders: async (state, cb) => {
    const orders = state.delivery.orders.filter(order => {
      return DeliveryMan[order.from] && !order.completedAt
    })
    if (orders.length) {
      const now = Date.now()
      orders.forEach(async order => {
        const canDelivered = Object.keys(order.items).every(key => {
          return getNumber(state.inventory[key]) >= order.items[key]
        })
        if(canDelivered) {
          await delayL(3);
          let result = {
            type: "order.delivered",
            id: order.id
          };
          if (DeliveryMan[order.from].friendship) {
            result.friendship = true
          }
          cb(result);
          await delayL(3);
          cb({
            type: "SAVE",
          })
          return false
        }
        if((now - order.createdAt)>86400000) {
          await delayL(3);
          cb({
            type: "order.skipped",
            id: order.id
          });
        }
      })
    }
  },
  doBeehive: async (state, cb) => {
    const beehivesKeys = Object.keys(state.beehives)
    const now = Date.now()

    const waitBeehive = beehivesKeys.filter(key => {
      console.log(state.beehives[key].honey.produced / DEFAULT_HONEY_PRODUCTION_TIME)
      return state.beehives[key].honey.produced / DEFAULT_HONEY_PRODUCTION_TIME > 0.1
    })
    console.log(waitBeehive)
    for (let i = 0; i < waitBeehive.length; i++) {
      await delayL(3)
      cb({
        type: "beehive.harvested",
        id: waitBeehive[i]
      })
    }
  },
  doPlantFlower: async (state, cb) => {
    const flowerBedsKeys = Object.keys(state.flowers.flowerBeds)
    const waitPlantFlower = flowerBedsKeys.filter(key => {
      return !state.flowers.flowerBeds[key].flower
    })
    for (let i = 0; i < waitPlantFlower.length; i++) {
      await delayL(3)
      cb({
        crossbreed: "Sunflower",
        id: waitPlantFlower[i],
        seed: "Sunpetal Seed",
        type: "flower.planted"
      })
    }
  },
  doHarvestFlower: async (state, cb) => {
    const now = new Date()
    const flowerBedsKeys = Object.keys(state.flowers.flowerBeds)
    const waitHarvestFlower = flowerBedsKeys.filter(key => {
      return state.flowers.flowerBeds[key].flower && state.flowers.flowerBeds[key].flower.plantedAt < now - 86400000
    })
    for (let i = 0; i < waitHarvestFlower.length; i++) {
      await delayL(3)
      cb({
        id: waitHarvestFlower[i],
        type: "flower.harvested"
      })
    }
  },
  doChickenCollectEgg: async (state, cb) => {
    const now = new Date()
    const chickensKeys = Object.keys(state.chickens)
    const waitChickens = chickensKeys.filter(key => {
      return state.chickens[key].fedAt + 2*86400000 < now
    })
    for (let i = 0; i < waitChickens.length; i++) {
      await delayL(3)
      cb({
        id: waitChickens[i],
        type: "chicken.collectEgg"
      })
    }
  },
  doChickenFed: async (state, cb) => {
    const chickensKeys = Object.keys(state.chickens)
    const waitChickens = chickensKeys.filter(key => {
      return !state.chickens[key].fedAt
    })
    if(getNumber(state.inventory['Wheat']) > waitChickens.length) {
      for (let i = 0; i < waitChickens.length; i++) {
        await delayL(3)
        cb({
          id: waitChickens[i],
          type: "chicken.fed"
        })
      }
    }
  },
  
  doTimberChopped: async (state, cb) => {
    if (getNumber(state.inventory['Axe']) > 50) {
      const now = new Date()
      const treesKeys = Object.keys(state.trees)
      const waitTrees = treesKeys.filter(key => {
        return state.trees[key].wood && state.trees[key].wood.choppedAt + 2*3600000 < now
      })
      for (let i = 0; i < waitTrees.length; i++) {
        await delayL(3)
        cb({
          type: "timber.chopped",
          item: "Axe",
          index: waitTrees[i],
        })
      }

    }
    // timber.chopped
  },
  doBuyAxe: async (state, cb) => {
    if(state.coins > 20000) {
      const stockAxe = getNumber(state.stock['Axe'])
      if (stockAxe) {
        await ACTIONS.doAxeCrafted(state, cb) 
      }
    }
  },
  doAirdropClaimed: async (state, cb) => {
    if(state.airdrops.length) {
      for (let i = 0; i < state.airdrops.length; i++) {
        await delayL(3)
        cb({
          type: "airdrop.claimed",
          id: state.airdrops[i].id,
        })
      }
    }
  },
  doChores: async (state, cb) => {
    const choresObject = state.chores.chores
    const choresKeys = Object.keys(choresObject)
    const waitToChoresKeys = choresKeys.filter(key => !choresObject[key].completedAt)
    const now = Date.now()
    for (let index = 0; index < waitToChoresKeys.length; index++) {
      let key = waitToChoresKeys[index];
      let chore = choresObject[key]
      let activity = state.bumpkin?.activity?.[chore.activity] ?? 0
      let progress = activity - chore.startCount;
      if(progress >= chore.requirement) {
        await delayL(3);
        cb({
          type: "chore.completed",
          id: key
        });
        await delayL(3);
        cb({
          type: "SAVE",
        })
        return false
      }
      if((now - chore.createdAt)>86400000) {
        await delayL(3);
        cb({
          type: "chore.skipped",
          id: key
        });
      }
    }
  },
}
const delayF = (x) => new Promise((resolve) => { setTimeout(resolve, x) });
const delayL = (x) => new Promise((resolve) => { setTimeout(resolve, Math.random() * 300 * x + 300 * x) });
/* 已完成 获取数量函数 */
const getNumber = (i) => i ? i.toNumber() : 0

// 判断是否够材料做饭
const isEnoughInventoryForCook = (foodName,state) => {
  return Object.keys(COOKABLES[foodName].ingredients).reduce((result, item) => {
    return getNumber(state.inventory[item]) >= getNumber(COOKABLES[foodName].ingredients[item]) && result
  }, true)
}
const groupBy = (array, key) => {
  return array.reduce((result, currentItem) => {
    // 使用 key 函数提取分组键，如果是字符串属性可以直接使用
    const groupKey = typeof key === 'function' ? key(currentItem) : currentItem[key];
 
    // 确保 result 对象中有对应分组的数组
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    // 将当前项添加到对应分组的数组中
    result[groupKey].push(currentItem);
 
    return result;
  }, {});
};
/* 已完成 Uuid */
const generateRandomString = () => {
  var characters = '0123456789abcdef';
  var result = '';
  for (var i = 0; i < 8; i++) {
    var randomIndex = Math.floor(Math.random() * 16);
    var randomCharacter = characters.charAt(randomIndex);
    result += randomCharacter;
  }
  return result;
}
console.log(generateRandomString());\n`;
// const filePath = 'test.js';
let content = fs.readFileSync(filePath, 'utf-8');

// 替换字符串
content = content.replace(/clearTransactionId",invoke:{src:Wt=>Zt=>{/g, 'clearTransactionId",invoke:{src:Wt=>Zt=>{autoPlaying(Wt,Zt,Bt.user.rawToken);');
content = content.replace(/listed:{on:{CONTINUE:"playing"}}/g, 'listed:{on:{CONTINUE:"playing"},invoke:{src:()=>(cb)=>cb("CONTINUE")}}');
content = content.replace(/Sr=\(\)=>{Zt\.send\("REFRESH"\)};/g, 'Sr=()=>{Zt.send("REFRESH")};Zt.send("REFRESH");');
content = content.replace(/ClockIssue=\(\)=>{/g, 'ClockIssue=()=>{Zt.send("REFRESH");');

content = content.replace(/const{gameService:Bt}=reactExports\.useContext\(Context\),{t:Wt}=useAppTranslation\(\);function Zt\(\){acknowledgeGameRules\(\),Bt\.send\("ACKNOWLEDGE"\)}/g, 'const{gameService:Bt}=reactExports.useContext(Context),{t:Wt}=useAppTranslation();function Zt(){acknowledgeGameRules(),Bt.send("ACKNOWLEDGE")};Zt();');

const newContent = stringToAdd + content;
// 写回文件
fs.writeFileSync(filePath, newContent, 'utf-8');