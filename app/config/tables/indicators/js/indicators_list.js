/**
 * This is the file that will create the list view for the table.
 */
/* global $, odkCommon, odkData, odkTables, util, listViewLogic */
'use strict';

var listQuery = 'SELECT * FROM indicators JOIN refrigerators ON refrigerators._id = indicators.refrigerator_id ' +
    'WHERE indicators._sync_state != ?';

var listQueryParams = [util.deletedSyncState];
var searchParams = '(indicators.refrigerator_id LIKE ?)';

function resumeFunc(state) {
    if (state === 'init') {
        // Translations
        var locale = odkCommon.getPreferredLocale();
        $('#showing').text(odkCommon.localizeText(locale, "showing"));
        $('#of').text(odkCommon.localizeText(locale, "of"));
        $('#prevButton').text(odkCommon.localizeText(locale, "previous"));
        $('#nextButton').text(odkCommon.localizeText(locale, "next"));
        $('#submit').val(odkCommon.localizeText(locale, "search"));

        // set the parameters for the list view
        listViewLogic.setTableId('indicators');
        listViewLogic.setListQuery(listQuery);
        listViewLogic.setListQueryParams(listQueryParams);
        listViewLogic.setSearchParams(searchParams);
        listViewLogic.setListElement('#list');
        listViewLogic.setSearchTextElement('#search');
        listViewLogic.setHeaderElement('#header');
        listViewLogic.setLimitElement('#limitDropdown');
        listViewLogic.setPrevAndNextButtons('#prevButton', '#nextButton');
        listViewLogic.setNavTextElements('#navTextLimit', '#navTextOffset', '#navTextCnt');
        listViewLogic.showEditAndDeleteButtons(true, 'indicators');

        var dateSrvTxt = odkCommon.localizeText(locale, "reporting_period_no_colon");
        var refIDTxt = odkCommon.localizeText(locale, "refrigerator_id_no_colon");

        listViewLogic.setColIdsToDisplayInList(dateSrvTxt, 'reporting_period',
            refIDTxt, 'refrigerator_id');
    }

    listViewLogic.resumeFn(state);
}

function clearListResults() {
    listViewLogic.clearResults();
}

function prevListResults() {
    listViewLogic.prevResults();
}

function nextListResults() {
    listViewLogic.nextResults();
}

function getSearchListResults(){
    listViewLogic.getSearchResults();
}

function newListLimit(){
    listViewLogic.newLimit();
}
