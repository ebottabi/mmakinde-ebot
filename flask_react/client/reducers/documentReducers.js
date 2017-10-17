import * as actionTypes from '../actions/actionType';

const initialState = {
  documentList: {},
  pagination: {},
  document: {}
};

/**
* Reducer for document-related actions.
* @param {Object} state The old state of the application
* @param {Object} action The dispatched action
* @returns {Object} The new application state
*/
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DOCUMENT_SUCCESS:
      return { ...state,
        documentList: action.documents.documents,
        pagination: action.documents.pagination };
    case actionTypes.GET_USER_DOCUMENT_SUCCESS:
      return { ...state,
        documentList: action.documents.documents,
        pagination: action.documents.pagination };
    case actionTypes.SEARCH_DOCUMENT_SUCCESS:
      return { ...state,
        documentList: action.documents.documents,
        pagination: action.documents.pagination };
    case actionTypes.SEARCH_DOCUMENTBYID_SUCCESS:
      return { ...state, document: action.document.data };
    default:
      return state;
  }
};
