import Graph from './graph'

function PlayerResults() {
    return (
        <div>
            {this.props.playerState.player.name}
            <div class="role">{this.props.playerState.role.name}</div>
            <div class="role">Delivered: {(100.0*this.props.playerState.deliveredprev.slice(-1)[0] / this.props.totalcustomer).toFixed(2)}%</div>
            <div class="role">Stage cost: ${(1.0*this.props.playerState.costprev.slice(-1)[0] / data.playerState.deliveredprev.slice(-1)[0]).toFixed(2)}</div>
            <Graph data={this.props.playerState.incomingprev} data2={this.props.playerState.outgoingprev} title="incoming/outgoing" />
            <Graph data={this.props.playerState.costprev} title="cost" />
            <Graph data={this.props.playerState.stockbackprev} title="stock" />
            <Graph data={this.props.playerState.deliveredprev} title="delivered" />
        </div>
    );
}

export default PlayerResults;