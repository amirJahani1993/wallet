import { t } from '$translation';
import { format, formatDate, fromNano, getLocale } from '$utils';
import {
  ServerAccountEvent,
  EventAction,
  EventActionType,
  TonTransferAction,
  MergedEventAction,
} from './Events.types';
import { differenceInCalendarMonths } from 'date-fns';
import { Address } from '@tonkeeper/core';
import { formatter } from '$utils/formatter';

import {
  ClientEvent,
  ClientEventAction,
  ClientEventType,
  GroupedActionsByDate,
} from '@tonkeeper/shared/components/TransactionList/DataTypes';

const getSenderAccount = (isReceive: boolean, action: TonTransferAction) => {
  const senderAccount = isReceive ? action.sender : action.recipient;
  if (senderAccount) {
    if (senderAccount.name) {
      return senderAccount.name;
    }

    return Address(senderAccount.address).maskify();
  }

  return '';
};

function getGroupDate(timestamp: number) {
  const ts = timestamp * 1000;
  const now = new Date();

  if (differenceInCalendarMonths(now, new Date(ts)) < 1) {
    return format(new Date(ts), 'd MMMM', { locale: getLocale() });
  }

  return format(new Date(ts), 'LLLL');
}

export function EventsMapper(events: ServerAccountEvent[], walletAddress: string) {
  const groupedActions = events.reduce<GroupedActionsByDate>((groups, event) => {
    const date = getGroupDate(event.timestamp);

    if (!groups[date]) {
      groups[date] = [];
    }

    const actions = EventMapper(event, walletAddress);
    groups[date].push(...actions);

    return groups;
  }, {});

  return Object.keys(groupedActions).reduce((acc, date) => {
    const actions = groupedActions[date];
    const txTime = actions[0].timestamp * 1000;
    const formattedDate = formatDate(new Date(txTime));

    acc.push({
      type: ClientEventType.Date,
      id: `date-${formattedDate}`,
      date: formattedDate,
    });

    acc.push(...actions);

    return acc;
  }, [] as ClientEvent[]);
}

export function EventMapper(event: ServerAccountEvent, walletAddress: string) {
  const countAction = event.actions.length;
  const actions = event.actions.reduce((actions, serverAction, index) => {
    const actionData = serverAction[serverAction.type] as MergedEventAction;
    const action = EventsActionMapper({
      actionIndex: index,
      walletAddress,
      event,
      action: {
        data: actionData,
        ...serverAction,
      },
    });

    if (index === 0) {
      action.topCorner = true;
    }

    if (index === countAction - 1) {
      action.bottomCorner = true;
    }

    actions.push(action);

    return actions;
  }, [] as ClientEventAction[]);

  return actions;
}

type EventsActionMapperInput = {
  walletAddress: string;
  action: MergedEventAction;
  actionIndex: number;
  event: any;
};

export function EventsActionMapper(input: EventsActionMapperInput): ClientEventAction {
  const time = format(new Date(input.event.timestamp * 1000), 'HH:mm');
  const action: ClientEventAction = {
    type: ClientEventType.Action,
    id: `input.action-${input.event.event_id}-${input.actionIndex}`,
    title: input.action.simple_preview.name || 'Unknown',
    subtitle: input.action.simple_preview.description,
    timestamp: input.event.timestamp,
    iconName: 'ic-gear-28',
    subvalue: time,
    value: '−',
  };

  try {
    const isReceive =
      input.action?.data?.recipient &&
      Address.compare(input.action.data.recipient.address, input.walletAddress);

    action.isReceive = isReceive;

    const senderAccount = getSenderAccount(isReceive, input.action?.data);
    const arrowIcon = isReceive ? 'ic-tray-arrow-down-28' : 'ic-tray-arrow-up-28';
    const amountPrefix = isReceive ? '+' : '−';
    const sendOrReceiveTitle = isReceive
      ? t('transaction_type_receive')
      : t('transaction_type_sent');

    switch (input.action.type) {
      case EventActionType.TonTransfer: {
        const data = input.action.data;

        action.iconName = arrowIcon;
        action.subtitle = senderAccount;
        action.title = sendOrReceiveTitle;

        action.value = formatter.format(formatter.fromNano(data.amount), {
          prefix: amountPrefix,
          postfix: 'TON',
        });
        break;
      }
      case EventActionType.JettonTransfer: {
        const data = input.action.data;

        const decimalsAmount = fromNano(data.amount, data.jetton.decimals ?? 9);
        const value = formatter.format(decimalsAmount.toString(), {
          prefix: amountPrefix,
          postfix: data.jetton?.symbol,
        });

        action.iconName = arrowIcon;
        action.title = sendOrReceiveTitle;
        action.subtitle = senderAccount;
        action.value = value;
        break;
      }
      case EventActionType.NftItemTransfer: {
        const data = input.action.data;

        action.iconName = arrowIcon;
        action.title = sendOrReceiveTitle;
        action.subtitle = senderAccount;
        action.value = 'NFT';
        action.nftAddress = data.nft;

        // bottomContent = (
        //   <TransactionItemNFT
        //     keyPair={{
        //       currency: CryptoCurrencies.Ton,
        //       address: Address(data.nft).toFriendly()
        //     }}
        //   />
        // );
        break;
      }
      case EventActionType.NftPurchase:
        const data = input.action.data;

        action.iconName = arrowIcon;
        action.title = t('transactions.nft_purchase');
        action.subtitle = senderAccount;
        action.value = formatter.format(formatter.fromNano(data.amount.value), {
          prefix: amountPrefix,
          postfix: data.amount.token_name,
        });
        break;
      case EventActionType.ContractDeploy: {
        const data = input.action.data;

        const isInitialized = Address.compare(data.address, input.walletAddress);
        action.iconName = isInitialized ? 'ic-donemark-28' : 'ic-gear-28';
        action.title = isInitialized
          ? t('transinput.action_type_wallet_initialized')
          : t('transinput.action_type_contract_deploy');
        break;
      }
      case EventActionType.Subscribe: {
        const data = input.action.data;

        action.iconName = 'ic-bell-28';
        action.title = t('transactions.subscription');
        action.subtitle = data.beneficiary.name ?? '';
        action.value = formatter.format(formatter.fromNano(data.amount), {
          prefix: amountPrefix,
          postfix: 'TON',
        });
        break;
      }
      case EventActionType.UnSubscribe: {
        const data = input.action.data;

        action.iconName = 'ic-xmark-28';
        action.title = t('transactions.unsubscription');
        action.subtitle = data.beneficiary.name ?? '';
        break;
      }
      case EventActionType.SmartContractExec: {
        const data = input.action.data;

        action.iconName = 'ic-gear-28';
        action.title = t('transactions.smartcontract_exec');
        action.subtitle = Address(data.contract.address).maskify();
        action.value = formatter.format(formatter.fromNano(data.ton_attached), {
          prefix: amountPrefix,
          postfix: 'TON',
        });
        break;
      }
      case EventActionType.AuctionBid: {
        const data = input.action.data;
        
        break;
      }
      default:
      // console.log(input.action.type)
    }

    return action;
  } catch (err) {
    console.log(err);
    return action;
  }
}
