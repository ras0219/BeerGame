function GameSettings() {
    return (
        <ul>
            {this.props.game.settings.map(nv => (
                <li>
                    <span>{nv.name}</span>
                        &nbsp;
                    <span>{nv.value}</span>
                </li>
            ))}
        </ul>
    );
}

export default GameSettings;
