import React from 'react';
import {Alert} from '@theme/components/alerts/';
import * as actions from '@model/actions/posts/actions';

const {fetchPosts} = actions;

export class ModelView {
    constructor(view) {
        this._view = view;
        this._dataSource = null;
        this._loaded = false;
        this._refreshing = false;
    }

    updateView() {
        this._view.updateView();
    }

    get dataSource() {
        return this._dataSource;
    }

    get loaded() {
        return this._loaded;
    }

    get refreshing() {
        return this._refreshing;
    }

    fetchData() {
        this._loaded = false;
        this._refreshing = true;
        fetchPosts()
            .then((items) => {
                this._dataSource = items;
                this._loaded = true;
                this._refreshing = false;
                this.updateView();
            })
            .catch((error) => {
                Alert.alert('Oops!', error.message);
                this._dataSource = [];
                this._loaded = true;
                this._refreshing = false;
                this.updateView();
            });
    }
}
