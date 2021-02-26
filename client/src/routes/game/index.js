import { useEffect } from 'preact/hooks';
import { useMutation } from '@apollo/react-hooks';
import { useFixedSubscription } from '../../components/useFixedSubscription';

import Lobby from "./lobby"
import Play from "./play"
import PlayerResults from '../../components/playerresults'

import { GameQueries, GameSubscriptions } from '../../gql/game'

function Game({ id }) {
    const { loading, error, data } = useFixedSubscription(GameSubscriptions.gameState, {
        variables: { gameId: id }
    });
    const [joinGame] = useMutation(GameQueries.joinGame, {
        variables: { 
            gameId: id
        }
    });

    if (loading) return 'Loading Game...';
    if (error) {
        console.log(error);
        return "Error!";
    }

    useEffect(() => {
        joinGame({ variables: { playerId: this.props.user.id }});
    }, [this.props.user.id]);

    if (data.game.state.name == "lobby") {
        return (
            <Lobby user={this.props.user} game={data.game} />
        );
    } else if (data.game.state.name == "playing") {
        return (
            <Play user={this.props.user} game={data.game} />
        );
    } else if (data.game.state.name == "finished") {
        return (
            <div>
                <h1>'{this.props.id}'</h1>
                Game Complete!
                <div>Total customers: {data.game.totalcustomer}</div>
                <div class="player-state">
                    {data.game.playerState.sort(function(a, b) {
                        return a.role.value - b.role.value;
                        }).map(state => (
                            <PlayerResults gameId={id} playerId={state.player.id} totalcustomer={data.game.totalcustomer} />
                        ))}
                </div>
                <h2>Game Options</h2>
                <ul>
                    {data.game.settings.map(nv => (
                        <li>
                            <span>{nv.name}</span>
                            &nbsp;
                            <span>{nv.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    return (
        <div>
            <h1>'{this.props.id}'</h1>
            ERROR: unknown state '{data.game.state.name}''
        </div>
    )
}

export default Game;