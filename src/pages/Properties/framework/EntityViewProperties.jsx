import EntityScanProperties from "@properties/framework/EntityScanProperties";

import {WrappedAdvancedEntityForm} from '@components/framework/form/EntityForm';
import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";

/**
 * 根据条件查找出一笔记录。 没有表格。直接显示详情信息
 * 此笔记录只具备查看功能
 */
export default class EntityViewProperties extends EntityScanProperties{

    static displayName = 'EntityViewProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{searchTxt: I18NUtils.getClientMessage(i18NCode.BtnSearch), formObject: {}}};
    }

    afterQuery = (responseBody) => {
        let queryDatas = responseBody.dataList;
        if (queryDatas && queryDatas.length > 0) {
            this.setState({
                formObject: queryDatas[0]
            })  
            this.form.resetFormFileds();
        } else {
            this.setState({
                formObject: {}
            })  
            this.showDataNotFound();
        }
    }

    buildTable = () => {
        
    }

    getFields(fields) {
        
    }

    createButtonGroup = () => {

    }
    
    buildOtherComponent = () => {
        return (<div>
                    <div className="table-button-group">
                        {this.createButtonGroup()}
                    </div>
                    <WrappedAdvancedEntityForm ref={(form) => this.entityForm = form} object={this.state.formObject} tableRrn={this.state.tableRrn} table={this.state.table}/>
                </div>);
    }

}
