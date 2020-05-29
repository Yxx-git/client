const MlotType = ["GCSamsungPackingList", "GCLCDCOGFinishProductEcretive", "GCLcdCogDetial", 
                 "GCRMAGoodProductImport", "GCRMACustomerReturnFinishProduct", "GCRMAPureFinishProduct"];

export default class IncomingImportRequestBody {

    fileName;
    importType;
    materialLotList;
    materialLotUnitList;
    checkFourCodeFlag;

    constructor(importType, materialLotList, materialLotUnitList, fileName, checkFourCodeFlag){
        this.importType = importType;
        this.materialLotList = materialLotList;
        this.materialLotUnitList = materialLotUnitList;
        this.fileName = fileName;
        this.checkFourCodeFlag = checkFourCodeFlag;
    }

    static buildSelectFile(importType, fileName) {
        return new IncomingImportRequestBody(importType, undefined, undefined, fileName);
    }

    static buildImportInfo(importType, materialLotList, checkFourCodeFlag) {
        if(MlotType.includes(importType)){
            return new IncomingImportRequestBody(importType, materialLotList);
        } else {
            let materialLotUnitList = materialLotList;
            materialLotUnitList.forEach(materialLotUnit =>{
                materialLotUnit.reserved4 = materialLotUnit.reserved6;
                materialLotUnit.reserved6 = "";
            });
            return new IncomingImportRequestBody(importType, undefined, materialLotUnitList, undefined, checkFourCodeFlag);
        }
    }


}