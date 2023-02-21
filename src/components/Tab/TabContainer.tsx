import useTranslation from '@/hooks/useTranslation';
import { modalWrapperClass } from '@/styles/modal/WalletModal.css';
import { PropsWithChildren, useState } from 'react';
import { AtomBox } from '../AtomBox';
import Tab from './Tab';
import TabMenu from './TabMenu';


export const TabContainer = ({ children, docLink, docText }: PropsWithChildren<{ docLink: string; docText: string }>) => {

    const [index, setIndex] = useState(0)
    const { t } = useTranslation()
    return (
        <AtomBox position="relative" zIndex="modal" className={modalWrapperClass}>
            <AtomBox position="absolute" style={{ top: '-50px' }}>
                <TabMenu activeIndex={index} onItemClick={setIndex} gap="0px" isColorInverse>
                    <Tab>{t('Connect Wallet')}</Tab>
                    <Tab>{t('What’s a Web3 Wallet?')}</Tab>
                </TabMenu>
            </AtomBox>
            <AtomBox
                display="flex"
                position="relative"
                background="gradientCardHeader"
                borderRadius="card"
                borderBottomRadius={{
                    xs: '0',
                    md: 'card',
                }}
                zIndex="modal"
                width="full"
                >
                {index === 0 && children}
                {/* {index === 1 && <StepIntro docLink={docLink} docText={docText} />} */}
            </AtomBox>
        </AtomBox>
    )
}