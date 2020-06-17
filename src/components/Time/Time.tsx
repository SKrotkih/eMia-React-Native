// Time
import React, {PureComponent} from 'react';
import moment from 'moment';
import {Text} from 'native-base';

export class Time extends PureComponent {
  private readonly date: any;
  private readonly style: any;

  constructor(props) {
    super(props);
    this.date = props.date;
    this.style = props.style;
  }

  render() {
    const time = moment(this.date || moment.now()).fromNow();
    return <Text numberOfLines={1} children={time} style={this.style} />;
  }
}
