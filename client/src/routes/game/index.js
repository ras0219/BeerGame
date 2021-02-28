import { useEffect } from 'preact/hooks';
import { useMutation } from '@apollo/react-hooks';
import { useFixedSubscription } from '../../components/useFixedSubscription';

import Lobby from "./lobby"
import Play from "./play"
import Results from "./results"
import PlayerResults from '../../components/playerresults'
import GameSettings from '../../components/gamesettings'

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
            <Results game={data.game}/>
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