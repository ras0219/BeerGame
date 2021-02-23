import { useSubscription } from '@apollo/react-hooks';

import { GameSubscriptions } from '../gql/game'
import Graph from './graph'

function PlayerResults() {
    const { loading, error, data } = useSubscription(GameSubscriptions.playerState, {
        variables: {
            gameId: this.props.gameId,
            playerId: this.props.playerId
        }
    });

    if (loading) return 'Loading...';
    if (error) {
        console.log(error);
        return "Error!";
    }

    return (
        <div>
            {data.playerState.player.name}
            <div class="role">{data.playerState.role.name}</div>
            <div class="role">Delivered: {(100.0*data.playerState.deliveredprev.slice(-1)[0] / this.props.totalcustomer).toFixed(2)}%</div>
            <div class="role">Stage cost: ${(1.0*data.playerState.costprev.slice(-1)[0] / data.playerState.deliveredprev.slice(-1)[0]).toFixed(2)}</div>
            <Graph data={data.playerState.incomingprev} data2={data.playerState.outgoingprev} title="incoming/outgoing" />
            <Graph data={data.playerState.costprev} title="cost" />
            <Graph data={data.playerState.stockbackprev} title="stock" />
            <Graph data={data.playerState.deliveredprev} title="delivered" />
        </div>
    );
}

export default PlayerResults;