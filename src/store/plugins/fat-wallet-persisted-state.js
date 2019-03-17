import Store from 'electron-store'
import createPersistedState from './persisted-state'

const appStore = new Store({ name: 'user-config.v1' })

export default createPersistedState({
    storage: appStore,
    whitelist:
        [
            "address/updateAddressNames",
            "address/setPreferredEcAddress",
            "fatd/updateEndpoint",
            "factomd/updateEndpoint",
            "walletd/updateEndpoint",
            "tokens/addToken",
            "tokens/removeToken",
            "identity/updateIdentities",
            "identity/addIdentity",
            "identity/unlinkIdentity"
        ],
    statePick: (state) => ({
        address: {
            names: state.address.names,
            preferredEcAddress: state.address.preferredEcAddress
        },
        fatd: {
            endpoint: state.fatd.endpoint
        },
        factomd: {
            endpoint: state.factomd.endpoint
        },
        walletd: {
            endpoint: state.walletd.endpoint
        },
        tokens: {
            tracked: state.tokens.tracked
        },
        identity: {
            identities: state.identity.identities
        }
    })
})