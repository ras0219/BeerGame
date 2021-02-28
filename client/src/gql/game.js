
import gql from 'graphql-tag';

export const GameSubscriptions = {
    gameState: gql`
        subscription Game($gameId: String!) {
            game(gameId: $gameId) {
                id
                week
                totalcustomer
                lastweek
                holiday
                settings {
                    name
                    value
                }
                players {
                    id
                    name
                }
                state {
                    name
                }
                playerState {
                    player {
                        id
                        name
                    }
                    role {
                        name
                        value
                    }
                    incoming
                    outgoing
                    stock
                    backlog
                    lastsent
                    pending0
                    outgoingprev
                    incomingprev
                    stockbackprev
                    deliveredprev
                    costprev
                    costs
                    outstanding
                }
            }
        }
    `,
    playerState: gql`
        subscription PlayerState($gameId: String!, $playerId: String!) {
            playerState(gameId: $gameId, playerId: $playerId) {
                player {
                    name
                }
                incoming
                outgoing
                stock
                backlog
                lastsent
                pending0
                outgoingprev
                incomingprev
                stockbackprev
                deliveredprev
                costprev
                costs
                outstanding
                role {
                    name
                    value
                }
            }
        }
    `,
}

export const GameQueries = {
    getExists: gql`
        query Game($id: String!) {
            gameExists(gameId: $id)
        }
    `,
    getRoles: gql`
        query Roles {
            gameRoles {
                name
                value
            }
        }
    `,
    joinGame: gql`
        mutation JoinGame($gameId: String!, $playerId: String!) {
            addPlayer(gameId: $gameId, playerId: $playerId)
        }
    `,
    leaveGame: gql`
        mutation LeaveGame($gameId: String!, $playerId: String!) {
            removePlayer(gameId: $gameId, playerId: $playerId)
        }
    `,
    startGame: gql`
        mutation StartGame($gameId: String!) {
            startGame(gameId: $gameId)
        }
    `,
    setRole: gql`
        mutation ChangePlayerRole($gameId: String!, $playerId: String!, $role: Int!) {
            changePlayerRole(gameId: $gameId, playerId: $playerId, role: $role)
        }
    `,
    setGameSetting: gql`
        mutation setGameSetting($gameId: String!, $name: String!, $value: Int!) {
            setGameSetting(gameId: $gameId, name: $name, value: $value)
        }
    `,
    submitOutgoing: gql`
        mutation SubmitOutgoing($gameId: String!, $playerId: String!, $outgoing: Int!) {
            submitOutgoing(gameId: $gameId, playerId: $playerId, outgoing: $outgoing)
        }
    `,
};
