export const SET_PAGE = 'SET_PAGE';
export const REQUEST_PAGE = 'REQUEST_PAGE';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';

export const setPage = page => ({
    type: SET_PAGE,
    page
});

export const requestPage = page => ({
    type: REQUEST_PAGE,
    page
});

export const receivePage = (response, page) => ({
    type: RECEIVE_PAGE,
    pageEntries: response.results,
    totalPages: response.page_count,
    page,
});

export const shouldFetch = page => (dispatch, getState) => {
    const state = getState();
    dispatch(setPage(page));
    if (!('pages' in state.projects) || !(page in state.projects.pages)) {
        dispatch(requestPage(page));
        return fetch(`http://192.168.99.100:8000/projects/?page=${page}`)
            .then(response => response.json())
            .then(json => dispatch(receivePage(json, page)))
    }
};