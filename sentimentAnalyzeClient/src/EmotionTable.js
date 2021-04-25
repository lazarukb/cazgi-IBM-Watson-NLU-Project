import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        // console.log('Hello from the EmotionTable.js');
        // console.log(this.props.emotions);
        // console.log(this.props.emotions.emotion.document);
        // console.log(this.props.emotions.emotion.document.emotion);
        let just_emotions = this.props.emotions.emotion.document.emotion;
        return (  
            <div>
                {/* You can remove this line and the line below.
                {JSON.stringify(this.props.emotions)} */}
                <table className="table table-bordered">
                    <tbody>
                        {Object.entries(just_emotions).map(function(mapentry) {
                            return (
                                <tr>
                                    <td>{mapentry[0]}</td>
                                    <td>{mapentry[1]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EmotionTable;
