import {Alert} from 'react-native';
import * as actions from '../../../model/dbinteractor/posts/dbinteractor';
import {TABS} from './styles';

const {fetchPosts} = actions;

export default class ModelView {
  private _dataSource: any;
  private _loaded: boolean;
  private _refreshing: boolean;
  private _currentFilter: string;
  private _updateView: () => void;

  constructor(updateView: () => void) {
    this._updateView = updateView;
    this._dataSource = null;
    this._loaded = false;
    this._refreshing = false;
    this._currentFilter = TABS.ALLPOSTS;
  }

  updateView() {
    this._updateView();
  }

  get dataSource() {
    return this._dataSource;
  }

  get loaded() {
    return this._loaded;
  }
  set loaded(newValue) {
    this._loaded = newValue;
  }

  get refreshing() {
    return this._refreshing;
  }

  refreshData() {
    this.filter = this._currentFilter;
  }

  set filter(tabItem) {
    this._currentFilter = tabItem;
    switch (tabItem) {
      case TABS.ALLPOSTS:
        this.fetchData(0);
        break;
      case TABS.MYPOSTS:
        this.fetchData(1);
        break;
    }
  }

  fetchData(i) {
    this.loaded = false;
    this._refreshing = true;
    this.updateView();
    fetchPosts(i)
      .then((items) => {
        this._dataSource = items;
        this.loaded = true;
        this._refreshing = false;
        this.updateView();
      })
      .catch((error) => {
        Alert.alert('Oops!', error.message);
        this._dataSource = [];
        this.loaded = true;
        this._refreshing = false;
        this.updateView();
      });
  }
}
