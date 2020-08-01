/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Alert} from 'react-native';
import * as actions from '../../../model/dbinteractor/posts/dbinteractor';
import {FilerItem, PostsTabItem} from './Tabs';

const {fetchPosts} = actions;

export default class ModelView {
  private _dataSource: any;
  private _loaded: boolean;
  private _refreshing: boolean;
  private _currentFilterItem: FilerItem;
  private _updateView: () => void;

  constructor(updateView: () => void) {
    this._updateView = updateView;
    this._dataSource = null;
    this._loaded = false;
    this._refreshing = false;
    this._currentFilterItem = FilerItem.ALL_POSTS;
  }

  get tabs(): Array<PostsTabItem> {
    return [
      {
        title: 'All Posts',
        filterItem: FilerItem.ALL_POSTS,
      },
      {
        title: 'My Posts',
        filterItem: FilerItem.MY_POSTS,
      },
    ];
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
    this.didSelectTabItem(this._currentFilterItem);
  }

  didSelectTabItem(tabItemIndex) {
    if (tabItemIndex < this.tabs.length) {
      this._currentFilterItem = this.tabs[tabItemIndex].filterItem;
      this.fetchData(this._currentFilterItem);
    }
  }

  fetchData(filterItem: FilerItem) {
    this.loaded = false;
    this._refreshing = true;
    this.updateView();

    console.log(filterItem);

    fetchPosts(filterItem)
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
