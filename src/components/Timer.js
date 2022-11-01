import React from 'react';
import DateUtil from '../utils/DateUtil';

export default class Timer extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = { seconds: props.seconds, text: DateUtil.secondsToTime(props.seconds)};
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countTimer = this.countTimer.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countTimer, 1000);
        }
    }

    countTimer() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds + 1;
        this.setState({
            seconds:seconds,
            text:DateUtil.secondsToTime(seconds)
        });
    }

    render() {
        return (
            <div style={{paddingTop: 25, paddingBottom: 25}}>
                {this.state.text}
            </div>
        );
    }
}