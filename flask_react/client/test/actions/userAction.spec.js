import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actions from '../../actions/userActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const pagination = {
  total: 15,
  pageCount: 1,
  currentPage: 1,
  pageSize: 3
};

describe('User actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`creates an action type GET_ALL_USERS 
  get all users request is successful`, (done) => {
    moxios.stubRequest('/api/v1/users?limit=5&offset=0', {
      status: 201,
      response: {
        user: [{ id: 3 }, { id: 5 }],
        pagination,
      }
    });
    const store = mockStore({});

    const expectedAction = actions.getUsers;

    store.dispatch(actions.getAllUsers()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });

  it(`creates an action type SEARCH_USER_SUCCESS 
  when search user database request is successful`, (done) => {
    moxios.stubRequest('/api/v1/search/users?q=ma', {
      status: 200,
      response: {
        user: [{ id: 5 }],
        pagination,
      }
    });
    const store = mockStore({});

    const expectedAction = actions.search;

    store.dispatch(actions.searchUserDb('ma')).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });

  it(`creates an action type DELETE_USER_SUCCESS 
  deleteUserRecord request is successful`, (done) => {
    moxios.stubRequest('/api/v1/users/14', {
      status: 200,
      response: {
        user: [{ id: 5 }],
        pagination,
      }
    });
    const store = mockStore({});

    const expectedAction = actions.deleteUser;

    store.dispatch(actions.deleteUserRecord(14)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });
});
