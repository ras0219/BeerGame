import GameSettings from '../../components/gamesettings'
import PlayerResults from '../../components/playerresults'

function Results() {
    return (
        <div>
            <h1>'{this.props.game.id}'</h1>
            <div>Total customers: {this.props.game.totalcustomer}</div>
            <div class="player-state">
                {this.props.game.playerState.sort(function(a, b) {
                    return a.role.value - b.role.value;
                    }).map(state => (
                        <PlayerResults playerState={state} totalcustomer={this.props.game.totalcustomer} />
                    ))}
            </div>
            <h2>Game Options</h2>
            <GameSettings game={this.props.game} />
        </div>
    );
}

export default Results;
