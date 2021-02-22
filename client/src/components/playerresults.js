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
            <Graph data={data.playerState.outgoingprev} title="outgoing" />
            <Graph data={data.playerState.costprev} title="cost" />
            <Graph data={data.playerState.stockbackprev} title="stock" />
        </div>
    );
}

export default PlayerResults;