import moment from 'moment';
import Text from './text';
import Flexbox from './flexbox';
import { Status, StatusColorMapping, StatusLabelMapping } from '../constants/status';

export default function Card({data}) {
    const { testnet_off_chain_actors: testnetOffChainActors, testnet_chains: testnetChains, name, status } = data;
    const isBlockchainUpdating = testnetChains.find((chain) => chain.status === Status.UPDATING);
    const offChainUpdatingCount = testnetOffChainActors.filter((chain) => chain.status === Status.UPDATING).length;

    return (
        <div className={`tile ${status === Status.FAILED && 'tile--error'}`} key={data.id}>
            <Flexbox justifyContent="space-between">
                <Flexbox gap="10px" alignItems="center">
                    <Text type="h3">{name}</Text>
                    <span className="badge">5321</span>
                </Flexbox>
                
                <Flexbox gap="10px" alignItems="center">
                    <Flexbox gap="5px" alignItems="center" style={{color: StatusColorMapping[status]}}>
                        <span className="icon"></span>
                        <Text type="span">{StatusLabelMapping[status]}</Text>
                    </Flexbox>
                    <span className="dot"></span>
                    <button type='button' className='inline-button' disabled={status === Status.PENDING || status === Status.UPDATING}>
                        <span className='icon'></span>
                        <span>Settings</span>
                    </button>
                </Flexbox>
            </Flexbox>
            
            <Flexbox justifyContent="space-between" style={{marginTop:'5px'}}>
                <Flexbox gap="10px" alignItems="center">
                    <Text type="span">{testnetOffChainActors.length} off-chain actor(s)</Text>
                    {testnetChains.length > 0 && <>
                        <span className="dot"></span>
                        <Text type="span">{testnetChains.length} blockchain(s)</Text>
                    </>}
                </Flexbox>
                <Flexbox gap="10px" alignItems="center">
                    <span className="icon"></span>
                    <Text type="span">Modified {moment(data.updated_at).fromNow()}</Text>
                </Flexbox>
            </Flexbox>

            {(offChainUpdatingCount > 0 || isBlockchainUpdating) && (
                <Flexbox gap="10px" alignItems="center" style={{marginTop:'5px'}}>
                {offChainUpdatingCount > 0 && (
                    <Flexbox gap="5px" alignItems="center" style={{color: StatusColorMapping[status]}}>
                        <span className='icon'></span>
                        <span>{offChainUpdatingCount} off-chain updating</span>
                    </Flexbox>
                )}
                {isBlockchainUpdating && (
                    <>
                    <span className='dot'></span>
                    <Flexbox gap="5px" alignItems="center" style={{color: StatusColorMapping[status]}}>
                        <span className="icon"></span>
                        <span>Blockchain updating</span>
                    </Flexbox>
                    </>
                )}
                </Flexbox>
            )}
        </div>
    );
} 