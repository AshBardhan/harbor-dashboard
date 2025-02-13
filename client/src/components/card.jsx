import moment from 'moment';

export default function Card({data}) {
    const { testnet_off_chain_actors: testnetOffChainActors, testnet_chains: testnetChains, name, status } = data;

    return (
        <div style={{border: '1px solid', margin: '10px 0', padding: '20px'}} key={data.id}>
            {name}
            {status}
            <br/>
            {testnetOffChainActors.length} off-chain actor(s)
            {testnetChains.length > 0 && <>
                {testnetChains.length} blockchain(s)
            </>}
            <span>Modified {moment(data.updated_at).fromNow()}</span>
        </div>
    );
} 