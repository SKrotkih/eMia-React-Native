// Time
import React, { PureComponent } from 'react';
import moment from 'moment';
import {Text} from 'native-base';

export default class Time extends PureComponent{

    constructor(props){
        super(props);
        this.date = props.date;
        this.style = props.style;
    }

    render(){
        const time = moment(this.date || moment.now()).fromNow();
        return (
            <Text numberOfLines={1} children={time} style={this.style}/>
        )
    }
}