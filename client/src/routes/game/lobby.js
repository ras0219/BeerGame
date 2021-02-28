import { useState } from 'preact/hooks';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GameQueries } from '../../gql/game'

function Lobby() {
    const { loading, error, data } = useQuery(GameQueries.getRoles);

    const [leaveGame] = useMutation(GameQueries.leaveGame, {
        variables: {
            gameId: this.props.game.id
        },
    });
    const [startGame] = useMutation(GameQueries.startGame, {
        variables: {
            gameId: this.props.game.id
        },
    });
    const [changeRole] = useMutation(GameQueries.setRole, {
        variables: {
            gameId: this.props.game.id
        },
    });
    const [setGameSetting] = useMutation(GameQueries.setGameSetting, {
        variables: {
            gameId: this.props.game.id
        },
    });

    const [editData, setEditData] = useState({});

    if (loading) return 'Loading Lobby...';
    if (error) {
        console.log(error);
        return "Error!";
    }

    return (
        <div>
            <h1>'{this.props.game.id}'</h1>
            <a href="#" onClick={e => {
                e.preventDefault();
                startGame();
            }}>Start</a>
            <h2>Players</h2>
            <ul>
                {this.props.game.playerState.map(state => (
                    <li>
                        <span>{state.player.name}</span>
                        &nbsp;
                        <span>
                            {state.player.id == this.props.user.id ? (
                                <select value={state.role.value} onChange={e => {
                                    e.preventDefault();
                                    changeRole({ variables: { playerId: state.player.id, role: e.target.value } });
                                }}>{data.gameRoles.map(role => (
                                    <option value={role.value}>{role.name}</option>
                                ))}</select>
                            ) : (
                                <span>{state.role.name}</span>
                            )}
                        </span>
                        &nbsp;
                        <span>
                            [<a href="#" onClick={e => {
                                e.preventDefault();
                                leaveGame({ variables: { playerId: state.player.id } });
                            }}>{state.player.id == this.props.user.id ? (
                                'Leave'
                            ) : (
                                'Kick'
                            )}</a>]
                        </span>
                    </li>
                ))}
            </ul>
            <h2>Game Options</h2>
            <ul>
                {this.props.game.settings.map(nv => (
                    <li>
                        <span>{nv.name}</span>
                        &nbsp;
                        <input type="text" value={editData.name == nv.name ? editData.value : nv.value} onfocusout={e => {
                            setEditData({});
                            setGameSetting({ variables: { name: nv.name, value: e.target.value } });
                        }} onInput={e => {
                            setEditData({ name: nv.name, value: e.target.value });
                        }}/>
                    </li>
                ))}
            </ul>
            <h2>Game Presets</h2>
            <ul>
                <li>
                    <a href="#" onClick={e => {
                        e.preventDefault();
                        setGameSetting({ variables: { name: "preset", value: 0 } });
                    }}>Default</a>
                </li>
                <li>
                    <a href="#" onClick={e => {
                        e.preventDefault();
                        setGameSetting({ variables: { name: "preset", value: 1 } });
                    }}>Holidays</a>
                </li>
            </ul>
        </div>
    );
}

export default Lobby;