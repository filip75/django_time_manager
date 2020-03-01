import {RECEIVE_PAGE, REQUEST_PAGE, SET_PAGE} from "../actions/projectsActions";
import {combineReducers} from "redux";

const currentPage = (currentPage = 1, action) => {
    if (action.type === SET_PAGE) {
        return action.page
    }
    return currentPage
};

const totalPages = (totalPages = 1, action) => {
    if (action.type === RECEIVE_PAGE) {
        return action.totalPages;
    }
    return totalPages
};

const pages = (pages = {}, action) => {
    switch (action.type) {
        case REQUEST_PAGE:
            return {...pages, ...{[action.page]: {'items': [], 'fetching': true}}};
        // return {...pages, ...{...pages[action.page], ...{'fetching': true}}};
        // return Object.assign({}, projects,
        //     Object.assign({}, projects[action.page], {'fetching': true}));
        case RECEIVE_PAGE:
            return Object.assign({}, pages,
                {[action.page]: {'items': action.pageEntries, 'fetching': false}});
        default:
            return pages;
    }
};

export default combineReducers({pages, currentPage, totalPages});