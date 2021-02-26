import { useState } from 'preact/hooks';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useFixedSubscription } from '../../components/useFixedSubscription';

import { GameQueries, GameSubscriptions } from '../../gql/game'
import Graph from '../../components/graph'

function Play() {
    const { loading, error, data } = useFixedSubscription(GameSubscriptions.playerState, {
        variables: {
            gameId: this.props.game.id,
            playerId: this.props.user.id
        }
    });

    const [state, setState] = useState({
        value: '',
        valid: false
    });
    const [setOutgoing] = useMutation(GameQueries.submitOutgoing, {
        variables: {
            gameId: this.props.game.id,
            playerId: this.props.user.id
        },
    });

    if (loading) return 'Loading Play...';
    if (error) {
        console.log(error);
        return "Error!";
    }

    return (
        <div>
            <h1>'{this.props.game.id}' Week {this.props.game.week + 1}/{this.props.game.lastweek}</h1>
            <h2>{data.playerState.role.name}</h2>
            {(this.props.game.holiday > 0) ? (<h2>Holiday in {this.props.game.holiday - ((this.props.game.week) % this.props.game.holiday)} Weeks</h2>) : ""}

            <div class="player-state">
                {this.props.game.playerState.sort(function (a, b) {
                    return a.role.value - b.role.value;
                }).map(state => (
                    <div class={"block " + (state.outgoing == -1 ? "waiting" : "done")}>
                        {state.player.name}
                        <div class="role">{state.role.name}</div>
                    </div>
                ))}
            </div>

            <div class="game-state">
                <div class="block incoming">
                    <span class="title">Incoming</span>
                    <span class="value">{data.playerState.incoming}</span>
                </div>
                <div class="block outgoing">
                    <span class="title">Outgoing</span>
                    <form class="value" onSubmit={e => {
                        e.preventDefault();
                        setOutgoing({ variables: { outgoing: state.value } });
                        setState({ value: '', valid: false });
                    }}>
                        <input type="text" value={state.value} class={
                            state.valid ? "input valid" : "input invalid"
                        } onInput={e => {
                            const { value } = e.target;

                            const intValue = Number(value)
                            var isValid = (value.length > 0) && (intValue != NaN && intValue >= 0 && intValue < 2147483647);

                            setState({ value: value, valid: isValid });
                        }} />
                    </form>
                </div>
                <div class="block backlog">
                    <span class="title">Backlog</span>
                    <span class="value">{data.playerState.backlog}</span>
                </div>
                <div class="block stock">
                    <span class="title">Stock</span>
                    <span class="value">{data.playerState.stock}</span>
                </div>
                <div class="indicator last-sent-indicator">
                    <span class="title">&#9654;</span>
                </div>
                <div class="block last-sent">
                    <span class="title">Last Sent</span>
                    <span class="value">{data.playerState.lastsent}</span>
                </div>
                <div class="indicator pending-next-indicator">
                    <span class="title">&#9664;</span>
                </div>
                <div class="block pending-next">
                    <span class="title">Pending</span>
                    <span class="value">{data.playerState.pending0}</span>
                </div>
                <div class="block pending-all">
                    <span class="title">Outstanding</span>
                    <span class="value">{data.playerState.outstanding}</span>
                </div>
            </div>

            <div>
                <Graph data={data.playerState.incomingprev} title="Incoming History" />
                <Graph data={data.playerState.outgoingprev} title="Outgoing History" />
                <Graph data={data.playerState.costprev} title="Costs History" />
                <Graph data={data.playerState.stockbackprev} title="Stock History" />
                <Graph data={data.playerState.deliveredprev} title="Delivered History" />
            </div>

            <h2>Game Options</h2>
            <ul>
                {this.props.game.settings.map(nv => (
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

export default Play;